import { lazy } from "react";
import Loadable from "../components/organisms/loadable";
import ConsultStatement from "../pages/ConsultStatement";

const CartLayout = Loadable(lazy(() => import("../layouts/Cart")));
const DashboardLayout = Loadable(lazy(() => import("../layouts/Dashboard")));

const Cart = Loadable(lazy(() => import("../pages/Cart")));
const CustomerHomePage = Loadable(
  lazy(() => import("../pages/CustomerHomePage"))
);
const SearchFlights = Loadable(lazy(() => import("../pages/SearchFlights")));
const CheckIn = Loadable(lazy(() => import("../pages/CheckIn")));
const BuyMiles = Loadable(lazy(() => import("../pages/BuyMiles")));

const CustomerRoutes = {
  path: "/",
  children: [
    {
      path: "customer-home",
      element: <DashboardLayout />,
      children: [
        {
          index: true,
          element: <CustomerHomePage />,
        },
      ],
    },
    {
      path: "cart",
      element: <CartLayout />,
      children: [
        {
          index: true,
          element: <Cart />,
        },
      ],
    },
    {
      path: "buscarVoo",
      element: <DashboardLayout />,
      children: [{ index: true, element: <SearchFlights /> }],
    },
    { 
      path: "checkin", element: <CheckIn /> 
    },
    {
      path: "buyMiles",
      element: <DashboardLayout />,
      children: [{ index: true, element: <BuyMiles /> }],
    },
    {
      path: "consultStatement",
      element: <DashboardLayout />,
      children: [ {index : true, element: <ConsultStatement />}]
    }
  ],
};

export default CustomerRoutes;
