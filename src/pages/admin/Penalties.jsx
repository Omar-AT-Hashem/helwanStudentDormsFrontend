import { useEffect, useState } from "react";
import MainSideBar from "../../components/minicomponent/MainSideBar";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { API_ROUTE } from "../../config/env.js";
import Loading from "../../components/minicomponent/Loading.jsx";

const Penalties = () => {
  if (sessionStorage.getItem("token")) {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${sessionStorage.getItem("token")}`;
  }
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

  const [form, setForm] = useState({ date: "", reason: "" });
  const [objects, setObjects] = useState([]);
  const [loading, setLoading] = useState(0);

  const [permissions, setPermissions] = useState([
    {
      superAdmin: 0,
      managePenalties: 0,
      suspendStudent: 0,
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

  useEffect(() => {
    if (selectedStudentData) {
      setLoading((prev) => prev + 1);
      axios
        .get(
          `${API_ROUTE}/v1/penalty/get-by-studentId/${selectedStudentData.id}`
        )
        .then((res) => {
          setLoading((prev) => prev - 1);
          setObjects(res.data);
        })
        .catch((err) => {
          setLoading((prev) => prev - 1);
          toast.dismiss();
          toast("something went wrong");
        });
    }
  }, [selectedStudentData]);

  const handleChange = (e) => {
    e.preventDefault();
    setForm((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedStudentData) {
      setLoading((prev) => prev + 1);
      axios
        .post(`${API_ROUTE}/v1/penalty/`, {
          ...form,
          studentId: selectedStudentData.id,
        })
        .then((res) => {
          setLoading((prev) => prev - 1);
          setObjects((prev) => {
            return [...prev, form];
          });
          //handle Logs
          axios.post(`${API_ROUTE}/v1/log`, {
            adminId: sessionStorage.getItem("id"),
            adminName: sessionStorage.getItem("name"),
            adminUsername: sessionStorage.getItem("username"),
            action: `اضافه جزاء جديد للطالب ${selectedStudentData.name} و الرقم القومي ${selectedStudentData.nationalId}`,
            objectId: `${selectedStudentData.nationalId}`,
            objectName: `${selectedStudentData.name}`,
          });
        })
        .catch((err) => {
          setLoading((prev) => prev - 1);
          toast.dismiss();
          toast("something went wrong");
        });

      setForm({
        reason: "",
        Date: "",
      });
    } else {
      toast.dismiss();
      toast("please select a student");
    }
  };

  const handleSuspension = () => {
    setLoading((prev) => prev + 1);
    axios
      .put(`${API_ROUTE}/v1/student/suspend/${selectedStudentData.id}`)
      .then((res) => {
        setLoading((prev) => prev - 1);

        const ind2 = filteredList.findIndex(
          (ele) => ele.id == selectedStudentData.id
        );
        setSelectedStudentData([]);
        setStudentList((prev) => {
          prev = prev.filter((ele) => ele.id != selectedStudentData.id);
          return prev;
        });
        setFilteredList((prev) => {
          prev[ind2] = {
            ...prev[ind2],
            isHoused: -1,
            isAccepted: 0,
            isApproved: -1,
          };
          return prev;
        });
      })
      .catch((err) => {
        setLoading((prev) => prev - 1);
        toast.dismiss();
        toast("something went wrong");
      });
  };

  return (
    <div className="pt-20 flex flex-row w-full h-screen ">
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
      <div className="w-64">
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
      <div className=" bg-white-900 flex-1 pr-2">
        <div className="  bg-sky-700 w-full h-10 text-fuchsia-50 text-center text-2xl">
          الجزاءات - جامعة حلوان
        </div>

        <div className="border-2 border-slate  mt-5 h-48 px-2 mx-2 mb-10 ">
          <div className="flex justify-between items-center h-full">
            <div className="flex flex-col ">
              <div>
                <span className="font bold text-2xl te ">الاسم: </span>
                <span className="font text-xl text-gray-400">
                  {selectedStudentData.name}
                </span>
              </div>
              <div>
                <span className="font bold text-2xl">الرقم القومي: </span>
                <span className="font text-xl text-gray-400">
                  {selectedStudentData.nationalId}
                </span>
              </div>

              <div>
                <span className="font bold text-2xl">نوع السكن : </span>
                <span className="font text-xl text-gray-400">
                  {selectedStudentData.accomodationType}
                </span>
              </div>
            </div>
            <div>
              {" "}
              <img
                src={
                  selectedStudentData.image
                    ? selectedStudentData.image
                    : "/default-photo.jpg"
                }
                className="w-36 border-2 border-black"
                alt="default image"
              />
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label className=" ml-10"> الاسم : </label>
          {selectedStudentData && (
            <input
              type="text"
              id="name"
              name="name"
              value={selectedStudentData.name}
              // Add onChange handler to update the state
              readOnly
              className="border border-gray-400"
            />
          )}
        </div>

        <div className="mb-2">
          <label className="ml-10">السبب :</label>
          <input
            type="text"
            required
            value={form.reason}
            name="reason"
            onChange={handleChange}
            className="border border-gray-400 "
          ></input>
        </div>

        <div className="mb-4">
          <label className=" ml-10"> التاريخ : </label>
          <input
            type="date"
            name="date"
            onChange={handleChange}
            required
            className="border border-gray-400"
          ></input>
        </div>
        {(Boolean(permissions.superAdmin) ||
          Boolean(permissions.managePenalties)) && (
          <div className="flex gap-40">
            <button
              className="bg-green-500  text-white px-4 py-2 rounded hover:opacity-70 transition-all duration-200"
              onClick={handleSubmit}
            >
              حفظ
            </button>
            {(Boolean(permissions.superAdmin) ||
              Boolean(permissions.suspendStudent)) && (
              <button
                className="bg-red-500 text-white px-4 py-2  rounded hover:opacity-70 transition-all duration-200"
                onClick={handleSuspension}
              >
                فصل
              </button>
            )}
          </div>
        )}

        <table className="table-auto w-4/5 mx-auto">
          <thead className="border-b border-black">
            <tr className="text-right">
              <th className="px-4 py-2">السبب</th>
              <th className="px-4 py-2"> التاريخ</th>
            </tr>
          </thead>
          {
            <tbody>
              {objects.length > 0 &&
                objects.map((object, index) => (
                  <tr
                    className="border-b border-black"
                    key={`blk-meal-ind${index}`}
                  >
                    <td>{object.reason}</td>
                    <td>
                      {object.date.split("T")[0].split("-").reverse().join("-")}
                    </td>
                  </tr>
                ))}
            </tbody>
          }
        </table>
      </div>
    </div>
  );
};

export default Penalties;
