import { useEffect, useState } from "react";
import { API_ROUTE } from "../../config/env.js";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Loading from "../../components/minicomponent/Loading.jsx";

export const AssessStudents = () => {
  if (sessionStorage.getItem("token")) {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${sessionStorage.getItem("token")}`;
  }

  const [loading, setLoading] = useState(0);
  const [metaData, setMetaData] = useState();

  const [permissions, setPermissions] = useState([
    {
      creating: 0,
      reading: 0,
      updating: 0,
      deleting: 0,
      creatingEmployee: 0,
    },
  ]);
  useEffect(() => {
    axios
      .get(
        `${API_ROUTE}/v1/employee/permissions/${sessionStorage.getItem("id")}`
      )
      .then((res) => {
        setPermissions(res.data);
      })
      .catch(() => {
        return;
      });
  }, []);

  useEffect(() => {
    setLoading((prev) => prev + 1);
    axios
      .get(`${API_ROUTE}/v1/student/meta`)
      .then((res) => {
        setLoading((prev) => prev - 1);
        setMetaData(res.data);
      })
      .catch(() => {
        setLoading((prev) => prev - 1);
        toast.dismiss();
        toast("حدث خطا");
      });
  }, []);

  const assess = () => {
    setLoading((prev) => prev + 1);
    axios
      .put(`${API_ROUTE}/v1/student/assess-students`)
      .then(() => {
        //handle Logs
        axios.post(`${API_ROUTE}/v1/log`, {
          adminId: sessionStorage.getItem("id"),
          adminName: sessionStorage.getItem("name"),
          adminUsername: sessionStorage.getItem("username"),
          action: `بدأ تنسيق الطلاب`,
          objectId: "فارغ",
          objectName: "فارغ",
        });
        setLoading((prev) => prev - 1);
        toast.dismiss();
        toast("تم تنسيق الطلاب بنجاح");
      })
      .catch(() => {
        setLoading((prev) => prev - 1);
        toast.dismiss();
        toast("حدث خطا");
      });
  };

  // State to store the selected student's data
  return (
    <div className="pt-36 flex flex-col gap-10 w-full h-screen items-center">
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

      {metaData && permissions.reading == 1 && (
        <div className="flex flex-col">
          <span>عدد الطلاب المتقدمين:{metaData.applicantMalesCount}</span>
          <span>عدد الطالبات المتقدمات:{metaData.applicantFemalesCount}</span>
          <span>عدد الطلاب الاجمالي:{metaData.totalApplicants}</span>
        </div>
      )}

      <div className="">
        {permissions.updating == 1 && (
          <button
            className="w-40 h-10 bg-green-600 rounded-md hover:opacity-70 transition-all duration-200  hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500"
            onClick={assess}
          >
            بدأ التنسيق
          </button>
        )}
      </div>
    </div>
  );
};
