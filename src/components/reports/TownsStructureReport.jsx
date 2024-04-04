import { useEffect, useState } from "react";
import { API_ROUTE } from "../../config/env.js";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Loading from "../../components/minicomponent/Loading.jsx";

const TownsStructureReport = () => {
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
    roomType: "سكن عادي",
    floorNumber: null,
    buildingName: null,
    townName: null,
    buildingType: "M",
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



  return (
    <div className="pt-16 flex flex-row w-full h-screen bg-neutral-50 border shadow-lg shadow-slate-400">
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
                      <div className="flex items-center">
                       
                        <span
                          className={`hover:cursor-pointer hover:bg-slate-300 px-2 select-none 
                        font-bold text-xl mr-20 mb-1 transition-all duration-200`}
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
                              className="flex flex-col"
                            >
                             
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
                                    
                                    <span
                                      className={`hover:cursor-pointer hover:bg-slate-300 pl-2 pr-6 text-blue-600 font-bold transition-all duration-200`}
                                      onClick={() => handleFloorClick(floor.id)}
                                    >
                                      {floor.number}
                                    </span>
                                  </div>
                                ))}
                                <div className="flex items-center mr-5">
                                  
                                </div>
                              </div>
                              {/*-------end floors menu -----*/}
                            </div>
                          ))}
                          <div className="flex flex-col">
                            <div className="flex ">
                             
                             
                            </div>
                            <div className="flex flex-col">
                              <div>
                            
                              </div>
                              <div>
                        
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      {/*-------end buildings menu -----*/}
                    </div>
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
                  
                  <div className="flex justify-center items-center text-white text-xl font-bold bg-mainBlue w-20 h-10 mr-9">
                    {room.number}
                  </div>
                </div>
                <div className="flex flex-col mt-2">
                  {/* -------------------start Beds menu ---------------------*/}
                  {room.beds.map((bed) => (
                    <div key={`bed-${bed.id}`} className="flex">
                      
                        <div className="flex items-center">
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
                            className="block select-none p-2 border text-center  bg-blue-400 font-bold w-20 text-white mr-9"
                          >
                            {bed.number}
                          </label>
                        </div>
                      
                    </div>
                  ))}
                  {/* -------------------end Beds menu ---------------------*/}
                  
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

export default TownsStructureReport;
