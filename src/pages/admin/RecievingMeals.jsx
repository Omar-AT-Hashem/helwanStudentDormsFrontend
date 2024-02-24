import { useEffect, useState } from "react";
import MainSideBar from "../../components/minicomponent/MainSideBar";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { API_ROUTE } from "../../config/env.js";
import csvtojson from 'csvtojson';

const RecievingMeals = () => {
  const [selectedStudentData, setSelectedStudentData] = useOutletContext();
  const [studentList, setStudentList] = useState([]);
  const [file, setFile] = useState(null);//
  const [jsonData, setJsonData] = useState(null);//
  //const [objects, setObjects] = useState([]);

  useEffect(() => {
    if (selectedStudentData) {
      axios
        .get(
          `${API_ROUTE}/v1/RecievingMeals/get-by-studentId/${selectedStudentData.id}`
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

        const formData = new FormData();
        formData.append('recievedMealss', file);
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    
    if (file) {
      const reader = new FileReader();

      reader.onload = async (e) => {
        const csvData = e.target.result;

        // Convert CSV to JSON using csvtojson
        const jsonArray = await csvtojson().fromString(csvData);

        // Set the JSON data in state
        setJsonData(jsonArray);

        // Make a POST request with jsonData
        makePostRequest(jsonArray);
      };

      reader.readAsText(file);
    }
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedStudentData) {
      axios
        .post(`${API_ROUTE}/v1/RecievingMeals/`, {
          ...form,
          studentId: selectedStudentData.id,
        })
        .then((res) => {
          setObjects((prev) => {
            return [...prev, form];
          });
        })
        .catch((err) => {
          toast.dismiss();
          toast("something went wrong");
        });

        

    } else {
      toast.dismiss();
      toast("please select a student");
    }
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
        <MainSideBar
          studentList={studentList}
          setStudentList={setStudentList}
          setSelectedStudentData={setSelectedStudentData}
        />
      </div>
      <div className=" bg-white-900 flex-1 pr-2">
        <div className="  bg-sky-700 w-full h-10 text-fuchsia-50 text-center text-2xl">
          استلام الوجبات - جامعة حلوان
        </div>

        
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onChange={handleFileChange}
          onClick={handleSubmit}>       
          رفع الملف
        </button>

        
      </div>
    </div>
  );
};

export default RecievingMeals;


