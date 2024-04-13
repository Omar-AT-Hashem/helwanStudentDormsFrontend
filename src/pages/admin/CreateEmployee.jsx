import { useEffect, useState } from "react";
import { API_ROUTE } from "../../config/env.js";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Loading from "../../components/minicomponent/Loading.jsx";

const CreateEmployee = () => {
  if (sessionStorage.getItem("token")) {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${sessionStorage.getItem("token")}`;
  }

  const [editable, setEditable] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
    superAdmin: 0,
    editStudentData: 0,
    applicationApprovals: 0,
    houseStudents: 0,
    unHouseStudents: 0,
    managePenalties: 0,
    suspendStudent: 0,
    manageAbscence: 0,
    manageStudentFees: 0,
    manageBlockMeals: 0,
    uploadStudentImages: 0,
    editApplicationDates: 0,
    editInstructions: 0,
    uploadMeals: 0,
    editFees: 0,
    editHousingResources: 0,
    studentEvaluation: 0,
    systemWash: 0,
  });
  const [loading, setLoading] = useState(0);

  const [permissions, setPermissions] = useState([
    {
      superAdmin: 0,
    },
  ]);
  useEffect(() => {
    setLoading((prev) => prev + 1);
    axios
      .get(
        `${API_ROUTE}/v1/employee/permissions/${sessionStorage.getItem("id")}`
      )
      .then((res) => {
        setLoading((prev) => prev - 1);
        setPermissions(res.data);
        setEditable(Boolean(res.data.superAdmin));
      })
      .catch(() => {
        setLoading((prev) => prev - 1);
        return;
      });
  }, []);

  const handleChange = (e) => {
    let value;
    if (e.target.type === "checkbox") {
      value = e.target.checked ? 1 : 0;
    } else {
      value = e.target.value;
    }
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleSaveClick = () => {
    if (
      formData.name != "" &&
      formData.username != "" &&
      formData.password != "" &&
      formData.confirmPassword != ""
    ) {
      if (formData.password === formData.confirmPassword) {
        setLoading((prev) => prev + 1);
        axios
          .post(`${API_ROUTE}/v1/employee/register`, {
            name: formData.name,
            username: formData.username,
            password: formData.password,
            superAdmin: formData.superAdmin,
            editStudentData: formData.editStudentData,
            applicationApprovals: formData.applicationApprovals,
            houseStudents: formData.houseStudents,
            unHouseStudents: formData.unHouseStudents,
            managePenalties: formData.managePenalties,
            suspendStudent: formData.suspendStudent,
            manageAbscence: formData.manageAbscence,
            manageStudentFees: formData.manageStudentFees,
            manageBlockMeals: formData.manageBlockMeals,
            uploadStudentImages: formData.uploadStudentImages,
            editApplicationDates: formData.editApplicationDates,
            editInstructions: formData.editInstructions,
            uploadMeals: formData.uploadMeals,
            editFees: formData.editFees,
            editHousingResources: formData.editHousingResources,
            studentEvaluation: formData.studentEvaluation,
            systemWash: formData.systemWash,
          })
          .then((res) => {
            //handle Logs
            axios.post(`${API_ROUTE}/v1/log`, {
              adminId: sessionStorage.getItem("id"),
              adminName: sessionStorage.getItem("name"),
              adminUsername: sessionStorage.getItem("username"),
              action: `اضافه موظف جديد بالاسم ${formData.name}`,
              objectId: `${res.data.id}`,
              objectName: `${formData.name}`,
            });
            setLoading((prev) => prev - 1);
            setFormData({
              name: "",
              username: "",
              password: "",
              confirmPassword: "",
              superAdmin: 0,
              editStudentData: 0,
              applicationApprovals: 0,
              houseStudents: 0,
              unHouseStudents: 0,
              managePenalties: 0,
              suspendStudent: 0,
              manageAbscence: 0,
              manageStudentFees: 0,
              manageBlockMeals: 0,
              uploadStudentImages: 0,
              editApplicationDates: 0,
              editInstructions: 0,
              uploadMeals: 0,
              editFees: 0,
              editHousingResources: 0,
              studentEvaluation: 0,
              systemWash: 0,
            });
            toast.dismiss();
            return toast("تم انشاء حساب بنجاح");
          })
          .catch((err) => {
            setLoading((prev) => prev - 1);
            if (err && err.code === "ERR_BAD_REQUEST") {
              return;
            }
            toast.dismiss();
            return toast("حدث خطأ");
          });
      } else {
        toast.dismiss();
        toast("كلمه المرور غير متطابقه");
      }
    } else {
      toast.dismiss();
      toast("ادخل جميع الحقول");
    }
  };

  return (
    <div className="pt-16 flex flex-row w-full h-screen ">
      <Toaster
        toastOptions={{
          className: "",
          style: {
            border: "1px solid #A9872D",
            backgroundColor: "#A9872D",
            padding: "16px",
            color: "white",
            fontWeight: "Bold",
            marginTop: "65px",
            textAlign: "center",
          },
        }}
      />
      {loading > 0 && Loading}

      <div className=" flex-1 pt-4">
        <div className="bg-mainBlue mx-4 h-10 text-fuchsia-50 text-center text-2xl mt-4 rounded-lg text-mr-1">
          المستخدمين و الصلاحيات - جامعة حلوان
        </div>

        {Boolean(permissions.superAdmin) && (
          <div className="mr-10 mt-10  w-full flex flex-col gap-4">
            <div>
              <label className="mb-4 mr-20 ml-24 font-bold text-2xl">
                الاسم :
              </label>
              <input
                type="text"
                name="name"
                autoComplete="off"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-96 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 mr-6"
              />
            </div>
            <div className="flex">
              <label className="mb-4 mr-20 ml-8 font-bold text-2xl">
                اسم المستخدم :
              </label>
              <input
                type="text"
                name="username"
                autoComplete="off"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-96 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 mr-6"
              />
            </div>

            <div className="flex">
              <label className="mb-4 mr-20 ml-11 font-bold text-2xl">
                كلمه المرور :
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-96 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 mr-6"
              />
            </div>
            <div className="flex">
              <label className="mb-4 mr-20 font-bold text-2xl">
                تأكيد كلمه المرور :
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-96 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 mr-6"
              />
            </div>
            <div className="flex flex-col gap-7  mb-4 mt-2">
              <label className=" mr-20 font-bold text-2xl">الصلاحيات :</label>
              <div className="flex gap-5">
                <div className="flex">
                  <label className="text-xl">سوبر ادمن</label>
                  <input
                    type="checkbox"
                    name="superAdmin"
                    value={formData.superAdmin}
                    onChange={handleChange}
                    required
                    className="mr-1"
                  />
                </div>

                <div className="flex">
                  <label className="text-xl">تعديل بينات الطلاب</label>
                  <input
                    type="checkbox"
                    name="editStudentData"
                    value={formData.editStudentData}
                    onChange={handleChange}
                    required
                    className="mr-1"
                  />
                </div>

                <div className="flex">
                  <label className="text-xl">قبول و رفض طلبات الانترنت</label>
                  <input
                    type="checkbox"
                    name="applicationApprovals"
                    value={formData.applicationApprovals}
                    onChange={handleChange}
                    required
                    className="mr-1"
                  />
                </div>

                <div className="flex">
                  <label className="text-xl">تسكين الطلاب</label>
                  <input
                    type="checkbox"
                    name="houseStudents"
                    value={formData.houseStudents}
                    onChange={handleChange}
                    required
                    className="mr-1"
                  />
                </div>

                <div className="flex">
                  <label className="text-xl">اخلاء الطلاب</label>
                  <input
                    type="checkbox"
                    name="unHouseStudents"
                    value={formData.unHouseStudents}
                    onChange={handleChange}
                    required
                    className="mr-1"
                  />
                </div>
              </div>

              <div className="flex gap-5">
                <div className="flex">
                  <label className="text-xl"> الجزاءات الطلاب</label>
                  <input
                    type="checkbox"
                    name="managePenalties"
                    value={formData.managePenalties}
                    onChange={handleChange}
                    required
                    className="mr-1"
                  />
                </div>

                <div className="flex">
                  <label className="text-xl">رفد الطلاب</label>
                  <input
                    type="checkbox"
                    name="suspendStudent"
                    value={formData.suspendStudent}
                    onChange={handleChange}
                    required
                    className="mr-1"
                  />
                </div>

                <div className="flex">
                  <label className="text-xl">غياب الطلاب</label>
                  <input
                    type="checkbox"
                    name="manageAbscence"
                    value={formData.manageAbscence}
                    onChange={handleChange}
                    required
                    className="mr-1"
                  />
                </div>

                <div className="flex">
                  <label className="text-xl">مصاريف الطلاب</label>
                  <input
                    type="checkbox"
                    name="manageStudentFees"
                    value={formData.manageStudentFees}
                    onChange={handleChange}
                    required
                    className="mr-1"
                  />
                </div>

                <div className="flex">
                  <label className="text-xl">حجب الوجبات</label>
                  <input
                    type="checkbox"
                    name="manageBlockMeals"
                    value={formData.manageBlockMeals}
                    onChange={handleChange}
                    required
                    className="mr-1"
                  />
                </div>
              </div>
              <div className="flex gap-5">
                <div className="flex">
                  <label className="text-xl">رفع الصور الجماعيه</label>
                  <input
                    type="checkbox"
                    name="uploadStudentImages"
                    value={formData.uploadStudentImages}
                    onChange={handleChange}
                    required
                    className="mr-1"
                  />
                </div>

                <div className="flex">
                  <label className="text-xl">تعديل مواعيد التقديم</label>
                  <input
                    type="checkbox"
                    name="editApplicationDates"
                    value={formData.editApplicationDates}
                    onChange={handleChange}
                    required
                    className="mr-1"
                  />
                </div>

                <div className="flex">
                  <label className="text-xl">تعديل تعليمات التقديم</label>
                  <input
                    type="checkbox"
                    name="editInstructions"
                    value={formData.editInstructions}
                    onChange={handleChange}
                    required
                    className="mr-1"
                  />
                </div>

                <div className="flex">
                  <label className="text-xl">رفع الوجبات المسلمه</label>
                  <input
                    type="checkbox"
                    name="uploadMeals"
                    value={formData.uploadMeals}
                    onChange={handleChange}
                    required
                    className="mr-1"
                  />
                </div>

                <div className="flex">
                  <label className="text-xl">تعديل انواع المصاريف</label>
                  <input
                    type="checkbox"
                    name="editFees"
                    value={formData.editFees}
                    onChange={handleChange}
                    required
                    className="mr-1"
                  />
                </div>
              </div>
              <div className="flex gap-5">
                <div className="flex">
                  <label className="text-xl">تعديل موارد السكن</label>
                  <input
                    type="checkbox"
                    name="editHousingResources"
                    value={formData.editHousingResources}
                    onChange={handleChange}
                    required
                    className="mr-1"
                  />
                </div>

                <div className="flex">
                  <label className="text-xl">تنسيق الطلاب</label>
                  <input
                    type="checkbox"
                    name="studentEvaluation"
                    value={formData.studentEvaluation}
                    onChange={handleChange}
                    required
                    className="mr-1"
                  />
                </div>

                <div className="flex">
                  <label className="text-xl">غسل النظام</label>
                  <input
                    type="checkbox"
                    name="systemWash"
                    value={formData.systemWash}
                    onChange={handleChange}
                    required
                    className="mr-1"
                  />
                </div>
              </div>
              <div className="flex gap-5"></div>
            </div>
            <div className="mr-32 mt-5">
              {
                <button
                  className="font-bold text-white text-xl bg-blue-700 hover:opacity-70 hover:pointer transition-all duration-200 w-20 h-10 rounded-md"
                  onClick={handleSaveClick}
                >
                  حفظ
                </button>
              }
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateEmployee;
