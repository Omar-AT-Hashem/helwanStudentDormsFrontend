import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./pages/login/login";
import ExcludedCitiesReport from "./pages/admin/ExcludedCitiesReport";
import BasicData from "./pages/admin/BasicData";
import Housing from "./pages/admin/Housing";
import HousingReport from "./pages/admin/HousingReport";
import UniversityStructureReport from "./components/reports/UniversityStructureReport.jsx";
import DormReport from "./pages/admin/DormReport";
import MealsReport from "./pages/admin/MealsReport";
import BlockMeals from "./pages/admin/BlockMeals";
import Absence from "./pages/admin/Absence.jsx";
import WhenToApply from "./pages/student/WhenToApply";
import UserProfile from "./pages/student/UserProfile";
import StudentApplicationForm from "./pages/student/StudentApplicationForm";
import InstructionsViewer from "./pages/student/InstructionsViewer";
import ManageInsturctions from "./pages/admin/ManageInstructions";
import StudentLogin from "./pages/login/StudentLogin";
import Student from "./pages/student/student";
import Admin from "./pages/admin/Admin";
import AdminHome from "./pages/admin/AdminHome.jsx";
import ManageApplicationDates from "./pages/admin/ManageApplicationDates";
import ManageCategories from "./pages/admin/ManageCategories";
import { ApplicationApprovals } from "./pages/admin/ApplicationApprovals.jsx";
import Penalties from "./pages/admin/Penalties.jsx";
import Fees from "./pages/admin/fees.jsx";
import RecievingMeals from "./pages/admin/RecievingMeals.jsx";

import { AssessStudents } from "./pages/admin/AssessStudents.jsx";
import EditHousing from "./pages/admin/EditHousing.jsx";
import Evacuation from "./pages/admin/Evacuation.jsx";
import ManageFees from "./pages/admin/ManageFees.jsx";
import CreateEmployee from "./pages/admin/CreateEmployee.jsx";
import Logs from "./pages/admin/Logs.jsx";
import Statistics from "./pages/admin/Statistics.jsx";
import IDCardGenerator from "./pages/admin/IdCardGenerator.jsx";
import ApplicationReview from "./pages/student/ApplicationReview.jsx";
import MealRecievingCard from "./pages/student/MealRecievingCard.jsx";
import MassImageUpload from "./pages/admin/MassImageUpload.jsx";
import Reports from "./pages/admin/Reports.jsx";

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
            path: "universitystructurereport",
            element: <UniversityStructureReport />,
          },
          {
            path: "housingreport",
            element: <HousingReport />,
          },
          {
            path: "dormreport",
            element: <DormReport />,
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
            path: "excludedcitiesreport",
            element: <ExcludedCitiesReport />,
          },
          {
            path: "housing",
            element: <Housing />,
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
            path: "logs",
            element: <Logs />,
          },

          {
            path: "mealsreport",
            element: <MealsReport />,
          },
          {
            path: "absence",
            element: <Absence />,
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
            path: "recievingmeals",
            element: <RecievingMeals />,
          },
          {
            path: "assessStudents",
            element: <AssessStudents />,
          },
          {
            path: "statistics",
            element: <Statistics />,
          },
          {
            path: "idCardGenerator",
            element: <IDCardGenerator />,
          },
          {
            path: "massImageUpload",
            element: <MassImageUpload />,
          },
          {
            path: "reports",
            element: <Reports />,
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
          {
            path: "applicationReview",
            element: <ApplicationReview />,
          },
          {
            path: "mealsRecievingCard",
            element: <MealRecievingCard />,
          },
        ],
      },
    ],
  },
]);
