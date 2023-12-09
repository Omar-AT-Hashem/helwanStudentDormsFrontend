import React from 'react';
import MainSideBar from "../../components/minicomponent/MainSideBar";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";



const EditStudentData = () => {
    if (sessionStorage.getItem("token")) {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${sessionStorage.getItem("token")}`;
      }

    const [studentData, setStudentData]= useState(
        {
            nationalid: '',
            id: '',
            name: '',
            adress: '',
            college: '',
            password: '',
            
        }
    )

    const [selectedStudentData, setSelectedStudentData] = useOutletContext()
    const [studentList, setStudentList] = useState([]);

    const [editMode, setEditMode] = useState(false);

  // Function to handle the Edit button click
  const handleEdit = () => {
    setEditMode(true);
  };

  // Function to handle the Esc button click
  const handleEsc = () => {
    setEditMode(false);
  };

  // Function to handle the Edit button click
  const handleEditData = () => {
    


    
  };

  const handleInputChange = (label, value) => {
    setStudentData((prevData) => ({
      ...prevData,
      [label]: value,
    }));
};

  

    return (
        <div className="pt-16 flex flex-row w-full h-screen">
      {/* Sidebar with student search */}
      
      <div className="w-64">
        {/* Pass setSelectedStudent function to SearchForStudents to update selected student */}
        <MainSideBar
          studentList={studentList}
          setStudentList={setStudentList}
          setSelectedStudentData={setSelectedStudentData}
        />
      </div>
      {/* Main content area */}
      <div className=" h-full flex-1">
        {/* Header */}
        <div className="bg-mainBlue w-full h-10 text-fuchsia-50 text-center text-2xl mt-8 rounded-lg text-mr-1">
            تعديل بيانات   - جامعة حلوان
        </div>
        <div className="text-white px-5">
          {/* Conditional rendering based on whether a student is selected */}
          {selectedStudentData ? (
            // Display student details when a student is selected
            <div className="text-black items-start">
              <div className='mt-2'><label htmlFor="nationlid" className="mb-4 ml-10 ">
              الرقم القومى :
              </label>
              <input
                type="text"
                name="nationlid"
                value={studentData.nationalid}
                onChange={(e) => handleInputChange('nationalid', e.target.value)}
                className="w-96  bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 py-2 px-4 mr-4"
              /> </div>
              <div className='mt-2'><label htmlFor="id" className="mb-4 ml-8 ">
              رقم شئون الطلاب :
              </label>
              <input
                type="text"
                name="id"
                value={studentData.id}
                onChange={(e) => handleInputChange('id', e.target.value)}
                className="w-96  bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 py-2 px-4"
              /> </div>
              <div className='mt-2'>
              <label htmlFor="name" className="mb-4 ml-10 ">
              الاسم :
              </label>
              <input
                type="text"
                name="name"
                value={studentData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-96  bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 py-2 px-4 mr-8"
              /></div>
              <div className='mt-2'><label htmlFor="adress" className="mb-4 ml-10 ">
              محل الاقامه :
              </label>
              <input
                type="text"
                name="adress"
                value={studentData.adress}
                onChange={(e) => handleInputChange('adress', e.target.value)}
                className="w-96  bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 py-2 px-4 "
              /> </div>
              <div className='mt-2'><label htmlFor="college" className="mb-4 ml-10 ">
              الكلية :
              </label>
              <input
                type="text"
                name="college"
                value={studentData.college}
                className="w-96  bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 py-2 px-4 mr-8"
              /> </div>
              <div className="mb-4 mt-2">
              <label >
                كلمه السر:
                </label>
                <input
                  type="password"
                  name="password"
                  value={studentData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className=" w-96 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 mr-16"
                />
              </div>

              {/* Edit and Esc buttons */}
            {editMode ? (
            <div>
                <button className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded" onClick={handleEditData}>
                    حفظ التعديلات
                </button>
                <button className=" bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded mr-2" onClick={handleEsc}>
                    الغاء
                    </button>
                </div>
            ) : (
            <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" onClick={handleEdit}>
                تعديل
                </button>
            )}
                

              
              
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

export default EditStudentData;