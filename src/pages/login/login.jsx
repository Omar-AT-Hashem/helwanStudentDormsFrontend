import mainImage from "../../assets/login/loginMainImage.jpeg";
import axios from "axios";
import { API_ROUTE } from "../../config/env.js";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Navbar } from "../../components/shared/Navbar.jsx";
import { Link, useNavigate } from "react-router-dom";
import logoImg from "../../assets/login/logo-removebg.png";

export default function Login() {
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [loginLoading, setLoginLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, password } = loginForm;
    if (!username || !password) {
      toast.dismiss();
      return toast("Enter the username and password");
    }

    setLoginLoading(true);

    try {
      const response = await axios.post(`${API_ROUTE}/v1/login`, loginForm);
      console.log(response);
      if (response.status == 200) {
        setLoginLoading(false);
        const { id, username, name, token, userType } = response.data;
        sessionStorage.setItem("id", id);
        sessionStorage.setItem("username", username);
        sessionStorage.setItem("name", name);
        sessionStorage.setItem("token", token);
        if (userType === "admin") {
          navigate("/admin/home");
        } else if (userType === "student") {
          sessionStorage.setItem("nationalId", response.data.nationalId);
          navigate("/student/profile");
        }
      }
    } catch (error) {
      console.log(error.response.status);
      if (error.response.status == 401) {
        setLoginLoading(false);
        toast.dismiss();
        return toast("Your username or password are incorrect");
      } else if (error.response.status == 500) {
        setLoginLoading(false);
        toast.dismiss();
        return toast("Something went wrong");
      }
    }
  };

  return (
    <>
      <Toaster
        toastOptions={{
          className: "",
          style: {
            border: "1px solid #0c4a6e",
            backgroundColor: "#0c4a6e",
            padding: "16px",
            color: "white",
            fontWeight: "Bold",
            marginTop: "65px",
            textAlign: "center",
          },
        }}
      />

      <div className="flex w-full h-screen">
        <div className="hidden  relative w-1/2 h-full lg:flex items-center justify-center bg-gray-200">
          <img
            className=" w-60 h-60 rounded-xl bg-mainBlue animate-none"
            src={logoImg}
            alt=""
          />
          <div className="w-full h-1/3 absolute bottom-0 bg-white/10 backdrop-blur-lg" />
        </div>

        <div className="w-full flex items-center justify-center lg:w-2/3 bg-gray-100">
          <form
            className="w-9/12 max-w-[700px] px-10 py-20 rounded-3xl bg-white border-2 border-gray-100"
            onSubmit={handleSubmit}
          >
            <h2 className="text-4xl  text-center  font-semibold">
              جامعه حلوان لإداره المدن الجامعيه
            </h2>
            <div className="mt-8">
              <div className="flex flex-col ">
                <label className="text-lg font-medium flex  justify-end ">
                  اسم المستخدم
                </label>

                <input
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent "
                  name="username"
                  value={loginForm.username}
                  onChange={handleInputChange}
                  type="text"
                  placeholder="ادخل اسم المستخدم"
                />
              </div>

              <div className="flex flex-col mt-4">
                <label className="text-lg font-medium flex  justify-end">
                  كلمه المرور
                </label>
                <input
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent "
                  type="password"
                  name="password"
                  value={loginForm.password}
                  onChange={handleInputChange}
                  placeholder="ادخل كلمه المرور"
                />
              </div>
              <div className="mt-8 flex flex-col gap-y-4">
                <button className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 bg-mainBlue rounded-xl text-white font-bold text-lg">
                  تسجيل الدخول
                </button>
              </div>
              <div className="flex flex-row-reverse mt-9 ">
                <p className="text-xl  font-semibold  flex  justify-end lg:w-3/4 ">
                  تقديم الطلاب للمدن الجامعيه{" "}
                </p>
                <button className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform w-20 h-10 bg-mainBlue rounded-md text-white font-semibold text-center">
                  استمرار
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
