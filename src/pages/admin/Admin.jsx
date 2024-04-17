import { Outlet } from "react-router-dom";
import { AdminNavbar } from "../../components/shared/AdminNavbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_ROUTE } from "../../config/env";
import Unauthorized from "../../components/minicomponent/Unauthorized";
import Loading from "../../components/minicomponent/Loading";

const Admin = () => {
  if (sessionStorage.getItem("token")) {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${sessionStorage.getItem("token")}`;
  }

  

  const [selectedStudentData, setSelectedStudentData] = useState([]);
  const [studentList, setStudentList] = useState([]);
  const [filters, setFilters] = useState({
    isApproved: null,
    gender: null,
    notHoused: false,
    housed: false,
  });
  const [filteredList, setFilteredList] = useState([]);
  const [loading, setLoading] = useState(0)

  const [loadPage, setLoadPage] = useState(false);

  useEffect(() => {
    setLoading((prev) => prev + 1);
    axios
      .post(`${API_ROUTE}/v1/employee/verify-token-page-load`)
      .then((res) => {
        setLoading((prev) => prev - 1);
        if (res.status == 200) {
          return setLoadPage(true);
        }
        if (res.status == 401 || res.status == 403) {
          return setLoadPage(false);
        }
      })
      .catch(() => {
        setLoading((prev) => prev - 1);
        return setLoadPage(false);
      });
  },[]);

  if(loading > 0){
    return <Loading />
  }

  if (!loadPage || !sessionStorage.getItem("token")) {
    return <Unauthorized />;
  }

  return (
    <>
      <AdminNavbar />

      <Outlet
        context={[
          selectedStudentData,
          setSelectedStudentData,
          studentList,
          setStudentList,
          filters,
          setFilters,
          filteredList,
          setFilteredList,
        ]}
      />
    </>
  );
};

export default Admin;
