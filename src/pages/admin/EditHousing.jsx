import { useEffect, useState } from "react";
import { API_ROUTE } from "../../config/env.js";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

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
  });

  const [selectedFloorData, setSelectedFloorData] = useState([]);
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

  const handleRemoveBed = (bedId) => {};
  const handleAddBed = (roomId) => {};

  return (
    <div className="pt-16 flex flex-row w-full h-screen ">
      <div className="w-64">
        {/*------------------------- Sidebar ------------------------*/}
        <div className="w-64">
          <div>
            {/*-------------------------start Sidebar towns ----------------*/}
            <div className="mt-36 select-none">
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
        <div className="bg-mainBlue mx-4 h-10 text-fuchsia-50 text-center text-2xl mt-4 rounded-lg text-mr-1">
          التسكين - جامعة حلوان
        </div>
        {/* -------------------start student info ---------------------*/}

        {/* -------------------end student info ---------------------*/}

        {/* -------------------start Rooms-Beds ---------------------*/}
        <div className="mt-10">
          <div className="flex flex-wrap gap-10 justify-center">
            {selectedFloorData.map((room) => (
              <div key={`room-beds-${room.id}`} className="flex flex-col">
                <div className="flex justify-center items-center text-white text-xl font-bold bg-mainBlue w-20 h-10 mr-9">
                  {room.number}
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
                            onClick={() => handleRemoveBed(bed.id)}
                            className="ml-1 rounded-full w-8 h-8 bg-red-700 flex items-center justify-center text text-white font-bold hover:opacity-80 cursor-pointer transition-all duration-200"
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
                    <button onClick={() => handleAddBed(room.id)} className="text-4xl flex items-center justify-center w-8 h-8 bg-green-700 text-white rounded-full ml-1">+</button>
                    <input
                      name="bedNumber"
                      type="text"
                      onChange={handleInputChange}
                      className="text-white font-bold bg-blue-500 w-20"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* -------------------end Rooms-Beds ---------------------*/}
      </div>
    </div>
  );
};

export default EditHousing;
