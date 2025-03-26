import { lazy } from "react";
import Loadable from "../components/organisms/Loadable";
import CustomerHomePage from "../pages/CustomerHomePage";

const LoginLayout = Loadable(lazy(() => import("../layouts/Login")));
const Login = Loadable(lazy(() => import("../pages/Login")));
const SelfRegistrationLayout = Loadable(lazy(() => import("../layouts/Self-registration")));
const SelfRegistration = Loadable(lazy(() => import("../pages/SelfRegistration")));

const LoginRoutes = {
  path: "/",
  children: [
    {
      path: "/",
      //element: [<LoginLayout />, <SelfRegistrationLayout />],
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
        }
      ]
    }
  ]
};

export default LoginRoutes;
