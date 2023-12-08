import { useEffect, useState } from "react";
import { API_ROUTE } from "../../config/env.js";
import MainSideBar from "../../components/minicomponent/MainSideBar";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";


const Fees = () => {
    if (sessionStorage.getItem("token")) {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${sessionStorage.getItem("token")}`;
      }
    
    const [selectedStudentData, setSelectedStudentData] = useOutletContext();
    const [studentList, setStudentList] = useState([]);
    const [form, setForm] = useState({ fees: "", date: "", amount: "" });
    const [objects, setObjects] = useState([]);
    const [hideLastThreeDivs, setHideLastThreeDivs] = useState(false);
    

    useEffect(() => {
        if (selectedStudentData) {
          axios
            .get(
              `${API_ROUTE}/v1/penalty/get-by-studentId/${selectedStudentData.id}`
            )
            .then((res) => {
              setObjects(res.data);
            })
            .catch((err) => {
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
        setObjects((prev) => {
        return [...prev, form];
        });
        
          setForm({
            fees: "",
            date: "",
            amount: "",
          });
       
      };

      const handleCheckboxChange = (e) => {
        setHideLastThreeDivs(e.target.checked);
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
      <div className="w-64">
        {/* Pass setSelectedStudent function to SearchForStudents to update selected student */}
        <MainSideBar
          studentList={studentList}
          setStudentList={setStudentList}
          setSelectedStudentData={setSelectedStudentData}
        />
      </div>

      <div className=" bg-white-900 flex-1 pr-2">
        <div className="  bg-sky-700 w-full h-10 text-fuchsia-50 text-center text-2xl">
          الرسوم - جامعة حلوان
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
          <label className="ml-10">النوع  :</label>
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
        </div>

        <div className="mb-2">
          <label className="ml-10">نوع الدفع  :</label>
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
        </div>

        <div className="mb-2">
          <label className="ml-10"> عن شهر  :</label>
          <select
            required
            // value={form.type}
            name="date of"
            value={form.date}
            onChange={handleChange}
            className="border border-gray-400"
          >
            <option value="">------</option>
            <option value="option1">السبب الأول</option>
            <option value="option2">السبب الثاني</option>
            <option value="option3">السبب الثالث</option>
          </select>

          <select
            required
            // value={form.type}
            name="date of"
            value={form.date}
            onChange={handleChange}
            className="border border-gray-400"
          >
            <option value="">------</option>
            <option value="option1"> 2023</option>
            <option value="option2">السبب الثاني</option>
            <option value="option3">السبب الثالث</option>
          </select>
        </div>

       
      
      <div className="mb-2">
        <label className="ml-10"> الدفع الالكتروني :</label>
        <input
          type="checkbox"
          onChange={handleCheckboxChange}
          className="border border-gray-400"
        />
      </div>



      {!hideLastThreeDivs && ( <>
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
          <label className="ml-10">السداد   :</label>
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
        </>)}

        <div className="mb-2">
          <label className="ml-10">  المبلغ :</label>
          <input
            type="text"
            required
            value={form.amount}
            name="amount"
            onChange={handleChange}
            className="border border-gray-400 "
          ></input>
        </div>


        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={handleSubmit}
        >
          حفظ
        </button>

        <table className="table-auto w-4/5 mx-auto">
          <thead className="border-b border-black">
            <tr>
              <th className="px-4 py-2">الرسوم </th>
              <th className="px-4 py-2">عن شهر</th>
              <th className="px-4 py-2"> المبلغ</th>
            </tr>
          </thead>
          <tbody>
            {objects.length > 0 &&
              objects.map((object, index) => (
                <tr
                  className="border-b border-black"
                  key={`blk-meal-ind${index}`}
                >
                  <td>{object.fees}</td>
                  <td>{object.date}</td>
                  <td>{object.amount}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
         
  
         








         
          
  
          
        </div>
    );
  };
  
  export default Fees;
  