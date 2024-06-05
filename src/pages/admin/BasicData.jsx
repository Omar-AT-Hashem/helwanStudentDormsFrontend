/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { API_ROUTE } from "../../config/env.js";
import MainSideBar from "../../components/minicomponent/MainSideBar";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Loader2 } from "lucide-react";

const BasicData = () => {
  if (sessionStorage.getItem("token")) {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${sessionStorage.getItem("token")}`;
  }

  const [loading, setLoading] = useState(0);

  const [formData, setFormData] = useState(null);
  const [editableImage, setEditableImage] = useState(false);
  const [error, setError] = useState(null);
  const [isEditable, setIsEditable] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [faculties, setFaculties] = useState([]);

  const [userData, setUserData] = useState();

  // State variable to track the selected image file
  const [selectedImage, setSelectedImage] = useState(null);
  const [permissions, setPermissions] = useState([
    {
      superAdmin: 0,
      editStudentData: 0,
      deleteStudent: 0,
    },
  ]);
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

  console.log(selectedStudentData);
  console.log(formData);

  const [loadPage, setLoadPage] = useState(false);

  useEffect(() => {
    axios
      .post(`${API_ROUTE}/v1/employee/verify-token-page-load`)
      .then((res) => {
        if (res.status == 200) {
          return setLoadPage(true);
        }
        if (res.status == 401 || res.status == 403) {
          return setLoadPage(false);
        }
      })
      .catch(() => {
        return setLoadPage(false);
      });
  });

  useEffect(() => {
    setLoading((prev) => prev + 1);
    axios
      .get(
        `${API_ROUTE}/v1/employee/permissions/${sessionStorage.getItem("id")}`
      )
      .then((res) => {
        setLoading((prev) => prev - 1);
        setPermissions(res.data);
        if (res.data.superAdmin) {
          setIsEditable(res.data.superAdmin);
        } else {
          setIsEditable(res.data.editStudentData);
        }
      })
      .catch(() => {
        toast.dismiss();
        toast("حدث خطأ");
        setLoading((prev) => prev - 1);
        return;
      });
  }, []);

  useEffect(() => {
    setFormData(selectedStudentData);
  }, [selectedStudentData]);

  useEffect(() => {
    setLoading((prev) => prev + 1);
    axios
      .get(`${API_ROUTE}/v1/university-structure/get-faculties`)
      .then((res) => {
        setLoading((prev) => prev - 1);
        setFaculties(res.data);
        return;
      })
      .catch((err) => {
        setLoading((prev) => prev - 1);
        toast.dismiss();
        toast("حدث خطأ");
        return;
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
      form.set("id", selectedStudentData.id);
      await axios
        .put(`${API_ROUTE}/v1/student/update-image`, form)
        .then((res) => {
          setFormData(res.data);
          const ind1 = studentList.findIndex(
            (ele) => ele.id == selectedStudentData.id
          );
          const ind2 = filteredList.findIndex(
            (ele) => ele.id == selectedStudentData.id
          );
          setStudentList((prev) => {
            prev[ind1] = { ...formData, image: res.data.filePath };
            return prev;
          });
          setFilteredList((prev) => {
            prev[ind2] = { ...formData, image: res.data.filePath };
            return prev;
          });
          setSelectedStudentData({ ...formData, image: res.data.filePath });

          setEditableImage(false);
        })
        .catch((err) => {
          toast.dismiss();
          toast("حدث خطأ");
          return;
        });
    }

    if (e.target.name == "delete") {
      await axios.put(`${API_ROUTE}/v1/student/delete-image`, {
        id: selectedStudentData.id,
      });
      const ind = studentList.findIndex(
        (ele) => ele.id == selectedStudentData.id
      );
      const ind2 = filteredList.findIndex(
        (ele) => ele.id == selectedStudentData.id
      );
      setStudentList((prev) => {
        prev[ind] = { ...formData, image: null };
        return prev;
      });
      setFilteredList((prev) => {
        prev[ind2] = { ...formData, image: null };
        return prev;
      });
      setSelectedStudentData({ ...formData, image: null });
      setEditableImage(false);
    }
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    setLoading((prev) => prev + 1);
    axios
      .put(`${API_ROUTE}/v1/student/`, formData)
      .then((res) => {
        const ind = studentList.findIndex(
          (ele) => ele.id == selectedStudentData.id
        );
        const ind2 = filteredList.findIndex(
          (ele) => ele.id == selectedStudentData.id
        );

        setStudentList((prev) => {
          prev[ind] = { ...formData };
          return prev;
        });

        setFilteredList((prev) => {
          prev[ind2] = { ...formData };
          return prev;
        });

        setSelectedStudentData({ ...formData });

        setLoading((prev) => prev - 1);
        axios.post(`${API_ROUTE}/v1/log`, {
          adminId: sessionStorage.getItem("id"),
          adminName: sessionStorage.getItem("name"),
          adminUsername: sessionStorage.getItem("username"),
          action: `تم تعديل بيانات الطالب ${selectedStudentData.name} و الرقم القومى ${selectedStudentData.nationalId}`,
          objectId: selectedStudentData.nationalId,
          objectName: selectedStudentData.name,
        });
        setLoading(false);
        toast.dismiss();
        toast("تم التعديل بنجاح");
      })
      .catch((err) => {
        setLoading((prev) => prev - 1);
        if (err.response.request.status == 409) {
          toast.dismiss();
          return toast("المستخدم موجود في النظام");
        }
        toast.dismiss();
        toast("حدث خطأ");
      });
  };

  const handleDeleteStudent = () => {
    setLoading((prev) => prev + 1);
    axios
      .delete(`${API_ROUTE}/v1/student/${selectedStudentData.id}`)
      .then((res) => {
        setLoading((prev) => prev - 1);
        axios.post(`${API_ROUTE}/v1/log`, {
          adminId: sessionStorage.getItem("id"),
          adminName: sessionStorage.getItem("name"),
          adminUsername: sessionStorage.getItem("username"),
          action: `تم حذف بيانات الطالب ${selectedStudentData.name} و الرقم القومى ${selectedStudentData.nationalId}`,
          objectId: selectedStudentData.nationalId,
          objectName: selectedStudentData.name,
        });
        const ind = studentList.findIndex(
          (ele) => ele.id == selectedStudentData.id
        );
        const ind2 = filteredList.findIndex(
          (ele) => ele.id == selectedStudentData.id
        );
        setStudentList((prev) => {
          prev.splice(ind, 1);
          return prev;
        });
        setFilteredList((prev) => {
          prev.splice(ind2, 1);
          return prev;
        });
        setSelectedStudentData([]);
        setFormData(null);
        toast.dismiss();
        toast("تم الحذف بنجاح");
      })
      .catch((err) => {
        setLoading((prev) => prev - 1);
        toast.dismiss();
        toast("حدث خطأ");
      });
  };

  return (
    formData && (
      <div className="pt-16 flex w-full h-screen">
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
            filters={filters}
            setFilters={setFilters}
            filteredList={filteredList}
            setFilteredList={setFilteredList}
          />
        </div>
        {/* Main content area */}

        {/* Header */}
        <div>
          <div className="bg-mainBlue w-full h-10 text-fuchsia-50 text-center text-2xl mt-8 rounded-lg text-mr-1">
            بيانات اساسية - جامعة حلوان
          </div>

          <div className="flex justify-between mx-5 ml-20 my-2 border-2 border-black p-3">
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
              {!editableImage &&
                (Boolean(permissions.superAdmin) ||
                  Boolean(permissions.editStudentData)) && (
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
          <form className="mt-20 flex flex-col  py-2 2xl:text-3xl text-2xl	pr-8 	">
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
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 py-2 mr-20"
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
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 mr-[72px]"
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
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 mr-8"
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
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 mr-[134px]"
                  >
                    <option>---</option>

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
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 mr-[78px]"
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
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 mr-[32px]"
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
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 mr-[28px] "
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
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 mr-8"
                  />
                </label>
              </div>

              <label className="mb-4 ">
                الكليه :
                <select
                  name="faculty"
                  value={formData.faculty}
                  onChange={handleChange}
                  required
                  className=" w-96 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
          focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 mr-[140px]"
                >
                  {formData.faculty ? (
                    <option>{formData.faculty}</option>
                  ) : (
                    <option>----</option>
                  )}
                  {faculties.map((faculty) => (
                    <option key={faculty.id}>{faculty.name}</option>
                  ))}
                </select>
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
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 mr-[105px]"
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
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 mr-5"
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
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 mr-20"
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
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 mr-5"
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
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 mr-14"
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
                <label htmlFor="highschoolSpecialization">
                  الشعبه بالثانويه العامه:
                </label>
                <select
                  name="highschoolSpecialization"
                  value={formData.highschoolSpecialization}
                  onChange={handleChange}
                  disabled={!isEditable}
                  required
                  className=" w-96 px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 text-xl mr-6"
                >
                  {formData.highschoolSpecialization ? (
                    <option>{formData.highschoolSpecialization}</option>
                  ) : (
                    <option>---</option>
                  )}
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
                  name="grade"
                  value={formData.grade}
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
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 mr-[120px]"
                  >
                    <option>سكن عادي</option>
                    <option>سكن مميز</option>
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
            <div className="flex justify-between ml-28 mt-10 mb-10">
              <div className="w-auto items-center">
                {(Boolean(permissions.superAdmin) ||
                  Boolean(permissions.editStudentData)) && (
                  <button
                    className={`bg-blue-500 w-56 hover:opacity-70 h-14${
                      loading && "opacity-70 hover:cursor-default"
                    } hover:cursor-pointer transition-all duration-200 text-white font-bold py-2 px-4 rounded mx-2 flex justify-center`}
                    onClick={handleSaveChanges}
                    disabled={loading}
                  >
                    {loading ? (
                      <Loader2 className="animate-spin duration-200" />
                    ) : (
                      <span>حفظ التعديل </span>
                    )}
                  </button>
                )}
              </div>

              <div className="w-auto items-center">
                {(Boolean(permissions.superAdmin) ||
                  Boolean(permissions.deleteStudent)) && (
                  <button
                    className={`bg-red-500 w-56 hover:opacity-70 h-14${
                      loading && "opacity-70 hover:cursor-default"
                    } hover:cursor-pointer transition-all duration-200 text-white font-bold py-2 px-4 rounded mx-2 flex justify-center`}
                    onClick={handleDeleteStudent}
                    disabled={loading}
                  >
                    {loading ? (
                      <Loader2 className="animate-spin duration-200" />
                    ) : (
                      <span>ازالة الطالب </span>
                    )}
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default BasicData;
