import { Outlet } from "react-router-dom";
import { Navbar } from "../../components/shared/AdminNavbar";

const Student = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Student;
