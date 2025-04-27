import Flight from "../../types/Flight";

interface EmployeeFlightProps {
  flight: Flight;
}

function board(flight: Flight) {
  alert(`R12 - ${flight.codigo} - ${flight.data}`);
}

function performFlight(flight: Flight) {
  alert(`R12 - ${flight.codigo} - ${flight.data}`);
}

function cancelFlight(flight: Flight) {
  alert(`R12 - ${flight.codigo} - ${flight.data}`);
}

function EmployeeFlight({ flight }: EmployeeFlightProps) {
  return (
    <li className="border border-gray-light p-4 flex justify-between items-center hover:bg-gray-light rounded-2xl">
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
      </article>
      <div className="flex gap-4">
        <button
          className="transition-colors px-4 py-2 bg-blue-600 font-roboto text-white cursor-pointer hover:bg-blue-dark rounded-lg"
          onClick={() => board(flight)}
        >
          Embarques
        </button>
        <button
          className="transition-colors px-4 py-2 bg-blue-600 font-roboto text-white cursor-pointer hover:bg-blue-dark rounded-lg"
          onClick={() => performFlight(flight)}
        >
          Realizar Voo
        </button>
        <button
          className="transition-colors px-4 py-2 bg-blue-600 font-roboto text-white cursor-pointer hover:bg-blue-dark rounded-lg"
          onClick={() => cancelFlight(flight)}
        >
          Cancelar
        </button>
      </div>
    </li>
  );
}

export default EmployeeFlight;
