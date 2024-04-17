import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import logoImg from "../../assets/login/logo-removebg.png";
import { StudentSlider } from "./StudentSlider";
import { useNavigate } from "react-router-dom";

export default function StudentNavbar() {
  const [studentSliderOpen, setStudentSliderOpen] = useState(false);
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const handleStudentSlider = () => {
    setStudentSliderOpen(!studentSliderOpen);
  };

  useEffect(() => {
    sessionStorage.getItem("nationalId")
      ? setLoggedIn(true)
      : setLoggedIn(false);
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    setLoggedIn(false);
    navigate("/");
    navigate(0);
  };

  return (
    <div className="ltr-local">
      <nav className="bg-mainBlue h-20 fixed w-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className=" items-center  justify-between h-17">
            <div className="flex items-center flex-row-reverse h-full">
              <div className="flex-shrink-0 flex ">
                <h2 className="text-sm text-white	mt-7 font-semibold	italic">
                  {" "}
                  لإدارة المدن الجامعية{" "}
                </h2>
                <img
                  className="h-20 w-20  bg-mainBlue"
                  src={logoImg}
                  alt="logo"
                />
              </div>
              <div className="hidden md:block">
                <div className="mr-10 w-2/3 flex items-baseline flex-row-reverse space-x-4">
                  <button
                    onClick={handleStudentSlider}
                    className=" hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    بيانات الطلاب
                  </button>
                </div>
              </div>
              {loggedIn && (
                <div className="flex-1">
                  <div
                    className="space-y-3 text-white w-fit  hover:cursor-pointer hover:bg-mainYellow p-2 transition-all duration-200"
                    onClick={handleLogout}
                  >
                    تسجيل الخروج
                  </div>
                </div>
              )}
            </div>

            <div
              className={`absolute top-20 transition-all duration-200 ${
                studentSliderOpen ? "right-[0%]" : "right-[-100%]"
              }`}
            >
              <StudentSlider />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
