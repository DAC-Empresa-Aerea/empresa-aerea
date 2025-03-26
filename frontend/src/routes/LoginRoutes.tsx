import { lazy } from "react";
import Loadable from "../components/organisms/Loadable";
import CustomerHomePage from "../pages/CustomerHomePage";
import Cart from "../pages/Cart";

const LoginLayout = Loadable(lazy(() => import("../layouts/Login")));
const Login = Loadable(lazy(() => import("../pages/Login")));
const SelfRegistrationLayout = Loadable(lazy(() => import("../layouts/Self-registration")));
const SelfRegistration = Loadable(lazy(() => import("../pages/SelfRegistration")));
const CartLayout = Loadable(lazy(() => import("../layouts/Cart")));


const LoginRoutes = {
  path: "/",
  children: [
    {
      path: "/",
      //element: [<LoginLayout />, <SelfRegistrationLayout />, <CartLayout />],
      children: [
        {
          path: "login",
          element: <h1 className="text-center"><Login/></h1>
        },
        {
          path: "register",
          element: <h1 className="text-center"><SelfRegistration/></h1>
        },
        {
          path: "forgot-password",
          element: <h1 className="text-center"></h1>
        },
        {
          path: "customer-home",
          element: <h1 className="text-center"><CustomerHomePage /></h1>
        },
        {
          path: "cart",
          element: <CartLayout />,
          children: [
            {
              index: true,
              element: <Cart />
            }
          ]
        }
      ]
    }
  ]
};

export default LoginRoutes;
