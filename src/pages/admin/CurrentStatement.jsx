import { useState } from "react";
import MainSideBar from "../../components/minicomponent/MainSideBar";
import Records from "../../assets/fakeData/Records.json";
import holidayData from "../../assets/fakeDaTA/holidatData.json";

const CurrentStatement = () => {
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
                  <span className={fieldTitle}> النوع:</span>
                  <span className={fieldValue}></span>
                </div>

                
                <div >
                  <span className={fieldTitle} >  تاريخ الميلاد :</span>
                  <span></span>
                </div>

                <div >
                  <span className={fieldTitle}> الديانه  :</span>
                  <span className={fieldValue}></span>
                </div>

                <div >
                  <span className={fieldTitle}> البريد الالكترونى  :</span>
                  <span className={fieldValue}></span>
                </div>
                 
                <div >
                  <span className={fieldTitle}> الكليه و الفرقه  :</span>
                  <span className={fieldValue}></span>
                </div>

                <div >
                  <span className={fieldTitle}> رقم شئون الطلاب  :</span>
                  <span className={fieldValue}></span>
                </div>

                <div >
                  <span className={fieldTitle}> التقدير  :</span>
                  <span className={fieldValue}></span>
                </div>

                <div >
                  <span className={fieldTitle}> العنوان  :</span>
                  <span className={fieldValue}></span>
                </div>

                <div >
                  <span className={fieldTitle}> الفئه  :</span>
                  <span className={fieldValue}></span>
                </div>

                <div >
                  <span className={fieldTitle}> رقم الملف  :</span>
                  <span className={fieldValue}></span>
                </div>

                <div >
                  <span className={fieldTitle}> حاله القبول:</span>
                  <span className={fieldValue}></span>
                </div>

                <div >
                  <span className={fieldTitle}> بيانات ولى الامر:</span>
                  <span className={fieldValue}></span>
                </div>

                <div >
                  <span className={fieldTitle}> طباعه البطاقه:</span>
                  <span className={fieldValue}></span>
                </div>

                <div className="flex items-center justify-center">
                <div className="bg-mainBlue	rounded mt-8 mx-4 h-10 text-fuchsia-50 text-center text-2xl mt-4 rounded-lg text-mr-1 w-1/5">الرسوم التى يجب دفعها عن شهر <span></span></div>
                </div>
    

    
    
         </form>
        

        
      </div>
    </div>
  );
};

export default CurrentStatement