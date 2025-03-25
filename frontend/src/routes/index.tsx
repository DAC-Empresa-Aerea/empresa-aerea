import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import Loadable from "../components/organisms/Loadable";
import { Routes } from "./routes.enum";

import LoginRoutes from "./LoginRoutes";

//Para layouts
const DashboardLayout = Loadable(lazy(() => import("../layouts/Dashboard")));

//Para pages
const Teste = Loadable(lazy(() => import("../pages/Teste")));
const SearchFlights = Loadable(lazy(() => import("../pages/SearchFlights")));

const router = createBrowserRouter([
  {
    path: Routes.HOME,
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Teste />,
      },
      {
        path: "buscarVoo",
        element: <SearchFlights />,
      }
    ],
  },
  LoginRoutes,
]);

export default router;
