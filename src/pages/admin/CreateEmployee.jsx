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
  const [open, setOpen] = useState(Array(20).fill(0));
  const [selectedEmployee, setSelectedEmployee] = useState();
  const [employees, setEmployees] = useState([]);
  const [rerenderTrigger, setRerenderTrigger] = useState(0);

  useEffect(() => {
    axios.get(`${API_ROUTE}/v1/employee/`).then((res) => {
      setOpen(Array(res.data.length).fill(0));
      setEmployees(res.data);
    });
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
    editStudentData: 0,
    superAdmin: 0,
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
            setEmployees((prev) => {
              prev = [...prev, { ...formData, id: res.data.id }];
              return prev;
            });
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

  const handleEmployeeClick = (e, ind) => {
    setOpen((prev) => {
      if (prev[ind]) {
        prev = Array(employees.length).fill(0);
      } else {
        prev = Array(employees.length).fill(0);
        prev[ind] = 1;
      }

      return prev;
    });
    setRerenderTrigger((prev) => prev + 1);
  };

  const handleEmployeeChange = (e, ind) => {
    setEmployees((prev) => {
      prev[ind] = {
        ...prev[ind],
        [e.target.name]: e.target.checked ? 1 : 0,
      };
      return prev;
    });
    setRerenderTrigger((prev) => prev + 1);
  };

  const handleEmployeeChangesSave = (e, ind) => {
    setLoading((prev) => prev + 1);
    axios
      .put(`${API_ROUTE}/v1/employee/`, employees[ind])
      .then((res) => {
        toast.dismiss();
        toast.success("تم تعديل الصلاحيات بنجاح");
        setLoading((prev) => prev - 1);
      })
      .catch((err) => {
        setLoading((prev) => prev - 1);
        if (err && err.code === "ERR_BAD_REQUEST") {
          return;
        }
        toast.dismiss();
        return toast("حدث خطأ");
      });
  };



  return (
    <div className="pt-16 flex flex-row w-screen h-screen overflow-x-hidden">
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

        <div className="text-4xl font-bold w-[300px] mr-20 mt-10">
          تعديل الصلاحيات
        </div>

        <div className="mt-10 mx-10 mb-16">
          <div className="flex flex-col gap-10  bg-slate-100 p-4    border border-slate-200 shadow-md">
            {employees.map((employee, index) => (
              <>
                <div
                  key={`${employee.id}-empdtacrd`}
                  className="flex flex-col bg-slate-50 hover:cursor-pointer"
                  onClick={(e) => handleEmployeeClick(e, index)}
                >
                  <div className="flex gap-20">
                    <div className="flex gap-2">
                      <span>الاسم: </span>
                      <span>{employee.name}</span>
                    </div>
                    <div className="flex gap-2">
                      <span>اسم المستخدم: </span>
                      <span>{employee.username}</span>
                    </div>
                  </div>
                </div>

                <div
                  className={`${
                    open[index] ? "flex bg-slate-50 -mt-10" : "hidden"
                  }`}
                >
                  <div className="flex flex-col">
                    <div className="flex flex-col gap-7  mb-4 mt-2">
                      <label className=" mr-20 font-bold text-2xl">
                        الصلاحيات :
                      </label>
                      <div className="flex gap-5">
                        <div className="flex">
                          <label className="text-xl">سوبر ادمن</label>
                          <input
                            type="checkbox"
                            name="superAdmin"
                            value={employees[index].superAdmin}
                            checked={Boolean(employees[index].superAdmin)}
                            onChange={(e) => handleEmployeeChange(e, index)}
                            disabled={!editable}
                            required
                            className="mr-1"
                          />
                        </div>

                        <div className="flex">
                          <label className="text-xl">تعديل بينات الطلاب</label>
                          <input
                            type="checkbox"
                            name="editStudentData"
                            value={employees[index].editStudentData}
                            checked={Boolean(employees[index].editStudentData)}
                            onChange={(e) => handleEmployeeChange(e, index)}
                            disabled={!editable}
                            required
                            className="mr-1"
                          />
                        </div>

                        <div className="flex">
                          <label className="text-xl">
                            قبول و رفض طلبات الانترنت
                          </label>
                          <input
                            type="checkbox"
                            name="applicationApprovals"
                            value={employees[index].applicationApprovals}
                            checked={Boolean(
                              employees[index].applicationApprovals
                            )}
                            onChange={(e) => handleEmployeeChange(e, index)}
                            disabled={!editable}
                            required
                            className="mr-1"
                          />
                        </div>

                        <div className="flex">
                          <label className="text-xl">تسكين الطلاب</label>
                          <input
                            type="checkbox"
                            name="houseStudents"
                            value={employees[index].houseStudents}
                            checked={Boolean(employees[index].houseStudents)}
                            onChange={(e) => handleEmployeeChange(e, index)}
                            disabled={!editable}
                            required
                            className="mr-1"
                          />
                        </div>

                        <div className="flex">
                          <label className="text-xl">اخلاء الطلاب</label>
                          <input
                            type="checkbox"
                            name="unHouseStudents"
                            value={employees[index].unHouseStudents}
                            checked={Boolean(employees[index].unHouseStudents)}
                            onChange={(e) => handleEmployeeChange(e, index)}
                            disabled={!editable}
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
                            value={employees[index].managePenalties}
                            checked={Boolean(employees[index].managePenalties)}
                            onChange={(e) => handleEmployeeChange(e, index)}
                            disabled={!editable}
                            required
                            className="mr-1"
                          />
                        </div>

                        <div className="flex">
                          <label className="text-xl">رفد الطلاب</label>
                          <input
                            type="checkbox"
                            name="suspendStudent"
                            value={employees[index].suspendStudent}
                            checked={Boolean(employees[index].suspendStudent)}
                            onChange={(e) => handleEmployeeChange(e, index)}
                            disabled={!editable}
                            required
                            className="mr-1"
                          />
                        </div>

                        <div className="flex">
                          <label className="text-xl">غياب الطلاب</label>
                          <input
                            type="checkbox"
                            name="manageAbscence"
                            value={employees[index].manageAbscence}
                            checked={Boolean(employees[index].manageAbscence)}
                            onChange={(e) => handleEmployeeChange(e, index)}
                            disabled={!editable}
                            required
                            className="mr-1"
                          />
                        </div>

                        <div className="flex">
                          <label className="text-xl">مصاريف الطلاب</label>
                          <input
                            type="checkbox"
                            name="manageStudentFees"
                            value={employees[index].manageStudentFees}
                            checked={Boolean(
                              employees[index].manageStudentFees
                            )}
                            onChange={(e) => handleEmployeeChange(e, index)}
                            disabled={!editable}
                            required
                            className="mr-1"
                          />
                        </div>

                        <div className="flex">
                          <label className="text-xl">حجب الوجبات</label>
                          <input
                            type="checkbox"
                            name="manageBlockMeals"
                            value={employees[index].manageBlockMeals}
                            checked={Boolean(employees[index].manageBlockMeals)}
                            onChange={(e) => handleEmployeeChange(e, index)}
                            disabled={!editable}
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
                            value={employees[index].uploadStudentImages}
                            checked={Boolean(
                              employees[index].uploadStudentImages
                            )}
                            onChange={(e) => handleEmployeeChange(e, index)}
                            disabled={!editable}
                            required
                            className="mr-1"
                          />
                        </div>

                        <div className="flex">
                          <label className="text-xl">
                            تعديل مواعيد التقديم
                          </label>
                          <input
                            type="checkbox"
                            name="editApplicationDates"
                            value={employees[index].editApplicationDates}
                            checked={Boolean(
                              employees[index].editApplicationDates
                            )}
                            onChange={(e) => handleEmployeeChange(e, index)}
                            disabled={!editable}
                            required
                            className="mr-1"
                          />
                        </div>

                        <div className="flex">
                          <label className="text-xl">
                            تعديل تعليمات التقديم
                          </label>
                          <input
                            type="checkbox"
                            name="editInstructions"
                            value={employees[index].editInstructions}
                            checked={Boolean(employees[index].editInstructions)}
                            onChange={(e) => handleEmployeeChange(e, index)}
                            disabled={!editable}
                            required
                            className="mr-1"
                          />
                        </div>

                        <div className="flex">
                          <label className="text-xl">رفع الوجبات المسلمه</label>
                          <input
                            type="checkbox"
                            name="uploadMeals"
                            value={employees[index].uploadMeals}
                            checked={Boolean(employees[index].uploadMeals)}
                            onChange={(e) => handleEmployeeChange(e, index)}
                            disabled={!editable}
                            required
                            className="mr-1"
                          />
                        </div>

                        <div className="flex">
                          <label className="text-xl">
                            تعديل انواع المصاريف
                          </label>
                          <input
                            type="checkbox"
                            name="editFees"
                            value={employees[index].editFees}
                            checked={Boolean(employees[index].editFees)}
                            onChange={(e) => handleEmployeeChange(e, index)}
                            disabled={!editable}
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
                            value={employees[index].editHousingResources}
                            checked={Boolean(
                              employees[index].editHousingResources
                            )}
                            onChange={(e) => handleEmployeeChange(e, index)}
                            required
                            disabled={!editable}
                            className="mr-1"
                          />
                        </div>

                        <div className="flex">
                          <label className="text-xl">تنسيق الطلاب</label>
                          <input
                            type="checkbox"
                            name="studentEvaluation"
                            value={employees[index].studentEvaluation}
                            checked={Boolean(
                              employees[index].studentEvaluation
                            )}
                            onChange={(e) => handleEmployeeChange(e, index)}
                            required
                            disabled={!editable}
                            className="mr-1"
                          />
                        </div>

                        <div className="flex">
                          <label className="text-xl">غسل النظام</label>
                          <input
                            type="checkbox"
                            name="systemWash"
                            value={employees[index].systemWash}
                            checked={Boolean(employees[index].systemWash)}
                            onChange={(e) => handleEmployeeChange(e, index)}
                            disabled={!editable}
                            required
                            className="mr-1"
                          />
                        </div>
                      </div>
                      <div className="flex gap-5"></div>
                    </div>
                    {Boolean(permissions.superAdmin) && (
                      <button
                        className="bg-blue-600 w-40 h-10 rounded hover:opacity-70 text-white font-bold transition-all duration-200 mb-4 -mt-4"
                        onClick={(e) => handleEmployeeChangesSave(e, index)}
                      >
                        حفظ
                      </button>
                    )}
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>

        {Boolean(permissions.superAdmin) && (
          <>
            <div className="text-4xl font-bold w-[300px] mr-20">
              انشاء مستخدم جديد
            </div>
            <div className="mx-10 mt-10   flex flex-col gap-4 bg-slate-100 shadow-md border-slate-200 p-2 py-10">
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
              <div className="flex flex-col gap-7  mr-16 mt-2">
                <label className=" font-bold text-2xl">الصلاحيات :</label>
                <div className="flex gap-5">
                  <div className="flex">
                    <label className="text-xl">سوبر ادمن</label>
                    <input
                      type="checkbox"
                      name="superAdmin"
                      value={formData.superAdmin}
                      checked={Boolean(formData.superAdmin)}
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
                      checked={Boolean(formData.editStudentData)}
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
                      checked={Boolean(formData.applicationApprovals)}
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
                      checked={Boolean(formData.houseStudents)}
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
                      checked={Boolean(formData.unHouseStudents)}
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
                      checked={Boolean(formData.managePenalties)}
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
                      checked={Boolean(formData.suspendStudent)}
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
                      checked={Boolean(formData.manageAbscence)}
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
                      checked={Boolean(formData.manageStudentFees)}
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
                      checked={Boolean(formData.manageBlockMeals)}
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
                      checked={Boolean(formData.uploadStudentImages)}
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
                      checked={Boolean(formData.editApplicationDates)}
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
                      checked={Boolean(formData.editInstructions)}
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
                      checked={Boolean(formData.uploadMeals)}
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
                      checked={Boolean(formData.editFees)}
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
                      checked={Boolean(formData.editHousingResources)}
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
                      checked={Boolean(formData.studentEvaluation)}
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
                      checked={Boolean(formData.systemWash)}
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
                    className="font-bold text-white text-xl bg-blue-700 hover:opacity-70 hover:pointer transition-all duration-200 w-20 h-10 rounded-md mb-10 -mt-10"
                    onClick={handleSaveClick}
                  >
                    حفظ
                  </button>
                }
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CreateEmployee;
