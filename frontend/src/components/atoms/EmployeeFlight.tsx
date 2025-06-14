import { useState } from "react";
import { FlightWithAirports } from "../../types/api/flight";
import { useNavigate } from "react-router-dom";
import CancelFlightModal from "../molecules/modalsMolecules/CancelFlightModal";
import RealizeFlightModal from "../molecules/modalsMolecules/RealizeFlightModal";

interface EmployeeFlightProps {
  flight: FlightWithAirports;
  refreshFlights: () => void;
}

function EmployeeFlight({ flight, refreshFlights }: EmployeeFlightProps) {
  const [isModalCancelOpen, setIsModalCancelOpen] = useState(false);
  const [isModalRealizeOpen, setIsModalRealizeOpen] = useState(false);
  const navigate = useNavigate();

  const handleCancelClick = () => {
    setIsModalCancelOpen(true);
  };

  const handleRealizeClick = () => {
    setIsModalRealizeOpen(true);
  };

  const handleFlightClick = (flight: FlightWithAirports) => {
    navigate("/employee/confirm", { state: { flight } });
  };

  const renderButtons = () => {
    if (flight.estado === "CONFIRMADO") {
      return (
        <>
          <button
            className="transition-colors px-4 py-2 bg-green-600 font-roboto text-white cursor-pointer hover:bg-green-700 rounded-lg"
            onClick={handleRealizeClick}
          >
            Realizar Voo
          </button>
          <button
            className="transition-colors px-4 py-2 bg-blue-600 font-roboto text-white cursor-pointer hover:bg-blue-dark rounded-lg"
            onClick={() => handleFlightClick(flight)}
          >
            Embarques
          </button>
          <button
            className="transition-colors px-4 py-2 bg-red-600 font-roboto text-white cursor-pointer hover:bg-red-700 rounded-lg"
            onClick={handleCancelClick}
          >
            Cancelar
          </button>
        </>
      );
    } else if (flight.estado === "CANCELADO") {
      return (
        <button
          className="transition-colors px-4 py-2 bg-gray-600 font-roboto text-white cursor-not-allowed rounded-lg"
          disabled
        >
          Voo Cancelado
        </button>
      );
    } 
  };

  return (
    <li className="bg-white border border-gray-light p-4 flex justify-between items-center hover:bg-gray-light rounded-2xl">
      <article className="font-roboto">
        <h3 className="font-semibold">Voo {flight.codigo}</h3>
        <p>
          Saída: {new Date(flight.data).toLocaleString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
        <p>
          Origem: {flight.aeroporto_origem.codigo} - Destino: {flight.aeroporto_destino.codigo}
        </p>
        <p>Status: {flight.estado}</p>
      </article>
      <div className="flex gap-4">
        {renderButtons()}
      </div>

      {/* Modal de Cancelamento */}
      <CancelFlightModal
        flight={flight}
        isOpen={isModalCancelOpen}
        onClose={() => {
          setIsModalCancelOpen(false);
          setTimeout(() => {
            refreshFlights();
          }, 1000);
        }}
      />

      <RealizeFlightModal
        flight={flight}
        isOpen={isModalRealizeOpen}
        onClose={() => {
          setIsModalRealizeOpen(false);
          setTimeout(() => {
            refreshFlights();
          }, 1000);
        }}
      />
    </li>
  );
}

export default EmployeeFlight;
