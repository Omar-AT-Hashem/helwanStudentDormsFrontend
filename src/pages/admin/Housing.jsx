import { useEffect, useState } from "react";
import { API_ROUTE } from "../../config/env.js";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import MainSideBar from "../../components/minicomponent/MainSideBar.jsx";
import Loading from "../../components/minicomponent/Loading.jsx";
const Housing = () => {
  if (sessionStorage.getItem("token")) {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${sessionStorage.getItem("token")}`;
  }

  const [selectedStudentData, setSelectedStudentData, studentList, setStudentList, filters, setFilters] = useOutletContext();
  

  const [loading, setLoading] = useState(0);

  const [towns, setTowns] = useState([]);

  const [selectedFloorData, setSelectedFloorData] = useState([]);

  const [selectedBed, setSelectedBed] = useState();

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
    axios
      .get(`${API_ROUTE}/v1/housing/towns-buildings-floors`)
      .then((res) => {
        setLoading((prev) => prev - 1);
        setTowns(res.data);
        const isOpen = Array(res.data.length).fill(false);
        setSideBarTownsOpen(isOpen);
        return;
      })
      .catch((err) => {
        setLoading((prev) => prev - 1);
        if (err && err.code === "ERR_BAD_REQUEST") {
          return;
        }
        toast.dismiss();
        return toast("Something went wrong");
      });
  }, []);

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
    setLoading((prev) => prev + 1);
    axios
      .post(`${API_ROUTE}/v1/bed/occupy`, {
        studentId: selectedStudentData.id,
        bedId: selectedBed,
      })
      .then(() => {
        setLoading((prev) => prev - 1);
        //handle Logs
        axios.post(`${API_ROUTE}/v1/log`, {
          adminId: sessionStorage.getItem("id"),
          adminName: sessionStorage.getItem("name"),
          adminUsername: sessionStorage.getItem("username"),
          action: `تسكين الطالب ${selectedStudentData.name} و الرقم القومي ${selectedStudentData.nationalId}`,
          objectId: `${selectedStudentData.nationalId}`,
          objectName: `${selectedStudentData.name}`,
        });
        setStudentList((prev) =>
          prev.filter((student) => student.id != selectedStudentData.id)
        );
        setSelectedBed();
        setSelectedFloorData([]);
        setSelectedStudentData([]);

        return;
      })
      .catch((err) => {
        setLoading((prev) => prev - 1);
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
        {/*------------------------- Sidebar ------------------------*/}
        <div className="w-64">
          <div>
            {/*-------------------------start Sidebar student  ----------------*/}

            <MainSideBar
              studentList={studentList}
              setStudentList={setStudentList}
              setSelectedStudentData={setSelectedStudentData}
              filters={filters}
              setFilters={setFilters}
            />
            {/*-------------------------end Sidebar student  ----------------*/}

            {/*-------------------------start Sidebar towns ----------------*/}
            <div className="mt-10 select-none">
              <div className="flex flex-col">
                {/*------- towns menu start-----*/}
                {towns.map(
                  (town, index) =>
                    permissions.reading == 1 && (
                      <>
                        <span
                          className="hover:cursor-pointer hover:bg-slate-300 pr-5 select-none font-bold text-xl transition-all duration-200"
                          onClick={() => handleSideBarTownClick(index)}
                        >
                          {town.name}
                        </span>
                        {/*-------start buildings menu -----*/}
                        {sideBarTownsOpen[index] && (
                          <div className="flex flex-col gap-1 pr-7 pt-1 mr-2 w-44">
                            {town.buildings.map((building) =>
                              selectedStudentData.gender ? (
                                selectedStudentData.gender == building.type ? (
                                  <div
                                    key={`Build-town-${building.id}`}
                                    className="flex flex-col"
                                  >
                                    <span
                                      className="hover:cursor-pointer hover:bg-slate-300 text-gray-700 font-bold transition-all duration-200"
                                      onClick={handleBuildingClick}
                                    >
                                      {building.name}
                                    </span>

                                    {/*-------start floors menu -----*/}
                                    <div className="hidden flex-col">
                                      {building.floors.map((floor) => (
                                        <span
                                          key={`floor-${floor.id}`}
                                          className="hover:cursor-pointer  hover:bg-slate-300 pr-5 text-blue-600 font-bold transition-all duration-200"
                                          onClick={() =>
                                            handleFloorClick(floor.id)
                                          }
                                        >
                                          {floor.number}
                                        </span>
                                      ))}
                                    </div>
                                    {/*-------end floors menu -----*/}
                                  </div>
                                ) : null
                              ) : (
                                <div
                                  key={`Build-town-${building.id}`}
                                  className="flex flex-col"
                                >
                                  <span
                                    className="hover:cursor-pointer hover:bg-slate-300 text-gray-700 font-bold transition-all duration-200"
                                    onClick={handleBuildingClick}
                                  >
                                    {building.name}
                                  </span>

                                  {/*-------start floors menu -----*/}
                                  <div className="hidden flex-col">
                                    {building.floors.map((floor) => (
                                      <span
                                        key={`floor-${floor.id}`}
                                        className="hover:cursor-pointer  hover:bg-slate-300 pr-5 text-blue-600 font-bold transition-all duration-200"
                                        onClick={() =>
                                          handleFloorClick(floor.id)
                                        }
                                      >
                                        {floor.number}
                                      </span>
                                    ))}
                                  </div>
                                  {/*-------end floors menu -----*/}
                                </div>
                              )
                            )}
                          </div>
                        )}
                        {/*-------end buildings menu -----*/}
                      </>
                    )
                )}
                {/*-------end towns menu -----*/}
              </div>
            </div>
            {/*-------------------------end  Sidebar towns ----------------*/}
          </div>
        </div>
        {/* -------------------end Sidebar ---------------------*/}
      </div>
      <div className=" flex-1 pt-4">
        <div className="bg-mainBlue mx-4 h-10 text-fuchsia-50 text-center text-2xl mt-4 rounded-lg text-mr-1">
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

        {/* -------------------start Rooms-Beds ---------------------*/}
        <div className="mt-10">
          <div className="flex flex-wrap gap-10 justify-center">
            {selectedFloorData.map((room) =>
              selectedStudentData.accomodationType ? (
                selectedStudentData.accomodationType == room.type ? (
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
                ) : null
              ) : (
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
              )
            )}
          </div>
        </div>
        {/* -------------------end Rooms-Beds ---------------------*/}

        <div className="flex justify-center mt-20">
          {selectedBed && selectedStudentData && (
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
