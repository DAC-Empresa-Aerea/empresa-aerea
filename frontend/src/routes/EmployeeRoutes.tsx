import { lazy } from "react";
import Loadable from "../components/organisms/loadable";
import { EmployeeRoutesEnum as Routes } from "./routes.enum";
import ProtectedRoute from "../routes/ProtectedRoute";

const EmployeeLayout = Loadable(
  lazy(() => import("../layouts/EmployeeLayout"))
);

const EmployeeHomePage = Loadable(
  lazy(() => import("../pages/employee/EmployeeLanding"))
);
const ConfirmBoarding = Loadable(
  lazy(() => import("../pages/employee/ConfirmBoarding"))
);
const RegisterFlights = Loadable(
  lazy(() => import("../pages/employee/RegisterFlights"))
);
const EmployeeCRUD = Loadable(
  lazy(() => import("../pages/employee/EmployeeCRUD"))
);

const EmployeeRoutes = {
  path: Routes.BASE,
  element: <ProtectedRoute allowedTypes={["FUNCIONARIO"]} />,
  children: [
    {
      path: Routes.HOME,
      element: <EmployeeLayout />,
      children: [
        {
          index: true,
          element: <EmployeeHomePage />,
        },
      ],
    },
    {
      path: Routes.REGISTER_FLIGHTS,
      element: <EmployeeLayout />,
      children: [
        {
          index: true,
          element: <RegisterFlights />,
        },
      ],
    },
    {
      path: Routes.CONFIRM_BOARDING,
      element: <EmployeeLayout />,
      children: [
        {
          index: true,
          element: <ConfirmBoarding />,
        },
      ],
    },
    {
      path: Routes.CRUD,
      element: <EmployeeLayout />,
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
