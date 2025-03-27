import { lazy } from "react";
import Loadable from "../components/organisms/loadable";

const CartLayout = Loadable(lazy(() => import("../layouts/Cart")));

const Cart = Loadable(lazy(() => import("../pages/Cart")));
const CustomerHomePage = Loadable(
  lazy(() => import("../pages/CustomerHomePage"))
);
const SearchFlights = Loadable(lazy(() => import("../pages/SearchFlights")));

const CustomerRoutes = {
  path: "/",
  children: [
    {
      path: "customer-home",
      element: (
        <h1 className="text-center">
          <CustomerHomePage />
        </h1>
      ),
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
      element: <SearchFlights />,
    },
  ],
};

export default CustomerRoutes;
