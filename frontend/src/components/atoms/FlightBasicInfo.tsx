import { useState } from "react";
import { FlightWithAirports } from "../../types/api/flight";
interface FlightBasicInfoProps {
  flight: Array<FlightWithAirports>[number];
  onClick: () => void;
  buttonText: string;
}

// fix: precisa de mascara
function FlightBasicInfo({
  flight,
  onClick,
  buttonText,
}: FlightBasicInfoProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <li className="border rounded-2xl border-gray-light p-4 hover:bg-gray-light">
      <div className="flex justify-between items-center">
        <div className="flex-grow">
          <article
            className="font-roboto cursor-pointer"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <h3 className="font-semibold flex items-center">
              Voo {flight.codigo}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`ml-2 h-4 w-4 transform transition-transform ${isExpanded ? "rotate-180" : ""
                  }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </h3>
            <p>
              <p>
                Saída: {new Date(flight.data).toLocaleString("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </p>
          </article>
          <div
            className={`overflow-hidden transition-all duration-300 ${isExpanded ? "max-h-20 mt-2 opacity-100" : "max-h-0 opacity-0"
              }`}
          >
            <p>
              <p>
                Origem: {flight.aeroporto_origem?.cidade} ({flight.aeroporto_origem?.codigo}) -
                Destino: {flight.aeroporto_destino?.cidade} ({flight.aeroporto_destino?.codigo})
              </p>
            </p>
          </div>
        </div>

        <button
          className="transition-colors px-4 py-2 bg-blue-600 font-roboto text-white cursor-pointer hover:bg-blue-800 rounded-lg ml-4"
          onClick={onClick}
        >
          {buttonText}
        </button>
      </div>
    </li>
  );
}

export default FlightBasicInfo;
