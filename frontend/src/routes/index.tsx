import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import Loadable from "../components/organisms/loadable";
import { Routes } from "./routes.enum";

import LoginRoutes from "./LoginRoutes";
import CustomerRoutes from "./CustomerRoutes";
import EmployeeRoutes from "./EmployeeRoutes";

//Para layouts
const PublicLayout = Loadable(lazy(() => import("../layouts/Public")));

//Para pages
const Teste = Loadable(lazy(() => import("../pages/LandingPage")));

const router = createBrowserRouter([
  {
    path: Routes.HOME,
    element: <PublicLayout />, // Envolve LandingPage com layout público
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
