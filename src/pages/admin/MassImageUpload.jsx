import { useEffect, useState } from "react";
import MainSideBar from "../../components/minicomponent/MainSideBar";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { API_ROUTE } from "../../config/env.js";
import Loading from "../../components/minicomponent/Loading.jsx";

const MassImageUpload = () => {
  if (sessionStorage.getItem("token")) {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${sessionStorage.getItem("token")}`;
  }

  const [files, setFiles] = useState(null);
  const [loading, setLoading] = useState(0);

  const handleFileChange = async (event) => {
    setFiles(event.target.files);
    console.log(event.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Array.prototype.forEach.call(files, (file) => {
      const fileName = file.name.split(".")[0];
      setLoading((prev) => prev + 1);
      axios
        .get(`${API_ROUTE}/v1/student/get-by-nationalId/${fileName}`)
        .then((res) => {
          setLoading((prev) => prev - 1);
          if (res.data.length > 0) {
            const formData = new FormData();
            formData.append("image", file);
            setLoading((prev) => prev + 1);
            axios
              .post(`${API_ROUTE}/v1/student/mass-image-upload`, formData)
              .then((res) => {
                setLoading((prev) => prev - 1);
              })
              .catch((err) => {
                setLoading((prev) => prev - 1);
              });
          }
        });
    });

    axios.post(`${API_ROUTE}/v1/log`, {
      adminId: sessionStorage.getItem("id"),
      adminName: sessionStorage.getItem("name"),
      adminUsername: sessionStorage.getItem("username"),
      action: "تم رفع صور الطلاب",
      objectId: "فارغ",
      objectName: "فارغ",
    });
    toast.dismiss();
    toast.success("تم رفع صور الطلاب بنجاح");
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
          رفع صور الطلاب - جامعة حلوان
        </div>

        <div className="w-full h-full flex items-center justify-center flex-col gap-10">
          <input
            className="bg-slate-500 text-white px-4 py-2 rounded hover:opacity-70 transition-all duration-200 hover:cursor-pointer"
            onChange={handleFileChange}
            type="file"
            multiple
          />
          <button
            onClick={handleSubmit}
            className="bg-green-500 text-white px-4 py-2 rounded hover:opacity-70 transition-all duration-200 hover:cursor-pointer"
          >
            {" "}
            رفع الصور
          </button>
        </div>
      </div>
    </div>
  );
};

export default MassImageUpload;
