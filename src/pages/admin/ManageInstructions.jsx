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

  const [objects, setObjects] = useState();
  const [preservedObjects, setPreservedObjects] = useState();
  const [updatedObjects, setUpdatedObjects] = useState([]);
  const [addedObjects, setAddedObjects] = useState([]);
  const [deletedObjects, setDeletedObjects] = useState([]);
  const [editable, setEditable] = useState(false);
  const [deletable, setDeletable] = useState(false);
  const [loading, setLoading] = useState(0);

  useEffect(() => {
    axios
      .get(`${API_ROUTE}/v1/instruction`)
      .then((res) => {
        return setObjects(res.data);
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
      setDeletedObjects((prev) => [...prev, e.target.value]);
    } else if (e.target.checked === false) {
      let updateDeleted = deletedObjects;
      updateDeleted = updateDeleted.filter((ele) => {
        return ele !== e.target.value;
      });
      setDeletedObjects(updateDeleted);
    }
  };

  const handleTextChange = (e) => {
    setObjects((prev) => {
      prev[e.target.name] = {
        id: parseInt(e.target.id),
        instruction: e.target.value,
      };
      return [...prev];
    });

    setUpdatedObjects((prev) => [...prev, e.target.name]);
  };

  const handleEdit = () => {
    setPreservedObjects([...objects]);
    setEditable(!editable);
  };

  const handleDelete = () => {
    setDeletable(!deletable);
  };

  const handleCancel = () => {
    if (editable) {
      setObjects(preservedObjects);
    }
    setAddedObjects([]);
    setDeletedObjects([]);
    setDeletable(false);
    setEditable(false);
  };

  const handleSubmit = async () => {
    if (deletable) {
      try {
        deletedObjects.forEach((id) => {
          setLoading((prev) => prev + 1);
          axios
            .delete(`${API_ROUTE}/v1/instruction/${id}`)
            .then(() => {
              setLoading((prev) => prev - 1);
            })
            .catch(() => {
              setLoading((prev) => prev - 1);
            });
        });

        let deleted = objects;
        deleted = deleted.filter((instruction) => {
          return !deletedObjects.includes(`${instruction.id}`);
        });
        setObjects(deleted);
      } catch (err) {
        toast.dismiss();
        toast("Something went wrong");
      }
    }
    if (editable) {
      let unique = [...new Set(updatedObjects)];
      let updates = unique.map((ele) => {
        return {
          id: objects[ele].id,
          instruction: objects[ele].instruction,
        };
      });
      try {
        updates.forEach((update) => {
          setLoading((prev) => prev + 1);
          axios
            .put(`${API_ROUTE}/v1/instruction`, {
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
    setAddedObjects((prev) => [...prev, ""]);
  };
  const handleAddDelete = (e) => {
    setAddedObjects((prev) => {
      prev.splice(e.target.name, 1);
      return [...prev];
    });
  };
  const handleAddChange = (e) => {
    setAddedObjects((prev) => {
      prev[e.target.name] = e.target.value;
      return [...prev];
    });
  };

  const handleAddAll = async () => {
    //removes any empty instruction boxes before submission
    setAddedObjects((prev) => {
      prev = prev.filter((ele) => {
        return ele !== "";
      });
      return [...prev];
    });

    let filteredAdded = addedObjects.filter((ele) => {
      return ele !== "";
    });
    try {
      filteredAdded.forEach((addedInstruction) => {
        setLoading((prev) => prev + 1);
        axios
          .post(`${API_ROUTE}/v1/instruction`, {
            instruction: addedInstruction,
          })
          .then((res) => {
            setLoading((prev) => prev - 1);

            setObjects((prev) => {
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

      setAddedObjects([]);
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
      <div className=" flex-1 mt-4 snap-x ">
      <div className="bg-mainBlue w-3/4 h-10  mr-56 text-fuchsia-50 text-center text-2xl mt-4 rounded-lg text-mr-1">
          اداره التعليمات  - جامعة حلوان
        </div>

        {objects ? (
          <div className="flex flex-col  font-sans">
            <div>
              {objects.length === 0 && (
                <div className="flex justify-center items-center h-40">
                  <p className="text-blue-600 text-center text-4xl">
                    لا يوجد تعليمات لعرضها .
                  </p>
                </div>
              )}
              {objects.map((instruction, index) => (
                <div key={111 + index}>
                  <div className="flex gap-2 mx-5 my-3   border-yellow-300 bg-yellow-50 w-[80vw] min- h-suto items-center  resize-none p-1 h-full  border rounded-2xl text-slate-600">
                    <div>
                      {" "}
                      <span className="mx-2">{index + 1}-</span>
                    </div>
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
                      className={`w-[100%] resize-none p-1 h-auto bg-yellow-50 ${
                        !editable && "bg-slate-300"
                      }`}
                      onChange={handleTextChange}
                    ></textarea>
                  </div>
                </div>
              ))}
            </div>
            {objects.length > 0 && (
              <div className="mx-auto flex gap-10 ">
                {editable || deletable ? (
                  <>
                    <button
                      className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                      onClick={handleSubmit}
                      name="submit"
                    >
                      ارسال
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded"
                      onClick={handleCancel}
                      name="cancel"
                    >
                      الغاء
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                      onClick={handleEdit}
                      name="edit"
                    >
                      تعديل
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded"
                      onClick={handleDelete}
                      name="delete"
                    >
                      حذف
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

        {addedObjects && (
          <div>
            {addedObjects.map((addedInstruction, index) => (
              <div key={index + 2000} className="flex  m-10">
                <button
                  className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded"
                  onClick={handleAddDelete}
                  name={index}
                >
                  الغاء
                </button>
                <textarea
                  value={addedInstruction}
                  name={index}
                  className={`w-[100%] resize-none p-1 h-full bg-green-100 border-2 border-green-500 rounded-2xl	 `}
                  onChange={handleAddChange}
                ></textarea>
              </div>
            ))}
          </div>
        )}

        <div className="mx-auto w-64 my-10 flex gap-10">
          {addedObjects.length > 0 && (
            <button
              className="bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 border-b-4 border-orange-700 hover:border-orange-500 rounded"
              onClick={handleAddAll}
              name="add"
            >
              اضافه الكل
            </button>
          )}
          <button
            className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded m-auto"
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
