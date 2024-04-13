import { useEffect, useState } from "react";
import { API_ROUTE } from "../../config/env.js";
import MainSideBar from "../../components/minicomponent/MainSideBar";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Loading from "../../components/minicomponent/Loading.jsx";

const Fees = () => {
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

  const [form, setForm] = useState({
    fees: "",
    date: "",
    sum: "",
    type: "",
    isPayed: false,
  });
  const [objects, setObjects] = useState([]);
  const [feeTypes, setFeeTypes] = useState([]);
  const [loading, setLoading] = useState(0);

  const [permissions, setPermissions] = useState([
    {
      superAdmin: 0,
      manageStudentFees: 0,
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
          `${API_ROUTE}/v1/studentfee/get-by-studentId/${selectedStudentData.id}`
        )
        .then((res) => {
          setLoading((prev) => prev - 1);
          setObjects(res.data);
        })
        .catch(() => {
          setLoading((prev) => prev - 1);
          toast.dismiss();
          toast("something went wrong");
        });
    }
  }, [selectedStudentData]);

  useEffect(() => {
    setLoading((prev) => prev + 1);
    axios
      .get(`${API_ROUTE}/v1/fee`)
      .then((res) => {
        setLoading((prev) => prev - 1);
        setFeeTypes(res.data);
      })
      .catch(() => {
        setLoading((prev) => prev - 1);
        toast.dismiss();
        toast("something went wrong");
      });
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    setForm((prev) => {
      return {
        ...prev,
        [e.target.name]:
          e.target.type === "checkbox" ? e.target.checked : e.target.value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedStudentData.name) {
      setLoading((prev) => prev + 1);
      axios
        .post(`${API_ROUTE}/v1/studentfee/`, {
          ...form,
          studentId: selectedStudentData.id,
        })
        .then((res) => {
          //handle Logs
          axios.post(`${API_ROUTE}/v1/log`, {
            adminId: sessionStorage.getItem("id"),
            adminName: sessionStorage.getItem("name"),
            adminUsername: sessionStorage.getItem("username"),
            action: `اضافه رسوم للطالب ${selectedStudentData.name} و الرقم القومي ${selectedStudentData.nationalId} بقيمه ${form.sum}`,
            objectId: `${selectedStudentData.nationalId}`,
            objectName: `${selectedStudentData.name}`,
          });
          setForm({ fees: "", date: "", amount: "", type: "", isPayed: false });
          setLoading((prev) => prev - 1);
        })
        .catch(() => {
          setLoading((prev) => prev - 1);
          toast.dismiss();
          toast("something went wrong");
        });
    } else {
      toast("يجب اختيار الطالب اولا");
      return;
    }
    setObjects((prev) => {
      return [...prev, form];
    });

    setForm({
      fees: "",
      date: "",
      sum: "",
      type: "",
      isPayed: false,
    });
  };

  // const handleCheckboxChange = (e) => {
  //   setHideLastThreeDivs(e.target.checked);
  // };

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
      {loading > 0 && Loading}
      <div className="w-64">
        {/* Pass setSelectedStudent function to SearchForStudents to update selected student */}
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
        <div className="  bg-sky-700 w-full h-10 text-fuchsia-50 text-center text-2xl mb-10">
          الرسوم - جامعة حلوان
        </div>
        {selectedStudentData && (
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
        )}
        <div className="mb-2">
          <label className="ml-10">النوع :</label>
          <select
            required
            name="type"
            onChange={handleChange}
            className="border border-gray-400"
          >
            <option>------</option>
            {feeTypes.map((feeType) => (
              <option key={`feeTypeStudent-${feeType.id}`} value={feeType.name}>
                {feeType.name}
              </option>
            ))}
          </select>
        </div>
        {/* <div className="mb-2">
          <label className="ml-10">نوع الدفع :</label>
          <select
            required
            // value={form.type}
            name="type"
            onChange={handleChange}
            className="border border-gray-400"
          >
            <option value="">------</option>
            <option value="option1">السبب الأول</option>
            <option value="option2">السبب الثاني</option>
            <option value="option3">السبب الثالث</option>
          </select>
        </div> */}
        <div className="mb-2">
          <label className="ml-10"> الدفع الالكتروني :</label>
          <input
            type="checkbox"
            name="isPayed"
            checked={form.isPayed}
            onChange={handleChange}
            className="border border-gray-400"
          />
        </div>
        <div className="mb-2">
          <label className="ml-10"> التاريخ</label>
          <input
            type="date"
            name="date"
            onChange={handleChange}
            className="border border-gray-400"
          />
        </div>
        {/* {!hideLastThreeDivs && (
          <>
            <div className="mb-2">
              <label className="ml-10">رقم قسيمة السداد :</label>
              <input
                type="text"
                required
                name="sadad no"
                onChange={handleChange}
                className="border border-gray-400 "
              ></input>
            </div>

            <div className="mb-4">
              <label className=" ml-10"> تاريخ السداد : </label>
              <input
                type="date"
                name="date"
                onChange={handleChange}
                required
                className="border border-gray-400"
              ></input>
            </div>

            <div className="mb-2">
              <label className="ml-10">السداد :</label>
              <select
                required
                // value={form.type}
                name="sadad"
                onChange={handleChange}
                className="border border-gray-400"
              >
                <option value="">------</option>
                <option value="option1">السبب الأول</option>
                <option value="option2">السبب الثاني</option>
                <option value="option3">السبب الثالث</option>
              </select>
            </div>
          </>
        )} */}
        <div className="mb-2">
          <label className="ml-10"> المبلغ :</label>
          <input
            type="text"
            required
            value={form.sum}
            name="sum"
            onChange={handleChange}
            className="border border-gray-400 "
          ></input>
        </div>
        {(Boolean(permissions.superAdmin) ||
          Boolean(permissions.manageStudentFees)) && (
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={handleSubmit}
          >
            حفظ
          </button>
        )}
        
        <table className="table-auto w-4/5 mx-auto ">
          <thead className="border-b border-black">
            <tr className="text-right">
              <th className="px-4 py-2 text-right">الرسوم </th>
              <th className="px-4 py-2 text-right">عن شهر</th>
              <th className="px-4 py-2 text-right"> المبلغ</th>
            </tr>
          </thead>
          <tbody>
            {objects.length > 0 &&
              objects.map((object, index) => (
                <tr
                  className="border-b border-black"
                  key={`blk-meal-ind${index}`}
                >
                  <td className="py-1">{object.type}</td>
                  <td className="py-1">
                    {object.date.split("T")[0].split("-").reverse().join("-")}
                  </td>
                  <td className="py-1">{object.sum}</td>
                </tr>
              ))}
          </tbody>
        </table>
      
      </div>
    </div>
  );
};

export default Fees;
