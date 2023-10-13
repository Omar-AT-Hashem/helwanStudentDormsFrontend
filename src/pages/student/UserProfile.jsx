import { useEffect, useState } from "react";
import axios from "axios";
import { API_ROUTE } from "../../config/env";
import { Loader2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

function UserProfile() {
  if (sessionStorage.getItem("token")) {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${sessionStorage.getItem("token")}`;
  }

  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editableImage, setEditableImage] = useState(false);
  const [error, setError] = useState(null);
  const [isEditable, setIsEditable] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  // State variables for user data
  // const [userData, setUserData] = useState({
  //   image: '', // Image URL
  //   nationalId: '',
  //   name: '',
  //   birthday: '',
  //   placeOfBirth: '',
  //   gender: '',
  //   telephone: '',
  //   mobile: '',
  //   email: '',
  //   religion: '',
  //   faculty: '',
  //   fatherName: '',
  //   fatherNationalId: '',
  //   fatherOccupation: '',
  //   fatherNumber: '',
  //   guardianName: '',
  //   guardianNationalId: '',
  //   guardianRelationship: '',
  //   residence: '',
  //   addressDetails: '',
  //   isDisabled: 0,
  //   familyAbroad: 0,
  //   highschoolAbroad: 0,
  //   highschoolSpecialization: '',
  //   highschoolGrade: '',
  //   accomodationType: '',
  //   accomodationWithNutrition: '',
  //   password: '',
  //   applicationStatus: '',
  // });

  const [userData, setUserData] = useState();

  // State variable to track the selected image file
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    axios
      .get(
        `${API_ROUTE}/v1/student/get-by-nationalId/${sessionStorage.getItem(
          "nationalId"
        )}`
      )
      .then((response) => {
        console.log(response);
        setFormData({ ...response.data, id: sessionStorage.getItem("id") });
        setUserData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(err.response ? err.response.data.error : "An error occurred");
        setLoading(false);
      });
  }, []);

  // Function to handle the image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the first selected file
    // Set the selected image file
    setSelectedImage(file);
    // Display a preview of the selected image
  };

  const handleChange = (e) => {
    let { name, value, type, checked } = e.target;
    checked = checked ? 1 : 0;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleEditImage = async (e) => {
    if (e.target.name == "edit") {
      setEditableImage(true);
    }
    if (e.target.name == "cancel") {
      setEditableImage(false);
    }
    if (e.target.name == "upload") {
      const form = new FormData();
      form.set("image", selectedImage);
      form.set("id", sessionStorage.getItem("id"));
      await axios.put(`${API_ROUTE}/v1/student/update-image`, form);
      const res = await axios.get(
        `${API_ROUTE}/v1/student/get-by-nationalId/${sessionStorage.getItem(
          "nationalId"
        )}`
      );
      setFormData(res.data);
      setEditableImage(false);
    }
    if (e.target.name == "delete") {
      await axios.put(`${API_ROUTE}/v1/student/delete-image`, {
        id: sessionStorage.getItem("id"),
      });
      const res = await axios.get(
        `${API_ROUTE}/v1/student/get-by-nationalId/${sessionStorage.getItem(
          "nationalId"
        )}`
      );
      setFormData(res.data);
      setEditableImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    sessionStorage.setItem("nationalId", formData.nationalId);

    axios
      .put(`${API_ROUTE}/v1/student/`, formData)
      .then((res) => {
        setLoading(false);
        toast.dismiss();
        toast("تم التعديل بنجاح");
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
    formData && (
      <div className="pt-16 ">
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
        <div className="flex justify-between mx-2 ml-20 my-2 bg-amber-50">
          <div className="flex flex-col">
            <span className="text-2xl">
              <span className="text-red-600 font-bold">الاسم:</span>{" "}
              {formData.name}
            </span>
            <span className="text-2xl">
              <span className="text-red-600 font-bold">الرقم القومي:</span>{" "}
              {formData.nationalId}
            </span>
          </div>
          <div className="flex flex-col items-end">
            <img
              src={formData.image ? formData.image : "/default-photo.jpg"}
              className="w-40"
              alt="default image"
            />
            {!editableImage && (
              <button
                className="bg-blue-600 text-white font-bold w-20 h-10 hover:opacity-70"
                name="edit"
                onClick={handleEditImage}
              >
                تعديل
              </button>
            )}
            {editableImage && (
              <div>
                <input type="file" onChange={handleImageChange} />
                <button
                  className="bg-blue-600 text-white font-bold w-20 h-10 hover:opacity-70"
                  name="upload"
                  onClick={handleEditImage}
                >
                  رفع
                </button>
                <button
                  className="bg-blue-600 text-white font-bold w-20 h-10 hover:opacity-70"
                  name="delete"
                  onClick={handleEditImage}
                >
                  أزاله
                </button>

                <button
                  className="bg-blue-600 text-white font-bold w-20 h-10 hover:opacity-70"
                  name="cancel"
                  onClick={handleEditImage}
                >
                  ألغاء
                </button>
              </div>
            )}
          </div>
        </div>
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
                disabled={!isEditable}
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
                disabled={!isEditable}
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
                  disabled={!isEditable}
                  className="w-96 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 mr-24"
                />
              </label>
              <label htmlFor="input2" className="ml-2 mr-20">
                محل الميلاد :
                <input
                  type="text"
                  id="PlaceOfBirth"
                  name="placeOfBirth"
                  onChange={handleChange}
                  value={formData.placeOfBirth}
                  disabled={!isEditable}
                  className=" w-96 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 mr-10"
                />
              </label>
            </div>

            <div className="mb-4">
              <label htmlFor="input1">
                النوع :{" "}
                <select
                  id="Gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  disabled={!isEditable}
                  className="w-96 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 mr-36"
                >
                  <option>----</option>
                  <option>انثى</option>
                  <option>ذكر</option>
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
                disabled={!isEditable}
                className=" w-96 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 "
              >
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
                disabled={!isEditable}
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
                disabled={!isEditable}
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
                disabled={!isEditable}
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
                  disabled={!isEditable}
                  required
                  className="  w-96 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 mr-28"
                />
              </label>
              <label htmlFor="input2" className="ml-2 mr-28">
                {" "}
                الموبايل :
                <input
                  type="text"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  disabled={!isEditable}
                  required
                  className=" w-96 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 mr-20"
                />
              </label>
            </div>

            <label className="mb-4 ">
              الكليه :
              <input
                type="text"
                name="faculty"
                value={formData.faculty}
                onChange={handleChange}
                disabled={!isEditable}
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
                disabled={!isEditable}
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
                disabled={!isEditable}
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
                  disabled={!isEditable}
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
                  disabled={!isEditable}
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
                disabled={!isEditable}
                required
                className="w-96 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 mr-20"
              />
            </label>

            <div className="mb-4">
              <label>
                الرقم القومى لولى الامر :
                <input
                  type="text"
                  name="guardianNationalId"
                  value={formData.guardianNationalId}
                  onChange={handleChange}
                  disabled={!isEditable}
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
                  disabled={!isEditable}
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
                  disabled={!isEditable}
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
                  disabled={!isEditable}
                  className="mr-4"
                />
              </label>
            </div>

            <div className="mb-4">
              <select>
                الشعبه بالثانويه العامه:
                <input
                  name="highschoolSpecialization"
                  value={formData.highschoolSpecialization}
                  onChange={handleChange}
                  disabled={!isEditable}
                  required
                  className=" w-96 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 mr-7"
                />
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
              <label className="mb-4 mr-20">
                الثانويه بالخارج :
                <input
                  type="checkbox"
                  name="highschoolAbroad"
                  checked={formData.highschoolAbroad}
                  disabled={!isEditable}
                  onChange={handleChange}
                  className="  px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
        focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 mr-6"
                />
              </label>
            </div>
            <label className="mb-4 ">
              مجموع الثانويه العامه :
              <input
                onChange={handleChange}
                name="highschoolGrade"
                value={formData.highschoolGrade}
                disabled={!isEditable}
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
                  disabled={!isEditable}
                  required
                  className=" w-96 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 mr-24"
                >
                  <option>سكن عادى</option>
                </select>
              </label>
              <label className="mb-4 mr-20">
                سكن بدون تغذيه :
                <input
                  type="checkbox"
                  name="accomodationWithNutrition"
                  checked={formData.accomodationWithNutrition}
                  onChange={handleChange}
                  disabled={!isEditable}
                  className="  px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
        focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 mr-4"
                />
              </label>
            </div>
          </div>
          <div>
            <div className="mt-10 w-auto items-center">
              {
                <button
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
    )
  );
}

export default UserProfile;
