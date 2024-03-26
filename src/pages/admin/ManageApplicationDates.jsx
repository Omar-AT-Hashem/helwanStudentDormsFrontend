import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { API_ROUTE } from "../../config/env";
import axios from "axios";
import Loading from "../../components/minicomponent/Loading.jsx";

export default function ManageApplicationDates() {
  if (sessionStorage.getItem("token")) {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${sessionStorage.getItem("token")}`;
  }

  const [objects, setObjects] = useState();
  const [deletedObjects, setDeletedObjects] = useState([]);
  const [preservedObjects, setPreservedObjects] = useState();
  const [updatedObjects, setUpdatedObjects] = useState([]);
  const [addedObjects, setAddedObjects] = useState([]);
  const [loading, setLoading] = useState(0);

  const [deletable, setDeletable] = useState();
  const [editable, setEditable] = useState();

  const [permissions, setPermissions] = useState([
    {
      creating: 0,
      reading: 0,
      updating: 0,
      deleting: 0,
      creatingEmployee: 0,
    },
  ]);
  useEffect(() => {
    setLoading((prev) => prev + 1);
    axios
      .get(
        `${API_ROUTE}/v1/employee/permissions/${sessionStorage.getItem("id")}`
      )
      .then((res) => {
        setLoading((prev) => prev - 1);
        setPermissions(res.data);
      })
      .catch(() => {
        setLoading((prev) => prev - 1);
        return;
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

  const handleInputChange = (e) => {
    const elementIndex = parseInt(e.target.name.split("-")[0]);
    const elementName = e.target.name.split("-")[1];

    if (e.target.type == "text") {
      if (elementName == "studentType") {
        setObjects((prev) => {
          prev[elementIndex] = {
            ...prev[elementIndex],
            studentType: e.target.value,
          };
          return [...prev];
        });
      }
    }
    if (e.target.type == "date") {
      if (elementName == "startDate") {
        setObjects((prev) => {
          prev[elementIndex] = {
            ...prev[elementIndex],
            startDate: e.target.value,
          };
          return [...prev];
        });
      }
      if (elementName == "endDate") {
        setObjects((prev) => {
          prev[elementIndex] = {
            ...prev[elementIndex],
            endDate: e.target.value,
          };
          return [...prev];
        });
      }
    }

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
            .delete(`${API_ROUTE}/v1/application-date/${id}`)
            .then(() => {
              //handle Logs
              axios.post(`${API_ROUTE}/v1/log`, {
                adminId: sessionStorage.getItem("id"),
                adminName: sessionStorage.getItem("name"),
                adminUsername: sessionStorage.getItem("username"),
                action: `حذف تاريخ التقديم `,
                objectId: `فارغ`,
                objectName: `فارغ`,
              });

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
        const i = parseInt(ele.split("-")[0]);
        return {
          id: objects[i].id,
          studentType: objects[i].studentType,
          startDate: objects[i].startDate,
          endDate: objects[i].endDate,
        };
      });
      try {
        updates.forEach((update) => {
          setLoading((prev) => prev + 1);
          axios
            .put(`${API_ROUTE}/v1/application-date`, {
              id: update.id,
              studentType: update.studentType,
              startDate: update.startDate,
              endDate: update.endDate,
            })
            .then(() => {
              //handle Logs
              axios.post(`${API_ROUTE}/v1/log`, {
                adminId: sessionStorage.getItem("id"),
                adminName: sessionStorage.getItem("name"),
                adminUsername: sessionStorage.getItem("username"),
                action: `تعديل تاريخ التقديم`,
                objectId: `فارغ`,
                objectName: `فارغ`,
              });
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
    setAddedObjects((prev) => [
      ...prev,
      { startDate: "", endDate: "", studentType: "" },
    ]);
  };
  const handleAddDelete = (e) => {
    setAddedObjects((prev) => {
      prev.splice(e.target.name, 1);
      return [...prev];
    });
  };
  const handleAddChange = (e) => {
    const elementIndex = parseInt(e.target.name.split("-")[0]);
    const elementName = e.target.name.split("-")[1];

    if (e.target.type == "text") {
      if (elementName == "studentType") {
        setAddedObjects((prev) => {
          prev[elementIndex] = {
            ...prev[elementIndex],
            studentType: e.target.value,
          };
          return [...prev];
        });
      }
    }
    if (e.target.type == "date") {
      if (elementName == "startDate") {
        setAddedObjects((prev) => {
          prev[elementIndex] = {
            ...prev[elementIndex],
            startDate: e.target.value,
          };
          return [...prev];
        });
      }
      if (elementName == "endDate") {
        setAddedObjects((prev) => {
          prev[elementIndex] = {
            ...prev[elementIndex],
            endDate: e.target.value,
          };
          return [...prev];
        });
      }
    }
  };

  const handleAddAll = async () => {
    //removes any empty instruction boxes before submission
    setAddedObjects((prev) => {
      prev = prev.filter((ele) => {
        return (
          ele.startDate !== "" && ele.endDate !== "" && ele.studentType !== ""
        );
      });
      return [...prev];
    });

    let filteredAdded = addedObjects.filter((ele) => {
      return (
        ele.startDate !== "" && ele.endDate !== "" && ele.studentType !== ""
      );
    });
    try {
      filteredAdded.forEach((addedObject) => {
        setLoading((prev) => prev + 1);
        axios
          .post(`${API_ROUTE}/v1/application-date`, {
            studentType: addedObject.studentType,
            startDate: addedObject.startDate,
            endDate: addedObject.endDate,
          })
          .then((res) => {
            axios.post(`${API_ROUTE}/v1/log`, {
              adminId: sessionStorage.getItem("id"),
              adminName: sessionStorage.getItem("name"),
              adminUsername: sessionStorage.getItem("username"),
              action: `اضافه تاريخ التقديم`,
              objectId: `فارغ`,
              objectName: `فارغ`,
            });
            setLoading((prev) => prev - 1);

            setObjects((prev) => {
              return [
                ...prev,
                {
                  id: res.data.id,
                  studentType: addedObject.studentType,
                  startDate: addedObject.startDate,
                  endDate: addedObject.endDate,
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

  useEffect(() => {
    setLoading((prev) => prev + 1);
    axios
      .get(`${API_ROUTE}/v1/application-date`)
      .then((res) => {
        setLoading((prev) => prev - 1);
        return setObjects(res.data);
      })
      .catch((err) => {
        setLoading((prev) => prev - 1);
        if (err && err.code === "ERR_BAD_REQUEST") {
          return;
        }
        toast.dismiss();
        return toast("Something went wrong");
      });
  }, []);

  return (
    <div className="pt-20 w-screen min-h-screen ltr-local">
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
      <div className="mx-auto w-fit mt-20">
        {(objects && objects.length > 0) ||
        (addedObjects && addedObjects.length > 0) ? (
          <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <table className="min-w-full text-center text-sm font-light">
                    <thead className="border-b font-medium dark:border-neutral-500">
                      <tr>
                        <th scope="col" className="px-6 py-4">
                          تاريخ الانتهاء
                        </th>
                        <th scope="col" className="px-6 py-4">
                          تاريخ البدء
                        </th>
                        <th scope="col" className="px-6 py-4">
                          نوع الطالب
                        </th>
                        {deletable && (
                          <th scope="col" className="px-6 py-4"></th>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {objects.map((date, index) => (
                        <tr
                          key={`${date.id}--date-${index}`}
                          className="border-b border-neutral-100 bg-neutral-50 text-neutral-800 dark:bg-neutral-50"
                        >
                          <td className="whitespace-nowrap px-6 py-4">
                            {!editable ? (
                              date.endDate
                            ) : (
                              <input
                                type="date"
                                disabled={!editable}
                                onChange={handleInputChange}
                                name={`${index}-endDate`}
                              />
                            )}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {!editable ? (
                              date.startDate
                            ) : (
                              <input
                                type="date"
                                disabled={!editable}
                                onChange={handleInputChange}
                                name={`${index}-startDate`}
                              />
                            )}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {!editable ? (
                              date.studentType
                            ) : (
                              <input
                                type="text"
                                value={date.studentType}
                                disabled={!editable}
                                className="bg-slate-400"
                                onChange={handleInputChange}
                                name={`${index}-studentType`}
                              />
                            )}
                          </td>
                          {deletable && (
                            <td className="w-4 p-4">
                              <div className="flex items-center">
                                <input
                                  type="checkbox"
                                  value={date.id}
                                  onClick={handleCheckboxChange}
                                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded "
                                />
                              </div>
                            </td>
                          )}
                        </tr>
                      ))}
                      {addedObjects &&
                        addedObjects.map((addedObject, index) => (
                          <tr
                            key={`date--${index}`}
                            className="border-b border-neutral-100 bg-neutral-50 text-neutral-800 dark:bg-neutral-50"
                          >
                            <td className="whitespace-nowrap px-6 py-4">
                              {" "}
                              <input
                                type="date"
                                value={addedObject.endDate}
                                name={`${index}-endDate`}
                                onChange={handleAddChange}
                              />
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {" "}
                              <input
                                type="date"
                                value={addedObject.startDate}
                                name={`${index}-startDate`}
                                onChange={handleAddChange}
                              />
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              <input
                                type="text"
                                value={addedObject.studentType}
                                name={`${index}-studentType`}
                                className="bg-slate-300"
                                onChange={handleAddChange}
                              />
                            </td>
                            <button
                              className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded"
                              onClick={handleAddDelete}
                              name={index}
                            >
                              X
                            </button>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              {deletable && (
                <button
                  onClick={handleSubmit}
                  className="bg-red-600 w-36 h-10 rounded text-white hover:opacity-80 transition-all duration-200"
                >
                  حذف المُحدَد
                </button>
              )}
              {!deletable &&
                !editable &&
                addedObjects.length == 0 &&
                permissions.deleting == 1 && (
                  <button
                    onClick={handleDelete}
                    className="bg-red-600 w-36 h-10 rounded text-white hover:opacity-80 transition-all duration-200"
                  >
                    حذف
                  </button>
                )}
              {(deletable || editable || addedObjects.length > 0) && (
                <button
                  onClick={handleCancel}
                  className="bg-blue-600 w-36 h-10 rounded text-white hover:opacity-80 transition-all duration-200"
                >
                  إلغاء
                </button>
              )}{" "}
              {!editable && !deletable && permissions.creating == 1 && (
                <button
                  onClick={handleAdd}
                  className="bg-blue-600 w-36 h-10 rounded text-white hover:opacity-80 transition-all duration-200"
                >
                  إضافة
                </button>
              )}
              {editable && (
                <button
                  onClick={handleSubmit}
                  className="bg-blue-600 w-36 h-10 rounded text-white hover:opacity-80 transition-all duration-200"
                >
                  ارسال
                </button>
              )}
              {!deletable &&
                !editable &&
                addedObjects.length == 0 &&
                permissions.updating == 1 && (
                  <button
                    onClick={handleEdit}
                    className="bg-blue-600 w-36 h-10 rounded text-white hover:opacity-80 transition-all duration-200"
                  >
                    تعديل
                  </button>
                )}
              {addedObjects.length > 0 && (
                <button
                  onClick={handleAddAll}
                  className="bg-blue-600 w-36 h-10 rounded text-white hover:opacity-80 transition-all duration-200"
                >
                  إضافة الكل
                </button>
              )}
            </div>
          </div>
        ) : (
          <>
            <div>لا تتوفر بيانات</div>
            {!editable && !deletable && (
              <button
                onClick={handleAdd}
                className="bg-blue-600 w-36 h-10 rounded text-white hover:opacity-80 transition-all duration-200"
              >
                إضافة
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
