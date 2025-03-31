import { lazy } from "react";
import Loadable from "../components/organisms/loadable";
import ConsultStatement from "../pages/ConsultStatement";
import { CustomerRoutes as Routes } from "./routes.enum";


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
  path: Routes.BASE,
  children: [
    {
      path: Routes.HOME,
      element: <DashboardLayout />,
      children: [
        {
          index: true,
          element: <CustomerHomePage />,
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
      element: <DashboardLayout />,
      children: [{ index: true, element: <SearchFlights /> }],
    },
    {
      path: Routes.CHECK_IN,
      element: <DashboardLayout />,
      children: [{ index: true, element: <CheckIn /> }],
    },
    {
      path: Routes.BUY_MILES,
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
