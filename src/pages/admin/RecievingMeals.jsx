import { useEffect, useState } from "react";
import MainSideBar from "../../components/minicomponent/MainSideBar";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { API_ROUTE } from "../../config/env.js";
import csvtojson from "csvtojson";

const RecievingMeals = () => {
  const [file, setFile] = useState(null);
  console.log(file);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setFile(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("recievedMeals", file);
    axios
      .post(`${API_ROUTE}/v1/recieved-meal/recieve-meals`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        toast.dismiss();
        toast.success("تم استلام الوجبات بنجاح");
      })
      .catch((err) => {
        console.log(err);
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
          <button
            onClick={handleSubmit}
            className="bg-green-500 text-white px-4 py-2 rounded hover:opacity-70 transition-all duration-200 hover:cursor-pointer"
          >
            {" "}
            رفع الملف Excel
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecievingMeals;
