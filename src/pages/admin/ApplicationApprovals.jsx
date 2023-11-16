import { useEffect, useState } from "react";
import { API_ROUTE } from "../../config/env.js";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export const ApplicationApprovals = () => {
  if (sessionStorage.getItem("token")) {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${sessionStorage.getItem("token")}`;
  }

  // State to store the selected student's data
  const [studentList, setStudentList] = useState([]);
  const [selectedStudentData, setSelectedStudentData] = useState();

  useEffect(() => {
    axios
      .get(`${API_ROUTE}/v1/student/unapproved`)
      .then((res) => {
        return setStudentList(res.data);
      })
      .catch((err) => {
        if (err && err.code === "ERR_BAD_REQUEST") {
          return;
        }
        toast.dismiss();
        return toast("Something went wrong");
      });
  }, []);

  const handleStudentSelect = (studentId) => {
    axios
      .get(`${API_ROUTE}/v1/student/get-by-id/${parseInt(studentId)}`)
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
  };

  return (
    <div className="pt-16 flex flex-row w-full h-screen">
      {/* Sidebar with student search */}
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
      <div className="w-64">
        <div className="bg-slate-300 h-screen pt-32">
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
      {/* Main content area */}
      <div className=" h-full flex-1">
        <div className="text-white px-5">
          {/* Conditional rendering based on whether a student is selected */}
          {selectedStudentData ? (
            // Display student details when a student is selected
            <div className="text-black">
              <div>
                <span>الاسم: </span>
                <span>{selectedStudentData.name}</span>
              </div>
              <div>
                <span>الاسم: </span>
                <span>{selectedStudentData.dateOfApplying}</span>
              </div>
              <div>
                <span>الاسم: </span>
                <span>{selectedStudentData.nationalId}</span>
              </div>
              <div>
                <span>الاسم: </span>
                <span>{selectedStudentData.username}</span>
              </div>
            </div>
          ) : (
            // Display a message if no student is selected
            <p className="text-gray-900">
              Select a student from the sidebar to view their details.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
