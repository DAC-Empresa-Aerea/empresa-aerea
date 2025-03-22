import { lazy } from "react";
import Loadable from "../components/organisms/Loadable";

const LoginLayout = Loadable(lazy(() => import("../layouts/Login")));

const LoginRoutes = {
  path: "/",
  children: [
    {
      path: "/",
      element: <LoginLayout />,
      children: [
        {
          path: "login",
          element: <h1 className="text-center">Mudar para pagina de login futuramente</h1>
        },
        {
          path: "register",
          element: <h1 className="text-center">Mudar para pagina de registro futuramente</h1>
        },
        {
          path: "forgot-password",
          element: <h1 className="text-center">Mudar para pagina de esqueci minha senha futuramente</h1>
        }
      ]
    }
  ]
};

export default LoginRoutes;
