import { useEffect, useState } from "react";
import { API_ROUTE } from "../../config/env.js";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import MainSideBar from "../../components/minicomponent/MainSideBar.jsx";

const Housing = () => {
  if (sessionStorage.getItem("token")) {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${sessionStorage.getItem("token")}`;
  }

  const [selectedStudentData, setSelectedStudentData] = useOutletContext();
  const [studentList, setStudentList] = useState([]);

  // const [selectedStudent, setSelectedStudent] = useState();

  const [towns, setTowns] = useState([]);

  const [selectedFloorData, setSelectedFloorData] = useState([]);

  const [selectedBed, setSelectedBed] = useState();

  const [sideBarTownsOpen, setSideBarTownsOpen] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_ROUTE}/v1/housing/towns-buildings-floors`)
      .then((res) => {
        setTowns(res.data);
        const isOpen = Array(res.data.length).fill(false);
        setSideBarTownsOpen(isOpen);
        return;
      })
      .catch((err) => {
        if (err && err.code === "ERR_BAD_REQUEST") {
          return;
        }
        toast.dismiss();
        return toast("Something went wrong");
      });
  }, []);

  // useEffect(() => {
  //   axios
  //     .get(`${API_ROUTE}/v1/student/get-by-id/${parseInt(selectedStudent)}`)
  //     .then((res) => {
  //       return setSelectedStudentData(res.data);
  //     })
  //     .catch((err) => {
  //       if (err && err.code === "ERR_BAD_REQUEST") {
  //         return;
  //       }
  //       toast.dismiss();
  //       return toast("Something went wrong");
  //     });
  // }, [selectedStudent]);

  // useEffect(() => {
  //   axios
  //     .get(`${API_ROUTE}/v1/student/get-by-id/${parseInt(selectedStudent)}`)
  //     .then((res) => {
  //       return setSelectedStudentData(res.data);
  //     })
  //     .catch((err) => {
  //       if (err && err.code === "ERR_BAD_REQUEST") {
  //         return;
  //       }
  //       toast.dismiss();
  //       return toast("Something went wrong");
  //     });
  // }, [selectedStudent]);

  // const handleChange = (e) => {
  //   if (e.target.value == "m") {
  //     axios
  //       .get(`${API_ROUTE}/v1/student/column/isAccepted/1/gender/${"m"}`)
  //       .then((res) => {
  //         return setStudentList(res.data.filter((ele) => ele.isHoused !== 1));
  //       })
  //       .catch((err) => {
  //         if (err && err.code === "ERR_BAD_REQUEST") {
  //           return;
  //         }
  //         toast.dismiss();
  //         return toast("Something went wrong");
  //       });
  //   }

  //   if (e.target.value == "f") {
  //     axios
  //       .get(`${API_ROUTE}/v1/student/column/isAccepted/1/gender/${"f"}`)
  //       .then((res) => {
  //         return setStudentList(res.data.filter((ele) => ele.isHoused !== 1));
  //       })
  //       .catch((err) => {
  //         if (err && err.code === "ERR_BAD_REQUEST") {
  //           return;
  //         }
  //         toast.dismiss();
  //         return toast("Something went wrong");
  //       });
  //   }
  // };

  // const handleStudentSelect = (studentId) => {
  //   setSelectedStudent(studentId);
  // };

  const handleSideBarTownClick = (index) => {
    setSideBarTownsOpen((prev) => {
      let newArr = [...prev];
      newArr[index] = !newArr[index];
      return newArr;
    });
  };

  const handleBuildingClick = (e) => {
    console.log(e.target.nextElementSibling.className);
    if (!e.target.nextElementSibling.className.includes("hidden")) {
      e.target.nextElementSibling.className = "hidden";
    } else {
      e.target.nextElementSibling.className = "flex flex-col";
    }
  };

  const handleFloorClick = (floorId) => {
    axios
      .get(`${API_ROUTE}/v1/housing/floor-rooms-beds/${floorId}`)
      .then((res) => {
        return setSelectedFloorData(res.data);
      })
      .catch((err) => {
        if (err && err.code === "ERR_BAD_REQUEST") {
          return;
        }
        toast.dismiss();
        return toast("Something went wrong");
      });
  };

  const handleHouseClick = () => {
    axios
      .post(`${API_ROUTE}/v1/bed/occupy`, {
        studentId: selectedStudentData.id,
        bedId: selectedBed,
      })
      .then(() => {
        setStudentList((prev) =>
          prev.filter((student) => student.id != selectedStudentData.id)
        );
        setSelectedBed();
        setSelectedFloorData([]);
        // setSelectedStudent();
        setSelectedStudentData([]);

        return;
      })
      .catch((err) => {
        if (err && err.code === "ERR_BAD_REQUEST") {
          return;
        }
        toast.dismiss();
        return toast("Something went wrong");
      });
  };

  const handleRadioChange = (e) => {
    setSelectedBed(e.target.value);
    console.log(e.target.value);
  };

  return (
    <div className="pt-16 flex flex-row w-full h-screen ">
      <div className="w-64">
        {/*------------------------- Sidebar ------------------------*/}
        <div className="w-64">
          <div>
            
            {/*-------------------------start Sidebar student  ----------------*/}
            {/* <div className="flex gap-10" onChange={handleChange}>
              <div className="flex gap-2">
                <input type="radio" id="gender" name="gender" value="m" />
                <label htmlFor="gender">طلاب</label>
              </div>
              <div className="flex gap-2">
                <input type="radio" id="gender" name="gender" value="f" />
                <label htmlFor="gender">طالبات</label>
              </div>
            </div>

            <div className="w-full h-64 bg-red-300 overflow-y-scroll">
              {studentList.map((student) => (
                <div
                  key={`${student.id}-unapprr`}
                  className="hover:cursor-pointer hover:bg-mainYellow"
                  // onClick={() => handleStudentSelect(student.id)}
                >
                  {student.name}
                </div>
              ))}
            </div> */}
            <MainSideBar
              studentList={studentList}
              setStudentList={setStudentList}
              setSelectedStudentData={setSelectedStudentData}
            />
            {/*-------------------------end Sidebar student  ----------------*/}

            {/*-------------------------start Sidebar towns ----------------*/}
            <div className="mt-10 select-none">
              <div className="flex flex-col">
                {/*------- towns menu start-----*/}
                {towns.map((town, index) => (
                  <>
                    <span
                      className="hover:cursor-pointer hover:bg-mainYellow pr-5 select-none font-bold text-xl"
                      onClick={() => handleSideBarTownClick(index)}
                    >
                      {town.name}
                    </span>
                    {/*-------start buildings menu -----*/}
                    {sideBarTownsOpen[index] && (
                      <div className="flex flex-col gap-1 pr-7 pt-1 ">
                        {town.buildings.map((building) => (
                          <div
                            key={`Build-town-${building.id}`}
                            className="flex flex-col"
                          >
                            <span
                              className="hover:cursor-pointer hover:bg-mainYellow text-green-600 font-bold"
                              onClick={handleBuildingClick}
                            >
                              {building.name}
                            </span>

                            {/*-------start floors menu -----*/}
                            <div className="hidden flex-col">
                              {building.floors.map((floor) => (
                                <span
                                  key={`floor-${floor.id}`}
                                  className="hover:cursor-pointer hover:bg-mainYellow pr-5 text-blue-600 font-bold"
                                  onClick={() => handleFloorClick(floor.id)}
                                >
                                  {floor.number}
                                </span>
                              ))}
                            </div>
                            {/*-------end floors menu -----*/}
                          </div>
                        ))}
                      </div>
                    )}
                    {/*-------end buildings menu -----*/}
                  </>
                ))}
                {/*-------end towns menu -----*/}
              </div>
            </div>
            {/*-------------------------end  Sidebar towns ----------------*/}
          </div>
        </div>
        {/* -------------------end Sidebar ---------------------*/}
      </div>
      <div className=" flex-1 pt-4">
      <div className="bg-mainBlue	rounded  mx-4 h-10 text-fuchsia-50 text-center text-2xl mt-4 rounded-lg text-mr-1">
            التسكين - جامعة حلوان
          </div>
        {/* -------------------start student info ---------------------*/}

        {selectedStudentData && (
          <div className="border-2 border-slate  mt-5 h-48 px-2 mx-2">
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

        {/* -------------------end student info ---------------------*/}

        {/* -------------------start Rooms-Beds ---------------------*/}
        <div className="mt-10">
          <div className="flex flex-wrap gap-10 justify-center">
            {selectedFloorData.map((room) => (
              <div key={`room-beds-${room.id}`} className="flex flex-col">
                <div className="flex justify-center items-center text-white text-xl font-bold bg-mainBlue w-20 h-10 ">
                  {room.number}
                </div>
                <div className="flex flex-col mt-2">
                  {/* -------------------start Beds menu ---------------------*/}
                  {room.beds.map((bed) => (
                    <div key={`bed-${bed.id}`}>
                      {bed.isOccupied == 1 ? (
                        <div className="flex justify-center items-center text-white font-bold bg-blue-400 opacity-40 w-20 h-10 border">
                          {bed.number}
                        </div>
                      ) : (
                        <div>
                          <input
                            type="radio"
                            name="bed"
                            id={`bed-${bed.id}`}
                            value={bed.id}
                            className="peer hidden"
                            onChange={handleRadioChange}
                          />
                          <label
                            htmlFor={`bed-${bed.id}`}
                            className="block cursor-pointer select-none p-2 border text-center hover:opacity-80 bg-blue-400 peer-checked:bg-red-800 font-bold text-white transition-all duration-200"
                          >
                            {bed.number}
                          </label>
                        </div>
                      )}
                    </div>
                  ))}
                  {/* -------------------end Beds menu ---------------------*/}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* -------------------end Rooms-Beds ---------------------*/}

        <div className="flex justify-center mt-20">
          {selectedBed && selectedStudentData.id && (
            <button
              className="bg-green-600 w-32 h-10 text-white hover:opacity-70 transition-all duration-200 rounded"
              onClick={handleHouseClick}
            >
              تسكين
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Housing;
