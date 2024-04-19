import { useEffect, useState } from "react";
import axios from "axios";
import { API_ROUTE } from "../../config/env";
import Loading from "../../components/minicomponent/Loading";
import toast, { Toaster } from "react-hot-toast";
import QRCode from "react-qr-code";
import universityLogo from "../../assets/auxillary/helwanLogoNoBg.png";

import { useCallback, useRef } from "react";
import { toPng } from "html-to-image";

const MealRecievingCard = () => {
  if (sessionStorage.getItem("token")) {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${sessionStorage.getItem("token")}`;
  }
  
  const [studentData, setStudentData] = useState();
  const [loading, setLoading] = useState(0);

  
  const ref = useRef(null);

  const onButtonClick = useCallback(
    (nationalId) => {
      if (ref.current === null) {
        return;
      }

      toPng(ref.current, { cacheBust: true })
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.download = `${nationalId}-card.png`;
          link.href = dataUrl;
          link.click();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [ref]
  );

  useEffect(() => {
    setLoading((prev) => prev + 1);
    axios
      .get(
        `${API_ROUTE}/v1/student/get-by-nationalId/${sessionStorage.getItem(
          "nationalId"
        )}`
      )
      .then((res) => {
        setStudentData(res.data[0]);
        setLoading((prev) => prev - 1);
      })
      .catch((err) => {
        setLoading((prev) => prev - 1);
        toast.dismiss();
        toast("Something went wrong");
      });
  }, []);

  return (
    <div className="pt-20">
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
      {studentData && (
         <div key={`${studentData.id}-recieveCard`} className="flex flex-col items-center mt-20">
         <div
           className=" w-[650px] border-x-[12px] border-y-[15px] border-mainBlue "
           ref={ref}
         >
           <div className="w-full flex flex-col ">
             <div className="flex items-center gap-10 w-full  -mt-2  bg-mainBlue">
               <img src={universityLogo} alt="" className="h-14 " />
               <span className="text-white font-bold text-3xl">
                 كارنيه استلام الوجبات - جامعة حلوان
               </span>
             </div>
             <div className="flex justify-between items-center p-4  bg-white ">
               <img
                 src={studentData.image ? studentData.image : "/default-photo.jpg"}
                 alt=""
                 className="h-36 mr-[4px]"
               />

               <div className="flex flex-col text-xl bg-white">
                 <div>الرقم القومي: {studentData.nationalId}</div>
                 <div>الاسم: {studentData.name}</div>
                 <div>المرحلة: {studentData.academicYear}</div>
                 <div>المسلسل: {studentData.serialNumber}</div>
               </div>
               {/* <img
             src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${student.serialNumber}`}
             alt="recieve card"
             className="h-36"
           /> */}
               <QRCode
                 value={`${studentData.serialNumber}`}
                 style={{ height: "144px", marginLeft: "-52px" }}
               />
             </div>
           </div>
         </div>
         <button onClick={() => onButtonClick(studentData.nationalId)} className="mt-3 text-2xl bg-orange-500 w-[100px] h-[40px] rounded text-white font-bold transition-all duration-200 hover:opacity-70">
           تحميل
         </button>
       </div>
      )}
    </div>
  );
};

export default MealRecievingCard;
