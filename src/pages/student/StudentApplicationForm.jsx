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

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   setFormData({
  //     ...formData,
  //     image: file,
  //   });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.dismiss();
      return toast("كلمة المرور وتأكيد كلمة المرور غير متطابقين");
    }

    // Send formData to your backend API to insert into the database and create an account

    // const form = new FormData();
    // form.set("image", formData.image);
    // form.set("nationalId", formData.nationalId);
    // form.set("name", formData.name);
    // form.set("birthday", formData.birthday);
    // form.set("placeOfBirth", formData.placeOfBirth);
    // form.set("gender", formData.gender);
    // form.set("telephone", formData.telephone);
    // form.set("mobile", formData.mobile);
    // form.set("email", formData.email);
    // form.set("religion", formData.religion);
    // form.set("address", formData.address);
    // form.set("faculty", formData.faculty);
    // form.set("fatherName", formData.fatherName);
    // form.set("fatherNationalId", formData.fatherNationalId);
    // form.set("fatherOccupation", formData.fatherOccupation);
    // form.set("fatherNumber", formData.fatherNumber);
    // form.set("guardianName", formData.guardianName);
    // form.set("guardianNationalId", formData.guardianNationalId);
    // form.set("guardianRelationship", formData.guardianRelationship);
    // form.set("residence", formData.residence);
    // form.set("addressDetails", formData.addressDetails);
    // form.set("isDisabled", formData.isDisabled);
    // form.set("familyAbroad", formData.familyAbroad);
    // form.set("highschoolSpecialization", formData.highschoolSpecialization);
    // form.set("highschoolAbroad", formData.highschoolAbroad);
    // form.set("highschoolGrade", formData.highschoolGrade);
    // form.set("accomodationType", formData.accomodationType);
    // form.set("accomodationWithNutrition", formData.accomodationWithNutrition);
    // form.set("password", formData.password);

    setLoading(true);

    axios
      .post(`${API_ROUTE}/student/register`, formData)
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
                className="mr-4 w-96  bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 py-2 "
              />
            </label>

            <label className="mb-4 ml-4 ">
              الاسم :
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
              <label htmlFor="input1" className="mr-2">
                تاريخ الميلاد :
              </label>
              <input
                type="date"
                name="birthday"
                value={formData.birthday}
                onChange={handleChange}
                id="birthday"
                className=" mr-2  w-96 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 "
              ></input>
              <label htmlFor="input2" className="ml-2 mr-20">
                محل الميلاد :
              </label>
              <input
                type="text"
                id="PlaceOfBirth"
                name="placeOfBirth"
                onChange={handleChange}
                value={formData.placeOfBirth}
                className=" w-96 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 "
              ></input>
            </div>

            <div className="mb-4">
              <label htmlFor="input1" className="mr-2">
                النوع :{" "}
              </label>
              <input
                type="text"
                id="Gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className=" mr-10 w-96 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 ml-8"
              ></input>
              <label htmlFor="input2" className="ml-2 mr-20">
                {" "}
                الديانه :
              </label>
              <input
                type="text"
                id="Religion"
                name="religion"
                value={formData.religion}
                onChange={handleChange}
                className=" w-96 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 "
              ></input>
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
              <label htmlFor="input1" className="mr-2">
                التليفون :{" "}
              </label>
              <input
                type="text"
                id="telephone"
                name="telephone"
                value={formData.telephone}
                onChange={handleChange}
                required
                className="  w-96 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 ml-8"
              ></input>
              <label htmlFor="input2" className="ml-2 mr-20">
                {" "}
                الموبايل :
              </label>
              <input
                type="text"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                required
                className=" w-96 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 "
              ></input>
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
                type="text"
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
                  name="guardianNationalId"
                  value={formData.guardianNationalId}
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
              <label className="ml-2">
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
                  name="highschoolSpecialization"
                  value={formData.highschoolSpecialization}
                  onChange={handleChange}
                  required
                  className=" w-96 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 ml-20"
                />
              </label>
              <label className="mb-4">الثانويه بالخارج :</label>
              <input
                type="checkbox"
                name="highschoolAbroad"
                checked={formData.highschoolAbroad}
                onChange={handleChange}
                className="  px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
        focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 "
              />
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
              <label className="mb-4 ">
                نوع السكن :
                <input
                  type="text"
                  name="accomodationType"
                  value={formData.accomodationType}
                  onChange={handleChange}
                  required
                  className=" w-96 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 ml-20"
                />
              </label>
              <label className="mb-4">سكن بدون تغذيه :</label>
              <input
                type="checkbox"
                name="accomodationWithNutrition"
                checked={formData.accomodationWithNutrition}
                onChange={handleChange}
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
        focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 "
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>

            <button
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
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StudentApplicationForm;
