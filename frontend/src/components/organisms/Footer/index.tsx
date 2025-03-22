import React from "react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white py-4 mt-8">
      <div className="container mx-auto px-4 flex justify-between">
        <div>
          <div className="text-lg font-bold">FlyHigh</div>
          <div className="text-gray-600">
            O seu sistema de gerenciamento de Voos 2025
          </div>
          <div className="text-gray-600">FlyHigh © {currentYear}</div>
        </div>
        <div className="space-y-2">
          <div className="text-gray-800 font-bold">Central de ajuda</div>
          <div className="text-gray-600">Redes Sociais</div>
          <div className="text-gray-600">Time de Suporte</div>
          <div className="text-gray-600">Manual de Usuário</div>
          <div className="text-gray-600">Entre em contato</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
