/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { API_ROUTE } from "../../config/env.js";
import MainSideBar from "../../components/minicomponent/MainSideBar";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Logs = () => {
  if (sessionStorage.getItem("token")) {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${sessionStorage.getItem("token")}`;
  }

  const [logs, setLogs] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_ROUTE}/v1/log`)
      .then((res) => {
        setLogs(res.data);
      })
      .catch(() => {
        toast.dismiss();
        toast("حدث خطا");
      });
  }, []);

  console.log(logs);

  return (
    <div className="pt-16 flex flex-row w-full h-screen">
      {/* Sidebar with student search */}
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

      {/* Main content area */}
      <div className=" h-full w-full flex-1">
        {/* Header */}
        <div className="bg-mainBlue h-10  text-fuchsia-50 text-center text-2xl mt-8 rounded-lg text-mr-1 mx-20 mb-0">
          سجلات النظام - جامعة حلوان
        </div>

        <div className="flex flex-col items-center">
          <div className="flex flex-col gap-5 mr-10 mt-10 max-w-[750px] text-xl justify-center ">
            {logs.map((log) => (
              <div
                key={`${log.id}-log-display`}
                className="flex flex-col bg-slate-200 py-3 px-20"
              >
                <div className="flex gap-10 mb-6 border-b border-slate-800">
                  <div>
                    <span className="font-bold text-slate-800 text-2xl">
                      ID الادمن :{" "}
                    </span>
                    <span>{log.adminId}</span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-800 text-2xl">
                      اسم الادمن :{" "}
                    </span>
                    <span>{log.adminName}</span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-800 text-2xl">
                      اسم مستخدم الادمن :{" "}
                    </span>
                    <span>{log.adminUsername}</span>
                  </div>
                </div>

                <div className="mb-6 border-b border-slate-800">
                  <span className="font-bold text-slate-800 text-2xl">
                    الفغل :{" "}
                  </span>
                  <span className="font-bold">{log.action}</span>
                </div>

                <div className="flex gap-10 mb-6 border-b border-slate-800">
                  <div>
                    <span className="font-bold text-slate-800">
                      ID المفعول به :{" "}
                    </span>
                    <span>{log.objectId}</span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-800">
                      اسم المفعول به :{" "}
                    </span>
                    <span>{log.objectName}</span>
                  </div>
                </div>

                <div className="flex gap-10 ">
                  <div>
                    <span className="font-bold text-slate-800">التاريخ : </span>
                    <span>
                      {log.dateTime
                        .slice(0, 19)
                        .replace("T", " ")
                        .split(" ")[0]
                        .split("-")
                        .reverse()
                        .join("/")}
                    </span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-800">الوقت : </span>
                    <span>
                      {
                        log.dateTime
                          .slice(0, 19)
                          .replace("T", " ")
                          .split(" ")[1]
                      }
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logs;
