import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./pages/login/login";
import Emp from "./pages/admin/Emp";
import BasicData from "./pages/admin/BasicData";
import Taxes from "./pages/admin/Taxes";
import Housing from "./pages/admin/Housing";
import SeparateStudunts from "./pages/admin/SeparateStudunts";
import Status from "./pages/admin/Status";
import BlockMeals from "./pages/admin/BlockMeals";
import TaxesStatment from "./pages/admin/TaxesStatment";
////////////////////////////////////////////////////
import AdminReports from "./pages/admin/AdminReports";
import AppDeadlines from "./pages/admin/AppDeadlines";
import Categories from "./pages/admin/Categories";
import Country from "./pages/admin/Country";
import Fees from "./pages/admin/Fees";
import GeneralStatistics from "./pages/admin/GeneralStatistics";
import Meals from "./pages/admin/Meals";
import Rooms from "./pages/admin/Rooms";
import StudentApp from "./pages/admin/StudentApp";
import SubmissionInstructions from "./pages/admin/SubmissionInstructions";
import TypeOfHousing from "./pages/admin/TypeOfHousing";
import UniversityPic from "./pages/admin/UniversityPic";
import UsersInApp from "./pages/admin/UsersInApp";

// import ManageCategories from "./pages/admin/ManageCategories";
import Asbsenteeism from "./pages/admin/asbsenteeism";
import Penalties from "./pages/admin/penalties";
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
            path: "emp",
            element: <Emp />,
          },
          {
            path: "basicdata",
            element: <BasicData />,
          },
          {
            path: "taxes",
            element: <Taxes />,
          },
          {
            path: "housing",
            element: <Housing />,
          },
          {
            path: "separateStudunts",
            element: <SeparateStudunts />,
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
            path: "status",
            element: <Status />,
          },
          {
            path: "taxesstatment",
            element: <TaxesStatment />,
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
            path: "penalties",
            element: <Penalties />,
          },

          {
            path: "manageInstructions",
            element: <ManageInsturctions />,
          },
          {
            path: "manageApplicationDates",
            element: <ManageApplicationDates />,
          },
          //////////////////////////////////////////////
          {
            path: "usersinapp",
            element: <UsersInApp />,
          },
          {
            path: "universitypic",
            element: <UniversityPic />,
          },
          {
            path: "typeofhousing",
            element: <TypeOfHousing />,
          },
          {
            path: "submissioninstructions",
            element: <SubmissionInstructions />,
          },
          {
            path: "studentapp",
            element: <StudentApp />,
          },
          {
            path: "rooms",
            element: <Rooms />,
          },
          {
            path: "meals",
            element: <Meals />,
          },
          {
            path: "generalstatistics",
            element: <GeneralStatistics />,
          },
          {
            path: "fees",
            element: <Fees />,
          },
          {
            path: "country",
            element: <Country />,
          },
          {
            path: "appdeadlines",
            element: <AppDeadlines />,
          },
          {
            path: "categories",
            element: <Categories />,
          },
          {
            path: "reports",
            element: <AdminReports />,
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
