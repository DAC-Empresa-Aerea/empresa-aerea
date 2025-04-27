import EmployeeFlight from "../../atoms/EmployeeFlight";
import  Flight  from "../../../types/Flight";

interface FlightListProps {
  title: string;
  flights: Flight[];
  onViewMoreClick: () => void;
}

function EmployeeFlightList({
  title,
  flights,
  onViewMoreClick,
}: FlightListProps) {
  return (
    <section className="bg-white m-7 p-4 min-w-3/4 max-w-full h-full shadow-medium flex gap-4 flex-col rounded-2xl">
      <h2 className="font-roboto font-bold">{title}</h2>
      <ul className="flex flex-col gap-4 overflow-y-auto">
        {flights.map((flight) => (
          <EmployeeFlight key={flight.codigo} flight={flight} />
        ))}
      </ul>
      <button
        className="transition-colors font-roboto text-gray-dark border border-gray-light rounded-lg py-2 cursor-pointer hover:bg-gray-light rounded-2xl"
        onClick={onViewMoreClick}
      >
        Ver mais voos
      </button>
    </section>
  );
}

export default EmployeeFlightList;
