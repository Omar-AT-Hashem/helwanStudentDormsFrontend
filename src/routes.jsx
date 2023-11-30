import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./pages/login/login";
import BasicData from "./pages/admin/BasicData";
import Housing from "./pages/admin/Housing";
import BlockMeals from "./pages/admin/BlockMeals";
import Asbsenteeism from "./pages/admin/asbsenteeism";
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
import { ApplicationApprovals } from "./pages/admin/applicationApprovals.jsx";
import HousedStudentsEdit from "./pages/admin/HousedStudentsEdit.jsx";
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
            path: "manageApplicationDates",
            element: <ManageApplicationDates />,
          },
          {
            path: "applicationApprovals",
            element: <ApplicationApprovals />,
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
            path: "whenToApply",
            element: <WhenToApply />,
          },
        ],
      },
    ],
  },
]);
