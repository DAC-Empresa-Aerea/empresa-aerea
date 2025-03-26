import React from "react";
import { SelectedFlight } from "../../../types/flightTypes";

interface FlightDetailsProps {
  flight: SelectedFlight;
}

const FlightDetails: React.FC<FlightDetailsProps> = ({ flight }) => {
  // Formatar data para exibição
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date);
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full flex items-center justify-center text-white font-bold mr-3">
            {flight.airline.substring(0, 2)}
          </div>
          <div>
            <h3 className="font-medium text-slate-900">{flight.airline}</h3>
            <p className="text-sm text-slate-500">Voo {flight.flightNumber}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-slate-500">Data</p>
          <p className="font-medium text-slate-900">
            {formatDate(flight.departureDate)}
          </p>
        </div>
      </div>

      <div className="flex items-center relative py-6">
        {/* Coluna Origem */}
        <div className="text-center w-1/3">
          <div className="h-4 w-4 rounded-full absolute left-0 top-1/2 -mt-2 border-4 border-white"></div>
          <p className="text-2xl font-semibold text-slate-900">
            {flight.departureTime}
          </p>
          <p className="text-sm font-medium mt-1 text-slate-700">
            {flight.origin.split("(")[0].trim()}
          </p>
          <p className="text-xs text-slate-500 mt-0.5">
            {flight.origin.match(/\(([^)]+)\)/)?.[1]}
          </p>
        </div>

        {/* Linha central */}
        <div className="w-1/3 px-4">
          <div className="relative">
            <div className="border-t-2 border-slate-200 w-full absolute top-1/2"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-xs font-medium text-slate-500 whitespace-nowrap">
              Voo direto •{" "}
              {calculateDuration(flight.departureTime, flight.arrivalTime)}
            </div>
          </div>
        </div>

        {/* Coluna Destino */}
        <div className="text-center w-1/3">
          <div className="bg-emerald-500 h-4 w-4 rounded-full absolute right-0 top-1/2 -mt-2 border-4 border-white"></div>
          <p className="text-2xl font-semibold text-slate-900">
            {flight.arrivalTime}
          </p>
          <p className="text-sm font-medium mt-1 text-slate-700">
            {flight.destination.split("(")[0].trim()}
          </p>
          <p className="text-xs text-slate-500 mt-0.5">
            {flight.destination.match(/\(([^)]+)\)/)?.[1]}
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between p-4 bg-slate-50 rounded-lg">
        <div>
          <p className="text-sm text-slate-500">Preço por assento</p>
          <p className="font-semibold text-slate-900">
            R$ {flight.seatPrice.toFixed(2)}
          </p>
        </div>
        <div className="flex items-center">
          <div className="flex space-x-1">
            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-xs text-blue-600">✓</span>
            </div>
          </div>
          <span className="ml-2 text-sm text-slate-600">
            Bagagem de mão incluída
          </span>
        </div>
      </div>
    </div>
  );
};

// Função para calcular duração do voo
const calculateDuration = (departure: string, arrival: string): string => {
  const [depHours, depMinutes] = departure.split(":").map(Number);
  const [arrHours, arrMinutes] = arrival.split(":").map(Number);

  let totalMinutes = arrHours * 60 + arrMinutes - (depHours * 60 + depMinutes);

  // Se for negativo, significa que o voo chega no dia seguinte
  if (totalMinutes < 0) {
    totalMinutes += 24 * 60;
  }

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${hours}h ${minutes}min`;
};

export default FlightDetails;
