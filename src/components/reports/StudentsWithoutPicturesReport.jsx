import { useEffect, useState } from "react";
import MainSideBar from "../minicomponent/MainSideBar.jsx";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { API_ROUTE } from "../../config/env.js";
import Loading from "../minicomponent/Loading.jsx";

const StudentsWithoutPicturesReport = () => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    gender: "",
  });
  const [faculties, setFaculties] = useState([]);
  const [open, setOpen] = useState(Array(20).fill(0));
  const [rerenderTrigger, setRerenderTrigger] = useState(0);
  const [loading, setLoading] = useState(0);

  const handleChange = (e) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleDisplayClick = (e) => {
    e.preventDefault();
    setLoading((prev) => prev + 1);
    axios
      .post(`${API_ROUTE}/v1/student/get-students-without-pictures`, filters)
      .then((res) => {
        setData(res.data);
        setOpen(Array(res.data.length).fill(0));
        setLoading((prev) => prev - 1);
      })
      .catch((err) => {
        setLoading((prev) => prev - 1);
        toast.dismiss();
        toast("حدث خطأ");
      });
  };

  return (
    <div
      id="main-container"
      className="min-h-[500px] p-5 bg-neutral-50 border shadow-lg shadow-slate-400 flex flex-col"
    >
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

      <div id="inputs-container" className="flex gap-14">
        <div id="gender-field-container" className="flex gap-3">
          <label htmlFor="gender" className="font-bold text-xl">
            النوع:
          </label>
          <select
            name="gender"
            className="text-xl w-[200px] h-[30px] bg-neutral-100 border border-slate-800 rounded mr-2"
            onChange={handleChange}
          >
            <option>-----</option>
            <option value="M">طلاب</option>
            <option value="F">طالبات</option>
          </select>
        </div>

        <button
          className="w-[100px] h-[35px] rounded bg-mainBlue text-white font-bold text-2xl transition-all hover:opacity-70"
          onClick={handleDisplayClick}
        >
          اعرض
        </button>
      </div>

      <div
        id="data-container"
        className="flex flex-col gap-4 h-[350px] overflow-y-scroll border mt-10 shadow-md "
      >
        {data.map((student) => (
          <div
            key={`rep-pen-stddta-${student.id}`}
            className="bg-neutral-100 p-2"
          >
            <div id="top-row-container" className="flex gap-5">
              <div id="label-field-container" className="flex gap-2">
                <span>اسم الطالب:</span>
                <span>{student.name}</span>
              </div>

              <div id="label-field-container" className="flex gap-2">
                <span>الرقم القومي:</span>
                <span>{student.nationalId}</span>
              </div>

              <div id="label-field-container" className="flex gap-2">
                <span>السنه الدراسيه: </span>
                <span>{student.academicYear}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentsWithoutPicturesReport;
