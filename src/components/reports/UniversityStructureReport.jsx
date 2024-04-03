import React from "react";
import { useEffect, useState } from "react";
import MainSideBar from "../minicomponent/MainSideBar.jsx";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { API_ROUTE } from "../../config/env.js";
import Loading from "../minicomponent/Loading.jsx";

const UniversityStructureReport = () => {
  const [data, setData] = useState([]);
  const [selectedFacutly, setSelectedFacutly] = useState("");
  const [open, setOpen] = useState(Array(20).fill(0));
  const [rerenderTrigger, setRerenderTrigger] = useState(0);
  const [loading, setLoading] = useState(0);
  useEffect(() => {
    setLoading((prev) => prev + 1);
    axios
      .get(`${API_ROUTE}/v1/university-structure/get-structure`)
      .then((res) => {
        setLoading((prev) => prev - 1);
        setData(res.data);
      }).catch((err) => {
        if (err && err.code === "ERR_BAD_REQUEST") {
          setLoading((prev) => prev - 1);
          return;
        }
        toast.dismiss();
        toast("Something went wrong");
      })
  }, []);

  const handleChange = (e) => {
    setSelectedFacutly(data.find((ele) => ele.name == e.target.value));
    setOpen(Array(20).fill(0));
  };

  const handleDepartmentClick = (e, ind) => {
    setOpen((prev) => {
      prev[ind] = prev[ind] ? 0 : 1;
      return prev;
    });

    setRerenderTrigger((prev) => prev + 1);
  };
  return (
    <div
      id="main-container"
      className="bg-gray-100 p-2 rounded h-[500px] overflow-scroll"
    >
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
      <div id="inner-container" className="flex flex-col">
        <div id="select-and-label-container">
          <span className="font-bold text-xl">الكليه :</span>
          <select
            className="text-xl w-[400px] h-[30px] bg-slate-100 border border-slate-800 rounded"
            onChange={handleChange}
          >
            <option value="">--------</option>
            {data.map((faculty, ind) => (
              <option key={`drp-dn-rep-unistruct-${ind}`} value={faculty.name}>
                {faculty.name}
              </option>
            ))}
          </select>
        </div>

        <div id="faculty-sructure-container" className="mt-10">
          {selectedFacutly && (
            <div>
              {selectedFacutly.departments.map((departement, depInd) => {
                return (
                  <div
                    key={`dep-fac-rep-struct-${departement.name}`}
                    className="mb-10 "
                  >
                    <div
                      className="text-mainBlue font-bold text-lg hover: cursor-pointer"
                      onClick={(e) => handleDepartmentClick(e, depInd)}
                    >
                      -قسم: {departement.name} || النوع: {departement.type}
                    </div>

                    <div
                      id="programs-container"
                      className={`${
                        open[depInd] ? "flex flex-col mr-4" : "hidden mr-4"
                      }`}
                    >
                      {departement.programs.map((program) => {
                        return (
                          <div key={`prog-fac-rep-struct-${program.name}`}>
                            <div className="text-mainYellow font-bold text-lg">
                              - برنامج: {program.name}
                            </div>
                            <div className="mr-10">
                              {program.levels.map((level) => {
                                return (
                                  <div
                                    key={`lev-prog-fac-rep-struct-${level.name}`}
                                    className="font-bold text-lg"
                                  >
                                    - المستوى: {level}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UniversityStructureReport;
