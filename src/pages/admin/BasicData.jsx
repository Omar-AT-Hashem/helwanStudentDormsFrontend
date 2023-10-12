import { useEffect, useState } from "react";
import { API_ROUTE } from "../../config/env.js";
import SearchForStudents from "../../components/minicomponent/SearchForStudents";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const BasicData = () => {
  if (sessionStorage.getItem("token")) {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${sessionStorage.getItem("token")}`;
  }

  // State to store the selected student's data
  const [selectedStudent, setSelectedStudent] = useState();
  const [selectedStudentData, setSelectedStudentData] = useState();

  useEffect(() => {
    axios
      .get(`${API_ROUTE}/v1/student/get-by-id/${selectedStudent}`)
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
                    <p>{selectedStudent.dateOfApplying}</p>
                  </div>
                  <div className="form-group">
                    <label>Student ID:</label>
                    <span>{selectedStudentData.id}</span>
                  </div>
                  <div className="form-group">
                    <label>National ID:</label>
                    <p>{selectedStudentData.nationalId}</p>
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
                    <p>{selectedStudentData.fatherNationalId}</p>
                  </div>
                  <div className="form-group">
                    <label>Father's Job:</label>
                    <p>{selectedStudent.fatherJob}</p>
                  </div>
                  <div className="form-group">
                    <label>Father's Number:</label>
                    <p>{selectedStudent.fatherNumber}</p>
                  </div>
                  <div className="form-group">
                    <label>Guardian's Name:</label>
                    <p>{selectedStudent.guardianName}</p>
                  </div>
                  <div className="form-group">
                    <label>Guardian's Relationship:</label>
                    <p>{selectedStudent.guardianRelationship}</p>
                  </div>
                  <div className="form-group">
                    <label>Residence:</label>
                    <p>{selectedStudent.residence}</p>
                  </div>
                  <div className="form-group">
                    <label>Address Details:</label>
                    <p>{selectedStudent.addressDetails}</p>
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
                    <p>{selectedStudent.apartmentType}</p>
                  </div>
                  <div className="form-group">
                    <label>Disabled:</label>
                    <p>{selectedStudentData.disabled ? "Yes" : "No"}</p>
                  </div>
                  <div className="form-group">
                    <label>Family Abroad:</label>
                    <p>{selectedStudent.familyAbroad ? "Yes" : "No"}</p>
                  </div>
                  <div className="form-group">
                    <label>No Food:</label>
                    <p>{selectedStudent.noFood ? "Yes" : "No"}</p>
                  </div>
                  <div className="form-group">
                    <label>Exempt from Expenses:</label>
                    <p>{selectedStudent.exemptFromExpenses ? "Yes" : "No"}</p>
                  </div>
                  <div className="form-group">
                    <label>Application Status:</label>
                    <p>{selectedStudent.applicationStatus}</p>
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
