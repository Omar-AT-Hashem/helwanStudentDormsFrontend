/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { API_ROUTE } from "../../config/env.js";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Loading from "./Loading.jsx";

const MainSideBar = ({
  studentList,
  setStudentList,
  setSelectedStudentData,
}) => {
  // State variables for filters

  // State variable for search query
  const [loading, setLoading] = useState(0)
  const [search, setSearch] = useState("");
  const [filteredList, setFilteredList] = useState([]);
  const [filters, setFilters] = useState({
    isAccepted: null,
    gender: null,
    notHoused: false,
    housed: false,
  });

  console.log("rerender");

  useEffect(() => {
    if (search.length == 0) {
      setLoading(prev => prev + 1)
      axios
        .get(`${API_ROUTE}/v1/student/`)
        .then((res) => {
          const filtered = returnFilteredList(res.data, filters);
          setFilteredList(filtered.length > 0 ? filtered : []);
          setLoading(prev => prev - 1)
        })

        .catch((err) => {
          if (err && err.code === "ERR_BAD_REQUEST") {
            return;
          }
          toast.dismiss();
          toast("Something went wrong");
        });
    }
  }, [studentList]);

  const returnFilteredList = (list, filters) => {
    const { isAccepted, gender, notHoused, housed } = filters;

    let filtered = [];
    let overlayArray = [];
    filtered = list.filter(
      (ele) => ele.isAccepted == isAccepted && ele.gender == gender
    );
    overlayArray = filtered;

    if (!notHoused && !housed) {
      return filtered;
    }

    if (notHoused) {
      filtered.push(
        ...overlayArray.filter(
          (ele) =>
            ele.isAccepted == isAccepted &&
            ele.gender == gender &&
            ele.isHoused == 0 &&
            !filtered.includes(ele)
        )
      );
    } else if (!notHoused) {
      filtered = filtered.filter((ele) => ele.isHoused != 0);
    }

    if (housed) {
      filtered.push(
        ...overlayArray.filter(
          (ele) =>
            ele.isAccepted == isAccepted &&
            ele.gender == gender &&
            ele.isHoused == 1 &&
            !filtered.includes(ele)
        )
      );
    } else if (!housed) {
      filtered = filtered.filter((ele) => ele.isHoused != 1);
    }

    return filtered;
  };

  const searchClick = () => {
    if (search.length > 0) {
      setLoading(prev => prev + 1)
      axios
        .get(`${API_ROUTE}/v1/student/get-by-nationalId/${search}`)
        .then((res) => {
          setStudentList(res.data);
          setFilteredList(res.data.length > 0 ? res.data : []);
          setLoading(prev => prev - 1)
        })
        .catch((err) => {
          if (err && err.code === "ERR_BAD_REQUEST") {
            setLoading(prev => prev - 1)
            return;
          }
          toast.dismiss();
          toast("Something went wrong");
        });
      return;
    }
    setLoading(prev => prev + 1)
    axios
      .get(`${API_ROUTE}/v1/student/`)
      .then((res) => {
        setStudentList(res.data);
        setLoading(prev => prev - 1)

        //------------ start filter for applicants --------------
        const filtered = returnFilteredList(res.data, filters);
        setFilteredList(filtered.length > 0 ? filtered : []);

        //------------ end filter for applicants --------------
      })

      .catch((err) => {
        if (err && err.code === "ERR_BAD_REQUEST") {
          setLoading(prev => prev - 1)
          return;
        }
        toast.dismiss();
        toast("Something went wrong");
      });
  };

  const chooseFilters = (e) => {
    if (e.target.type == "radio") {
      setFilters((prev) => {
        return { ...prev, [e.target.name]: e.target.value };
      });

      const filtered = returnFilteredList(studentList, {
        ...filters,
        [e.target.name]: e.target.value,
      });
      setFilteredList(filtered.length > 0 ? filtered : []);
    }
  };

  const chooseSecondaryFilter = (e) => {
    if (e.target.type == "checkbox") {
      setFilters((prev) => {
        return { ...prev, [e.target.name]: e.target.checked ? true : false };
      });

      const filtered = returnFilteredList(studentList, {
        ...filters,
        [e.target.name]: e.target.checked ? true : false,
      });
      setFilteredList(filtered.length > 0 ? filtered : []);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // Function to search for students by national ID

  return (
    <div className="flex flex-col w-64 z-30 mt-4 border h-full">
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

        {/*------------ start filter for gender --------------*/}
        <div className=" text-gray-900">
          <input
            className=" mx-2"
            type="radio"
            id="gender"
            name="gender"
            value="M"
            onChange={chooseFilters}
          ></input>
          <label htmlFor="applicants">طلاب</label>

          <input
            className=" mx-2 mr-10"
            type="radio"
            id="gender"
            name="gender"
            value="F"
            onChange={chooseFilters}
          ></input>
          <label htmlFor="accepted">طالبات</label>
        </div>
        {/*------------ end filter for gender  --------------*/}

        {/*------------ start filter for applicants --------------*/}
        <div className=" text-gray-900">
          <input
            className=" mx-2"
            type="radio"
            id="isAccepted"
            name="isAccepted"
            value={0}
            onChange={chooseFilters}
          ></input>
          <label htmlFor="applicants">متقدمين</label>

          <input
            className=" mx-2 mr-10"
            type="radio"
            id="isAccepted"
            name="isAccepted"
            value={1}
            onChange={chooseFilters}
          ></input>
          <label htmlFor="accepted">مقبولين</label>
        </div>
        {/*------------ end filter for applicants --------------*/}
        <div className="text-gray-900 grid grid-cols-4 mt-4 mr-0">
          {/* <input type="checkbox" id="old" name="old" value="old"></input>
          <label htmlFor="old"> قدامي</label>

          <input type="checkbox" id="new" name="new" value="new"></input>
          <label htmlFor="new"> جدد</label> */}

          {/* <input
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
          <label htmlFor="special"> سكن مميز</label> */}

          <input
            type="checkbox"
            id="notHoused"
            name="notHoused"
            onChange={chooseSecondaryFilter}
          ></input>
          <label htmlFor="notHoused" className="-mr-4">
            {" "}
            غير ساكنين
          </label>

          <input
            type="checkbox"
            id="housed"
            name="housed"
            onChange={chooseSecondaryFilter}
          ></input>
          <label htmlFor="still" className="-mr-4">
            {" "}
            ساكنين
          </label>

          {/* <input
            type="checkbox"
            id="evacution"
            name="evacution"
            value="evacution"
          ></input>
          <label htmlFor="evacution"> اخلاء</label> */}
        </div>
        {/* Search bar */}
        <div className="mt-5 mr-5 px-1">
          <input
            className="border text-slate-700"
            type="text"
            id="nationalId"
            name="nationalId"
            placeholder="البحث بالرقم القومي"
            value={search}
            onChange={handleSearchChange}
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
