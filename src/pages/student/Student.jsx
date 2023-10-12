import { Outlet } from "react-router-dom";
import { Navbar } from "../../components/shared/Navbar";

const Student = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Student;
