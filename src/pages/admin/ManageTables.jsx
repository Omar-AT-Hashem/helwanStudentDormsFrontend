import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_ROUTE } from "../../config/env";
import toast, { Toaster } from "react-hot-toast";
import { Loader2 } from "lucide-react";

const ManageTables = () => {
  // Check if there's a token in sessionStorage and set it as the default authorization header
  if (sessionStorage.getItem("token")) {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${sessionStorage.getItem("token")}`;
  }

  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deletedTables, setDeletedTables] = useState([]);
  const [addedTable, setAddedTable] = useState({
    gender: "",
    status: "unreviewed",
    start_date: "",
    end_date: "",
  });
  const [editedTables, setEditedTables] = useState([]);
  const [updatedTables, setUpdatedTables] = useState([]);
  const [isAddingTable, setIsAddingTable] = useState(false); // Define isAddingTable state

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
    setLoading(true);
    axios
      .post(`${API_ROUTE}/tables`, addedTable)
      .then((res) => {
        setLoading(false);
        // Add the newly added table to the state
        setTables((prevTables) => [...prevTables, res.data]);
        setAddedTable({
          gender: "",
          status: "unreviewed",
          start_date: "",
          end_date: "",
        });
        setIsAddingTable(false); // Set isAddingTable to false after adding the table
      })
      .catch(() => {
        setLoading(false);
        toast.dismiss();
        toast("Something went wrong");
      });
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
                        <select
                          value={table.gender}
                          onChange={(e) =>
                            handleTableChange(table.id, "gender", e.target.value)
                          }
                        >
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </select>
                        <select
                          value={table.status}
                          onChange={(e) =>
                            handleTableChange(table.id, "status", e.target.value)
                          }
                        >
  <option value="newcomer">Newcomer</option>
  <option value="oldtimer">Oldtimer</option>
                        </select>
                        <input
                          type="date"
                          value={table.start_date}
                          onChange={(e) =>
                            handleTableChange(table.id, "start_date", e.target.value)
                          }
                        />
                        <input
                          type="date"
                          value={table.end_date}
                          onChange={(e) =>
                            handleTableChange(table.id, "end_date", e.target.value)
                          }
                        />
                        <button onClick={() => handleSaveChanges(table.id)}>Save</button>
                        <button onClick={() => handleCancelEdit(table.id)}>Cancel</button>
                      </>
                    ) : (
                      <>
                        <div>Gender: {table.gender}</div>
                        <div>Status: {table.status}</div>
                        <div>Start Date: {table.start_date}</div>
                        <div>End Date: {table.end_date}</div>
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
            onClick={() => setIsAddingTable(true)} // Set isAddingTable to true
          >
            Add Table
          </button>
          <button
            className="font-bold bg-blue-600 text-white rounded w-20 h-10"
            onClick={handleAddTable}
          >
            Save Changes
          </button>
        </div>
      </div>
      {loading && (
        <Loader2
          size={100}
          className="animate-spin duration-200 absolute left-[50%] top-[50%]"
        />
      )}

      {/* Integrate the first code snippet here */}
      {isAddingTable ? (
        <div className="form-for-adding-table">
          <select
            value={addedTable.gender}
            onChange={(e) => setAddedTable({ ...addedTable, gender: e.target.value })}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <select
            value={addedTable.status}
            onChange={(e) => setAddedTable({ ...addedTable, status: e.target.value })}
          >
  <option value="newcomer">Newcomer</option>
  <option value="oldtimer">Oldtimer</option>
            </select>

          <input
            type="date"
            value={addedTable.start_date}
            onChange={(e) => setAddedTable({ ...addedTable, start_date: e.target.value })}
          />

          <input
            type="date"
            value={addedTable.end_date}
            onChange={(e) => setAddedTable({ ...addedTable, end_date: e.target.value })}
          />

          <button onClick={handleAddTable}>Add Table</button>
        </div>
      ) : null}
    </div>
  );
};

export default ManageTables;
