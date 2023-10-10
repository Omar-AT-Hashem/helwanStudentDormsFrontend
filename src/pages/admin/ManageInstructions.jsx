import { useState, useEffect } from "react";
import axios from "axios";
import { API_ROUTE } from "../../config/env";
import toast, { Toaster } from "react-hot-toast";
import { Loader2 } from "lucide-react";

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
  const [addedInstructions, setAddedInstructions] = useState([]);
  const [editable, setEditable] = useState(false);
  const [deletable, setDeletable] = useState(false);
  const [loading, setLoading] = useState(0);

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

  const handleEdit = () => {
    setPreservedInstructions([...instructions]);
    setEditable(!editable);
  };

  const handleDelete = () => {
    setDeletable(!deletable);
  };

  const handleCancel = () => {
    if (editable) {
      setInstructions(preservedInstructions);
    }
    setDeletable(false);
    setEditable(false);
  };

  const handleSubmit = async () => {
    if (deletable) {
      try {
        deletedInstruction.forEach((id) => {
          setLoading((prev) => prev + 1);
          axios
            .delete(`${API_ROUTE}/general/instructions/${id}`)
            .then(() => {
              setLoading((prev) => prev - 1);
            })
            .catch(() => {
              setLoading((prev) => prev - 1);
            });
        });

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
        updates.forEach((update) => {
          setLoading((prev) => prev + 1);
          axios
            .put(`${API_ROUTE}/general/instructions`, {
              id: update.id,
              instruction: update.instruction,
            })
            .then(() => {
              setLoading((prev) => prev - 1);
            })
            .catch(() => {
              setLoading((prev) => prev - 1);
            });
        });
      } catch (err) {
        toast.dismiss();
        toast("Something went wrong");
      }
    }

    setDeletable(false);
    setEditable(false);
  };

  const handleAdd = () => {
    setAddedInstructions((prev) => [...prev, ""]);
  };
  const handleAddDelete = (e) => {
    setAddedInstructions((prev) => {
      prev.splice(e.target.name, 1);
      return [...prev];
    });
  };
  const handleAddChange = (e) => {
    setAddedInstructions((prev) => {
      prev[e.target.name] = e.target.value;
      return [...prev];
    });
  };

  const handleAddAll = async () => {
    //removes any empty instruction boxes before submission
    setAddedInstructions((prev) => {
      prev = prev.filter((ele) => {
        return ele !== "";
      });
      return [...prev];
    });

    let filteredAdded = addedInstructions.filter((ele) => {
      return ele !== "";
    });
    try {
      filteredAdded.forEach((addedInstruction) => {
        setLoading((prev) => prev + 1);
        axios
          .post(`${API_ROUTE}/general/instructions`, {
            instruction: addedInstruction,
          })
          .then((res) => {
            setLoading((prev) => prev - 1);

            setInstructions((prev) => {
              return [
                ...prev,
                {
                  id: res.data.id,
                  instruction: addedInstruction,
                },
              ];
            });
          })
          .catch(() => {
            setLoading((prev) => prev - 1);
          });
      });

      setAddedInstructions([]);
    } catch (err) {
      toast.dismiss();
      toast("Something went wrong");
    }
  };

  return (
    <div className=" pt-16 flex flex-row w-full h-screen relative font-sans">
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

        {instructions ? (
          <div className="flex flex-col">
            <div>
              {instructions.length === 0 && <div>No instructions present</div>}
              {instructions.map((instruction, index) => (
                <div key={111 + index}>
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
                </div>
              ))}
            </div>
            {instructions.length > 0 && (
              <div className="mx-auto flex gap-10">
                {editable || deletable ? (
                  <>
                    <button
                      className="font-bold bg-orange-600 text-white rounded w-20 h-10 "
                      onClick={handleSubmit}
                      name="submit"
                    >
                      Submit
                    </button>
                    <button
                      className="font-bold bg-slate-600  text-white rounded w-20 h-10 "
                      onClick={handleCancel}
                      name="cancel"
                    >
                      cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="font-bold bg-blue-600 text-white rounded w-20 h-10 "
                      onClick={handleEdit}
                      name="edit"
                    >
                      Edit
                    </button>
                    <button
                      className="font-bold bg-red-600 text-white rounded w-20 h-10 "
                      onClick={handleDelete}
                      name="delete"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        ) : (
          <Loader2
            size={100}
            className="animate-spin duration-200 absolute left-[50%] top-[50%] "
          />
        )}

        {addedInstructions && (
          <div>
            {addedInstructions.map((addedInstruction, index) => (
              <div key={index + 2000} className="flex bg-slate-500 m-10">
                <button
                  className="flex items-center justify-center bg-red-700 text-white font-bold h-14 w-14 top-0 right-0 "
                  onClick={handleAddDelete}
                  name={index}
                >
                  الغاء
                </button>
                <textarea
                  value={addedInstruction}
                  name={index}
                  className={`w-[100%] resize-none p-1 h-full bg-slate-300`}
                  onChange={handleAddChange}
                ></textarea>
              </div>
            ))}
          </div>
        )}

        <div className="mx-auto w-64 my-10 flex gap-10">
          {addedInstructions.length > 0 && (
            <button
              className="font-bold bg-orange-500 text-white rounded w-20 h-10"
              onClick={handleAddAll}
              name="add"
            >
              اضافه الكل 
            </button>
          )}
          <button
            className="font-bold bg-green-900 text-white rounded w-20 h-10"
            onClick={handleAdd}
            name="add"
          >
            اضافه
          </button>
        </div>
      </div>
      {loading > 0 && (
        <Loader2
          size={100}
          className="animate-spin duration-200 absolute left-[50%] top-[50%]"
        />
      )}
    </div>
  );
};

export default ManageInsturctions;
