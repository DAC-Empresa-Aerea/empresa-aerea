import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import Loadable from "../components/organisms/loadable";

//Para layouts
const LoginLayout = Loadable(lazy(() => import("../layouts/Login")));
const DashboardLayout = Loadable(lazy(() => import("../layouts/Deshboard")));

//Para pages
const Teste = Loadable(lazy(() => import("../pages/Teste")));

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <DashboardLayout />,
            children: [
                {
                    index: true,
                    element: <Teste />,
                }
            ]
        }
    ]
);

export default router;