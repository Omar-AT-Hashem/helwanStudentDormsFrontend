import { useEffect, useState } from "react";
import MainSideBar from "../../components/minicomponent/MainSideBar";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { API_ROUTE } from "../../config/env.js";
import Loading from "../../components/minicomponent/Loading.jsx";
import UniversityStructureReport from "../../components/reports/UniversityStructureReport.jsx";

const Reports = () => {
  const [openReport, setOpenReport] = useState([0, 0, 0, 0]);

  const handleShowClick = (e) => {
    e.preventDefault();
    setOpenReport((prev) => {
      prev = prev.map((ele, ind) => {
        if (ind != parseInt(e.target.name)) {
          return 0;
        } else {
          return ele;
        }
      });
      prev[parseInt(e.target.name)] = !prev[parseInt(e.target.name)];
      return prev;
    });
  };

  return (
    <div className="pt-24 w-screen pr-2">
      <div id="buttons-container flex flex-wrap">
        <div
          id="button-1"
          className="border-2 border-black w-[300px] text-2xl p-3 bg-mainBlue"
        >
          <div className="flex flex-col items-center gap-5 ">
            <span className="text-white font-bold">هيكل الجامعه</span>
            <button
              name="0"
              className="text-white bg-green-600 font-bold w-20 h-10 rounded hover:opacity-70 transition-all duration-200"
              onClick={handleShowClick}
            >
              عرض
            </button>
          </div>
        </div>
      </div>

      <div id="report-container" className="mt-20 flex justify-center">
        {openReport[0] == 1 && <UniversityStructureReport />}
      </div>
    </div>
  );
};

export default Reports;
