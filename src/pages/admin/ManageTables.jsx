import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { API_ROUTE } from "../../config/env";

const ManageTables = () => {
  if (sessionStorage.getItem("token")) {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${sessionStorage.getItem("token")}`;
  }

  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deletedTables, setDeletedTables] = useState([]);
  const [addedTables, setAddedTables] = useState([]);
  const [editedTables, setEditedTables] = useState([]);
  const [updatedTables, setUpdatedTables] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    axios
      .get(`${API_ROUTE}/tables`)
      .then((res) => {
        setTables(res.data);
      })
      .catch((err) => {
        if (err && err.code === "ERR_BAD_REQUEST") {
          return;
        }
        toast.dismiss();
        toast("Something went wrong");
      });
  }, []);

  const handleCheckboxChange = (e) => {
    if (e.target.checked === true) {
      setDeletedTables((prev) => [...prev, e.target.value]);
    } else if (e.target.checked === false) {
      let updateDeleted = deletedTables;
      updateDeleted = updateDeleted.filter((id) => id !== e.target.value);
      setDeletedTables(updateDeleted);
    }
  };

  const handleTableChange = (tableId, field, value) => {
    setTables((prevTables) =>
      prevTables.map((table) =>
        table.id === tableId ? { ...table, [field]: value } : table
      )
    );
  };

  const handleAddTable = () => {
    setAddedTables((prev) => [
      ...prev,
      {
        gender: "",
        status: "",
        start_date: "",
        end_date: "",
      },
    ]);
  };

  const handleDeleteTable = (tableId) => {
    setLoading(true);
    axios
      .delete(`${API_ROUTE}/tables/${tableId}`)
      .then(() => {
        setLoading(false);
        setTables((prevTables) =>
          prevTables.filter((table) => table.id !== tableId)
        );
      })
      .catch(() => {
        setLoading(false);
        toast.dismiss();
        toast("Something went wrong");
      });
  };

  const handleEditTable = (tableId) => {
    if (!editedTables.includes(tableId)) {
      setEditedTables((prev) => [...prev, tableId]);
    }
  };

  const handleCancelEdit = (tableId) => {
    setEditedTables((prev) => prev.filter((id) => id !== tableId));
  };

  const handleSaveChanges = (tableId) => {
    setLoading(true);
    const updatedTable = tables.find((table) => table.id === tableId);
    axios
      .put(`${API_ROUTE}/tables/${tableId}`, updatedTable)
      .then(() => {
        setLoading(false);
        setEditedTables((prev) => prev.filter((id) => id !== tableId));
        setUpdatedTables((prev) => [...prev, tableId]);
      })
      .catch(() => {
        setLoading(false);
        toast.dismiss();
        toast("Something went wrong");
      });
  };

  const handleSaveAllTables = () => {
    setIsSaving(true);

    // Send requests to save all addedTables
    const savePromises = addedTables.map((addedTable) => {
      return axios.post(`${API_ROUTE}/tables`, addedTable);
    });

    // Wait for all promises to resolve
    Promise.all(savePromises)
      .then((responses) => {
        // Add the newly added tables to the state
        const newTables = responses.map((res) => res.data);
        setTables((prevTables) => [...prevTables, ...newTables]);

        // Clear the addedTables array
        setAddedTables([]);
        setIsSaving(false);
      })
      .catch(() => {
        setIsSaving(false);
        toast.dismiss();
        toast("Something went wrong while saving tables");
      });
  };

  return (
    <div className="pt-16 flex flex-row w-full h-screen relative">
      <Toaster
        toastOptions={{
          className: "",
          style: {
            border: "1px solid #A9872D",
            backgroundColor: "#A9872D",
            padding: "16px",
            color: "white",
            fontWeight: "bold",
            marginTop: "65px",
            textAlign: "center",
          },
        }}
      />
      <div className="flex-1">
        <div className="bg-sky-700 w-full h-10 text-fuchsia-50 text-center text-2xl ">
          Manage Tables
        </div>

        {tables.length > 0 ? (
          <div className="flex flex-col">
            <div>
              {tables.map((table, index) => (
                <div key={table.id}>
                  <div className="flex gap-2 mx-5 my-3 p-3 border border-slate-600 bg-slate-300 w-[80vw] min-h-[100px] items-center">
                    <div>{index + 1}</div>
                    <input
                      type="checkbox"
                      name={table.id}
                      value={table.id}
                      onChange={handleCheckboxChange}
                    />
                    {editedTables.includes(table.id) ? (
                      <>
                        <div>
                          <label htmlFor={`gender-${table.id}`}>Gender:</label>
                          <select
                            id={`gender-${table.id}`}
                            value={table.gender}
                            onChange={(e) =>
                              handleTableChange(table.id, "gender", e.target.value)
                            }
                            required 
                          >
                            <option value="" disabled>Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor={`status-${table.id}`}>Status:</label>
                          <select
                            id={`status-${table.id}`}
                            value={table.status}
                            onChange={(e) =>
                              handleTableChange(table.id, "status", e.target.value)
                            }
                            required 
                          >
                            <option value="" disabled>Select Status</option>
                            <option value="newcomer">Newcomer</option>
                            <option value="oldtimer">Oldtimer</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor={`start_date-${table.id}`}>Start Date:</label>
                          <input
                            id={`start_date-${table.id}`}
                            type="date"
                            value={table.start_date}
                            onChange={(e) =>
                              handleTableChange(table.id, "start_date", e.target.value)
                            }
                            required 
                          />
                        </div>
                        <div>
                          <label htmlFor={`end_date-${table.id}`}>End Date:</label>
                          <input
                            id={`end_date-${table.id}`}
                            type="date"
                            value={table.end_date}
                            onChange={(e) =>
                              handleTableChange(table.id, "end_date", e.target.value)
                            }
                            required 
                          />
                        </div>
                        <button onClick={() => handleSaveChanges(table.id)}>Save</button>
                        <button onClick={() => handleCancelEdit(table.id)}>Cancel</button>
                      </>
                    ) : (
                      <>
                        <div>
                          <label htmlFor={`gender-${table.id}`}>Gender:</label>
                          {table.gender}
                        </div>
                        <div>
                          <label htmlFor={`status-${table.id}`}>Status:</label>
                          {table.status}
                        </div>
                        <div>
                          <label htmlFor={`start_date-${table.id}`}>Start Date:</label>
                          {table.start_date}
                        </div>
                        <div>
                          <label htmlFor={`end_date-${table.id}`}>End Date:</label>
                          {table.end_date}
                        </div>
                        <button onClick={() => handleEditTable(table.id)}>Edit</button>
                      </>
                    )}
                    <button onClick={() => handleDeleteTable(table.id)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <Loader2
            size={100}
            className="animate-spin duration-200 absolute left-[50%] top-[50%] "
          />
        )}

        <div className="mx-auto flex gap-10">
          <button
            className="font-bold bg-red-600 text-white rounded w-20 h-10"
            onClick={handleDeleteTable}
          >
            Delete Selected
          </button>
          <button
            className="font-bold bg-green-600 text-white rounded w-20 h-10"
            onClick={handleAddTable}
          >
            Add Table
          </button>
          <button
            className="font-bold bg-blue-600 text-white rounded w-20 h-10"
            onClick={handleSaveAllTables}
          >
            Save All
          </button>
        </div>
      </div>
      {isSaving && (
        <Loader2
          size={100}
          className="animate-spin duration-200 absolute left-[50%] top-[50%]"
        />
      )}
      {addedTables.map((addedTable, index) => (
        <div key={index} className="form-for-adding-table">
          <label htmlFor={`gender-${index}`}>Gender:</label>
          <select
            id={`gender-${index}`}
            value={addedTable.gender}
            onChange={(e) =>
              handleTableChange(index, "gender", e.target.value)
            }
            required 
          >
            <option value="" disabled>Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <label htmlFor={`status-${index}`}>Status:</label>
          <select
            id={`status-${index}`}
            value={addedTable.status}
            onChange={(e) =>
              handleTableChange(index, "status", e.target.value)
            }
            required 
          >
            <option value="" disabled>Select Status</option>
            <option value="newcomer">Newcomer</option>
            <option value="oldtimer">Oldtimer</option>
          </select>
          <label htmlFor={`start_date-${index}`}>Start Date:</label>
          <input
            id={`start_date-${index}`}
            type="date"
            value={addedTable.start_date}
            onChange={(e) =>
              handleTableChange(index, "start_date", e.target.value)
            }
            required 
          />
          <label htmlFor={`end_date-${index}`}>End Date:</label>
          <input
            id={`end_date-${index}`}
            type="date"
            value={addedTable.end_date}
            onChange={(e) =>
              handleTableChange(index, "end_date", e.target.value)
            }
            required 
          />
          <button onClick={() => handleSaveChanges(index)}>Save</button>
          <button onClick={() => handleCancelEdit(index)}>Cancel</button>
        </div>
      ))}
    </div>
  );
};

export default ManageTables;

