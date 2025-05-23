import { Outlet } from "react-router-dom";
import Header from "../../components/organisms/divs/Header";
import Footer from "../../components/organisms/divs/Footer";

function LoginLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-extra-light">
      <Header />
      <main className="flex flex-col flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default LoginLayout;
