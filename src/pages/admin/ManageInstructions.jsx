import { useState, useEffect } from "react";
import axios from "axios";
import { API_ROUTE } from "../../config/env";
import toast, { Toaster } from "react-hot-toast";

const ManageInsturctions = () => {
  if (sessionStorage.getItem("token")) {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${sessionStorage.getItem("token")}`;
  }

  const [instructions, setInstructions] = useState();
  const [preservedInstructions, setPreservedInstructions] = useState();
  const [updatedInstructions, setUpdatedInstructions] = useState([]);
  const [deletedInstruction, setDeletedInstructions] = useState([]);
  const [editable, setEditable] = useState(false);
  const [deletable, setDeletable] = useState(false);

  useEffect(() => {
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
  }, []);

  const handleCheckboxChange = (e) => {
    if (e.target.checked === true) {
      setDeletedInstructions((prev) => [...prev, e.target.value]);
    } else if (e.target.checked === false) {
      let updateDeleted = deletedInstruction;
      updateDeleted = updateDeleted.filter((ele) => {
        return ele !== e.target.value;
      });
      setDeletedInstructions(updateDeleted);
    }
  };

  const handleTextChange = (e) => {
    setInstructions((prev) => {
      prev[e.target.name] = {
        id: parseInt(e.target.id),
        instruction: e.target.value,
      };
      return [...prev];
    });

    setUpdatedInstructions((prev) => [...prev, e.target.name]);
  };
  console.log(instructions);
  console.log(preservedInstructions);

  const handleButtonClick = async (e) => {
    if (e.target.name === "edit") {
      setPreservedInstructions([...instructions]);
      setEditable(!editable);
    }
    if (e.target.name === "delete") {
      setDeletable(!deletable);
    }
    if (e.target.name === "cancel") {
      if (editable) {
        setInstructions(preservedInstructions);
      }
      setDeletable(false);
      setEditable(false);
    }
    if (e.target.name === "submit") {
      if (deletable) {
        try {
          Promise.all(
            deletedInstruction.forEach((id) => {
              axios.delete(`${API_ROUTE}/general/instructions/${id}`);
            })
          );
          let deleted = instructions;
          deleted = deleted.filter((instruction) => {
            return !deletedInstruction.includes(`${instruction.id}`);
          });
          setInstructions(deleted);
        } catch (err) {
          toast.dismiss();
          toast("Something went wrong");
        }
      }
      if (editable) {
        let unique = [...new Set(updatedInstructions)];
        let updates = unique.map((ele) => {
          return {
            id: instructions[ele].id,
            instruction: instructions[ele].instruction,
          };
        });
        try {
          Promise.all(
            updates.forEach((update) => {
              axios.put(`${API_ROUTE}/general/instructions`, {
                id: update.id,
                instruction: update.instruction,
              });
            })
          );
        } catch (err) {
          toast.dismiss();
          toast("Something went wrong");
        }
      }

      setDeletable(false);
      setEditable(false);
    }
  };

  return (
    <div className=" pt-16 flex flex-row w-full h-screen ">
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
      <div className=" flex-1">
        <div className="  bg-sky-700 w-full h-10 text-fuchsia-50 text-center text-2xl ">
          Manage Instructions
        </div>

        {instructions && (
          <div className="flex flex-col">
            <div>
              {instructions.map((instruction, index) => (
                <>
                  <div className="flex gap-2 mx-5 my-3 p-3 border border-slate-600 bg-slate-300 w-[80vw] min- h-[100px] items-center">
                    <div>{index + 1}-</div>
                    {deletable && (
                      <input
                        type="checkbox"
                        name={instruction.id}
                        value={instruction.id}
                        onChange={handleCheckboxChange}
                      ></input>
                    )}
                    <textarea
                      disabled={!editable}
                      value={instruction.instruction}
                      id={instruction.id}
                      name={index}
                      className={`w-[80%] resize-none p-1 h-full ${
                        !editable && "bg-slate-300"
                      }`}
                      onChange={handleTextChange}
                    ></textarea>
                  </div>
                </>
              ))}
            </div>
            <div className="mx-auto flex gap-10">
              {editable || deletable ? (
                <>
                  <button
                    className="font-bold bg-orange-600 text-white rounded w-20 h-10 "
                    onClick={handleButtonClick}
                    name="submit"
                  >
                    Submit
                  </button>
                  <button
                    className="font-bold bg-slate-600  text-white rounded w-20 h-10 "
                    onClick={handleButtonClick}
                    name="cancel"
                  >
                    cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="font-bold bg-blue-600 text-white rounded w-20 h-10 "
                    onClick={handleButtonClick}
                    name="edit"
                  >
                    Edit
                  </button>
                  <button
                    className="font-bold bg-red-600 text-white rounded w-20 h-10 "
                    onClick={handleButtonClick}
                    name="delete"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageInsturctions;
