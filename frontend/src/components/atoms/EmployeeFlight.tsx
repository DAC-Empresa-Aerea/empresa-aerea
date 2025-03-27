import { Flight } from "./FlightBasicInfo";

interface EmployeeFlightProps {
  flight: Flight;
}

function board(flight: Flight) {
  alert(`R12 - ${flight.number} - ${flight.departure} - ${flight.arrival}`);
}

function performFlight(flight: Flight) {
  alert(`R14 - ${flight.number} - ${flight.departure} - ${flight.arrival}`);
}

function cancelFlight(flight: Flight) {
  alert(`R13 - ${flight.number} - ${flight.departure} - ${flight.arrival}`);
}

function EmployeeFlight({ flight }: EmployeeFlightProps) {
  return (
    <li className="border border-gray-light p-4 flex justify-between items-center hover:bg-gray-light">
      <article className="font-roboto">
        <h3 className="font-semibold">Voo {flight.number}</h3>
        <p>
          Saída: {flight.departure} - Chegada: {flight.arrival}
        </p>
      </article>
      <div className="flex gap-4">
        <button
          className="transition-colors px-4 py-2 bg-blue-medium font-roboto text-white cursor-pointer hover:bg-blue-dark "
          onClick={() => board(flight)}
        >
          Embarques
        </button>
        <button
          className="transition-colors px-4 py-2 bg-blue-medium font-roboto text-white cursor-pointer hover:bg-blue-dark "
          onClick={() => performFlight(flight)}
        >
          Realizar Voo
        </button>
        <button
          className="transition-colors px-4 py-2 bg-blue-medium font-roboto text-white cursor-pointer hover:bg-blue-dark "
          onClick={() => cancelFlight(flight)}
        >
          Cancelar
        </button>
      </div>
    </li>
  );
}

export default EmployeeFlight;
