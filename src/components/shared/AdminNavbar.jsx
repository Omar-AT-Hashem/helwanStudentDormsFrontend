import { useState } from "react";
// import { Link } from "react-router-dom";
import AdminSystemSlider from "./AdminSystemSlider";
// import AdminStudentSlider from './AdminStudentSlider';
import AdminStudentSlider from "./AdminStudentSlider";
import { Link, useNavigate } from "react-router-dom";
import logoImg from "../../assets/login/logo-removebg.png";

export const AdminNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
 
  const [studentSliderOpen, setStudentSliderOpen] = useState(false);
  const [adminSliderOpen, setAdminSliderOpen] = useState(false);

  const navigate = useNavigate();

  const handleStudentSlider = () => {
    setAdminSliderOpen(false);
    setStudentSliderOpen(!studentSliderOpen);
  };

  const handleAdminSlider = () => {
    setStudentSliderOpen(false);
    setAdminSliderOpen(!adminSliderOpen);
  };

  const handleLogout = async (e) => {
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <div className={`ltr-local`}>
      <nav className="bg-mainBlue h-20 fixed w-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className=" items-center  justify-between h-17">
            <div className="flex items-center flex-row-reverse">
              <div className="flex-shrink-0 flex ">
                <h2 className="text-sm text-white	mt-7 font-semibold	italic">
                  {" "}
                  لإدارة المدن الجامعية{" "}
                </h2>
                <img className="h-20 w-20  " src={logoImg} alt="logo" />
              </div>
              <div className="flex w-full justify-between ">
                <button
                  onClick={handleLogout}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  تسجيل الخروج
                </button>
                <div className="block ">
                  <div className="mr-10 w-2/3 flex items-baseline flex-row-reverse space-x-4">
                    <button
                      onClick={handleStudentSlider}
                      className=" hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      بيانات الطلاب
                    </button>

                    <button
                      onClick={handleAdminSlider}
                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      الإشراف على النظام
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`absolute top-20 transition-all duration-200 ${
            studentSliderOpen ? "right-[0%]" : "right-[-100%]"
          }`}
        >
          <AdminStudentSlider setStudentSliderOpen={setStudentSliderOpen} />
        </div>
        <div
          className={`absolute top-20 transition-all duration-200 ${
            adminSliderOpen ? "right-[0%]" : "right-[-100%]"
          }`}
        >
          <AdminSystemSlider />
        </div>
      </nav>
    </div>
  );
};

export default AdminNavbar;
