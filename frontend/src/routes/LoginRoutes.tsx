import { lazy } from "react";
import Loadable from "../components/organisms/loadable";
import { Routes } from "./routes.enum";

const LoginLayout = Loadable(lazy(() => import("../layouts/Login")));

const Login = Loadable(lazy(() => import("../pages/auth/Login")));
const SelfRegistration = Loadable(
  lazy(() => import("../pages/auth/SelfRegistration"))
);

const LoginRoutes = {
  path: "/",
  element: <LoginLayout />, // Adiciona o layout de login para rotas públicas
  children: [
    {
      path: Routes.LOGIN,
      element: <Login />,
    },
    {
      path: Routes.REGISTER,
      element: <SelfRegistration />,
    },
  ],
};

export default LoginRoutes;
