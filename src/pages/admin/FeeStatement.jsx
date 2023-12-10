import { useState } from "react";
import MainSideBar from "../../components/minicomponent/MainSideBar";
import React from 'react';


const FeeStatement = () => {
  const [student, setStudent] = useState({ name: "wrwer" });
  const fieldContainer =
  "flex gap-3 p-3  min-w-full text-left text-sm font-ligh";
const fieldTitle = "font-bold text-2xl ";
const fieldValue = "text-xl text-gray-400";

  return (
    <div className=" pt-16 flex flex-row w-full h-screen ">
      <div className="w-64">
        <MainSideBar setStudent={setStudent} />
      </div>

      <div className=" flex-1">
        <div className="bg-mainBlue	rounded mt-8 mx-4 h-10 text-fuchsia-50 text-center text-2xl mt-4 rounded-lg text-mr-1">
            رسوم البيان - جامعة حلوان
        </div>
         <form className=" mr-6">
            <div className=" m-4 flex justify-between">
            <button
                  className="w-40 h-10 bg-slate-400 rounded-md hover:opacity-70 transition-all duration-200  hover:bg-slate-600 text-white font-bold py-2 px-4 border-b-4 border-slate-700 hover:border-slate-500 rounded"                >
                   توقيعات التقرير 
                </button>

                <button
                  className="w-40 h-10 bg-orange-600 rounded-md hover:opacity-70 transition-all duration-200  hover:bg-orange-400 text-white font-bold py-2 px-4 border-b-4 border-orange-700 hover:border-orange-500 rounded " >
                   طباعه التقرير 
                </button>
            </div>
                <div >
                  <span className={fieldTitle} >الاسم :</span>
                  <span className={fieldValue}></span>
                  
                </div>

                <div >
                  <span className={fieldTitle} > الرقم القومى :</span>
                  <span className={fieldValue}></span>
                </div>

                
                <div >
                  <span className={fieldTitle}> الكليه و الفرقه :</span>
                  <span className={fieldValue}></span>
                </div>

                
                <div >
                  <span className={fieldTitle} >  رقم شئون الطلاب :</span>
                  <span></span>
                </div>

                <div >
                  <span className={fieldTitle}> العنوان  :</span>
                  <span className={fieldValue}></span>
                </div>

                <div >
                  <span className={fieldTitle}> نوع السكن :</span>
                  <span className={fieldValue}></span>
                </div>
                <div className="flex items-center justify-center">
                <div className="bg-mainBlue	rounded mt-8 mx-4 h-10 text-fuchsia-50 text-center text-2xl mt-4 rounded-lg text-mr-1 w-1/5">الرسوم التى يجب دفعها عن شهر <span></span></div>
                </div>
                <div className="w-full">
      <table className="w-full border mt-4">
        <thead>
          <tr>
            <th className="w-3/4 border p-2">الرسوم </th>
            <th className="w-1/4 border p-2">المبلغ</th>
          </tr>
        </thead>
        <tbody>
            {/* {objects.length > 0 &&
              objects.map((object, index) => (
                <tr
                  className="border-b border-black"
                  key={`blk-meal-ind${index}`}
                >
                  <td>{object.fees}</td>
                  <td>{object.date}</td>
                  <td>{object.amount}</td>
                </tr>
              ))} */}
          </tbody>
      </table>
    </div>

    <div className="w-full mt-12">
      <table className="w-full border mt-4">
        <thead>
        <tr>
            <th className="w-1/6 border p-2">الرسوم</th>
            <th className="w-1/6 border p-2">تاريخ السداد</th>
            <th className="w-1/6 border p-2">رقم القسيمه</th>
            <th className="w-1/6 border p-2">مبلغ القسميه</th>
            <th className="w-1/6 border p-2">نوع السداد</th>
            <th className="w-1/6 border p-2">شهر السداد</th>
          </tr>
        </thead>
        <tbody>
            {/* {objects.length > 0 &&
              objects.map((object, index) => (
                <tr
                  className="border-b border-black"
                  key={`blk-meal-ind${index}`}
                >
                  <td>{object.fees}</td>
                  <td>{object.date}</td>
                  <td>{object.amount}</td>
                  <td>{object.fees}</td>
                  <td>{object.date}</td>
                  <td>{object.amount}</td>
                </tr>
              ))} */}
          </tbody>
      </table>
    </div>

    

    
    
         </form>
        

        
      </div>
    </div>
  );
};

export default FeeStatement;

  