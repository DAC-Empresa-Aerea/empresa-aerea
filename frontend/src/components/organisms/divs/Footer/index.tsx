import React from "react";
import LinkButton from "../../../atoms/buttons/LinkButton";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white py-4 mt-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between space-y-6 md:space-y-0">
        <div className="max-w-xs">
          <div className="text-lg font-bold font-museo-moderno">
            Fly<span className="text-lg">High</span>
          </div>
          <div className="text-gray-medium mt-2 font-roboto">
            O seu sistema de gerenciamento de Voos 2025.
          </div>
          <div className="text-gray-medium mt-4 font-roboto">
            FlyHigh © {currentYear}
          </div>
        </div>
        <div className="space-y-2 flex flex-col">
          <div className="text-gray-dark font-bold">Central de ajuda</div>
          <LinkButton href="#">Redes Sociais</LinkButton>
          <LinkButton href="#">Time de Suporte</LinkButton>
          <LinkButton href="#">Manual de Usuário</LinkButton>
          <LinkButton href="#">Entre em contato</LinkButton>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
