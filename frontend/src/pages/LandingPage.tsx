import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CustomerRoutesEnum, Routes } from "../routes/routes.enum";
import { useAuth } from "../contexts/loginContext";

const LandingPage: React.FC = () => {

  const { isAuthenticated, logout } = useAuth();
  useEffect(() => {
    logout();
  }, []);

  const singles = [
    "John F. Kennedy International (JFK)",
    "Los Angeles International (LAX)",
    "O'Hare International (ORD)",
    "Hartsfield-Jackson Atlanta International (ATL)",
    "Dallas/Fort Worth International (DFW)",
    "Denver International (DEN)",
    "San Francisco International (SFO)",
    "McCarran International (LAS)",
    "Seattle-Tacoma International (SEA)",
    "Miami International (MIA)",
    "Curitiba (CWB)",
    "Rio de Janeiro Galeão International (GIG)",
    "São Paulo Guarulhos International (GRU)",
    "Santiago International (SCL)",
    "Mexico City International (MEX)",
    "Frankfurt International (FRA)",
    "London Heathrow (LHR)",
    "Paris Charles de Gaulle (CDG)",
    "Madrid Barajas (MAD)",
    "Mumbai Chhatrapati Shivaji Maharaj International (BOM)"
];

  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/images/hero-bg.jpg"
            alt="Airplane sky view"
            className="w-full h-full object-cover opacity-20"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold mb-4 font-museo-moderno">
              Voe mais alto com a <span className="text-black">FlyHigh</span>
            </h1>
            <p className="text-xl mb-8">
              Descubra novos destinos com o melhor em conforto, segurança e
              preços acessíveis.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate(CustomerRoutesEnum.SEARCH_FLIGHTS)}
                className="px-6 py-3 bg-black hover:bg-gray-900 text-white font-bold rounded-lg transition-colors shadow-lg"
              >
                Buscar Voos
              </button>
              <button
                onClick={() => navigate("/customer-home")}
                className="px-6 py-3 bg-white hover:bg-gray-100 text-blue-800 font-bold rounded-lg transition-colors shadow-lg"
              >
                Minhas Reservas
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-8 shadow-md -mt-10 rounded-lg max-w-5xl mx-auto z-20 px-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Encontre seu próximo destino
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Origem
            </label>
            <select className="w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-blue-500 focus:border-blue-500">
              <option>São Paulo (GRU)</option>
              <option>Rio de Janeiro (GIG)</option>
              <option>Brasília (BSB)</option>
              <option>Curitiba (CWB)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Destino
            </label>
            <select className="w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-blue-500 focus:border-blue-500">
              <option>Rio de Janeiro (SDU)</option>
              <option>São Paulo (GRU)</option>
              <option>Recife (REC)</option>
              <option>Porto Alegre (POA)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Data
            </label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex items-end">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors">
              Buscar
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Por que escolher a FlyHigh?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Check-in Rápido</h3>
              <p className="text-gray-600">
                Faça seu check-in online com apenas alguns cliques, economizando
                tempo e evitando filas.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Programa de Milhas</h3>
              <p className="text-gray-600">
                Acumule milhas em todos os voos e troque por descontos em
                passagens futuras.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Segurança Garantida
              </h3>
              <p className="text-gray-600">
                Viaje com tranquilidade, sabendo que sua segurança é nossa
                prioridade número um.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Destinos Populares
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="relative rounded-lg overflow-hidden group h-64">
              <img
                src="https://images.unsplash.com/photo-1483729558449-99ef09a8c325"
                alt="Rio de Janeiro"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                <span className="text-white font-bold text-lg">
                  Rio de Janeiro
                </span>
              </div>
            </div>

            <div className="relative rounded-lg overflow-hidden group h-64">
              <img
                src="https://images.unsplash.com/photo-1679671653086-bd28ea45f757"
                alt="São Paulo"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                <span className="text-white font-bold text-lg">São Paulo</span>
              </div>
            </div>

            <div className="relative rounded-lg overflow-hidden group h-64">
              <img
                src="https://images.unsplash.com/photo-1554204934-7bc5ac38f456"
                alt="Curitiba"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                <span className="text-white font-bold text-lg">Curitiba</span>
              </div>
            </div>

            <div className="relative rounded-lg overflow-hidden group h-64">
              <img
                src="https://images.unsplash.com/photo-1625426078245-6911839409dd"
                alt="Brasília"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                <span className="text-white font-bold text-lg">Brasília</span>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <button
              onClick={() => navigate(CustomerRoutesEnum.SEARCH_FLIGHTS)}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              Ver todos os destinos
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Pronto para voar?</h2>
          <p className="text-xl text-white-600 mb-8 max-w-2xl mx-auto">
            Planeje sua próxima viagem com a FlyHigh e descubra o prazer de voar
            com conforto e segurança.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate(CustomerRoutesEnum.SEARCH_FLIGHTS)}
              className="px-6 py-3 bg-black hover:bg-gray-900 text-white font-bold rounded-lg transition-colors shadow-lg"
            >
              Buscar Voos
            </button>
            <button
              onClick={() => navigate(Routes.LOGIN)}
              className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition-colors"
            >
              Fazer Login
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
