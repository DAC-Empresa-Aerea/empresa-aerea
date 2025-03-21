import { Routes, Route } from "react-router-dom";
import Teste from "../pages/Teste";
import { Routes as AppRoutes } from "./routes.enum";

const AppRoutesComponent = () => {
  return (
    <Routes>
      <Route path={AppRoutes.HOME} element={<Teste />} />
    </Routes>
  );
};

export default AppRoutesComponent;
