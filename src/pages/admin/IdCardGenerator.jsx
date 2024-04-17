import { useState, useEffect } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import Loading from "../../components/minicomponent/Loading";
import { API_ROUTE } from "../../config/env";
import QRCode from "react-qr-code";
import universityLogo from "../../assets/auxillary/helwanLogoNoBg.png";

import { useCallback, useRef } from "react";
import { toPng } from "html-to-image";

const IDCardGenerator = () => {
  const [studentDataList, setStudentDataList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [gender, setGender] = useState();
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

  const handleChange = (e) => {
    setGender(e.target.value);
  };

  const handleButtonClick = () => {
    if (gender) {
      setLoading((prev) => prev + 1);
      toast.dismiss();
      axios
        .get(`${API_ROUTE}/v1/student/get-by-gender/${gender}`)
        .then((res) => {
          setLoading((prev) => prev - 1);
          setFilteredList(res.data.filter((std) => std.isHoused == 1));
          return setStudentDataList(
            res.data.filter((std) => std.isHoused == 1)
          );
        })
        .catch((err) => {
          setLoading((prev) => prev - 1);
          if (err && err.code === "ERR_BAD_REQUEST") {
            return;
          }
          toast.dismiss();
          return toast("Something went wrong");
        });
    } else {
      toast.dismiss();
      toast("اخنار النوع");
    }
  };

  const handleSearchBarChange = (e) => {
    setFilteredList(
      studentDataList.filter((student) =>
        student.nationalId.includes(e.target.value)
      )
    );
  };

  return (
    <div className="pt-20">
      {loading > 0 && <Loading />}
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
      <div className="bg-sky-700 w-full h-10 text-fuchsia-50 text-center text-2xl">
        بطاقات استلام الوجبات - جامعة حلوان
      </div>
      <div className="flex gap-5 text-2xl mr-10 mt-5">
        <div className="flex">
          <span>طلاب</span>
          <input type="radio" name="gender" value="M" onChange={handleChange} />
        </div>
        <div className="flex">
          <span>طالبات</span>
          <input type="radio" name="gender" value="F" onChange={handleChange} />
        </div>
        <button
          className="bg-sky-700 w-40 h-10 text-fuchsia-50 text-center text-2xl hover:cursor-pointer hover:opacity-80 transition-all duration-200 rounded-sm"
          onClick={handleButtonClick}
        >
          عرض
        </button>
      </div>

      {studentDataList.length > 0 && (
        <div className="text-2xl font-bold m-auto w-[400px] mt-10">
          <label className="" htmlFor="adminUsernameSearch">
            البحث بالقم القومي:{" "}
          </label>
          <input
            type="text"
            name="adminUsernameSearch"
            id=""
            className="bg-slate-100 rounded border border-slate-500 shadow-md "
            onChange={handleSearchBarChange}
          />
        </div>
      )}

      <div className="mt-28 w-screen flex flex-wrap gap-16 m-10">
        {filteredList.map((student) => (
          <div key={`${student.id}-recieveCard`} className="flex flex-col items-center">
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
                    src={student.image ? student.image : "/default-photo.jpg"}
                    alt=""
                    className="h-36 mr-[4px]"
                  />

                  <div className="flex flex-col text-xl bg-white">
                    <div>الرقم القومي: {student.nationalId}</div>
                    <div>الاسم: {student.name}</div>
                    <div>المرحلة: {student.academicYear}</div>
                    <div>المسلسل: {student.serialNumber}</div>
                  </div>
                  {/* <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${student.serialNumber}`}
                alt="recieve card"
                className="h-36"
              /> */}
                  <QRCode
                    value={`${student.serialNumber}`}
                    style={{ height: "144px", marginLeft: "-52px" }}
                  />
                </div>
              </div>
            </div>
            <button onClick={() => onButtonClick(student.nationalId)} className="mt-3 text-2xl bg-orange-500 w-[100px] h-[40px] rounded text-white font-bold transition-all duration-200 hover:opacity-70">
              تحميل
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IDCardGenerator;
