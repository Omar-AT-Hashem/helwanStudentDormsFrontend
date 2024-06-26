import { useEffect, useState } from "react";
import MainSideBar from "../../components/minicomponent/MainSideBar";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { API_ROUTE } from "../../config/env.js";
import Loading from "../../components/minicomponent/Loading.jsx";

const RecievingMeals = () => {
  if (sessionStorage.getItem("token")) {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${sessionStorage.getItem("token")}`;
  }

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(0);
  const [permissions, setPermissions] = useState([
    {
      superAdmin: 0,
      uploadMeals: 0,
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
      })
      .catch(() => {
        setLoading((prev) => prev - 1);
        return;
      });
  }, []);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setFile(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("recievedMeals", file);
    setLoading((prev) => prev + 1);
    axios
      .post(`${API_ROUTE}/v1/recieved-meal/recieve-meals`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setLoading((prev) => prev - 1);
        axios.post(`${API_ROUTE}/v1/log`, {
          adminId: sessionStorage.getItem("id"),
          adminName: sessionStorage.getItem("name"),
          adminUsername: sessionStorage.getItem("username"),
          action: "تم استلام الوجبات",
          objectId: "فارغ",
          objectName: "فارغ",
        });
        toast.dismiss();
        toast.success("تم استلام الوجبات بنجاح");
      })
      .catch((err) => {
        setLoading((prev) => prev - 1);
        toast.dismiss();
        toast.error("حدث خطأ ما");
      });
  };
  return (
    <div className="pt-20 flex flex-row w-full h-screen ">
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
      {loading > 0 && <Loading />}
      <div className=" bg-white-900 flex-1 pr-2">
        <div className="  bg-sky-700 w-full h-10 text-fuchsia-50 text-center text-2xl">
          استلام الوجبات - جامعة حلوان
        </div>

        <div className="w-full h-full flex items-center justify-center flex-col gap-10">
          <input
            className="bg-slate-500 text-white px-4 py-2 rounded hover:opacity-70 transition-all duration-200 hover:cursor-pointer"
            onChange={handleFileChange}
            type="file"
          />
          {(Boolean(permissions.superAdmin) ||
            Boolean(permissions.uploadMeals)) && (
            <button
              onClick={handleSubmit}
              className="bg-green-500 text-white px-4 py-2 rounded hover:opacity-70 transition-all duration-200 hover:cursor-pointer"
            >
              {" "}
              رفع الملف Excel
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecievingMeals;
