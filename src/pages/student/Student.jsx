import { Outlet } from "react-router-dom";
import StudentNavbar from "../../components/shared/StudentNavbar";

const Student = () => {
  return (
    <>
      <StudentNavbar />
      <Outlet />
    </>
  );
};

export default Student;
