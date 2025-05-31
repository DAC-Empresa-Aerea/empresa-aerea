import EmployeeFlight from "../../atoms/EmployeeFlight";
import { FlightWithAirports } from "../../../types/api/flight";
import { useEffect } from "react";

interface FlightListProps {
  title: string;
  flights: FlightWithAirports[];
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
