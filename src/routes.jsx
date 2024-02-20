import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./pages/login/login";
import BasicData from "./pages/admin/BasicData";
import Housing from "./pages/admin/Housing";
import BlockMeals from "./pages/admin/BlockMeals";
import Asbsenteeism from "./pages/admin/Asbsenteeism";
import WhenToApply from "./pages/student/WhenToApply";
import UserProfile from "./pages/student/UserProfile";
import StudentApplicationForm from "./pages/student/StudentApplicationForm";
import InstructionsViewer from "./pages/student/InstructionsViewer";
import IdCardGenerator from "./pages/admin/IdCardGenerator";
import ManageInsturctions from "./pages/admin/ManageInstructions";
import StudentLogin from "./pages/login/StudentLogin";
import Student from "./pages/student/student";
import Admin from "./pages/admin/Admin";
import AdminHome from "./pages/admin/AdminHome.jsx";
import ManageApplicationDates from "./pages/admin/ManageApplicationDates";
import ManageCategories from "./pages/admin/ManageCategories";
import { ApplicationApprovals } from "./pages/admin/ApplicationApprovals.jsx";
import HousedStudentsEdit from "./pages/admin/HousedStudentsEdit.jsx";
import Rooms from "./pages/admin/Rooms.jsx";
import Penalties from "./pages/admin/Penalties.jsx";
import Fees from "./pages/admin/fees.jsx";
import ChangeApplicationStatus from "./pages/admin/ChangeApplicationStatus.jsx";
import EditStudentData from "./pages/admin/EditStudentData.jsx";
import { AssessStudents } from "./pages/admin/AssessStudents.jsx";
import EditHousing from "./pages/admin/EditHousing.jsx";
import Evacuation from "./pages/admin/Evacuation.jsx";
import ManageFees from "./pages/admin/ManageFees.jsx";
import CreateEmployee from "./pages/admin/CreateEmployee.jsx";

export const routes = createBrowserRouter([
  {
    path: "",
    element: <Login />,
  },
  {
    path: "",
    element: <App />,
    children: [
      {
        path: "admin",
        element: <Admin />,
        children: [
          {
            path: "home",
            element: <AdminHome />,
          },

          {
            path: "basicdata",
            element: <BasicData />,
          },
          {
            path: "editHousing",
            element: <EditHousing />,
          },
          {
            path: "evacuation",
            element: <Evacuation />,
          },
          {
            path: "housing",
            element: <Housing />,
          },
          {
            path: "HousedStudentsEdit",
            element: <HousedStudentsEdit />,
          },

          {
            path: "manageCategories",
            element: <ManageCategories />,
          },
          {
            path: "blockmeals",
            element: <BlockMeals />,
          },
          {
            path: "createEmployee",
            element: <CreateEmployee />,
          },
          {
            path: "idcardgenerator",
            element: <IdCardGenerator />,
          },
          {
            path: "asbsenteeism",
            element: <Asbsenteeism />,
          },
          {
            path: "manageInstructions",
            element: <ManageInsturctions />,
          },
          {
            path: "manageFees",
            element: <ManageFees />,
          },
          {
            path: "manageApplicationDates",
            element: <ManageApplicationDates />,
          },
          {
            path: "applicationApprovals",
            element: <ApplicationApprovals />,
          },
          {
            path: "penalties",
            element: <Penalties />,
          },
          {
            path: "fees",
            element: <Fees />,
          },
          {
            path: "editstudentdata",
            element: <EditStudentData />,
          },
          {
            path: "assessStudents",
            element: <AssessStudents />,
          },
        ],
      },
      {
        path: "student",
        element: <Student />,
        children: [
          {
            path: "login",
            element: <StudentLogin />,
          },
          {
            path: "profile",
            element: <UserProfile />,
          },
          {
            path: "instructions",
            element: <InstructionsViewer />,
          },
          {
            path: "application",
            element: <StudentApplicationForm />,
          },
          {
            path: "changeapplicationstatus",
            element: <ChangeApplicationStatus />,
          },
          {
            path: "whenToApply",
            element: <WhenToApply />,
          },
          {
            path: "rooms",
            element: <Rooms />,
          },
        ],
      },
    ],
  },
]);
