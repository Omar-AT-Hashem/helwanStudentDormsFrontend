import { useEffect, useState } from "react";
import { API_ROUTE } from "../../config/env.js";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Loading from "../../components/minicomponent/Loading.jsx";

const UsersAndPermissionsReport = () => {
  if (sessionStorage.getItem("token")) {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${sessionStorage.getItem("token")}`;
  }

  const [editable, setEditable] = useState(false);
  const [open, setOpen] = useState(Array(20).fill(0));
  const [employees, setEmployees] = useState([]);
  const [rerenderTrigger, setRerenderTrigger] = useState(0);

  useEffect(() => {
    setLoading((prev) => prev + 1);
    axios.get(`${API_ROUTE}/v1/employee/`).then((res) => {
      setLoading((prev) => prev - 1);
      setOpen(Array(res.data.length).fill(0));
      setEmployees(res.data);
    }).catch((err) => {
      setLoading((prev) => prev - 1);
      toast.dismiss();
      toast("حدث خطأ");
    })
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
    editStudentData: 0,
    superAdmin: 0,
    applicationApprovals: 0,
    houseStudents: 0,
    unHouseStudents: 0,
    managePenalties: 0,
    suspendStudent: 0,
    manageAbscence: 0,
    manageStudentFees: 0,
    manageBlockMeals: 0,
    uploadStudentImages: 0,
    editApplicationDates: 0,
    editInstructions: 0,
    uploadMeals: 0,
    editFees: 0,
    editHousingResources: 0,
    studentEvaluation: 0,
    systemWash: 0,
    deleteStudent: 0,
  });
  const [loading, setLoading] = useState(0);

  const handleEmployeeClick = (e, ind) => {
    setOpen((prev) => {
     prev[ind] = prev[ind] ? 0 : 1;

      return prev;
    });
    setRerenderTrigger((prev) => prev + 1);
  };


  return (
    <div
      id="main-container"
      className="h-[500px] min-w-[1000px] overflow-y-scroll p-5 bg-neutral-50 border shadow-lg shadow-slate-400 flex flex-col"
    >
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
      {loading > 0 && <Loading />}

      <div className="mt-10 mx-10 mb-16">
        <div className="flex flex-col gap-10  bg-slate-100 p-4    border border-slate-200 shadow-md">
          {employees.map((employee, index) => (
            <>
              <div
                key={`${employee.id}-empdtacrd`}
                className="flex flex-col bg-slate-50 hover:cursor-pointer"
                onClick={(e) => handleEmployeeClick(e, index)}
              >
                <div className="flex gap-20">
                  <div className="flex gap-2">
                    <span>الاسم: </span>
                    <span>{employee.name}</span>
                  </div>
                  <div className="flex gap-2">
                    <span>اسم المستخدم: </span>
                    <span>{employee.username}</span>
                  </div>
                </div>
              </div>

              <div
                className={`${
                  open[index] ? "flex bg-slate-50 -mt-10" : "hidden"
                }`}
              >
                <div className="flex flex-col">
                  <div className="flex flex-col gap-7  mb-4 mt-2">
                    <label className=" mr-20 font-bold text-2xl">
                      الصلاحيات :
                    </label>
                    <div className="flex gap-5">
                      <div className="flex">
                        <label className="text-xl">سوبر ادمن</label>
                        <input
                          type="checkbox"
                          name="superAdmin"
                          value={employees[index].superAdmin}
                          checked={Boolean(employees[index].superAdmin)}
                          
                          required
                          className="mr-1"
                        />
                      </div>

                      <div className="flex">
                        <label className="text-xl">تعديل بينات الطلاب</label>
                        <input
                          type="checkbox"
                          name="editStudentData"
                          value={employees[index].editStudentData}
                          checked={Boolean(employees[index].editStudentData)}
                          
                          required
                          className="mr-1"
                        />
                      </div>

                      <div className="flex">
                        <label className="text-xl">
                          قبول و رفض طلبات الانترنت
                        </label>
                        <input
                          type="checkbox"
                          name="applicationApprovals"
                          value={employees[index].applicationApprovals}
                          checked={Boolean(
                            employees[index].applicationApprovals
                          )}
                          
                          required
                          className="mr-1"
                        />
                      </div>

                      <div className="flex">
                        <label className="text-xl">تسكين الطلاب</label>
                        <input
                          type="checkbox"
                          name="houseStudents"
                          value={employees[index].houseStudents}
                          checked={Boolean(employees[index].houseStudents)}
                          
                          required
                          className="mr-1"
                        />
                      </div>

                      <div className="flex">
                        <label className="text-xl">اخلاء الطلاب</label>
                        <input
                          type="checkbox"
                          name="unHouseStudents"
                          value={employees[index].unHouseStudents}
                          checked={Boolean(employees[index].unHouseStudents)}
                          
                          required
                          className="mr-1"
                        />
                      </div>
                    </div>

                    <div className="flex gap-5">
                      <div className="flex">
                        <label className="text-xl"> الجزاءات الطلاب</label>
                        <input
                          type="checkbox"
                          name="managePenalties"
                          value={employees[index].managePenalties}
                          checked={Boolean(employees[index].managePenalties)}
                          
                          required
                          className="mr-1"
                        />
                      </div>

                      <div className="flex">
                        <label className="text-xl">رفد الطلاب</label>
                        <input
                          type="checkbox"
                          name="suspendStudent"
                          value={employees[index].suspendStudent}
                          checked={Boolean(employees[index].suspendStudent)}
                          
                          required
                          className="mr-1"
                        />
                      </div>

                      <div className="flex">
                        <label className="text-xl">غياب الطلاب</label>
                        <input
                          type="checkbox"
                          name="manageAbscence"
                          value={employees[index].manageAbscence}
                          checked={Boolean(employees[index].manageAbscence)}
                          
                          required
                          className="mr-1"
                        />
                      </div>

                      <div className="flex">
                        <label className="text-xl">مصاريف الطلاب</label>
                        <input
                          type="checkbox"
                          name="manageStudentFees"
                          value={employees[index].manageStudentFees}
                          checked={Boolean(employees[index].manageStudentFees)}
                          
                          required
                          className="mr-1"
                        />
                      </div>

                      <div className="flex">
                        <label className="text-xl">حجب الوجبات</label>
                        <input
                          type="checkbox"
                          name="manageBlockMeals"
                          value={employees[index].manageBlockMeals}
                          checked={Boolean(employees[index].manageBlockMeals)}
                          
                          required
                          className="mr-1"
                        />
                      </div>
                    </div>
                    <div className="flex gap-5">
                      <div className="flex">
                        <label className="text-xl">رفع الصور الجماعيه</label>
                        <input
                          type="checkbox"
                          name="uploadStudentImages"
                          value={employees[index].uploadStudentImages}
                          checked={Boolean(
                            employees[index].uploadStudentImages
                          )}
                          
                          required
                          className="mr-1"
                        />
                      </div>

                      <div className="flex">
                        <label className="text-xl">تعديل مواعيد التقديم</label>
                        <input
                          type="checkbox"
                          name="editApplicationDates"
                          value={employees[index].editApplicationDates}
                          checked={Boolean(
                            employees[index].editApplicationDates
                          )}
                          
                          required
                          className="mr-1"
                        />
                      </div>

                      <div className="flex">
                        <label className="text-xl">تعديل تعليمات التقديم</label>
                        <input
                          type="checkbox"
                          name="editInstructions"
                          value={employees[index].editInstructions}
                          checked={Boolean(employees[index].editInstructions)}
                          
                          required
                          className="mr-1"
                        />
                      </div>

                      <div className="flex">
                        <label className="text-xl">رفع الوجبات المسلمه</label>
                        <input
                          type="checkbox"
                          name="uploadMeals"
                          value={employees[index].uploadMeals}
                          checked={Boolean(employees[index].uploadMeals)}
                          
                          required
                          className="mr-1"
                        />
                      </div>

                      <div className="flex">
                        <label className="text-xl">تعديل انواع المصاريف</label>
                        <input
                          type="checkbox"
                          name="editFees"
                          value={employees[index].editFees}
                          checked={Boolean(employees[index].editFees)}
                          
                          required
                          className="mr-1"
                        />
                      </div>
                    </div>
                    <div className="flex gap-5">
                      <div className="flex">
                        <label className="text-xl">تعديل موارد السكن</label>
                        <input
                          type="checkbox"
                          name="editHousingResources"
                          value={employees[index].editHousingResources}
                          checked={Boolean(
                            employees[index].editHousingResources
                          )}
                          
                          required
                          className="mr-1"
                        />
                      </div>

                      <div className="flex">
                        <label className="text-xl">تنسيق الطلاب</label>
                        <input
                          type="checkbox"
                          name="studentEvaluation"
                          value={employees[index].studentEvaluation}
                          checked={Boolean(employees[index].studentEvaluation)}
                          required
                          
                          className="mr-1"
                        />
                      </div>

                      <div className="flex">
                        <label className="text-xl">غسل النظام</label>
                        <input
                          type="checkbox"
                          name="systemWash"
                          value={employees[index].systemWash}
                          checked={Boolean(employees[index].systemWash)}
                          
                          required
                          className="mr-1"
                        />
                      </div>

                      <div className="flex">
                        <label className="text-xl">حذف طالب</label>
                        <input
                          type="checkbox"
                          name="systemWash"
                          value={employees[index].deleteStudent}
                          checked={Boolean(employees[index].deleteStudent)}
                          required
                          className="mr-1"
                        />
                      </div>
                    </div>
                    <div className="flex gap-5"></div>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UsersAndPermissionsReport;
