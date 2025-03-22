import React from "react";

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <img alt="Logo" className="mr-2" src="https://placehold.co/30x30" />
          <span className="text-xl font-bold">Flights</span>
        </div>
        <nav className="flex space-x-4">
          <a className="text-gray-600" href="#"> Buscar </a>
          <a className="text-gray-600" href="#">Explorar</a>
          <a className="text-black font-bold" href="#">Reserve agora</a>
          <a className="text-gray-600" href="#">Ajuda</a>
        </nav>
        <div>
          <input
            className="border rounded px-2 py-1"
            placeholder="Pesquise por voos"
            type="text"
          />
          <button className="text-gray-600">
            <i className="fas fa-search"></i>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
