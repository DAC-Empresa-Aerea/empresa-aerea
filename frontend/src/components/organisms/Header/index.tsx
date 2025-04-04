import { useState } from "react";
import LinkButton from "../../atoms/buttons/LinkButton";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md font-roboto z-10">
      <div className="container mx-auto px-4 py-4">
        {/* DESKTOP */}
        <div className="hidden md:flex justify-between items-center">
          <div className="flex items-center">
            <img
              src="/icon/favicon/favicon.ico"
              alt="Logo"
              className="mr-2 h-7 mb-2"
            />
            <span className="text-xl font-bold font-museo-moderno">
              Fly<span className="text-lg">High</span>
            </span>
          </div>
          <nav className="flex space-x-4">
            <LinkButton href={"#"}>Buscar</LinkButton>
            <LinkButton href={"#"}>Explorar</LinkButton>
            <LinkButton href={"#"} isActive>
              Reserve agora
            </LinkButton>
            <LinkButton href={"/buyMiles"} >Comprar Milhas</LinkButton>
            <LinkButton href={"#"}>Ajuda</LinkButton>
          </nav>
          <div className="flex items-center space-x-2">
            <input
              className="border rounded-xl px-2 py-1 w-64"
              placeholder="Pesquise por voos"
              type="text"
            />
            <button className="text-gray-600 hover:text-blue-500 transition-colors">
              <i className="fas fa-search"></i>
            </button>
          </div>
          <div className="py-6">
            <a href="#" className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
            Log in
            </a>
          </div>
        </div>

        {/* MOBILE para responsividade*/}
        <div className="md:hidden">
          <div className="flex justify-between items-center">
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
              <div className="flex items-center space-x-2 pb-3">
                <input
                  className="border rounded-xl px-3 py-1 w-full"
                  placeholder="Pesquise por voos"
                  type="text"
                />
                <button className="text-gray-600">
                  <i className="fas fa-search"></i>
                </button>
              </div>
              <nav className="flex flex-col space-y-2 pt-3 border-t">
                <LinkButton href={"#"}>Buscar</LinkButton>
                <LinkButton href={"#"}>Explorar</LinkButton>
                <LinkButton href={"#"} isActive>
                  Reserve agora
                </LinkButton>
                <LinkButton href={"#"}>Ajuda</LinkButton>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
