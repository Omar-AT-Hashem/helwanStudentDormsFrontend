import { useEffect, useState } from "react";
import { API_ROUTE } from "../../config/env.js";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import MainSideBar from "../../components/minicomponent/MainSideBar.jsx";

const Evacuation = () => {
  if (sessionStorage.getItem("token")) {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${sessionStorage.getItem("token")}`;
  }

  const [selectedStudentData, setSelectedStudentData] = useOutletContext();
  const [studentList, setStudentList] = useState([]);
  const [tracedHousing, setTracedHousing] = useState();

  // const [selectedStudent, setSelectedStudent] = useState();

  const [towns, setTowns] = useState([]);

  const [selectedFloorData, setSelectedFloorData] = useState([]);

  const [selectedBed, setSelectedBed] = useState();
  const [selectedRoom, setSelectedRoom] = useState();
  const [sideBarTownsOpen, setSideBarTownsOpen] = useState([]);

  const [permissions, setPermissions] = useState([
    {
      creating: 0,
      reading: 0,
      updating: 0,
      deleting: 0,
      creatingEmployee: 0,
    },
  ]);
  useEffect(() => {
    axios
      .get(
        `${API_ROUTE}/v1/employee/permissions/${sessionStorage.getItem("id")}`
      )
      .then((res) => {
        setPermissions(res.data);
      })
      .catch(() => {
        return;
      });
  }, []);

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

  useEffect(() => {
    axios
      .get(`${API_ROUTE}/v1/housing/trace-student/${selectedStudentData.id}`)
      .then((res) => {
        if (res.data.message == "found") {
          setTracedHousing(res.data);
          setSelectedBed(res.data.bed.id);
        }
        if (res.data.message == "not found") {
          setTracedHousing();
          setSelectedBed();
        }
      })
      .catch((err) => {
        if (err && err.code === "ERR_BAD_REQUEST") {
          return;
        }
        toast.dismiss();
        return toast("Something went wrong");
      });
  }, [selectedStudentData]);

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

  const handleBedChange = (e, bedId, bedOccupant, roomId) => {
    setSelectedBed(bedId);
    setSelectedRoom(roomId);
    axios
      .get(`${API_ROUTE}/v1/student/get-by-id/${bedOccupant}`)
      .then((res) => {
        console.log(res.data);
        return setSelectedStudentData(res.data[0]);
      })
      .catch((err) => {
        if (err && err.code === "ERR_BAD_REQUEST") {
          return;
        }
        toast.dismiss();
        return toast("Something went wrong");
      });

    console.log(e.target.value);
  };

  const handleEvacuationClick = () => {
    axios
      .put(`${API_ROUTE}/v1/bed/unoccupy`, {
        studentId: selectedStudentData.id,
        bedId: selectedBed,
      })
      .then(() => {
        //handle Logs
        axios.post(`${API_ROUTE}/v1/log`, {
          adminId: sessionStorage.getItem("id"),
          adminName: sessionStorage.getItem("name"),
          adminUsername: sessionStorage.getItem("username"),
          action: `تم اخلاء الطالب ${selectedStudentData.name} و الرقم القومي ${selectedStudentData.nationalId} من السكن`,
          objectId: `${selectedStudentData.nationalId}`,
          objectName: `${selectedStudentData.name}`,
        });
        setStudentList((prev) =>
          prev.filter((student) => student.id != selectedStudentData.id)
        );
        setSelectedBed();
        setSelectedRoom();
        setSelectedFloorData((prev) => {
          prev = prev.map((ele) => {
            if (ele.id == selectedRoom) {
              let index = ele.beds.findIndex((ele2) => ele2.id == selectedBed);
              ele.beds[index] = {
                ...ele.beds[index],
                isOccupied: 0,
                occupant: null,
              };
            }
            return ele;
          });
          return prev;
        });
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

  return (
    <div className="pt-16 flex flex-row w-full h-screen ">
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
        {/*------------------------- Sidebar ------------------------*/}
        <div className="w-64">
          <div>
            <MainSideBar
              studentList={studentList}
              setStudentList={setStudentList}
              setSelectedStudentData={setSelectedStudentData}
            />
            {/*-------------------------end Sidebar student  ----------------*/}

            {/*-------------------------start Sidebar towns ----------------*/}
            {permissions.reading == 1 && (
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
            )}
            {/*-------------------------end  Sidebar towns ----------------*/}
          </div>
        </div>
        {/* -------------------end Sidebar ---------------------*/}
      </div>
      <div className=" flex-1 pt-4">
        <div className="bg-mainBlue	mx-4 h-10 text-fuchsia-50 text-center text-2xl mt-4 rounded-lg text-mr-1">
          التسكين - جامعة حلوان
        </div>
        {/* -------------------start student info ---------------------*/}

        {selectedStudentData && permissions.reading == 1 && (
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

        {/* -------------------start tracedHousing info ---------------------*/}

        {tracedHousing &&
          tracedHousing.message == "found" &&
          permissions.reading == 1 && (
            <div className="w-full flex justify-center">
              <div className="flex flex-col font-bold text-xl">
                <div>
                  <span>المدينه : </span>
                  <span className="text-blue-700">
                    {tracedHousing.town.name}
                  </span>
                </div>

                <div>
                  <span>المبنى : </span>
                  <span className="text-blue-700">
                    {tracedHousing.building.name}
                  </span>
                </div>

                <div>
                  <span>الطابق : </span>
                  <span className="text-blue-700">
                    {tracedHousing.floor.number}
                  </span>
                </div>

                <div>
                  <span>الغرفه : </span>
                  <span className="text-blue-700">
                    {tracedHousing.room.number}
                  </span>
                </div>

                <div>
                  <span>السرير :</span>
                  <span className="text-blue-700">
                    {tracedHousing.bed.number}
                  </span>
                </div>
              </div>
            </div>
          )}
        {/* -------------------end tracedHousing info ---------------------*/}

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
                        <div>
                          <input
                            type="radio"
                            name="bed"
                            id={`bed-${bed.id}`}
                            value={bed.id}
                            className="peer hidden"
                            onChange={(e) =>
                              handleBedChange(e, bed.id, bed.occupant, room.id)
                            }
                          />
                          <label
                            htmlFor={`bed-${bed.id}`}
                            className="block cursor-pointer select-none bg-blue-400 opacity-40 p-2 border text-center peer-checked:bg-red-800 peer-checked:opacity-100 font-bold text-white transition-all duration-200"
                          >
                            {bed.number}
                          </label>
                        </div>
                      ) : (
                        <div className="flex justify-center items-center text-white font-bold    bg-blue-400 w-20 h-10 border">
                          {bed.number}
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
          {((selectedBed && selectedStudentData) ||
            (selectedBed &&
              selectedStudentData &&
              tracedHousing.message == "found")) &&
            permissions.updating == 1 && (
              <button
                className="bg-red-800 w-32 h-10 text-white hover:opacity-70 transition-all duration-200 rounded"
                onClick={handleEvacuationClick}
              >
                اخلاء
              </button>
            )}
        </div>
      </div>
    </div>
  );
};

export default Evacuation;
