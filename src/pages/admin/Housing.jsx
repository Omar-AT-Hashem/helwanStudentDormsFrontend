import { useEffect, useState } from "react";
import { API_ROUTE } from "../../config/env.js";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Housing = () => {
  if (sessionStorage.getItem("token")) {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${sessionStorage.getItem("token")}`;
  }

  const [studentList, setStudentList] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState();
  const [selectedStudentData, setSelectedStudentData] = useState();

  const [towns, setTowns] = useState([]);
  const [selectedBuilding, setSelectedBuilding] = useState();
  const [housingData, setHousingData] = useState();
  const [selectedHousingData, setSelectedHousingData] = useState();

  const [sideBarTownsOpen, setSideBarTownsOpen] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_ROUTE}/v1/housing/`)
      .then((res) => {
        setHousingData(res.data);
      })
      .catch((err) => {
        if (err && err.code === "ERR_BAD_REQUEST") {
          return;
        }
        toast.dismiss();
        return toast("Something went wrong");
      });

    axios
      .get(`${API_ROUTE}/v1/housing/get-towns-buildings`)
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
      .get(`${API_ROUTE}/v1/student/get-by-id/${parseInt(selectedStudent)}`)
      .then((res) => {
        return setSelectedStudentData(res.data);
      })
      .catch((err) => {
        if (err && err.code === "ERR_BAD_REQUEST") {
          return;
        }
        toast.dismiss();
        return toast("Something went wrong");
      });
  }, [selectedStudent]);

  useEffect(() => {
    axios
      .get(`${API_ROUTE}/v1/student/get-by-id/${parseInt(selectedStudent)}`)
      .then((res) => {
        return setSelectedStudentData(res.data);
      })
      .catch((err) => {
        if (err && err.code === "ERR_BAD_REQUEST") {
          return;
        }
        toast.dismiss();
        return toast("Something went wrong");
      });
  }, [selectedStudent]);

  const handleChange = (e) => {
    if (e.target.value == "m") {
      axios
        .get(`${API_ROUTE}/v1/student/column/isAccepted/1/gender/${"m"}`)
        .then((res) => {
          return setStudentList(res.data.filter((ele) => ele.isHoused !== 1));
        })
        .catch((err) => {
          if (err && err.code === "ERR_BAD_REQUEST") {
            return;
          }
          toast.dismiss();
          return toast("Something went wrong");
        });
    }

    if (e.target.value == "f") {
      axios
        .get(`${API_ROUTE}/v1/student/column/isAccepted/1/gender/${"f"}`)
        .then((res) => {
          return setStudentList(res.data.filter((ele) => ele.isHoused !== 1));
        })
        .catch((err) => {
          if (err && err.code === "ERR_BAD_REQUEST") {
            return;
          }
          toast.dismiss();
          return toast("Something went wrong");
        });
    }
  };

  const handleStudentSelect = (studentId) => {
    setSelectedStudent(studentId);
  };

  const handleSideBarTownClick = (index) => {
    setSideBarTownsOpen((prev) => {
      let newArr = [...prev];
      newArr[index] = !newArr[index];
      return newArr;
    });
  };

  console.log(sideBarTownsOpen);

  return (
    <div className="pt-16 flex flex-row w-full h-screen ">
      <div className="w-64">
        {/*------------------------- Sidebar ------------------------*/}
        <div className="w-64">
          <div className="bg-slate-300 h-screen pt-32">
            {/*------------------------- Sidebar student start ----------------*/}
            <div className="flex gap-10" onChange={handleChange}>
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
                  onClick={() => handleStudentSelect(student.id)}
                >
                  {student.name}
                </div>
              ))}
            </div>
            {/*------------------------- Sidebar student end ----------------*/}

            {/*------------------------- Sidebar towns start----------------*/}
            <div className="mt-10 ">
              <div className="flex flex-col">
                {/*------- towns menu start-----*/}
                {towns.map((town, index) => (
                  <>
                    <span className="hover:cursor-pointer hover:bg-mainYellow pr-5 select-none" onClick={() => handleSideBarTownClick(index)}>
                      {town.name}
                    </span>
                    {/*------- buildings menu start-----*/}
                    {sideBarTownsOpen[index] && (
                      <div className="flex flex-col gap-1 pr-7 pt-1 ">
                        {town.buildings.map((building) => (
                          <span className="hover:cursor-pointer hover:bg-mainYellow" key={`Build-town-${building.id}`}>
                            {building.name}
                          </span>
                        ))}
                      </div>
                    )}
                    {/*------- buildings menu end-----*/}
                  </>
                ))}
                {/*------- towns menu end-----*/}
              </div>
            </div>
            {/*------------------------- Sidebar towns end ----------------*/}
          </div>
        </div>
        {/* -------------------end Sidebar ---------------------*/}
      </div>
      <div className=" flex-1 pt-4">
        gdf
        <div className="text-white px-5"></div>
      </div>
    </div>
  );
};

export default Housing;
