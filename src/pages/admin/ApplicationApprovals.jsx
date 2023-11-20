import { useEffect, useState } from "react";
import { API_ROUTE } from "../../config/env.js";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Descriminator } from "../../components/minicomponent/Descriminator.jsx";

export const ApplicationApprovals = () => {
  if (sessionStorage.getItem("token")) {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${sessionStorage.getItem("token")}`;
  }

  const fieldContainer = "flex gap-3";

  // State to store the selected student's data
  const [selectedStudent, setSelectedStudent] = useState();
  const [selectedStudentData, setSelectedStudentData] = useState();
  console.log(selectedStudentData);

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

  return (
    <div className="pt-20 flex flex-row w-full h-screen">
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
      <Descriminator
        setSelectedStudent={setSelectedStudent}
        descriminator="gender"
        dbColumn="unapproved"
      />
      {/* Main content area */}
      <div className=" h-full flex-1">
        <div className=" px-5">
          {/* Conditional rendering based on whether a student is selected */}
          {selectedStudentData ? (
            <div>
              <div className="flex flex-col items-start">
                <div className={fieldContainer}>
                  <span>الرقم القومى :</span>
                  <span>{selectedStudentData.nationalId}</span>
                </div>

                <div className={fieldContainer}>
                  <span>الاسم :</span>
                  <span>{selectedStudentData.name}</span>
                </div>

                <div className={fieldContainer}>
                  <span>تاريخ الميلاد :</span>
                  <span>{selectedStudentData.birthday}</span>
                </div>

                <div className={fieldContainer}>
                  <span>محل الميلاد :</span>
                  <span>{selectedStudentData.placeOfBirth}</span>
                </div>

                <div className={fieldContainer}>
                  <span>النوع : </span>
                  <span>
                    {selectedStudentData.gender == "M" ? "ذكر" : "انثى"}
                  </span>
                </div>

                <div className={fieldContainer}>
                  <span>الديانه :</span>
                  <span>{selectedStudentData.religion}</span>
                </div>

                <div className={fieldContainer}>
                  <span>محل الاقامه :</span>
                  <span>{selectedStudentData.residence}</span>
                </div>

                <div className={fieldContainer}>
                  <span>العنوان بالتفصيل :</span>
                  <span>{selectedStudentData.addressDetails}</span>
                </div>

                <div className={fieldContainer}>
                  <span>البريد الالكترونى :</span>
                  <span>{selectedStudentData.email}</span>
                </div>

                <div className={fieldContainer}>
                  <span>التليفون : </span>
                  <span>{selectedStudentData.telephone}</span>
                </div>

                <div className={fieldContainer}>
                  <span> الموبايل :</span>
                  <span>{selectedStudentData.mobile}</span>
                </div>

                <div className={fieldContainer}>
                  <span>الكليه :</span>
                  <span>{selectedStudentData.faculty}</span>
                </div>

                <div className={fieldContainer}>
                  <span>اسم الاب :</span>
                  <span>{selectedStudentData.fatherName}</span>
                </div>

                <div className={fieldContainer}>
                  <span>الرقم القومى للاب :</span>
                  <span>{selectedStudentData.fatherNationalId}</span>
                </div>

                <div className={fieldContainer}>
                  <span>وظيفه الاب :</span>
                  <span>{selectedStudentData.fatherOccupation}</span>
                </div>

                <div className={fieldContainer}>
                  <span>رقم هاتف الاب :</span>
                  <span>{selectedStudentData.fatherNumber}</span>
                </div>

                <div className={fieldContainer}>
                  <span>اسم ولى الامر :</span>
                  <span>{selectedStudentData.guardianName}</span>
                </div>

                <div className={fieldContainer}>
                  <span>الرقم القومى لولى الامر :</span>
                  <span>{selectedStudentData.guardianNationalId}</span>
                </div>

                <div className={fieldContainer}>
                  <span>صله ولى الامر :</span>
                  <span>{selectedStudentData.guardianRelationship}</span>
                </div>

                <div className={fieldContainer}>
                  <span>الشعبه بالثانويه العامه:</span>
                  <span>{selectedStudentData.highschoolSpecialization}</span>
                </div>

                <div className={fieldContainer}>
                  <span>ذوى الاحتياجات الخاصه :</span>
                  <input
                    type="checkbox"
                    name="isDisabled"
                    checked={selectedStudentData.isDisabled}
                  />
                </div>

                <div className={fieldContainer}>
                  <span>الاسره بالخارج :</span>
                  <input
                    type="checkbox"
                    name="familyAbroad"
                    checked={selectedStudentData.familyAbroad}
                  />
                </div>

                <div className={fieldContainer}>
                  <span>الثانويه بالخارج :</span>
                  <input
                    type="checkbox"
                    name="highschoolAbroad"
                    checked={selectedStudentData.highschoolAbroad}
                  />
                </div>
              </div>

              <div className="flex gap-10 mt-10 text-white font-bold">
                <button className="w-40 h-10 bg-green-600">قبول</button>
                <button className="w-40 h-10 bg-red-600">رفض</button>
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
