import { useEffect, useState } from "react";
import { API_ROUTE } from "../../config/env.js";
import SearchForStudents from "../../components/minicomponent/SearchForStudents";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const BasicData = () => {
  // State to store the selected student's data
  const [selectedStudent, setSelectedStudent] = useState();
  const [selectedStudentData, setSelectedStudentData] = useState();

  useEffect(() => {
    axios
      .post(`${API_ROUTE}/employee/students/get-by-id`, {
        studentId: selectedStudent,
      })
      .then((res) => {
          return setSelectedStudentData(res.data);
      })
      .catch((err) => {
        if(err.code == 'ERR_BAD_REQUEST'){
          return
        }
        toast.dismiss();
        return toast("Something went wrong");
      });
  }, [selectedStudent]);

  console.log(selectedStudentData);

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
        <SearchForStudents setSelectedStudent={setSelectedStudent} />
      </div>
      {/* Main content area */}
      <div className="bg-zinc-900 h-full flex-1">
        {/* Header */}
        <div className="bg-sky-700 w-full h-10 text-fuchsia-50 text-center text-2xl">
          بيانات اساسية - جامعة حلوان
        </div>
        <div className="text-white px-5">
          {/* Conditional rendering based on whether a student is selected */}
          {selectedStudentData ? (
            // Display student details when a student is selected
            <div className="person-details">
              {/* Student image */}
              <div className="person-image">
                <img
                  src={selectedStudent.imageUrl}
                  alt={selectedStudent.name}
                />
              </div>
              {/* Student information */}
              <div className="person-info">
                <h2>{selectedStudentData.name}</h2>
                {/* Student details form */}
                <form>
                  <div className="form-group">
                    <label>Date of Applying:</label>
                    <p>{selectedStudent["date-of-applying"]}</p>
                  </div>
                  <div className="form-group">
                    <label>Student ID:</label>
                    <span>{selectedStudentData.id}</span>
                  </div>
                  <div className="form-group">
                    <label>National ID:</label>
                    <p>{selectedStudentData.nationalNumber}</p>
                  </div>
                  <div className="form-group">
                    <label>Email:</label>
                    <p>{selectedStudentData.email}</p>
                  </div>
                  <div className="form-group">
                    <label>Mobile Number:</label>
                    <p>{selectedStudentData.mobile}</p>
                  </div>
                  <div className="form-group">
                    <label>Religion:</label>
                    <p>{selectedStudentData.religion}</p>
                  </div>
                  <div className="form-group">
                    <label>Father's Name:</label>
                    <p>{selectedStudentData.fatherName}</p>
                  </div>
                  <div className="form-group">
                    <label>Father's National ID:</label>
                    <p>{selectedStudentData.fatherNationalNumber}</p>
                  </div>
                  <div className="form-group">
                    <label>Father's Job:</label>
                    <p>{selectedStudent["father-job"]}</p>
                  </div>
                  <div className="form-group">
                    <label>Father's Number:</label>
                    <p>{selectedStudent["father-number"]}</p>
                  </div>
                  <div className="form-group">
                    <label>Guardian's Name:</label>
                    <p>{selectedStudent["guardian-name"]}</p>
                  </div>
                  <div className="form-group">
                    <label>Guardian's Relationship:</label>
                    <p>{selectedStudent["guardian-relationship"]}</p>
                  </div>
                  <div className="form-group">
                    <label>Residence:</label>
                    <p>{selectedStudent.residence}</p>
                  </div>
                  <div className="form-group">
                    <label>Address Details:</label>
                    <p>{selectedStudent["address-details"]}</p>
                  </div>
                  <div className="form-group">
                    <label>College:</label>
                    <p>{selectedStudent.college}</p>
                  </div>
                  <div className="form-group">
                    <label>Grade:</label>
                    <p>{selectedStudent.grade}</p>
                  </div>
                  <div className="form-group">
                    <label>Percentage:</label>
                    <p>{selectedStudent.percentage}</p>
                  </div>
                  <div className="form-group">
                    <label>Apartment Type:</label>
                    <p>{selectedStudent["apartment-type"]}</p>
                  </div>
                  <div className="form-group">
                    <label>Disabled:</label>
                    <p>{selectedStudent.disabled ? "Yes" : "No"}</p>
                  </div>
                  <div className="form-group">
                    <label>Family Abroad:</label>
                    <p>{selectedStudent["family-abroad"] ? "Yes" : "No"}</p>
                  </div>
                  <div className="form-group">
                    <label>No Food:</label>
                    <p>{selectedStudent["no-food"] ? "Yes" : "No"}</p>
                  </div>
                  <div className="form-group">
                    <label>Exempt from Expenses:</label>
                    <p>
                      {selectedStudent["exempt-from-expenses"] ? "Yes" : "No"}
                    </p>
                  </div>
                  <div className="form-group">
                    <label>Application Status:</label>
                    <p>{selectedStudent["application-status"]}</p>
                  </div>
                  <div className="form-group">
                    <label>Notes:</label>
                    <p>{selectedStudent.notes}</p>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            // Display a message if no student is selected
            <p>Select a student from the sidebar to view their details.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BasicData;
