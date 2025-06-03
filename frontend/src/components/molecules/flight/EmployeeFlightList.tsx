import EmployeeFlight from "../../atoms/EmployeeFlight";
import { FlightWithAirports } from "../../../types/api/flight";

interface FlightListProps {
  title: string;
  flights: FlightWithAirports[];
  onUpdate: () => void;
}

function EmployeeFlightList({
  title,
  flights,
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
