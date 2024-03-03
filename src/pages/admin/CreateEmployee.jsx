import { useEffect, useState } from "react";
import { API_ROUTE } from "../../config/env.js";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Loading from "../../components/minicomponent/Loading.jsx";
import { CloudFog } from "lucide-react";

const CreateEmployee = () => {
  if (sessionStorage.getItem("token")) {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${sessionStorage.getItem("token")}`;
  }

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
    creating: 0,
    updating: 0,
    deleting: 0,
    reading: 0,
    creatingEmployee: 0,
  });
  const [loading, setLoading] = useState(0);

  console.log(formData);

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
    setLoading((prev) => prev + 1);
    if (
      formData.name != "" &&
      formData.username != "" &&
      formData.password != "" &&
      formData.confirmPassword != ""
    ) {
      if (formData.password === formData.confirmPassword) {
        axios
          .post(`${API_ROUTE}/v1/employee/register`, {
            name: formData.name,
            username: formData.username,
            password: formData.password,
            creating: formData.creating,
            updating: formData.updating,
            deleting: formData.deleting,
            reading: formData.reading,
            creatingEmployee: formData.creatingEmployee,
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
              creating: 0,
              updating: 0,
              deleting: 0,
              reading: 0,
              creatingEmployee: 0,
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
          انشاء حساب موظف - جامعة حلوان
        </div>

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
          <div className="flex gap-7 items-center mb-4 mt-2">
            <label className=" mr-20 font-bold text-2xl">الصلاحيات :</label>
            <div className="flex gap-5">
              <div className="flex">
                <label className="text-xl">القرأه:</label>
                <input
                  type="checkbox"
                  name="reading"
                  value={formData.reading}
                  onChange={handleChange}
                  required
                  className="mr-1"
                />
              </div>

              <div className="flex">
                <label className="text-xl">الاضافه:</label>
                <input
                  type="checkbox"
                  name="creating"
                  value={formData.creating}
                  onChange={handleChange}
                  required
                  className="mr-1"
                />
              </div>

              <div className="flex">
                <label className="text-xl">التعديل:</label>
                <input
                  type="checkbox"
                  name="updating"
                  value={formData.updating}
                  onChange={handleChange}
                  required
                  className="mr-1"
                />
              </div>
            </div>

            <div className="flex gap-5">
              <div className="flex">
                <label className="text-xl">الحذف:</label>
                <input
                  type="checkbox"
                  name="deleting"
                  value={formData.deleting}
                  onChange={handleChange}
                  required
                  className="mr-1"
                />
              </div>

              <div className="flex">
                <label className="text-xl">انشاء موظف:</label>
                <input
                  type="checkbox"
                  name="creatingEmployee"
                  value={formData.creatingEmployee}
                  onChange={handleChange}
                  required
                  className="mr-1"
                />
              </div>
            </div>
          </div>
          <div className="mr-32 mt-5">
            <button
              className="font-bold text-white text-xl bg-blue-700 hover:opacity-70 hover:pointer transition-all duration-200 w-20 h-10 rounded-md"
              onClick={handleSaveClick}
            >
              حفظ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEmployee;
