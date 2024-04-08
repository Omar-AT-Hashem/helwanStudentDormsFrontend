import { useEffect, useState } from "react";
import MainSideBar from "../minicomponent/MainSideBar.jsx";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { API_ROUTE } from "../../config/env.js";
import Loading from "../minicomponent/Loading.jsx";

const AbsenceReport = () => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    fromDate: "",
    toDate: "",
    gender: "",
    faculty: "",
  });
  const [faculties, setFaculties] = useState([]);
  const [open, setOpen] = useState(Array(20).fill(0));
  const [rerenderTrigger, setRerenderTrigger] = useState(0);
  const [loading, setLoading] = useState(0);



  useEffect(() => {
    axios
      .get(`${API_ROUTE}/v1/university-structure/get-faculties`)
      .then((res) => {
        setFaculties(res.data);
        return;
      })
      .catch((err) => {
        toast.dismiss();
        toast("حدث خطأ");
        return;
      });
  }, []);

  const handleChange = (e) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleStudentClick = (e, ind) => {
    setOpen((prev) => {
      prev[ind] = prev[ind] ? 0 : 1;
      return prev;
    });
    setRerenderTrigger((prev) => prev + 1);
  };

  const handleDisplayClick = (e) => {
    e.preventDefault();
    setLoading((prev) => prev + 1);
    axios
      .post(`${API_ROUTE}/v1/absence/student-absence`, filters)
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

        <div id="faculty-field-container" className="flex gap-3">
          <label htmlFor="faculty" className="font-bold text-xl">
            الكلية:
          </label>
          <select
            name="faculty"
            className="text-xl w-[200px] h-[30px] bg-neutral-100 border border-slate-800 rounded mr-2"
            onChange={handleChange}
          >
            <option>-----</option>
            {faculties.map((fac) => (
              <option key={`rep-pen-fac-${fac.id}`} value={fac.name}>
                {fac.name}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="fromDate" className="font-bold text-xl">
          من:
          <input name="fromDate" type="date" onChange={handleChange} />
        </label>
        <label htmlFor="fromDate" className="font-bold text-xl">
          الى:
          <input name="toDate" type="date" onChange={handleChange} />
        </label>

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
        {data.map((student, studentInd) => (
          <div
            key={`rep-pen-stddta-${student.id}`}
            className="bg-neutral-100 p-2 hover:cursor-pointer"
            onClick={(e) => handleStudentClick(e, studentInd)}
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
            <div
              id="bottom-row-container"
              className={`pr-24 ${
                open[studentInd] ? "flex flex-col gap-2" : "hidden"
              }`}
            >
              {student.absence.map((ele) => (
                <div key={`rep-abs-${ele.id}`} className={`bg-zinc-100`}>
                  <div id="label-field-container" className="flex gap-2">
                    <span> السبب: </span>
                    <span>{ele.reason}</span>
                  </div>
                  <div id="label-field-container" className="flex gap-2">
                    <span>من: </span>
                    <span>
                      {ele.fromDate
                        .split("T")[0]
                        .split("-")
                        .reverse()
                        .join("-")}
                    </span>
                  </div>

                  <div id="label-field-container" className="flex gap-2">
                    <span>الى: </span>
                    <span>
                      {ele.toDate.split("T")[0].split("-").reverse().join("-")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AbsenceReport;
