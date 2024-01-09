import { useEffect, useState } from "react";
import { API_ROUTE } from "../../config/env.js";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export const AssessStudents = () => {
  if (sessionStorage.getItem("token")) {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${sessionStorage.getItem("token")}`;
  }

  const assess = () => {

  }

  // State to store the selected student's data
  return (
    <div className="pt-20 flex flex-row w-full h-screen">
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

      <div className="m-auto">
        <button className="w-40 h-10 bg-green-600 rounded-md hover:opacity-70 transition-all duration-200  hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500"
        onClick={assess} 
        >
          بدأ التنسيق
        </button>
      </div>
    </div>
  );
};
