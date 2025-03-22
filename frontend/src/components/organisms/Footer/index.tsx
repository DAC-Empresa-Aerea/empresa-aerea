import React from "react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white py-4 mt-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between space-y-6 md:space-y-0">
        <div className="max-w-xs">
          <div className="text-lg font-bold" style={{ fontFamily: "'MuseoModerno', cursive" }}>
            Fly<span className="text-lg">High</span>
          </div>
          <div className="text-gray-600 mt-2">
            O seu sistema de gerenciamento de Voos 2025
          </div>
          <div className="text-gray-600 mt-4">FlyHigh © {currentYear}</div>
        </div>
        <div className="space-y-2">
          <div className="text-gray-800 font-bold">Central de ajuda</div>
          <div className="text-gray-600 hover:text-blue-500 cursor-pointer transition-colors">Redes Sociais</div>
          <div className="text-gray-600 hover:text-blue-500 cursor-pointer transition-colors">Time de Suporte</div>
          <div className="text-gray-600 hover:text-blue-500 cursor-pointer transition-colors">Manual de Usuário</div>
          <div className="text-gray-600 hover:text-blue-500 cursor-pointer transition-colors">Entre em contato</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;