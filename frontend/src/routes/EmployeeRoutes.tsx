import { lazy } from "react";
import Loadable from "../components/organisms/loadable";
import { EmployeeRoutes as Routes } from "./routes.enum";

const DashboardLayout = Loadable(lazy(() => import("../layouts/Dashboard")));

const EmployeeHomePage = Loadable(lazy(() => import("../pages/EmployeeHome")));
const ConfirmBoarding = Loadable(
  lazy(() => import("../pages/ConfirmBoarding"))
);
const RegisterFlights = Loadable(
  lazy(() => import("../pages/RegisterFlights"))
);
const EmployeeCRUD = Loadable(lazy(() => import("../pages/EmployeeCRUD")));

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
    },
    {
      path: Routes.CRUD,
      element: <DashboardLayout />,
      children: [
        {
          index: true,
          element: <EmployeeCRUD />,
        },
      ],
    },
  ],
};

export default EmployeeRoutes;
