import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import Loadable from "../components/organisms/loadable";
import { Routes } from "./routes.enum";

import LoginRoutes from "./LoginRoutes";
import CustomerRoutes from "./CustomerRoutes";
import EmployeeRoutes from "./EmployeeRoutes";

//Para layouts
const DashboardLayout = Loadable(lazy(() => import("../layouts/Dashboard")));

//Para pages
const Teste = Loadable(lazy(() => import("../components/molecules/EmployeeList")));

const router = createBrowserRouter([
  {
    path: Routes.HOME,
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Teste />,
      },
      
    ],
  },
  LoginRoutes,
  CustomerRoutes,
  EmployeeRoutes,
]);

export default router;
