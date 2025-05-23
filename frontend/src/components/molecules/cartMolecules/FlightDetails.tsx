import React from "react";
import Flight from "../../../types/Flight";

interface FlightDetailsProps {
  flight: Flight;
}

const FlightDetails: React.FC<FlightDetailsProps> = ({ flight }) => {

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full flex items-center justify-center text-white font-bold mr-3">
            {flight.codigo.substring(0, 2)}
          </div>
          <div>
            <h3 className="font-medium text-slate-900">{flight.codigo}</h3>
            <p className="text-sm text-slate-500">Voo {flight.codigo}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-slate-500">Data</p>
          <p className="font-medium text-slate-900">
            {new Date(flight.data).toLocaleString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </div>

      <div className="flex items-center relative py-6">
        {/* Coluna Origem */}
        <div className="text-center w-1/3">
          <div className="h-4 w-4 rounded-full absolute left-0 top-1/2 -mt-2 border-4 border-white"></div>
          <p className="text-sm font-medium mt-1 text-slate-700">
            {flight.aeroporto_origem.cidade}
          </p>
          <p className="text-xs text-slate-500 mt-0.5">
            {flight.aeroporto_origem.codigo}
          </p>
        </div>

        {/* Linha central */}
        <div className="w-1/3 px-4">
          <div className="relative">
            <div className="border-t-2 border-slate-200 w-full absolute top-1/2"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-xs font-medium text-slate-500 whitespace-nowrap">
              Voo direto •{" "}

            </div>
          </div>
        </div>

        {/* Coluna Destino */}
        <div className="text-center w-1/3">
          <div className="bg-emerald-500 h-4 w-4 rounded-full absolute right-0 top-1/2 -mt-2 border-4 border-white"></div>
          <p className="text-sm font-medium mt-1 text-slate-700">
            {flight.aeroporto_destino.cidade}
          </p>
          <p className="text-xs text-slate-500 mt-0.5">
            {flight.aeroporto_destino.codigo}
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between p-4 bg-slate-50 rounded-lg">
        <div>
          <p className="text-sm text-slate-500">Preço por assento</p>
          <p className="font-semibold text-slate-900">
            R$ {flight.valor_passagem.toFixed(2).replace(".", ",")}
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

// Função para calcular duração do voo  NAO UTILIZADA DEVIDO A FALTA DE INFORMAÇÃO NO BACKEND
const calculateDuration = (departure: string, arrival: string): string => {
  const [depHours, depMinutes] = departure.split(":").map(Number);
  const [arrHours, arrMinutes] = arrival.split(":").map(Number);

  let totalMinutes = arrHours * 60 + arrMinutes - (depHours * 60 + depMinutes);

  if (totalMinutes < 0) {
    totalMinutes += 24 * 60;
  }

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${hours}h ${minutes}min`;
};

export default FlightDetails;
