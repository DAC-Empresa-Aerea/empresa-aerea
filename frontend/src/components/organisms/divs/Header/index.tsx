import { useState } from "react";
import LinkButton from "../../../atoms/buttons/LinkButton";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  function logedIn() {
    const user = localStorage.getItem("userData");
    const userType = localStorage.getItem("userType");
    const authToken = localStorage.getItem("authToken");
    return user && authToken && userType;
  }

  return (
    <header className="bg-white shadow-md font-roboto z-10">
      <div className="container mx-auto px-4 py-0 my-0">
        {/* DESKTOP */}
        <div className="hidden md:flex justify-between items-center">
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <img
                src="/icon/favicon/favicon.ico"
                alt="Logo"
                className="mr-2 h-7 mb-2"
              />
              <span className="text-xl font-bold font-museo-moderno">
                Fly<span className="text-lg">High</span>
              </span>
            </a>
          </div>
          <nav className="flex space-x-4">
            <LinkButton href={"/customer/search"} className="font-bold">
              Buscar
            </LinkButton>
            <LinkButton href={"/customer/buy-miles"}>Comprar Milhas</LinkButton>
            <LinkButton href={"/customer/home"}>Minhas Reservas</LinkButton>
            <LinkButton href={"/customer/checkin"}>CheckIn</LinkButton>
          </nav>
          
          {
          logedIn() ? (
            <div className="py-6">
              <LinkButton href={"/customer/logout"}>Logout</LinkButton>
            </div>
          ) : (
            <div className="py-6">
              <a
                href="/login"
                className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
              >
                Log in
              </a>
            </div>
          )
        }
        </div>

        {/* MOBILE para responsividade*/}
        <div className="md:hidden">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <img
                src="/icon/favicon/favicon.ico"
                alt="Logo"
                className="mr-2 h-6"
              />
              <span className="text-lg font-bold font-museo-moderno">
                Fly<span className="text-blue-lg">High</span>
              </span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-600 focus:outline-none"
            >
              <i
                className={`fas ${
                  mobileMenuOpen ? "fa-times" : "fa-bars"
                } text-xl`}
              ></i>
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="mt-4 space-y-4">
              <nav className="flex space-x-4">
                <LinkButton href={"/search"} className="font-bold">
                  Buscar
                </LinkButton>
                <LinkButton href={"/customer/buy-miles"}>Comprar Milhas</LinkButton>
                <LinkButton href={"/customer-home"}>Meu Perfil</LinkButton>
              </nav>
              {
              logedIn() ? (
                <div className="py-6">
                  <LinkButton href={"/customer/logout"}>Logout</LinkButton>
                </div>
              ) : (
                <div className="py-6">
                  <a
                    href="/login"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </a>
                </div>
              )
            }
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
