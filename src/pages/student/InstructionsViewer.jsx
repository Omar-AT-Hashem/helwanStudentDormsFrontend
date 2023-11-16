import { useState, useEffect } from "react";
import axios from "axios";
import { API_ROUTE } from "../../config/env";
import toast, { Toaster } from "react-hot-toast";

function InstructionsViewer() {
  if (sessionStorage.getItem("token")) {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${sessionStorage.getItem("token")}`;
  }
  // Define state variables for instructions and errors
  const [instructions, setInstructions] = useState("");

  useEffect(() => {
    // Use the useEffect hook to fetch data when the component mounts
    axios
      .get(`${API_ROUTE}/v1/instruction`)
      .then((res) => {
        
        return setInstructions(res.data);
      })
      .catch((err) => {
        if (err && err.code === "ERR_BAD_REQUEST") {
          return;
        }
        toast.dismiss();
        return toast("Something went wrong");
      });
  }, []); // The empty dependency array ensures this effect runs once after the initial render

  console.log(instructions);
  return (
    <div className="pt-16">
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

      {instructions && instructions.length > 0 ? (
        <div className="mt-20 bg-yellow-50 border rounded-2xl border-yellow-300 w-[80%] mr-40"> 
        <h4 className="mr-4 text-3xl text-slate-700 mt-4 mb-4">- تعليمات هامه .....</h4>
        
          {instructions.map((instruction,index) => (
            <div key={index} className="  p-1 h-full text-slate-600 mr-14 text-xl">
              <div> <span className="mx-2">{index + 1}-</span>

              {instruction.instruction}
            </div></div>
          )
          )}
        </div>
      ) : (
        <div className="flex justify-center items-center h-40"><p className="text-blue-600 text-center text-4xl">لا يوجد تعليمات لعرضها .</p></div>
      )}

      <div></div>
    </div>
  );
}

export default InstructionsViewer;
