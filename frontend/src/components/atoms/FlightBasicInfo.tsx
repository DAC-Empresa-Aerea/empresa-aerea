import { useState } from "react";
// Deve ser substituida por algo da api
export interface Flight {
  number: number;
  departure: string;
  arrival: string;
  origin: string;
  destination: string;
}

interface FlightBasicInfoProps {
  flight: Flight;
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
              Voo {flight.number}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`ml-2 h-4 w-4 transform transition-transform ${
                  isExpanded ? "rotate-180" : ""
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
              Saída: {flight.departure} - Chegada: {flight.arrival}
            </p>
          </article>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              isExpanded ? "max-h-20 mt-2 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <p>
              Origem: {flight.origin} - Destino: {flight.destination}
            </p>
            <p className="text-gray-500">Data: 2025-05-10</p>
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
