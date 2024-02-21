import { useEffect, useState } from "react";
import { API_ROUTE } from "../../config/env.js";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Loading from "../../components/minicomponent/Loading.jsx";

const EditHousing = () => {
  if (sessionStorage.getItem("token")) {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${sessionStorage.getItem("token")}`;
  }

  const [towns, setTowns] = useState([]);
  const [loading, setLoading] = useState(0);
  const [insertionData, setInsertionData] = useState({
    bedNumber: null,
    roomNumber: null,
    roomType: null,
    floorNumber: null,
    buildingName: null,
    townName: null,
    buildingType: null,
  });

  const [selectedFloorId, setSelectedFloorId] = useState();
  const [selectedFloorData, setSelectedFloorData] = useState([]);
  const [sideBarTownsOpen, setSideBarTownsOpen] = useState([]);

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

  const handleInputChange = (e) => {
    setInsertionData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleBuildingClick = (e) => {
    if (!e.target.nextElementSibling.className.includes("hidden")) {
      e.target.nextElementSibling.className = "hidden";
    } else {
      e.target.nextElementSibling.className = "flex flex-col";
    }
  };

  const handleFloorClick = (floorId) => {
    setLoading((prev) => prev + 1);
    axios
      .get(`${API_ROUTE}/v1/housing/floor-rooms-beds/${floorId}`)
      .then((res) => {
        setLoading((prev) => prev - 1);
        setSelectedFloorId(floorId);
        return setSelectedFloorData(res.data);
      })
      .catch((err) => {
        if (err && err.code === "ERR_BAD_REQUEST") {
          setLoading((prev) => prev - 1);
          return;
        }
        toast.dismiss();
        return toast("Something went wrong");
      });
  };

  const handleRemoveBed = (bedId, roomId) => {
    setLoading((prev) => prev + 1);
    axios
      .delete(`${API_ROUTE}/v1/bed/${bedId}`)
      .then(() => {
        //dynamically add beds to the front end
        setSelectedFloorData((prev) => {
          prev = prev.map((ele) => {
            if (ele.id == roomId) {
              ele.beds = ele.beds.filter((ele2) => ele2.id != bedId);
            }
            return ele;
          });

          return prev;
        });
        setLoading((prev) => prev - 1);
        toast.dismiss();
        return toast("أزالة بنجاح");
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

  const handleAddBed = (e, roomId) => {
    if (insertionData.bedNumber) {
      if (isNaN(parseInt(insertionData.bedNumber))) {
        toast.dismiss();
        toast("ادخل رقم");
        return;
      } else {
        setLoading((prev) => prev + 1);
        axios
          .post(`${API_ROUTE}/v1/bed`, {
            roomId: roomId,
            number: insertionData.bedNumber,
          })
          .then((res) => {
            //dynamically add beds to the front end
            setSelectedFloorData((prev) => {
              prev = prev.map((ele) => {
                if (ele.id == roomId) {
                  ele.beds.push({
                    id: res.data.id,
                    number: insertionData.bedNumber,
                    roomId: roomId,
                    isOccupied: 0,
                    occupant: null,
                  });
                }
                return ele;
              });

              return prev;
            });
            setInsertionData((prev) => {
              return { ...prev, bedNumber: null };
            });
            setLoading((prev) => prev - 1);
            e.target.nextElementSibling.value = "";
            toast.dismiss();
            return toast("اضافه بنجاح");
          })
          .catch((err) => {
            setLoading((prev) => prev - 1);
            e.target.nextElementSibling.value = "";
            if (err && err.code === "ERR_BAD_REQUEST") {
              return;
            }
            toast.dismiss();
            return toast("Something went wrong");
          });
      }
    }
  };

  const handleAddRoom = (e) => {
    if (insertionData.roomNumber && insertionData.roomType) {
      if (isNaN(parseInt(insertionData.roomNumber))) {
        toast.dismiss();
        toast("ادخل رقم");
        return;
      } else {
        setLoading((prev) => prev + 1);
        axios
          .post(`${API_ROUTE}/v1/room`, {
            floorId: selectedFloorId,
            number: insertionData.roomNumber,
            type: insertionData.roomType,
          })
          .then((res) => {
            //dynamically add beds to the front end
            setSelectedFloorData((prev) => {
              return [
                ...prev,
                {
                  id: res.data.id,
                  floorId: selectedFloorId,
                  number: insertionData.roomNumber,
                  type: insertionData.roomType,
                  beds: [],
                },
              ];
            });
            setInsertionData((prev) => {
              return { ...prev, roomNumber: null, roomType: null };
            });
            setLoading((prev) => prev - 1);
            e.target.nextElementSibling.value = "";
            toast.dismiss();
            return toast("اضافه بنجاح");
          })
          .catch((err) => {
            setLoading((prev) => prev - 1);
            e.target.nextElementSibling.value = "";
            if (err && err.code === "ERR_BAD_REQUEST") {
              return;
            }
            toast.dismiss();
            return toast("Something went wrong");
          });
      }
    }
  };

  const handleRemoveRoom = (roomId) => {
    setLoading((prev) => prev + 1);
    axios
      .delete(`${API_ROUTE}/v1/room/${roomId}`)
      .then(() => {
        //dynamically add beds to the front end
        setSelectedFloorData((prev) => {
          let i = prev.findIndex((ele) => ele.id == roomId);
          prev.splice(i, 1);
          return prev;
        });
        setLoading((prev) => prev - 1);
        toast.dismiss();
        return toast("أزالة بنجاح");
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

  const handleAddFloor = (e, buildingId, townId) => {
    if (insertionData.floorNumber) {
      if (isNaN(parseInt(insertionData.floorNumber))) {
        toast.dismiss();
        toast("ادخل رقم");
        return;
      } else {
        setLoading((prev) => prev + 1);
        axios
          .post(`${API_ROUTE}/v1/floor`, {
            buildingId: buildingId,
            number: insertionData.floorNumber,
          })
          .then((res) => {
            //dynamically add beds to the front end
            setTowns((prev) => {
              prev = prev.map((ele) => {
                if (ele.id == townId) {
                  ele.buildings.forEach((building) => {
                    if (building.id == buildingId) {
                      building.floors.push({
                        id: res.data.id,
                        buildingId: buildingId,
                        number: insertionData.floorNumber,
                        floorOccupied: false,
                      });
                    }
                  });
                }
                return ele;
              });

              return prev;
            });
            setInsertionData((prev) => {
              return { ...prev, floorNumber: null };
            });
            setLoading((prev) => prev - 1);
            e.target.nextElementSibling.value = "";
            toast.dismiss();
            return toast("اضافه بنجاح");
          })
          .catch((err) => {
            setLoading((prev) => prev - 1);
            e.target.nextElementSibling.value = "";
            if (err && err.code === "ERR_BAD_REQUEST") {
              return;
            }
            toast.dismiss();
            return toast("Something went wrong");
          });
      }
    }
  };

  const handleRemoveFloor = (floorId, buildingId, townId) => {
    setLoading((prev) => prev + 1);
    axios
      .delete(`${API_ROUTE}/v1/floor/${floorId}`)
      .then(() => {
        //dynamically add beds to the front end
        setTowns((prev) => {
          prev = prev.map((ele) => {
            if (ele.id == townId) {
              ele.buildings.forEach((building) => {
                if (building.id == buildingId) {
                  let i = building.floors.findIndex(
                    (ele2) => ele2.id == floorId
                  );
                  building.floors.splice(i, 1);
                }
              });
            }
            return ele;
          });
          console.log(prev);
          return prev;
        });
        setLoading((prev) => prev - 1);
        toast.dismiss();
        return toast("أزالة بنجاح");
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

  const handleAddBuilding = (e, townId) => {
    if (insertionData.buildingName && insertionData.buildingType) {
      setLoading((prev) => prev + 1);
      axios
        .post(`${API_ROUTE}/v1/building`, {
          townId: townId,
          name: insertionData.buildingName,
          type: insertionData.buildingType,
        })
        .then((res) => {
          //dynamically add beds to the front end
          setTowns((prev) => {
            prev = prev.map((ele) => {
              if (ele.id == townId) {
                ele.buildings.push({
                  id: res.data.id,
                  name: insertionData.buildingName,
                  buildingOccupied: false,
                  type: insertionData.buildingType,
                  floors: [],
                });
              }
              return ele;
            });

            return prev;
          });
          setInsertionData((prev) => {
            return { ...prev, buildingName: null, buildingType: null };
          });
          setLoading((prev) => prev - 1);
          e.target.nextElementSibling.value = "";
          toast.dismiss();
          return toast("اضافه بنجاح");
        })
        .catch((err) => {
          setLoading((prev) => prev - 1);
          e.target.nextElementSibling.value = "";
          if (err && err.code === "ERR_BAD_REQUEST") {
            return;
          }
          toast.dismiss();
          return toast("Something went wrong");
        });
    } else {
      toast.dismiss();
      toast("ادخل اسم");
      return;
    }
  };

  const handleRemoveBuilding = (buildingId, townId) => {
    setLoading((prev) => prev + 1);
    axios
      .delete(`${API_ROUTE}/v1/building/${buildingId}`)
      .then(() => {
        //dynamically add beds to the front end
        setTowns((prev) => {
          prev = prev.map((ele) => {
            if (ele.id == townId) {
              let i = ele.buildings.findIndex((ele2) => ele2.id == buildingId);
              ele.buildings.splice(i, 1);
            }
            return ele;
          });
          console.log(prev);
          return prev;
        });
        setLoading((prev) => prev - 1);
        toast.dismiss();
        return toast("أزالة بنجاح");
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

  const handleAddTown = (e) => {
    if (insertionData.townName) {
      setLoading((prev) => prev + 1);
      axios
        .post(`${API_ROUTE}/v1/town`, {
          name: insertionData.townName,
        })
        .then((res) => {
          //dynamically add towns to the front end
          setTowns((prev) => {
            prev.push({
              id: res.data.id,
              name: insertionData.townName,
              buildings: [],
            });
            return prev;
          });

          //handle logs
          axios
            .post(`${API_ROUTE}/v1/log`, {
              adminId: sessionStorage.getItem("id"),
              adminName: sessionStorage.getItem("name"),
              adminUsername: sessionStorage.getItem("username"),
              action: `اضافه مدينه جديده بأسم "${insertionData.townName}"`,
              objectId: res.data.id,
              objectName: insertionData.townName,
            })
            .catch(() => {
              return;
            });

          setInsertionData((prev) => {
            return { ...prev, townName: null };
          });
          setLoading((prev) => prev - 1);
          e.target.nextElementSibling.value = "";
          toast.dismiss();
          return toast("اضافه بنجاح");
        })
        .catch((err) => {
          setLoading((prev) => prev - 1);
          e.target.nextElementSibling.value = "";
          if (err && err.code === "ERR_BAD_REQUEST") {
            return;
          }
          toast.dismiss();
          return toast("Something went wrong");
        });
    } else {
      toast.dismiss();
      toast("ادخل اسم");
      return;
    }
  };

  const handleRemoveTown = (townId) => {
    setLoading((prev) => prev + 1);
    axios
      .delete(`${API_ROUTE}/v1/town/${townId}`)
      .then(() => {
        //dynamically add beds to the front end
        setTowns((prev) => {
          let i = prev.findIndex((ele2) => ele2.id == townId);
          prev.splice(i, 1);
          return prev;
        });
        setLoading((prev) => prev - 1);
        toast.dismiss();
        return toast("أزالة بنجاح");
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
            {/*-------------------------start Sidebar towns ----------------*/}
            <div className="mt-36 select-none">
              <div className="flex flex-col">
                {/*------- towns menu start-----*/}
                {towns.map((town, index) => (
                  <div key={`edit-${town}-housing-${index}`}>
                    <div className="flex">
                      {!town.buildings.find(
                        (ele) => ele.buildingOccupied == true
                      ) && (
                        <button
                          onClick={() => handleRemoveTown(town.id)}
                          className="flex items-center
                                 absolute justify-center h-5 w-5 rounded-md bg-red-700 hover:opacity-70 transition-all duration-200 text-white font-bold mt-1 mr-1"
                        >
                          X
                        </button>
                      )}
                      <span
                        className="hover:cursor-pointer hover:bg-slate-300 px-2 select-none font-bold text-xl mr-10 mb-1 transition-all duration-200"
                        onClick={() => handleSideBarTownClick(index)}
                      >
                        {town.name}
                      </span>
                    </div>
                    {/*-------start buildings menu -----*/}
                    {sideBarTownsOpen[index] && (
                      <div className="flex flex-col gap-1 pr-7 pt-1 mr-4 mb-5">
                        {town.buildings.map((building) => (
                          <div
                            key={`Build-town-${building.id}`}
                            className="flex flex-col relative"
                          >
                            {building.buildingOccupied == false && (
                              <button
                                onClick={() =>
                                  handleRemoveBuilding(building.id, town.id)
                                }
                                className="flex items-center
                                 absolute justify-center h-5 w-5 rounded-md bg-red-700 hover:opacity-70 transition-all duration-200 text-white font-bold"
                              >
                                X
                              </button>
                            )}
                            <span
                              className="hover:cursor-pointer hover:bg-slate-300 text-gray-800 font-bold mr-8 transition-all duration-200"
                              onClick={handleBuildingClick}
                            >
                              {building.name} |{" "}
                              {building.type == "M" ? "طلاب" : "طالبات"}
                            </span>

                            {/*-------start floors menu -----*/}
                            <div className="hidden flex-col">
                              {building.floors.map((floor) => (
                                <div
                                  key={`floor-${floor.id}`}
                                  className="flex mr-5"
                                >
                                  {floor.floorOccupied == false && (
                                    <button
                                      onClick={() =>
                                        handleRemoveFloor(
                                          floor.id,
                                          building.id,
                                          town.id
                                        )
                                      }
                                      className="flex items-center justify-center h-5 w-5 rounded-md bg-red-700 hover:opacity-70 transition-all duration-200 text-white font-bold"
                                    >
                                      X
                                    </button>
                                  )}
                                  <span
                                    className={`hover:cursor-pointer hover:bg-slate-300 pl-2 ${
                                      floor.floorOccupied == false
                                        ? "pr-6"
                                        : "pr-6 mr-5"
                                    } text-blue-600 font-bold transition-all duration-200`}
                                    onClick={() => handleFloorClick(floor.id)}
                                  >
                                    {floor.number}
                                  </span>
                                </div>
                              ))}
                              <div className="flex items-center mr-5">
                                <button
                                  onClick={(e) =>
                                    handleAddFloor(e, building.id, town.id)
                                  }
                                  className="flex items-center justify-center h-5 w-5 rounded-md bg-green-700 hover:opacity-70 transition-all duration-200 text-white text-2xl"
                                >
                                  +
                                </button>
                                <input
                                  name="floorNumber"
                                  type="text"
                                  autoComplete="off"
                                  onChange={handleInputChange}
                                  className="text-blue-600 font-bold bg-slate-300 h-5 w-10 mr-3"
                                />
                              </div>
                            </div>
                            {/*-------end floors menu -----*/}
                          </div>
                        ))}
                        <div className="flex flex-col">
                          <div className="flex ">
                            <button
                              onClick={(e) => handleAddBuilding(e, town.id)}
                              className="flex items-center justify-center h-5 w-5 rounded-md bg-green-700 hover:opacity-70 transition-all duration-200 text-white text-2xl"
                            >
                              +
                            </button>
                            <input
                              name="buildingName"
                              type="text"
                              autoComplete="off"
                              onChange={handleInputChange}
                              className="text-gray-800 font-bold bg-slate-300 h-5 w-24 mr-3"
                            />
                          </div>
                          <div className="flex flex-col">
                            <div>
                              <input
                                type="radio"
                                name="buildingType"
                                value="M"
                                onChange={handleInputChange}
                                required
                                className="mr-4"
                              />
                              <label className="mr-2 text-xl">طلاب</label>
                            </div>
                            <div>
                              <input
                                type="radio"
                                name="buildingType"
                                value="F"
                                onChange={handleInputChange}
                                required
                                className="mr-4"
                              />
                              <label className="mr-2 text-xl">طالبات</label>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {/*-------end buildings menu -----*/}
                  </div>
                ))}
                {/*-------end towns menu -----*/}
                <div className="flex items-center mr-1 mt-1">
                  <button
                    onClick={handleAddTown}
                    className="flex items-center justify-center h-5 w-5 rounded-md bg-green-700 hover:opacity-70 transition-all duration-200 text-white text-2xl"
                  >
                    +
                  </button>
                  <input
                    name="townName"
                    type="text"
                    autoComplete="off"
                    onChange={handleInputChange}
                    className="text-black font-bold bg-slate-300 h-5 w-24 mr-3"
                  />
                </div>
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

        {/* -------------------end student info ---------------------*/}

        {/* -------------------start Rooms-Beds ---------------------*/}
        <div className="mt-10 flex justify-center">
          <div className="flex flex-wrap gap-10 justify-center max-w-[700px]">
            {selectedFloorData.map((room) => (
              <div key={`room-beds-${room.id}`} className="flex flex-col">
                <div
                  className={`flex justify-center font-bold text-xl mr-9 w-20 ${
                    room.type == "سكن عادي"
                      ? "bg-slate-400 "
                      : "bg-yellow-600 text-white"
                  }`}
                >
                  {room.type}
                </div>
                <div className="flex">
                  {!room.beds.find((e) => e.isOccupied == 1) && (
                    <button
                      onClick={() => handleRemoveRoom(room.id)}
                      className="flex items-center justify-center w-8 h-8 bg-red-700 -ml-8 text-white rounded-md cursor-pointer font-bold  hover:opacity-80 transition-all duration-200"
                    >
                      X
                    </button>
                  )}
                  <div className="flex justify-center items-center text-white text-xl font-bold bg-mainBlue w-20 h-10 mr-9">
                    {room.number}
                  </div>
                </div>
                <div className="flex flex-col mt-2">
                  {/* -------------------start Beds menu ---------------------*/}
                  {room.beds.map((bed) => (
                    <div key={`bed-${bed.id}`} className="flex">
                      {bed.isOccupied == 1 ? (
                        <div className="flex justify-center items-center text-white font-bold bg-blue-400 opacity-40 w-20 h-10 border mr-[36px]">
                          {bed.number}
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <button
                            onClick={() => handleRemoveBed(bed.id, room.id)}
                            className="ml-1 rounded-md w-8 h-8 bg-red-700 flex items-center justify-center text text-white font-bold hover:opacity-80 cursor-pointer transition-all duration-200"
                          >
                            X
                          </button>
                          <input
                            type="radio"
                            disabled={true}
                            name="bed"
                            id={`bed-${bed.id}`}
                            value={bed.id}
                            className="peer hidden"
                          />
                          <label
                            htmlFor={`bed-${bed.id}`}
                            className="block select-none p-2 border text-center  bg-blue-400 font-bold w-20 text-white"
                          >
                            {bed.number}
                          </label>
                        </div>
                      )}
                    </div>
                  ))}
                  {/* -------------------end Beds menu ---------------------*/}
                  <div className="flex mt-1">
                    <button
                      onClick={(e) => handleAddBed(e, room.id)}
                      className="text-4xl flex items-center justify-center w-8 h-8 bg-green-700 text-white rounded-md ml-1 cursor-pointer hover:opacity-80 transition-all duration-200"
                    >
                      +
                    </button>
                    <input
                      name="bedNumber"
                      type="text"
                      autoComplete="off"
                      onChange={handleInputChange}
                      className="text-white font-bold bg-blue-500 w-20"
                    />
                  </div>
                </div>
              </div>
            ))}
            {selectedFloorId && (
              <div className="flex flex-col mt-8">
                <div className="flex">
                  <button
                    onClick={handleAddRoom}
                    className="text-4xl flex items-center justify-center w-8 h-8 bg-green-700 ml-1 text-white rounded-md cursor-pointer hover:opacity-80 transition-all duration-200"
                  >
                    +
                  </button>
                  <input
                    name="roomNumber"
                    type="text"
                    autoComplete="off"
                    onChange={handleInputChange}
                    className="text-white font-bold bg-mainBlue h-10 w-20"
                  />
                </div>
                <div className="flex flex-col">
                  <div>
                    <input
                      type="radio"
                      name="roomType"
                      value="سكن عادي"
                      onChange={handleInputChange}
                      required
                      className="mr-4 text-xl"
                    />
                    <label className="mr-2 text-xl">سكن عادي</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="roomType"
                      value="سكن مميز"
                      onChange={handleInputChange}
                      required
                      className="mr-4"
                    />
                    <label className="mr-2 text-xl">سكن مميز</label>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* -------------------end Rooms-Beds ---------------------*/}
      </div>
    </div>
  );
};

export default EditHousing;
