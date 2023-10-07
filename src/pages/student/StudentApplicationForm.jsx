import { useState } from "react";
import { API_ROUTE } from "../../config/env.js";
import axios from "axios";

function StudentApplicationForm() {
  const [formData, setFormData] = useState({
    nationalId: "",
    name: "",
    image: null,
    mobile: "",
    email: "",
    address: "",
    religion: "",
    collage: "",
    fatherName: "",
    fatherNationalId: "",
    fatherJob: "",
    fatherNumber: "",
    guardianName: "",
    guardianRelationship: "",
    residence: "",
    addressDetails: "",
    isDisabled: false,
    familyAbroad: false,
    apartmentType: "",
    password: "",
  });

  const [formError, setFormError] = useState(null);

  const handleChange = (e) => {
    let { name, value, type, checked } = e.target;
    checked = checked ? 1 : 0;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      image: file,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send formData to your backend API to insert into the database and create an account

    const form = new FormData();
    form.set("image", formData.image);
    form.set("nationalId", formData.nationalId);
    form.set("name", formData.name);
    form.set("mobile", formData.mobile);
    form.set("email", formData.email);
    form.set("religion", formData.religion);
    form.set("address", formData.address);
    form.set("faculty", formData.faculty);
    form.set("fatherName", formData.fatherName);
    form.set("fatherNationalId", formData.fatherNationalId);
    form.set("fatherOccupation", formData.fatherOccupation);
    form.set("fatherNumber", formData.fatherNumber);
    form.set("guardianName", formData.guardianName);
    form.set("guardianRelationship", formData.guardianRelationship);
    form.set("residence", formData.residence);
    form.set("addressDetails", formData.addressDetails);
    form.set("isDisabled", formData.isDisabled);
    form.set("familyAbroad", formData.familyAbroad);
    form.set("apartmentType", formData.apartmentType);
    form.set("password", formData.password);

    axios
      .post(`${API_ROUTE}/student/register`, form)
      .then((res) => {
        // setFormData({
        //   nationalId: "",
        //   name: "",
        //   image: "",
        //   mobile: "",
        //   email: "",
        //   address: "",
        //   religion: "",
        //   faculty: "",
        //   fatherName: "",
        //   fatherNationalId: "",
        //   fatherOccupation: "",
        //   fatherNumber: "",
        //   guardianName: "",
        //   guardianRelationship: "",
        //   residence: "",
        //   addressDetails: "",
        //   isDisabled: 0,
        //   familyAbroad: 0,
        //   apartmentType: "",
        //   password: "",
        // });
        setFormError(null);
        alert("Application submitted successfully!");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1>Student Application Form</h1>
      <div className="box flex items-center">
      <form onSubmit={handleSubmit} className="mt-20 flex flex-col  py-2 2xl:text-3xl text-2xl	pr-8 	">
        <div class="flex flex-col items-start">
        
        <label className="mb-4 ">
          الرقم القومى :
          <input
            type="number"
            name="nationalId"
            value={formData.nationalId}
            onChange={handleChange}
            required
            className="mr-4 w-96  bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 py-2 "
          />
       </label>
   
        <label className="mb-4 ml-4 ">
               الاسم         :
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mr-4 w-96  bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 py-2 px-4 "
          />
        </label>
        <div className="mb-4">
        <label for="input1" classname="mr-2">تاريخ الميلاد   :</label>
        <input type="text" id="birthday" className=" mr-2  w-96 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 "></input>
        <label for="input2" className="ml-2 mr-20">محل الميلاد :</label>
         <input type="text" id="PlaceOfBirth" className=" w-96 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 "></input>       
        </div>

        <div className="mb-4">
        <label for="input1" classname="mr-2" >النوع    : </label>
        <input type="text" id="Gender" className=" mr-10 w-96 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 ml-8"></input>
        <label for="input2" className="ml-2 mr-20"> الديانه :</label>
         <input type="text" id="Religion" className=" w-96 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 "></input>       
        </div>

        <label className="mb-4 ">
              محل الاقامه :     
          <input
            type="text"
            name="residence"
            value={formData.residence}
            onChange={handleChange}
            required
            className="mr-4 w-96 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 "
          />
        </label>

        <label className="mb-4 ">
          العنوان بالتفصيل :
          <textarea
            name="addressDetails"
            value={formData.addressDetails}
            onChange={handleChange}
            required
            className="mr-4  w-96 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 "
          />
        </label>

        <label className="mb-4 ">
          البريد الالكترونى :
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mr-4  w-96 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 "
          />
        </label>

        <div className="mb-4">
        <label for="input1" classname="mr-2" >التليفون     : </label>
        <input type="text" id="Gender" className="  w-96 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 ml-8"></input>
        <label for="input2" className="ml-2 mr-20"> الموبايل :</label>
         <input type="text" id="Religion" className=" w-96 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 "></input>       
        </div>

        

        <label className="mb-4 ">
          الكليه :
          <input
            type="text"
            name="faculty"
            value={formData.faculty}
            onChange={handleChange}
            required
            className="mr-4  w-96 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 "
          />
        </label>

        <label className="mb-4 ">
          اسم الاب :
          <input
            type="text"
            name="fatherName"
            value={formData.fatherName}
            onChange={handleChange}
            required
            className="mr-4  w-96 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 "
          />
        </label>
   
        <label className="mb-4 ">
          الرقم القومى للاب :
          <input
            type="number"
            name="fatherNationalId"
            value={formData.fatherNationalId}
            onChange={handleChange}
            required
            className="mr-4  w-96 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 "
          />
        </label>
        <div className="mb-4">
        <label className="mb-4 ">
            وظيفه الاب :
          <input
            type="text"
            name="fatherOccupation"
            value={formData.fatherOccupation}
            onChange={handleChange}
            required
              className="  w-96 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 ml-8"
          />
        </label>

        <label className="mb-4 ">
          رقم هاتف الاب :
          <input
            type="text"
            name="fatherNumber"
            value={formData.fatherNumber}
            onChange={handleChange}
            required
             className=" w-96 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 "
          />
        </label>
        </div>

        <label className="mb-4 ">
           اسم ولى الامر :    
          <input
            type="text"
            name="guardianName"
            value={formData.guardianName}
            onChange={handleChange}
            required
            className="mr-4  w-96 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 "
          />
        </label>

        <div className="mb-4">
        <label className="mb-4 ">
            الرقم القومى لولى الامر :
          <input
            type="text"
            name="fatherOccupation"
            value={formData.fatherOccupation}
            onChange={handleChange}
            required
              className="  w-96 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 ml-8"
          />
        </label>

        <label className="mb-4 ">
          صله ولى الامر :
          <input
            type="text"
            name="guardianRelationship"
            value={formData.guardianRelationship}
            onChange={handleChange}
            required
            className=" w-96 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 "
          />
        </label>

        </div>

     
        <div className="mb-4">
        <label className="ml-2" >
          ذوى الاحتياجات الخاصه :
          <input
            type="checkbox"
            name="isDisabled"
            checked={formData.isDisabled}
            onChange={handleChange}
            className="ml-20"
          />
        </label>

        <label className="mb-4 ">
         الاسره بالخارج :
          <input
            type="checkbox"
            name="familyAbroad"
            checked={formData.familyAbroad}
            onChange={handleChange}
           
          />
        </label>
        </div>

        <div className="mb-4">

        <label className="mb-4 ">
          الشعبه بالثانويه العامه:
          <input
            type="text"
            name="apartmentType"
            value={formData.apartmentType}
            onChange={handleChange}
            required
            className=" w-96 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 ml-20"
          />
        </label>
        <label className="mb-4">الثانويه بالخارج :</label>
        <input
        type="checkbox"
        className="  px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
        focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 "
        />
        
        </div>

        <label className="mb-4 ">
          مجموع الثانويه العامه :    
          <input
            onChange={handleChange}
            required
            className="mr-4  w-96 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 "
          />
        </label>
        <div className="mb-4">

        <label className="mb-4 ">
          نوع السكن : 
          <input
            type="text"
            name="apartmentType"
            value={formData.apartmentType}
            onChange={handleChange}
            required
            className=" w-96 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 ml-20"
          />
        </label>
        <label className="mb-4">سكن بدون تغذيه :</label>
        <input
        type="checkbox"
        className="  px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
        focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 "
        />
        </div>
        <div className="mb-4">

        <label className="ml-4 ">
          كلمه السر:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="mr-4  w-96 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 "
          />
        </label>
        <label className="mr-4">تاكيد كلمه المرور :</label>
        <input 
        className="  px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
        focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 "/>
        
        </div>

        <button type="submit" className="bg-blue-500 hover:opacity-70 hover:cursor-pointer transition-all duration-200 text-white font-bold py-2 px-4 rounded mx-2">تقديم طلب الالحتحاق </button>
        </div>
      </form>
      </div>
      {formError && <p className="error">{formError}</p>}
    </div>
  );
}

export default StudentApplicationForm;
