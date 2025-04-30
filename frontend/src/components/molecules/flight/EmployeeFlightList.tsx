import EmployeeFlight from "../../atoms/EmployeeFlight";
import  Flight  from "../../../types/Flight";

interface FlightListProps {
  title: string;
  flights: Flight[];
  onViewMoreClick: () => void;
  onUpdate: () => void;
}

function EmployeeFlightList({
  title,
  flights,
  onViewMoreClick,
  onUpdate,
}: FlightListProps) {
  return (
    <section>
      <h2>{title}</h2>
      <ul>
        {flights.map((flight) => (
          <EmployeeFlight
            key={flight.codigo}
            flight={flight}
            refreshFlights={onUpdate}
          />
        ))}
      </ul>
    </section>
  );
}



export default EmployeeFlightList;
