import { useEffect, useState } from "react";
import { API_ROUTE } from "../../config/env.js";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export const Descriminator = ({
  setSelectedStudent,
  descriminator,
  dbColumn,
}) => {
  const [studentList, setStudentList] = useState([]);

  const [refreshString, setRefreshString] = useState();

  const handleStudentSelect = (studentId) => {
    setSelectedStudent(studentId);
  };

  useEffect(() => {
    if (refreshString) {
      const descriminatorExtracted = refreshString.split("-")[0];
      const optionExtracted = refreshString.split("-")[1];
      axios
        .get(
          `${API_ROUTE}/v1/student/column/${dbColumn}/${descriminatorExtracted}/${optionExtracted}`
        )
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
  }, []);

  const handleChange = (e) => {
    if (descriminator == "gender") {
      if (e.target.value == "m") {
        setRefreshString(`${descriminator}-${e.target.value}`);
        axios
          .get(
            `${API_ROUTE}/v1/student/column/${dbColumn}/${descriminator}/${"m"}`
          )
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
        setRefreshString(`${descriminator}-${e.target.value}`);
        axios
          .get(
            `${API_ROUTE}/v1/student/column/${dbColumn}/${descriminator}/${"f"}`
          )
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
    }
  };

  return (
    <div>
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
          {descriminator == "gender" && (
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
          )}
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
    </div>
  );
};
