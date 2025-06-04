import { Outlet } from "react-router-dom";
import Header from "../../components/organisms/divs/Header";
import Footer from "../../components/organisms/divs/Footer";

function BasicCustomerLayout() {
  return (
    <div className="h-auto flex flex-col bg-gray-extra-light">
      <Header />
      <main className="overflow-auto min-h-[70dvh] h-auto">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default BasicCustomerLayout;
