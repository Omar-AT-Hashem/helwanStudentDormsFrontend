import React from "react";
import axios from "axios";
import { API_ROUTE } from "../../config/env";
import { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";

const Statistics = () => {
  const [statistics, setStatistics] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_ROUTE}/v1/statistics/applicants-statistics`)
      .then((res) => {
        return setStatistics((prev) => [...prev, res.data]);
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
      .get(`${API_ROUTE}/v1/statistics/housed-statistics`)
      .then((res) => {
        return setStatistics((prev) => [...prev, res.data]);
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
      .get(`${API_ROUTE}/v1/statistics/housing-statistics`)
      .then((res) => {
        return setStatistics((prev) => [...prev, res.data]);
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
      .get(`${API_ROUTE}/v1/statistics/meals-statistics`)
      .then((res) => {
        return setStatistics((prev) => [...prev, res.data]);
      })
      .catch((err) => {
        if (err && err.code === "ERR_BAD_REQUEST") {
          return;
        }
        toast.dismiss();
        return toast("Something went wrong");
      });
  }, []);

  
  return (
    <div className="pt-20">
      <div className="  bg-sky-700 w-full h-10 text-fuchsia-50 text-center text-2xl">
        الإحصائيات - جامعة حلوان
      </div>
      <div className="flex gap-10 m-20">
        {statistics.map((statistic) => (
          <div
            key={`${statistic.title}-statistics`}
            className="border-mainBlue border-2 w-[600px]  flex flex-col"
          >
            <span className="text-4xl   text-white font-bold bg-mainBlue w-full h-12  flex justify-center items-center">
              {statistic.title}
            </span>
            <div className="flex flex-col gap-4 text-2xl font-bold mr-2 mt-2">
              {statistic.data.map((dataPoint) => (
                <div key={`${statistic.title}-dataPoint`}>
                  <span className="">{dataPoint.title}</span>
                  <span> : </span>
                  <span className="text-mainBlue">{dataPoint.value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Statistics;
