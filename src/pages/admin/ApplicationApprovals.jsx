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

  const fieldContainer = "flex gap-3 p-3 border border-slate-600";
  const fieldTitle = "font-bold text-xl";
  const fieldValue = "text-xl";

  // State to store the selected student's data
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

  const accept = () => {
    axios
      .post(`${API_ROUTE}/v1/student/asess/approve`, {
        id: selectedStudentData.id,
        grade: selectedStudentData.grade,
      })
      .then(() => {
        setStudentList((prev) => {
          return prev.filter((e) => e.id !== selectedStudentData.id);
        });
        setSelectedStudent();
        setSelectedStudentData();
        return;
      })
      .catch((err) => {
        if (err && err.code === "ERR_BAD_REQUEST") {
          return;
        }
        toast.dismiss();
        return toast("Something went wrong");
      });
  };
  const reject = () => {
    axios
      .post(`${API_ROUTE}/v1/student/asess/reject`, {
        id: selectedStudentData.id,
        grade: selectedStudentData.grade,
      })
      .then(() => {
        setStudentList((prev) => {
          return prev.filter((e) => e.id !== selectedStudentData.id);
        });
        setSelectedStudent();
        setSelectedStudentData();
        return;
      })
      .catch((err) => {
        if (err && err.code === "ERR_BAD_REQUEST") {
          return;
        }
        toast.dismiss();
        return toast("Something went wrong");
      });
  };

  const handleChange = (e) => {
    if (e.target.value == "m") {
      axios
        .get(`${API_ROUTE}/v1/student/column/isApproved/0/gender/${"m"}`)
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
    }

    if (e.target.value == "f") {
      axios
        .get(`${API_ROUTE}/v1/student/column/isApproved/0/gender/${"f"}`)
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
    }
  };

  const handleStudentSelect = (studentId) => {
    setSelectedStudent(studentId);
  };

  return (
    <div className="pt-20 flex flex-row w-full h-screen">
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

      {/*----------------- Main content area----------------- */}
      <div className=" h-full flex-1">
        <div className="px-5 mt-10">
          {selectedStudentData ? (
            <div>
              <div className="grid grid-cols-2 gap bg-slate-200 p-4 border border-black">
                <div className={fieldContainer}>
                  <span className={fieldTitle}>الرقم القومى :</span>
                  <span className={fieldValue}>
                    {selectedStudentData.nationalId}
                  </span>
                </div>

                <div className={fieldContainer}>
                  <span className={fieldTitle}>تاريخ الميلاد :</span>
                  <span className={fieldValue}>
                    {selectedStudentData.birthday}
                  </span>
                </div>

                <div className={fieldContainer}>
                  <span className={fieldTitle}>الاسم :</span>
                  <span className={fieldValue}>{selectedStudentData.name}</span>
                </div>

                <div className={fieldContainer}>
                  <span className={fieldTitle}>محل الميلاد :</span>
                  <span className={fieldValue}>
                    {selectedStudentData.placeOfBirth}
                  </span>
                </div>

                <div className={fieldContainer}>
                  <span className={fieldTitle}>النوع : </span>
                  <span className={fieldValue}>
                    {selectedStudentData.gender == "M" ? "ذكر" : "انثى"}
                  </span>
                </div>

                <div className={fieldContainer}>
                  <span className={fieldTitle}>الديانه :</span>
                  <span className={fieldValue}>
                    {selectedStudentData.religion}
                  </span>
                </div>

                <div className={fieldContainer}>
                  <span className={fieldTitle}>البريد الالكترونى :</span>
                  <span className={fieldValue}>
                    {selectedStudentData.email}
                  </span>
                </div>

                <div className={fieldContainer}>
                  <span className={fieldTitle}>العنوان بالتفصيل :</span>
                  <span className={fieldValue}>
                    {selectedStudentData.addressDetails}
                  </span>
                </div>

                <div className={fieldContainer}>
                  <span className={fieldTitle}>محل الاقامه :</span>
                  <span className={fieldValue}>
                    {selectedStudentData.residence}
                  </span>
                </div>
                <div className={fieldContainer}>
                  <span className={fieldTitle}>التليفون : </span>
                  <span className={fieldValue}>
                    {selectedStudentData.telephone}
                  </span>
                </div>

                <div className={fieldContainer}>
                  <span className={fieldTitle}> الموبايل :</span>
                  <span className={fieldValue}>
                    {selectedStudentData.mobile}
                  </span>
                </div>

                <div className={fieldContainer}>
                  <span className={fieldTitle}>الكليه :</span>
                  <span className={fieldValue}>
                    {selectedStudentData.faculty}
                  </span>
                </div>

                <div className={fieldContainer}>
                  <span className={fieldTitle}>اسم الاب :</span>
                  <span className={fieldValue}>
                    {selectedStudentData.fatherName}
                  </span>
                </div>

                <div className={fieldContainer}>
                  <span className={fieldTitle}>الرقم القومى للاب :</span>
                  <span className={fieldValue}>
                    {selectedStudentData.fatherNationalId}
                  </span>
                </div>

                <div className={fieldContainer}>
                  <span className={fieldTitle}>وظيفه الاب :</span>
                  <span className={fieldValue}>
                    {selectedStudentData.fatherOccupation}
                  </span>
                </div>

                <div className={fieldContainer}>
                  <span className={fieldTitle}>رقم هاتف الاب :</span>
                  <span className={fieldValue}>
                    {selectedStudentData.fatherNumber}
                  </span>
                </div>

                <div className={fieldContainer}>
                  <span className={fieldTitle}>اسم ولى الامر :</span>
                  <span className={fieldValue}>
                    {selectedStudentData.guardianName}
                  </span>
                </div>

                <div className={fieldContainer}>
                  <span className={fieldTitle}>الرقم القومى لولى الامر :</span>
                  <span className={fieldValue}>
                    {selectedStudentData.guardianNationalId}
                  </span>
                </div>

                <div className={fieldContainer}>
                  <span className={fieldTitle}>صله ولى الامر :</span>
                  <span className={fieldValue}>
                    {selectedStudentData.guardianRelationship}
                  </span>
                </div>

                <div className={fieldContainer}>
                  <span className={fieldTitle}>الشعبه بالثانويه العامه:</span>
                  <span className={fieldValue}>
                    {selectedStudentData.highschoolSpecialization}
                  </span>
                </div>

                <div className={fieldContainer}>
                  <span className={fieldTitle}>الدرجه :</span>
                  <span className={fieldValue}>
                    {selectedStudentData.grade}
                  </span>
                </div>

                <div className={fieldContainer}>
                  <span className={fieldTitle}>ذوى الاحتياجات الخاصه :</span>
                  <input
                    type="checkbox"
                    name="isDisabled"
                    checked={selectedStudentData.isDisabled}
                  />
                </div>

                <div className={fieldContainer}>
                  <span className={fieldTitle}>الاسره بالخارج :</span>
                  <input
                    type="checkbox"
                    name="familyAbroad"
                    checked={selectedStudentData.familyAbroad}
                  />
                </div>

                <div className={fieldContainer}>
                  <span className={fieldTitle}>الثانويه بالخارج :</span>
                  <input
                    type="checkbox"
                    name="highschoolAbroad"
                    checked={selectedStudentData.highschoolAbroad}
                  />
                </div>
              </div>

              <div className="flex gap-10 mt-10 text-white font-bold w-1/2 m-auto">
                <button
                  className="w-40 h-10 bg-green-600 rounded-md hover:opacity-70 transition-all duration-200"
                  onClick={accept}
                >
                  قبول
                </button>
                <button
                  className="w-40 h-10 bg-red-600 rounded-md hover:opacity-70 transition-all duration-200"
                  onClick={reject}
                >
                  رفض
                </button>
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
