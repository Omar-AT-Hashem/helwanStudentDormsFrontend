import { useState } from "react";
import { API_ROUTE } from "../../config/env.js";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Loader2 } from "lucide-react";

function StudentApplicationForm() {
  const [formData, setFormData] = useState({
    nationalId: "",
    name: "",
    birthday: "",
    placeOfBirth: "",
    gender: "",
    telephone: "",
    mobile: "",
    email: "",
    address: "",
    religion: "",
    faculty: "",
    fatherName: "",
    fatherNationalId: "",
    fatherOccupation: "",
    fatherNumber: "",
    guardianName: "",
    guardianNationalId: "",
    guardianRelationship: "",
    residence: "",
    addressDetails: "",
    isDisabled: 0,
    familyAbroad: 0,
    highschoolAbroad: 0,
    highschoolSpecialization: "",
    highschoolGrade: "",
    accomodationType: "",
    accomodationWithNutrition: 0,
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    let { name, value, type, checked } = e.target;
    checked = checked ? 1 : 0;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  console.log(formData.gender);


  console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.dismiss();
      return toast("كلمة المرور وتأكيد كلمة المرور غير متطابقين");
    }


    setLoading(true);

    axios
      .post(`${API_ROUTE}/v1/student/register`, formData)
      .then((res) => {
        setFormData({
          nationalId: "",
          name: "",
          birthday: "",
          placeOfBirth: "",
          gender: "",
          telephone: "",
          mobile: "",
          email: "",
          address: "",
          religion: "",
          faculty: "",
          fatherName: "",
          fatherNationalId: "",
          fatherOccupation: "",
          fatherNumber: "",
          guardianName: "",
          guardianNationalId: "",
          guardianRelationship: "",
          residence: "",
          addressDetails: "",
          isDisabled: 0,
          familyAbroad: 0,
          highschoolAbroad: 0,
           highschoolSpecialization: "",
          highschoolGrade: "",
          accomodationType: "",
          accomodationWithNutrition: 0,
          password: "",
          confirmPassword: "",
        });

        setLoading(false);
        toast.dismiss();
        toast("تم تقديم الطلب بنجاح");
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.request.status == 409) {
          toast.dismiss();
          return toast("المستخدم موجود في النظام");
        }

        toast.dismiss();
        toast("حدث خطأ");
      });
  };

  return (
    <div>
      <h1>Student Application Form</h1>
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
      <div className="box flex items-center">
        <form
          onSubmit={handleSubmit}
          className="mt-20 flex flex-col  py-2 2xl:text-3xl text-2xl	pr-8 	"
          noValidate
        >
          <div className="flex flex-col items-start">
            <label className="mb-4 ">
              الرقم القومى :
              <input
                type="text"
                name="nationalId"
                value={formData.nationalId}
                onChange={handleChange}
                required
                className=" w-96 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 py-2 mr-24"
              />
            </label>

            <label htmlFor="name" className="mb-4 ml-10 ">
              الاسم :
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-96  bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 py-2 px-4 mr-36"
              />
            </label>
            <div className="mb-4">
              <label htmlFor="input1">
                تاريخ الميلاد :
              
              <input
                type="date"
                name="birthday"
                value={formData.birthday}
                onChange={handleChange}
                id="birthday"
                className="w-96 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 mr-24"
              /></label>
              <label htmlFor="input2" className="ml-2 mr-20">
                محل الميلاد :
              
              <input
                type="text"
                id="PlaceOfBirth"
                name="placeOfBirth"
                onChange={handleChange}
                value={formData.placeOfBirth}
                className=" w-96 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 mr-10"
              /></label>
            </div>

            <div className="mb-4">
              <label htmlFor="input1">
                النوع :{" "}
              
              <select
                id="Gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-96 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 mr-36">
                            <option>----</option>
                            <option value="F">انثى</option>
                            <option value="M">ذكر</option>

            </select>
            
            </label>
              <label htmlFor="input2" className="ml-20 mr-20">
                {" "}
                الديانه :
              </label>
              <select
                id="Religion"
                name="religion"
                value={formData.religion}
                onChange={handleChange}
                className=" w-96 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 ">
              <option>----</option>
                            <option>مسلم</option>
                            <option>مسيحى</option>
            </select>
             
            </div>

            <label className="mb-4 ">
              محل الاقامه :
              <input
                type="text"
                name="residence"
                value={formData.residence}
                onChange={handleChange}
                required
                className="w-96 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 mr-20"
              />
            </label>

            <label className="mb-4 ">
              العنوان بالتفصيل :
              <textarea
                name="addressDetails"
                value={formData.addressDetails}
                onChange={handleChange}
                required
                className="w-96 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 mr-11"
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
                className="w-96 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 mr-12 "
              />
            </label>

            <div className="mb-4">
              <label htmlFor="input1">
                التليفون :{" "}
              
              <input
                type="text"
                id="telephone"
                name="telephone"
                value={formData.telephone}
                onChange={handleChange}
                required
                className="  w-96 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 mr-28"
              /></label>
              <label htmlFor="input2" className="ml-2 mr-28">
                {" "}
                الموبايل :
              
              <input
                type="text"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                required
                className=" w-96 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 mr-20"
              /></label>
            </div>

            <label className="mb-4 ">
              الكليه :
              <input
                type="text"
                name="faculty"
                value={formData.faculty}
                onChange={handleChange}
                required
                className="w-96 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 mr-36"
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
                className=" w-96 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 mr-28"
              />
            </label>

            <label className="mb-4 ">
              الرقم القومى للاب :
              <input
                type="text"
                name="fatherNationalId"
                value={formData.fatherNationalId}
                onChange={handleChange}
                required
                className="w-96 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 mr-12"
              />
            </label>
            <div className="mb-4">
              <label>
                وظيفه الاب :
                <input
                  type="text"
                  name="fatherOccupation"
                  value={formData.fatherOccupation}
                  onChange={handleChange}
                  required
                  className="  w-96 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 mr-24"
                />
              </label>

              <label className="mb-4 mr-20 ">
                رقم هاتف الاب :
                <input
                  type="text"
                  name="fatherNumber"
                  value={formData.fatherNumber}
                  onChange={handleChange}
                  required
                  className=" w-96 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 mr-6"
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
                className="w-96 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 mr-20"
              />
            </label>

            <div className="mb-4">
              <label >
                الرقم القومى لولى الامر :
                <input
                  type="text"
                  name="guardianNationalId"
                  value={formData.guardianNationalId}
                  onChange={handleChange}
                  required
                  className="  w-96 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 mr-2"
                />
              </label>

              <label className="mb-4 mr-20">
                صله ولى الامر :
                <input
                  type="text"
                  name="guardianRelationship"
                  value={formData.guardianRelationship}
                  onChange={handleChange}
                  required
                  className=" w-96 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 mr-6"
                />
              </label>
            </div>

            <div className="mb-4">
              <label>
                ذوى الاحتياجات الخاصه :
                <input
                  type="checkbox"
                  name="isDisabled"
                  checked={formData.isDisabled}
                  onChange={handleChange}
                  className="mr-4"
                />
              </label>

              <label className="mb-4 mr-56">
                الاسره بالخارج :
                <input
                  type="checkbox"
                  name="familyAbroad"
                  checked={formData.familyAbroad}
                  onChange={handleChange}
                  className="mr-4"
                />
              </label>
            </div>

            <div className="mb-4">
              <select 
                name="highschoolSpecialization"
                value={formData.highschoolSpecialization}
                onChange={handleChange}
                required
                className=" w-96 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
          focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 mr-7"
              >
                الشعبه بالثانويه العامه:
                <option>---</option>
                <option>علمى علوم</option>
                <option>علمى رياضة</option>
                <option>أدبى</option>
                <option>أزهرى علمى</option>
                <option>أزهرى أدبى</option>
                <option>معاهد فنية ثلاث سنوات</option>
                <option>معاهد فنية اربعه سنوات</option>
                <option>معاهد فنية خمس سنوات</option>
                <option>دبلومات فنية</option>
                <option>شهادات معادلة</option>
                <option>مدارس STEM للعلوم والتكنولوجيا</option>
                
              </select>
              <label className="mb-4 mr-20">الثانويه بالخارج :
              <input
                type="checkbox"
                name="highschoolAbroad"
                checked={formData.highschoolAbroad}
                onChange={handleChange}
                className="  px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
        focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 mr-6"
              /></label>
</div>
            <label className="mb-4 ">
              مجموع الثانويه العامه :
              <input
                onChange={handleChange}
                name="highschoolGrade"
                value={formData.highschoolGrade}
                required
                className="mr-4  w-96 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 "
              />
            </label>
            <div className="mb-4">
              <label>
                نوع السكن :
                <select
                  name="accomodationType"
                  value={formData.accomodationType}
                  onChange={handleChange}
                  required
                  className=" w-96 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 mr-24">
              <option>----</option>
              <option>سكن عادى</option>
                </select>
              </label>
              <label className="mb-4 mr-20">سكن بدون تغذيه :
              <input
                type="checkbox"
                name="accomodationWithNutrition"
                checked={formData.accomodationWithNutrition}
                onChange={handleChange}
                className="  px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
        focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 mr-4"
              /></label>
            </div>
            <div className="mb-4">
              <label >
                كلمه السر:
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className=" w-96 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 mr-24"
                />
              </label>
              <label className="mr-24">تاكيد كلمه المرور :
              <input
                className=" w-96 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
        focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 mr-4"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              /></label>
            </div>

            {/* <button
              type="submit"
              className={`bg-blue-500 w-56 h-11 hover:opacity-70 ${
                loading && "opacity-70 hover:cursor-default"
              } hover:cursor-pointer transition-all duration-200 text-white font-bold py-2 px-4 rounded mx-2 flex justify-center`}
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="animate-spin duration-200" />
              ) : (
                <span> تقديم طلب الالحتحاق </span>
              )}
            </button> */}
          </div>
          <div className="items-center">
          <div className="text-neutral-500 flex gap-2 mx-5 my-3   border-yellow-600 bg-yellow-50 w-[80vw] min- h-suto   resize-none p-1 h-full  border rounded-2xl ml-96">
            <h3 className=" mt-0 mr-2">ملاحظات هامة </h3>
            <ul class="list-disc mt-8 text-2xl">
              <li>التقدم للمدن الجامعية من خلال استمارة التقديم الالكترونى مجانى بالكامل.</li>
              <li>يجب الاحتفاظ بكلمة المرور لأهميتها فى تعديل بياناتك كما سيتم استخدامها لاحقا عند إقامتك بالمدينة .</li>
              <li>لوحظ أن العديد من الطلاب يختارون السكن المميز ويجب الإشارة بأن السكن المميز له تكلفة عالية بالنسبة للسكن العادى .</li>
              <li>يجب اختيار الجامعه والنوع (ذكر/ انثى) لتظهر انواع السكن المميز .</li>
              <li>ذوى الاحتياجات الخاصة لا يدخل فى التنسيق .</li>
              
            </ul></div>
          </div>
           <div>
                <input type="checkbox"/>
                <label className="mr-4 text-lg		">أقر بأن البيانات (محل الإقامة - التقدير - الفرقة/الكلية) صحيحة طبقاً للأوراق الرسمية على أن أقدم هذه الأوراق عند حضوري للمدينة في حالة القبول وإذا ثبت أي خطأ في البيانات يتم تحويلي للشئون القانونية وفصلي نهائياً من المدينة .</label>
              <div className="mt-10 w-auto items-center">
               { <button
              type="submit"
              className={`bg-blue-500 w-56 hover:opacity-70 h-14${
                loading && "opacity-70 hover:cursor-default"
              } hover:cursor-pointer transition-all duration-200 text-white font-bold py-2 px-4 rounded mx-2 flex justify-center`}
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="animate-spin duration-200" />
              ) : (
                <span> تقديم طلب الالحتحاق </span>
              )}
            </button>
}
            </div>
           </div>
             
          
        </form>
      </div>
    </div>
  );
}

export default StudentApplicationForm;
