import { lazy } from "react";
import Loadable from "../components/organisms/loadable";
import RegisterFlights from "../pages/RegisterFlights";
import ConfirmBoarding from "../pages/ConfirmBoarding";

const DashboardLayout = Loadable(lazy(() => import("../layouts/Dashboard")));

const EmployeeHomePage = Loadable(lazy(() => import("../pages/EmployeeHome")));

const EmployeeRoutes = {
  path: "/",
  children: [
    {
      path: "employee-home",
      element: <DashboardLayout />,
      children: [
        {
          index: true,
          element: <EmployeeHomePage />,
        },
      ],
    },
    {
      path: "register-flights",
      element: <DashboardLayout />,
      children: [
        {
          index: true,
          element: <RegisterFlights />,
        },
      ],
    },
    {
      path: "confirm",
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
