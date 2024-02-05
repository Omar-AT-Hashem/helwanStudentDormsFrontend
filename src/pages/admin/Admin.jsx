import { Outlet } from "react-router-dom";
import { AdminNavbar } from "../../components/shared/AdminNavbar";
import { useState } from "react";

const Admin = () => {
  const [selectedStudentData, setSelectedStudentData] = useState([]);

  return (
    <>
      <AdminNavbar />

      <Outlet context={[selectedStudentData, setSelectedStudentData]} />
    </>
  );
};

export default Admin;
