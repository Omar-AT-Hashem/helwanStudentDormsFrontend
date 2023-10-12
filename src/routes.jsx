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
import ManageCategories from "./pages/admin/ManageCategories";
import Asbsenteeism from "./pages/admin/asbsenteeism";
import Penalties from "./pages/admin/penalties";
import WhenToApply from "./pages/student/WhenToApply";
import UserProfile from "./pages/student/UserProfile";
import StudentApplicationForm from "./pages/student/StudentApplicationForm";
import InstructionsViewer from "./pages/student/InstructionsViewer";

import IdCardGenerator from "./pages/admin/IdCardGenerator";
import ManageInsturctions from "./pages/admin/ManageInstructions";
import ManageTables from "./pages/admin/ManageTables";
import StudentLogin from "./pages/login/StudentLogin";
import Student from "./pages/student/student";
import Admin from "./pages/admin/Admin";
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
            path: "managecategories",
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
            path: "manageTables",
            element: <ManageTables />,
          },
        ]
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
            path: "whentoapply",
            element: <WhenToApply />,
          },
        ],
      },
      
    ],
  },
  
]);
