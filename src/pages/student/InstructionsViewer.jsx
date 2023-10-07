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
      .get(`${API_ROUTE}/general/instructions`)
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

  return (
    <div>
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
        <div>
          {instructions.map((instruction) => {
            <div className="w-[80%] resize-none p-1 h-full bg-slate-300">
              {instruction.instruction}
            </div>;
          })}
        </div>
      ) : (
        <div>No available instruction_</div>
      )}
    </div>
  );
}

export default InstructionsViewer;
