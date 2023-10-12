import { Outlet } from "react-router-dom";
import { Navbar } from "../../components/shared/Navbar";

const Admin = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Admin;
