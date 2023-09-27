import {createBrowserRouter,} from "react-router-dom";
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
import Asbsenteeism from "./pages/admin/asbsenteeism";
import Penalties from "./pages/admin/penalties";
import WhenToApply from "./pages/admin/WhenToApply";
import InstructionsViewer from "./pages/admin/InstructionsViewer"
import resom from "./pages/admin/resom";
import IdCardGenerator from "./pages/admin/IdCardGenerator"
export const routes = createBrowserRouter([
    {

        
        path: '',
        element: <App/>,
        children:[{
            path: "/emp",
            element: <Emp />,
          },
         {
            path: "/instructionsViewer",
            element: <InstructionsViewer />,
          },
         {
            path: "/ whenToApply ",
            element: < WhenToApply />,
          },
          {
            path: "/basicdata",
            element: <BasicData />,
          },
          {
            path: "/taxes",
            element: <Taxes />,
          },
          {
            path: "/housing",
            element: <Housing />,
          },
          {
            path: "/separateStudunts",
            element: <SeparateStudunts />,
          },
          {
            path: "/blockmeals",
            element: <BlockMeals />,
          },
          {
            path: "/status",
            element: <Status />,
          },
          {
            path: "/taxesstatment",
            element: <TaxesStatment />,
          },
           {
            path: "/IdCardGenerator",
            element: <IdCardGenerator />,
          },       
          {
            path: "/asbsenteeism",
            element: <Asbsenteeism />,
          },
        
          {
            path: "/penalties",
            element: <Penalties />,
          },
          {
            path: "/resom",
            element: <resom />,
          },
        ]
    },
    {
        path:'/login' ,
        element:<Login />,
    }
    
])
