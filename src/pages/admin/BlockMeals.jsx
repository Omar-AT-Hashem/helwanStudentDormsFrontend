import { useEffect, useState } from "react";
import MainSideBar from "../../components/minicomponent/MainSideBar";
import { useOutletContext } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { API_ROUTE } from "../../config/env";
import Loading from "../../components/minicomponent/Loading";

const BlockMeals = () => {
  if (sessionStorage.getItem("token")) {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${sessionStorage.getItem("token")}`;
  }

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

  const [form, setForm] = useState({});
  const [objects, setObjects] = useState([]);
  const [loading, setLoading] = useState(0);

  const [permissions, setPermissions] = useState([
    {
      manageBlockMeals: 0,
      superAdmin: 0,
    },
  ]);

  useEffect(() => {
    setLoading((prev) => prev + 1);
    axios
      .get(
        `${API_ROUTE}/v1/employee/permissions/${sessionStorage.getItem("id")}`
      )
      .then((res) => {
        setLoading((prev) => prev - 1);
        setPermissions(res.data);
      })
      .catch(() => {
        setLoading((prev) => prev - 1);
        return;
      });
  }, []);

  useEffect(() => {
    setLoading((prev) => prev + 1);
    if (selectedStudentData) {
      axios
        .get(
          `${API_ROUTE}/v1/blockmeals/get-by-studentId/${selectedStudentData.id}`
        )
        .then((res) => {
          setLoading((prev) => prev - 1);
          setObjects(res.data);
        })
        .catch((err) => {
          setLoading((prev) => prev - 1);
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
    if (selectedStudentData) {
      setLoading((prev) => prev + 1);
      axios
        .post(`${API_ROUTE}/v1/blockmeals/`, {
          ...form,
          studentId: selectedStudentData.id,
        })
        .then((res) => {
          setLoading((prev) => prev - 1);
          //handle Logs
          axios.post(`${API_ROUTE}/v1/log`, {
            adminId: sessionStorage.getItem("id"),
            adminName: sessionStorage.getItem("name"),
            adminUsername: sessionStorage.getItem("username"),
            action: `اضافه وجبه محجوبه للطالب ${selectedStudentData.name} و الرقم القومي ${selectedStudentData.nationalId}`,
            objectId: `${selectedStudentData.nationalId}`,
            objectName: `${selectedStudentData.name}`,
          });
          const creationId = res.data.id;
          setObjects((prev) => {
            return [...prev, { ...form, id: creationId }];
          });
        })
        .catch((err) => {
          setLoading((prev) => prev - 1);
          toast.dismiss();
          toast("something went wrong");
        });

      setForm({});
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
                    
      {loading > 0 && <Loading />}
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

      <div className=" flex-1">
        <div className="Data">
          <div className="box h-full flex-1">
            <div className="bg-mainBlue w-full h-10 text-fuchsia-50 text-center text-2xl mt-3 rounded-lg text-mr-1">
              حجب الوجبات - جامعة حلوان
            </div>
            <div className="flex flex-col  py-2 2xl:text-3xl text-2xl	pr-8">
             
                {selectedStudentData && (
                  <div className="border-2 border-slate  mt-5 h-48 px-2 mx-2 mb-10 ">
                  <div className="flex justify-between items-center h-full">
                    <div className="flex flex-col ">
                      <div>
                        <span className="font bold text-2xl te ">الاسم: </span>
                        <span className="font text-xl text-gray-400">
                          {selectedStudentData.name}
                        </span>
                      </div>
                      <div>
                        <span className="font bold text-2xl">الرقم القومي: </span>
                        <span className="font text-xl text-gray-400">
                          {selectedStudentData.nationalId}
                        </span>
                      </div>
        
                      <div>
                        <span className="font bold text-2xl">نوع السكن : </span>
                        <span className="font text-xl text-gray-400">
                          {selectedStudentData.accomodationType}
                        </span>
                      </div>
                    </div>
                    <div>
                      {" "}
                      <img
                        src={
                          selectedStudentData.image
                            ? selectedStudentData.image
                            : "/default-photo.jpg"
                        }
                        className="w-36 border-2 border-black"
                        alt="default image"
                      />
                    </div>
                  </div>
                </div>
                )}
              

              <div className="mb-4">
                <label className=" font-bold text-2xl"> من تاريخ : </label>
                <input
                  type="date"
                  name="fromDate"
                  onChange={handleChange}
                  required
                  className="border text-xl text-gray-400 mr-4"
                ></input>
              </div>

              <div className="mb-2">
                <label className="font-bold text-2xl"> الى تاريخ :</label>
                <input
                  type="date"
                  name="toDate"
                  required
                  onChange={handleChange}
                  className="border text-xl text-gray-400 mr-4"
                ></input>
              </div>

              <div>
                <label className="font-bold text-2xl"> الوجبات:</label>
                <input
                  id="radio1"
                  type="radio"
                  name="meal"
                  className="form-radio h-5 w-5 text-gray-600 mr-10"
                  value="غداء"
                  onChange={handleChange}
                ></input>
                <label>غداء</label>
                <input
                  id="radio2"
                  type="radio"
                  name="meal"
                  className="form-radio h-5 w-5  mr-10 text-xl text-gray-400"
                  value="عشاء"
                  onChange={handleChange}
                ></input>
                <label>عشاء</label>
              </div>

              <div className="mb-2">
                <label className="font-bold text-2xl">السبب :</label>
                <input
                  type="text"
                  required
                  value={form.reason}
                  name="reason"
                  onChange={handleChange}
                  className="border border-gray-400 text-xl text-gray-400 mr-4"
                ></input>
              </div>
              <div className="flex items-center w-full ">
                {(Boolean(permissions.superAdmin) ||
                  Boolean(permissions.manageBlockMeals)) && (
                  <button
                    className="w-40 h-10 bg-green-600 rounded-md hover:opacity-70 transition-all duration-200  hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500"
                    onClick={handleSubmit}
                  >
                    اضافه
                  </button>
                )}
              </div>
            </div>
            <div>
              <table className="table-auto w-4/5 mx-auto">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-right">من تاريخ</th>
                    <th className="px-4 py-2 text-right">الى تاريخ</th>
                    <th className="px-4 py-2 text-right">الوجبه</th>
                    <th className="px-4 py-2 text-right">السبب</th>
                  </tr>
                </thead>
                <tbody>
                  {objects.length > 0 &&
                    objects.map((object, index) => (
                      <tr key={`blk-meal-ind${index}`}>
                        <td>
                          {object.fromDate.split("-").reverse().join("-")}
                        </td>
                        <td>{object.toDate.split("-").reverse().join("-")}</td>
                        <td>{object.meal}</td>
                        <td>{object.reason}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockMeals;
