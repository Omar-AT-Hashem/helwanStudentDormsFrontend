import { useEffect, useState } from "react";
import axios from "axios";
import { API_ROUTE } from "../../config/env";
import Loading from "../../components/minicomponent/Loading";
import toast, { Toaster } from "react-hot-toast";

function ApplicationReview() {
  if (sessionStorage.getItem("token")) {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${sessionStorage.getItem("token")}`;
  }

  const [loading, setLoading] = useState(0);

  const [applicationStatus, setApplicationStatus] = useState();

  useEffect(() => {
    setLoading((prev) => prev + 1);
    axios
      .get(
        `${API_ROUTE}/v1/student/get-by-nationalId/${sessionStorage.getItem(
          "nationalId"
        )}`
      )
      .then((res) => {
        setLoading((prev) => prev - 1);

        if (res.data[0].isApproved == -1) {
          setApplicationStatus("تم رفض الطلب");
        } else if (res.data[0].isApproved == 0) {
          setApplicationStatus("الطلب قيد المراجعة");
        } else if (res.data[0].isApproved == 1 && res.data[0].isAccepted == 0) {
          setApplicationStatus(" تم قبول الطلب. لم تظهر نتيجه التنسيق بعد");
        } else if (res.data[0].isApproved == 1 && res.data[0].isAccepted == 1) {
          setApplicationStatus("تم القبول في التنسيق بنجاح");
        } else if (res.data[0].isAccepted == -1) {
          setApplicationStatus("تم الرفض في التنسيق");
        }
      })
      .catch((err) => {
        if (err && err.code === "ERR_BAD_REQUEST") {
          setLoading((prev) => prev - 1);
          return;
        }
        toast.dismiss();
        toast("Something went wrong");
      });
  }, []);

  return (
    <div className="pt-20 ">
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
      <div className="m-auto flex items-center justify-center w-[500px] h-[70px] border-2 border-black mt-[100px]">
        <div>
          <span className="text-2xl font-bold"> حاله الطلب :</span>{" "}
          <span className="text-2xl font-bold text-mainBlue">
            {applicationStatus}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ApplicationReview;
