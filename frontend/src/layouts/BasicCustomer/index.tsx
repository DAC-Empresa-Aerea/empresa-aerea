import { Outlet } from "react-router-dom";
import Header from "../../components/organisms/divs/Header";
import Footer from "../../components/organisms/divs/Footer";

function BasicCustomerLayout() {
  return (
    <div className="h-screen flex flex-col bg-gray-extra-light">
      <Header />
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default BasicCustomerLayout;
