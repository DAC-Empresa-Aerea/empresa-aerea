import { lazy } from "react";
import Loadable from "../components/organisms/loadable";
import { CustomerRoutesEnum as Routes } from "./routes.enum";
import ProtectedRoute from "../routes/ProtectedRoute";

const CartLayout = Loadable(lazy(() => import("../layouts/Cart")));
const EmployeeLayout = Loadable(lazy(() => import("../layouts/Dashboard")));

const Cart = Loadable(lazy(() => import("../pages/customer/Cart")));
const CustomerHomePage = Loadable(
  lazy(() => import("../pages/customer/CustomerHomePage"))
);
const BasicCustomerLayout = Loadable(
  lazy(() => import("../layouts/BasicCustomer"))
);
const CheckReservation = Loadable(
  lazy(() => import("../pages/customer/CheckReservation"))
);
const SearchFlights = Loadable(
  lazy(() => import("../pages/customer/SearchFlights"))
);
const CheckIn = Loadable(lazy(() => import("../pages/customer/CheckIn")));
const BuyMiles = Loadable(lazy(() => import("../pages/customer/BuyMiles")));
const ConsultStatement = Loadable(
  lazy(() => import("../pages/customer/ConsultStatement"))
);

const CustomerRoutes = {
  path: Routes.BASE,
  element: <ProtectedRoute allowedTypes={["CLIENTE"]} />,
  children: [
    {
      path: Routes.HOME,
      element: <EmployeeLayout />,
      children: [
        {
          index: true,
          element: <CustomerHomePage />,
        },
      ],
    },
    {
      path: "ver-reserva",
      element: <BasicCustomerLayout />,
      children: [
        {
          index: true,
          element: <CheckReservation />,
        },
      ],
    },
    {
      path: Routes.CART,
      element: <CartLayout />,
      children: [
        {
          index: true,
          element: <Cart />,
        },
      ],
    },
    {
      path: Routes.SEARCH_FLIGHTS,
      element: <EmployeeLayout />,
      children: [{ index: true, element: <SearchFlights /> }],
    },
    {
      path: Routes.CHECK_IN,
      element: <EmployeeLayout />,
      children: [{ index: true, element: <CheckIn /> }],
    },
    {
      path: Routes.BUY_MILES,
      element: <EmployeeLayout />,
      children: [{ index: true, element: <BuyMiles /> }],
    },
    {
      path: "consultStatement",
      element: <EmployeeLayout />,
      children: [{ index: true, element: <ConsultStatement /> }],
    },
  ],
};

export default CustomerRoutes;
