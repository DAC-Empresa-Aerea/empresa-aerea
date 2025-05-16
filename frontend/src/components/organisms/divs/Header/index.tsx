import { useState } from "react";
import LinkButton from "../../../atoms/buttons/LinkButton";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../contexts/loginContext";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { signOut, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const isLoggedIn = isAuthenticated;

  const handleLogout = () => {
    signOut().then(() => {
      navigate("/login");
    });
  };

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
            <LinkButton href={"/customer/search"} className="font-bold">Buscar Voos</LinkButton>
            <LinkButton href={"/customer/buy-miles"}>Comprar Milhas</LinkButton>
            <LinkButton href={"/customer/consultStatement"}>Extrato Milhas</LinkButton>
            <LinkButton href={"/customer/home"}>Minhas Reservas</LinkButton>
            <LinkButton href={"/customer/ver-reserva"}>Buscar Reserva</LinkButton>
            <LinkButton href={"/customer/checkin"}>CheckIn</LinkButton>
          </nav>

          {isLoggedIn ? (
            <div className="py-6 text-right">
                {user && "saldo_milhas" in user && (
                <p className="text-sm">
                  Saldo de milhas: <strong>{(user as any).saldo_milhas}</strong>
                </p>
                )}
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
          )}
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
              <i className={`fas ${mobileMenuOpen ? "fa-times" : "fa-bars"} text-xl`}></i>
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="mt-4 space-y-4">
              <nav className="flex flex-col space-y-2">
                <LinkButton href={"/customer/search"} className="font-bold">Buscar Voos</LinkButton>
                <LinkButton href={"/customer/buy-miles"}>Comprar Milhas</LinkButton>
                <LinkButton href={"/customer/consultStatement"}>Extrato Milhas</LinkButton>
                <LinkButton href={"/customer/home"}>Minhas Reservas</LinkButton>
                <LinkButton href={"/customer/ver-reserva"}>Buscar Reserva</LinkButton>
                <LinkButton href={"/customer/checkin"}>CheckIn</LinkButton>
              </nav>
              {isLoggedIn ? (
                <div className="py-6">
                  <p className="text-sm">
                    Saldo de milhas: <strong>{(user as any).saldo_milhas}</strong>
                  </p>
                  <button
                    onClick={handleLogout}
                    className="text-base font-semibold text-gray-900 hover:bg-gray-100 px-4 py-2 rounded-md w-full"
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
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
