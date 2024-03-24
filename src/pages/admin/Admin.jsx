import { Outlet } from "react-router-dom";
import { AdminNavbar } from "../../components/shared/AdminNavbar";
import { useState } from "react";

const Admin = () => {
  const [selectedStudentData, setSelectedStudentData] = useState([]);
  const [studentList, setStudentList] = useState([]);
  const [filters, setFilters] = useState({
    isApproved: null,
    gender: null,
    notHoused: false,
    housed: false,
  });

  return (
    <>
      <AdminNavbar />

      <Outlet context={[selectedStudentData, setSelectedStudentData, studentList, setStudentList, filters, setFilters]} />
    </>
  );
};

export default Admin;
