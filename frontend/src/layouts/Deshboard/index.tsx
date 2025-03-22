import { Outlet } from "react-router-dom";
import Header from "../../components/organisms/Header";
import Footer from "../../components/organisms/Footer";

function DashboardLayout() {
  return (
    <div className="contents flex-col h-full">
      <Header />
        <h1 className="text-center">Dashboard Layout</h1>

        <div className="flex flex-col flex-1">
            <Outlet />   
        </div>
        
      <Footer />
    </div>
  );
}

export default DashboardLayout;
