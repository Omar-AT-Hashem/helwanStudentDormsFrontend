import mainImage from "../../assets/login/loginMainImage.jpeg";
import axios from "axios";
import { API_ROUTE } from "../../config/env.js";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Navbar } from "../../components/shared/Navbar";
import { useNavigate } from "react-router-dom";

export default function StudentLogin() {
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
      const response = await axios.post(
        `${API_ROUTE}/api/student/login`,
        loginForm
      );

      if (response.status == 200) {
        setLoginLoading(false);
        const { id, username, name, token } = response.data;
        sessionStorage.setItem("id", id);
        sessionStorage.setItem("username", username);
        sessionStorage.setItem("name", name);
        sessionStorage.setItem("token", token);
        navigate("/userprofile");
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
      <Navbar />
      <div className="grid grid-cols-1 md:grid-cols-2 h-screen w-full overscroll-none	">
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
        <div className="bg-mainBlue flex flex-col justify-center px-4">
          <form
            className="flex items-center max-w-[400px] w-full mx-auto bg-gray-500 p-8 px-8 rounded-lg 2xl:max-w-[600px] 2xl:h-[600px] text-right"
            onSubmit={handleSubmit}
          >
            <div className="w-full">
              <h2 className="text-4xl 2xl:text-6xl">تسجيل دخول</h2>
              <div className="flex flex-col text-slate-300 py-2 2xl:text-3xl">
                <label>اسم المستخدم</label>
                <input
                  className="loginLabel"
                  name="username"
                  type="text"
                  value={loginForm.username}
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex flex-col text-slate-300 py-2 2xl:text-3xl">
                <label>كلمه السر</label>
                <input
                  className="loginLabel"
                  type="password"
                  name="password"
                  value={loginForm.password}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex justify-between p-2">
                <button
                  disabled={loginLoading}
                  className="bg-mainYellow flex justify-center w-full my-5 py-2 hover:opacity-70 disabled:opacity-70 font-semibold rounded-lg text-slate-200 transition-all duration-200"
                >
                  {loginLoading ? (
                    <Loader2 className="animate-spin duration-200" />
                  ) : (
                    "تسجيل دخول"
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="hidden md:block">
          <img
            className="w-full h-full object-cover"
            src={mainImage}
            alt="Main image"
          />
        </div>
      </div>
    </>
  );
}
