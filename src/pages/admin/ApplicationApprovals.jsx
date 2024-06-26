import { useEffect, useState } from "react";
import { API_ROUTE } from "../../config/env.js";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import MainSideBar from "../../components/minicomponent/MainSideBar.jsx";
import { useOutletContext } from "react-router-dom";

export const ApplicationApprovals = () => {
  if (sessionStorage.getItem("token")) {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${sessionStorage.getItem("token")}`;
  }

  const fieldContainer =
    "flex gap-3 p-3  min-w-full text-left text-sm font-ligh";
  const fieldTitle = "font-bold text-2xl ";
  const fieldValue = "text-xl text-gray-400";

  // State to store the selected student's data

  const [
    selectedStudentData,
    setSelectedStudentData,
    studentList,
    setStudentList,
    filters,
    setFilters,
    filteredList,
    setFilteredList,
  ] = useOutletContext();

  const [loading, setLoading] = useState(0);

  const [permissions, setPermissions] = useState([
    {
      superAdmin: 0,
      applicationApprovals: 0,
    },
  ]);

  useEffect(() => {
    setLoading((prev) => prev + 1);
    axios
      .get(
        `${API_ROUTE}/v1/employee/permissions/${sessionStorage.getItem("id")}`
      )
      .then((res) => {
        setLoading((prev) => prev - 1);
        setPermissions(res.data);
      })
      .catch(() => {
        setLoading((prev) => prev - 1);
        return;
      });
  }, []);

  const accept = () => {
    setLoading((prev) => prev + 1);
    axios
      .post(`${API_ROUTE}/v1/student/approve-or-reject/approve`, {
        id: selectedStudentData.id,
        grade: selectedStudentData.grade,
      })
      .then(() => {
        setLoading((prev) => prev - 1);
        //handle Logs
        axios.post(`${API_ROUTE}/v1/log`, {
          adminId: sessionStorage.getItem("id"),
          adminName: sessionStorage.getItem("name"),
          adminUsername: sessionStorage.getItem("username"),
          action: `قبول طلب الطالب ${selectedStudentData.name} و الرقم القومى ${selectedStudentData.nationalId}`,
          objectId: selectedStudentData.nationalId,
          objectName: selectedStudentData.name,
        });
        setStudentList((prev) => {
          return prev.filter((e) => e.id !== selectedStudentData.id);
        });
        setSelectedStudentData([]);
        return;
      })
      .catch((err) => {
        setLoading((prev) => prev - 1);
        if (err && err.code === "ERR_BAD_REQUEST") {
          return;
        }
        toast.dismiss();
        return toast("Something went wrong");
      });
  };
  const reject = () => {
    setLoading((prev) => prev + 1);
    axios
      .post(`${API_ROUTE}/v1/student/approve-or-reject/reject`, {
        id: selectedStudentData.id,
        grade: selectedStudentData.grade,
      })
      .then(() => {
        setLoading((prev) => prev - 1);
        //handle Logs
        axios.post(`${API_ROUTE}/v1/log`, {
          adminId: sessionStorage.getItem("id"),
          adminName: sessionStorage.getItem("name"),
          adminUsername: sessionStorage.getItem("username"),
          action: `رفض طلب الطالب ${selectedStudentData.name} و الرقم القومى ${selectedStudentData.nationalId}`,
          objectId: selectedStudentData.nationalId,
          objectName: selectedStudentData.name,
        });
        setStudentList((prev) => {
          return prev.filter((e) => e.id !== selectedStudentData.id);
        });

        setSelectedStudentData([]);
        return;
      })
      .catch((err) => {
        setLoading((prev) => prev - 1);
        if (err && err.code === "ERR_BAD_REQUEST") {
          return;
        }
        toast.dismiss();
        return toast("Something went wrong");
      });
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
      <div className="w-64  mt-4 rounded-lg">
        <MainSideBar
          studentList={studentList}
          setStudentList={setStudentList}
          setSelectedStudentData={setSelectedStudentData}
          filters={filters}
          setFilters={setFilters}
          filteredList={filteredList}
          setFilteredList={setFilteredList}
        />
      </div>
      {/* -------------------end Sidebar ---------------------*/}

      {/*----------------- Main content area----------------- */}
      <div className=" h-full flex-1 ">
        <div className="px-5   ">
          <div className="bg-mainBlue mx-4 h-10 text-fuchsia-50 text-center text-2xl mt-4 rounded-lg text-mr-1">
            قبول الطلب - جامعة حلوان
          </div>
          {selectedStudentData.nationalId ? (
            <div>
              <div className="grid grid-cols-2 gap  p-4 border rounded-lg border-mainBlue mt-2">
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

              <div className="flex gap-10 mt-10 text-white font-bold w-1/2 m-auto justify-center mb-10 h-[200px]">
                {(Boolean(permissions.superAdmin) ||
                  Boolean(permissions.applicationApprovals)) && (
                  <button
                    className="w-40 h-10 bg-green-600  hover:opacity-70 transition-all duration-200  hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded"
                    onClick={accept}
                  >
                    قبول
                  </button>
                )}
                {(Boolean(permissions.superAdmin) ||
                  Boolean(permissions.applicationApprovals)) && (
                  <button
                    className="w-40 h-10 bg-red-600  hover:opacity-70 transition-all duration-200  hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded"
                    onClick={reject}
                  >
                    رفض
                  </button>
                )}
              </div>
            </div>
          ) : (
            // Display a message if no student is selected
            <p className="text-gray-900">اختر طالب للمراجعه</p>
          )}
        </div>
      </div>
    </div>
  );
};
