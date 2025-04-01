import { lazy } from "react";
import Loadable from "../components/organisms/loadable";
import RegisterFlights from "../pages/RegisterFlights";
import ConfirmBoarding from "../pages/ConfirmBoarding";
import { EmployeeRoutes as Routes } from "./routes.enum";

const DashboardLayout = Loadable(lazy(() => import("../layouts/Dashboard")));

const EmployeeHomePage = Loadable(lazy(() => import("../pages/EmployeeHome")));

const EmployeeRoutes = {
  path: Routes.BASE,
  children: [
    {
      path: Routes.HOME,
      element: <DashboardLayout />,
      children: [
        {
          index: true,
          element: <EmployeeHomePage />,
        },
      ],
    },
    {
      path: Routes.REGISTER_FLIGHTS,
      element: <DashboardLayout />,
      children: [
        {
          index: true,
          element: <RegisterFlights />,
        },
      ],
    },
    {
      path: Routes.CONFIRM_BOARDING,
      element: <DashboardLayout />,
      children: [
        {
          index: true,
          element: <ConfirmBoarding />,
        },
      ],
    }
  ],
};

export default EmployeeRoutes;
