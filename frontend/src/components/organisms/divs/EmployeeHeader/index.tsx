import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LinkButton from "../../../atoms/buttons/LinkButton";
import { EmployeeRoutesEnum as Routes } from "../../../../routes/routes.enum";
import { useAuth } from "../../../../contexts/loginContext";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut();
    navigate("/login"); 
  };

  function logedIn() {
    const user = localStorage.getItem("user");
    const userType = localStorage.getItem("userType");
    return user && userType;
  }

  return (
    <header className="bg-white shadow-md font-roboto z-10">
      <div className="container mx-auto px-4 py-0 my-0">
        {/* DESKTOP */}
        <div className="hidden md:flex justify-between items-center">
          <div className="flex items-center">
            <a className="flex items-center">
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
            <LinkButton href={Routes.HOME}>Home</LinkButton>
            <LinkButton href={Routes.REGISTER_FLIGHTS}>Cadastrar Voo</LinkButton>
            <LinkButton href={Routes.CONFIRM_BOARDING}>Confirmar Embarque</LinkButton>
            <LinkButton href={Routes.CRUD}>Gerência</LinkButton>
          </nav>
          {
            logedIn() ? (
              <div className="py-6">
                <button
                  onClick={handleLogout}
                  className="text-base font-semibold text-gray-900 hover:bg-gray-100 px-4 py-2 rounded-md"
                >
                  Logout
                </button>
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

        {/* MOBILE */}
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
                className={`fas ${mobileMenuOpen ? "fa-times" : "fa-bars"} text-xl`}
              ></i>
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="mt-4 space-y-4 flex flex-col">
              <LinkButton href={Routes.HOME}>Home</LinkButton>
              <LinkButton href={Routes.REGISTER_FLIGHTS}>Cadastrar Voo</LinkButton>
              <LinkButton href={Routes.CONFIRM_BOARDING}>Confirmar Embarque</LinkButton>
              <LinkButton href={Routes.CRUD}>Gerência</LinkButton>
              {
                logedIn() ? (
                  <button
                    onClick={handleLogout}
                    className="text-base font-semibold text-gray-900 hover:bg-gray-100 px-4 py-2 rounded-md text-left"
                  >
                    Logout
                  </button>
                ) : (
                  <a
                    href="/login"
                    className="block rounded-lg px-4 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </a>
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
