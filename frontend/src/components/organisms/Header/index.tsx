import React, { useState } from "react";

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        {/* DESKTOP */}
        <div className="hidden md:flex justify-between items-center">
          <div className="flex items-center">
            <img src="/icon/favicon/favicon.ico" alt="Logo" className="mr-2 h-7 mb-2" />
            <span className="text-xl font-bold" style={{ fontFamily: "'MuseoModerno', cursive" }}>
              Fly<span className="text-lg">High</span>
            </span>
          </div>
          <nav className="flex space-x-4">
            <a className="text-gray-600 hover:text-blue-500 transition-colors" href="#"> Buscar </a>
            <a className="text-gray-600 hover:text-blue-500 transition-colors" href="#">Explorar</a>
            <a className="text-black font-bold hover:text-blue-700 transition-colors" href="#">Reserve agora</a>
            <a className="text-gray-600 hover:text-blue-500 transition-colors" href="#">Ajuda</a>
          </nav>
          <div className="flex items-center space-x-2">
            <input
              className="border rounded px-2 py-1 w-64"
              placeholder="Pesquise por voos"
              type="text"
            />
            <button className="text-gray-600 hover:text-blue-500 transition-colors">
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>

        {/* MOBILE para responsividade*/}
        <div className="md:hidden">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img src="/icon/favicon/favicon.ico" alt="Logo" className="mr-2 h-6" />
              <span className="text-lg font-bold" style={{ fontFamily: "'MuseoModerno', cursive" }}>
                Fly<span className="text-blue-lg">High</span>
              </span>
            </div>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-600 focus:outline-none"
            >
              <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
            </button>
          </div>


          {mobileMenuOpen && (
            <div className="mt-4 space-y-4">
              <div className="flex items-center space-x-2 pb-3">
                <input
                  className="border rounded px-2 py-1 w-full"
                  placeholder="Pesquise por voos"
                  type="text"
                />
                <button className="text-gray-600">
                  <i className="fas fa-search"></i>
                </button>
              </div>
              <nav className="flex flex-col space-y-2 pt-3 border-t">
                <a className="text-gray-600 py-1 hover:text-blue-500 transition-colors" href="#"> Buscar </a>
                <a className="text-gray-600 py-1 hover:text-blue-500 transition-colors" href="#">Explorar</a>
                <a className="text-black font-bold py-1 hover:text-blue-700 transition-colors" href="#">Reserve agora</a>
                <a className="text-gray-600 py-1 hover:text-blue-500 transition-colors" href="#">Ajuda</a>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
