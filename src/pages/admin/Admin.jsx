import { Outlet } from "react-router-dom";
import { AdminNavbar } from "../../components/shared/AdminNavbar";

const Admin = () => {
  return (
    <>
      <AdminNavbar />
      
      <Outlet />
    </>
  );
};

export default Admin;
