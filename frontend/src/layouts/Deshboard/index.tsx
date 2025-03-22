import { Outlet } from "react-router-dom";
import Header from "../../components/organisms/Header";
import Footer from "../../components/organisms/Footer";

function DashboardLayout() {
  return (
    <div className="flex flex-col h-full">
      <Header />
      <h1>Dashboard Layout</h1>
        <Outlet />
      <Footer />
    </div>
  );
}

export default DashboardLayout;
