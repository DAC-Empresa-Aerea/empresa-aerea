// Deve ser substituida por algo da api
export interface Flight {
  number: number;
  departure: string;
  arrival: string;
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
  return (
    <li className="border border-gray-light p-4 flex justify-between items-center hover:bg-gray-light">
      <article className="font-roboto">
        <h3 className="font-semibold">Voo {flight.number}</h3>
        <p>
          Saída: {flight.departure} - Chegada: {flight.arrival}
        </p>
      </article>
      <button
        className="transition-colors px-4 py-2 bg-blue-medium font-roboto text-white cursor-pointer hover:bg-blue-dark "
        onClick={onClick}
      >
        {buttonText}
      </button>
    </li>
  );
}

export default FlightBasicInfo;
