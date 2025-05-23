import Header from "../../components/organisms/divs/Header";
import Footer from "../../components/organisms/divs/Footer";
import { Outlet } from "react-router-dom";

export default function PublicLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-extra-light">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
