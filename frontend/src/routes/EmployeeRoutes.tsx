import { lazy } from "react";
import Loadable from "../components/organisms/loadable";

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
  ],
};

export default EmployeeRoutes;
