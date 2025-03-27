import { Outlet } from "react-router-dom";
import Header from "../../components/organisms/Header";
import Footer from "../../components/organisms/Footer";

function DashboardLayout() {
  return (
    <div className="contents flex-col h-full bg-gray-extra-light">
      <Header />
      <h1 className="text-center bg-inherit">Dashboard Layout</h1>

      <main className="flex flex-col flex-1 bg-inherit">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default DashboardLayout;
