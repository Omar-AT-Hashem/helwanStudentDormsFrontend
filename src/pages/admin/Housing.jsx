import { useEffect, useState } from "react";
import { API_ROUTE } from "../../config/env.js";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Housing = () => {
  if (sessionStorage.getItem("token")) {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${sessionStorage.getItem("token")}`;
  }

  const [selectedStudent, setSelectedStudent] = useState();
  const [selectedStudentData, setSelectedStudentData] = useState();
  const [studentList, setStudentList] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_ROUTE}/v1/student/get-by-id/${parseInt(selectedStudent)}`)
      .then((res) => {
        return setSelectedStudentData(res.data);
      })
      .catch((err) => {
        if (err && err.code === "ERR_BAD_REQUEST") {
          return;
        }
        toast.dismiss();
        return toast("Something went wrong");
      });
  }, [selectedStudent]);

  const handleChange = (e) => {
    if (e.target.value == "m") {
      axios
        .get(`${API_ROUTE}/v1/student/column/isAccepted/1/gender/${"m"}`)
        .then((res) => {
          return setStudentList(res.data.filter((ele) => ele.isHoused !== 1));
        })
        .catch((err) => {
          if (err && err.code === "ERR_BAD_REQUEST") {
            return;
          }
          toast.dismiss();
          return toast("Something went wrong");
        });
    }

    if (e.target.value == "f") {
      axios
        .get(`${API_ROUTE}/v1/student/column/isAccepted/1/gender/${"f"}`)
        .then((res) => {
          return setStudentList(res.data.filter((ele) => ele.isHoused !== 1));
        })
        .catch((err) => {
          if (err && err.code === "ERR_BAD_REQUEST") {
            return;
          }
          toast.dismiss();
          return toast("Something went wrong");
        });
    }
  };

  const handleStudentSelect = (studentId) => {
    setSelectedStudent(studentId);
  };

  return (
    <div className="pt-16 flex flex-row w-full h-screen ">
      <div className="w-64">
        {/*------------------------- Sidebar ------------------------*/}
        <div className="w-64">
          <div className="bg-slate-300 h-screen pt-32">
            <div className="flex gap-10" onChange={handleChange}>
              <div className="flex gap-2">
                <input type="radio" id="gender" name="gender" value="m" />
                <label htmlFor="gender">طلاب</label>
              </div>
              <div className="flex gap-2">
                <input type="radio" id="gender" name="gender" value="f" />
                <label htmlFor="gender">طالبات</label>
              </div>
            </div>

            <div className="w-full h-64 bg-red-300 overflow-y-scroll">
              {studentList.map((student) => (
                <div
                  key={`${student.id}-unapprr`}
                  className="hover:cursor-pointer hover:bg-mainYellow"
                  onClick={() => handleStudentSelect(student.id)}
                >
                  {student.name}
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* -------------------end Sidebar ---------------------*/}
      </div>
      <div className=" bg-zinc-900 flex-1">
        <div className="  bg-sky-700 w-full h-10 text-fuchsia-50 text-center text-2xl">
          السكن - جامعة حلوان
        </div>
        <div className="text-white px-5"></div>
      </div>
    </div>
  );
};

export default Housing;
