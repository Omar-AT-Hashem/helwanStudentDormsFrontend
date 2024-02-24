/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { API_ROUTE } from "../../config/env.js";
import MainSideBar from "../../components/minicomponent/MainSideBar";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const BasicData = () => {
  if (sessionStorage.getItem("token")) {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${sessionStorage.getItem("token")}`;
  }

  const [selectedStudentData, setSelectedStudentData] = useOutletContext();
  const [studentList, setStudentList] = useState([]);

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
        {/* Pass setSelectedStudent function to SearchForStudents to update selected student */}
        <MainSideBar
          studentList={studentList}
          setStudentList={setStudentList}
          setSelectedStudentData={setSelectedStudentData}
        />
      </div>
      {/* Main content area */}
      <div className=" h-full flex-1">
        {/* Header */}
        <div className="bg-mainBlue w-full h-10 text-fuchsia-50 text-center text-2xl mt-8 rounded-lg text-mr-1">
          بيانات اساسية - جامعة حلوان
        </div>
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

export default BasicData;
