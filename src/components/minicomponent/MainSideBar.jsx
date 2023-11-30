/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { API_ROUTE } from "../../config/env.js";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const MainSideBar = ({
  studentList,
  setStudentList,
  setSelectedStudentData,
}) => {
  // State variables for filters

  // State variable for search query

  const [filteredList, setFilteredList] = useState([]);
  const [filters, setFilters] = useState({ applicants: null });

  const searchClick = () => {
    axios
      .get(`${API_ROUTE}/v1/student/`)
      .then((res) => {
        setStudentList(res.data);
      })
      .catch((err) => {
        if (err && err.code === "ERR_BAD_REQUEST") {
          return;
        }
        toast.dismiss();
        toast("Something went wrong");
      });

    if (filters.applicants) {
      if (filters.applicants == "accepted") {
        setFilteredList(() => {
          const newArr = studentList.filter((ele) => ele.isAccepted == 1);
          return newArr;
        });
      } else if (filters.applicants == "applied") {
        setFilteredList(() => {
          const newArr = studentList.filter((ele) => ele.isAccepted == 0);
          return newArr;
        });
      }
    }
  };

  const chooseFilters = (e) => {
    setFilteredList(studentList);
    if (e.target.type == "radio") {
      if (e.target.name == "applicants") {
        setFilters((prev) => {
          return { ...prev, applicants: e.target.value };
        });
      }
    }
  };

  // Function to search for students by national ID

  return (
    <div className="flex flex-col w-64 z-30 mt-4 border h-full">
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
      <form className="mt-4 text-gray-200">
        <div className="m-1 text-gray-500">
          <label className="  text-gray-900" htmlFor="years">
            العام الدراسي{" "}
          </label>

          <select
            className=" mr-2 text-gray-500 border w-54"
            name="years"
            id="years"
          >
            <option className="text-gray-500" value="">
              2022-2023
            </option>
            <option value="">2023-2024</option>
          </select>
        </div>
        <div className="text-gray-500 m-1">
          <label className="ro text-gray-900" htmlFor="college">
            {" "}
            الكلية
          </label>

          <select
            className=" text-gray-500 mx-2 border"
            name="college"
            id="college"
          >
            <option value="">الحاسبات والذكاء الاصطناعي</option>
            <option value="">الاداب</option>
          </select>
        </div>
        {/* <div className=" text-gray-900">
          <input
            className="mx-2 "
            type="radio"
            id="inuniversity"
            name="checkInUniversity"
            value="inuniversity"
          ></input>
          <label htmlFor="inuniversity text-gray-900">طلاب الجامعة</label>

          <input
            className=" mx-2 "
            type="radio"
            id="outuniversity"
            name="checkInUniversity"
            value="outuniversity"
          ></input>
          <label htmlFor="outuniversity">من خارج الجامعة</label>
        </div> */}

        {/* <div className=" text-gray-900">
          <input
            className=" mx-2"
            type="radio"
            id="egyption"
            name="checkegyption"
            value="egyption"
          ></input>
          <label htmlFor="egyption">مصري</label>

          <input
            className=" mx-2 mr-10"
            type="radio"
            id="outegyption"
            name="checkegyption"
            value="outegyption"
          ></input>
          <label htmlFor="outegyption">وافد</label>
        </div> */}

        <div className=" text-gray-900">
          <input
            className=" mx-2"
            type="radio"
            id="applicants"
            name="applicants"
            value="applied"
            onChange={chooseFilters}
          ></input>
          <label htmlFor="applicants">متقدمين</label>

          <input
            className=" mx-2 mr-10"
            type="radio"
            id="applicants"
            name="applicants"
            value="accepted"
            onChange={chooseFilters}
          ></input>
          <label htmlFor="accepted">مقبولين</label>
        </div>
        <div className="text-gray-900 grid grid-cols-4 mt-4 mr-0">
          <input type="checkbox" id="old" name="old" value="old"></input>
          <label htmlFor="old"> قدامي</label>

          <input type="checkbox" id="new" name="new" value="new"></input>
          <label htmlFor="new"> جدد</label>

          <input
            type="checkbox"
            id="normal"
            name="normal"
            value="normal"
          ></input>
          <label htmlFor="normal"> سكن عادي</label>

          <input
            type="checkbox"
            id="special"
            name="special"
            value="special"
          ></input>
          <label htmlFor="special"> سكن مميز</label>

          <input
            type="checkbox"
            id="unstill"
            name="unstill"
            value="unstill"
          ></input>
          <label htmlFor="unstill"> غير ساكنين</label>

          <input type="checkbox" id="still" name="still" value="still"></input>
          <label htmlFor="still"> ساكنين</label>

          <input
            type="checkbox"
            id="evacution"
            name="evacution"
            value="evacution"
          ></input>
          <label htmlFor="evacution"> اخلاء</label>
        </div>
        {/* Search bar */}
        <div>
          <label className="text-gray-900 mr-3" htmlFor="nationalId">
            البحث بالرقم القومي
          </label>
          <input
            className="mt-0  border text-gray-500"
            type="text"
            id="nationalId"
            name="nationalId"
          />
          {/* Add a "Search" button */}
          <button
            className="text-slate-50 mr-2 px-1 border-2 rounded bg-mainBlue hover:bg-lime-900"
            type="button"
            onClick={searchClick}
          >
            بحث
          </button>
        </div>

        {/* Add a "تطبيق الفلتر" (Apply Filter) button */}
        {/* <button
          className="text-slate-50 mr-2 px-1 border-2 rounded bg-mainBlue hover:bg-lime-900"
          type="button"
        >
          تطبيق الفلتر
        </button> */}

        <div className="mr-5 mt-4 h-64 overflow-y-scroll border text-gray-500">
          <ul className="flex flex-col">
            {filteredList.map((student) => (
              <span
                key={`student-list-${student.id}`}
                className="text-slate-700 hover:cursor-pointer hover:bg-mainYellow"
                onClick={() => setSelectedStudentData(student)}
              >
                {student.name}
              </span>
            ))}
          </ul>
        </div>
      </form>
    </div>
  );
};

export default MainSideBar;
