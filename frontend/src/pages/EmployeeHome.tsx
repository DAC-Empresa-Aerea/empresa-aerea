import { useEffect, useState } from "react";
import { flightsDataExample } from "../data/FlightsExample";
import { Flight } from "../components/atoms/FlightBasicInfo";
import EmployeeFlightList from "../components/molecules/EmployeeFlightList";

function sortFlightsByDate(flights: Flight[]) {
  return flights.sort((a, b) => {
    return new Date(a.departure).getTime() - new Date(b.departure).getTime();
  });
}

function FAKE_sortFlightsByDate(flights: Flight[]) {
  return flights.sort((a, b) => {
    return parseInt(a.departure) - parseInt(b.departure);
  });
}

function EmployeeHome() {
  const [sortedFlights, setSortedFlights] = useState<Array<Flight>>([]);

  useEffect(() => {
    // SUBSTITUIR PELA LOGICA REAL
    setSortedFlights(FAKE_sortFlightsByDate(flightsDataExample));
  }, []);

  return (
    <EmployeeFlightList
      title="Voos nas próximas 48 horas"
      onViewMoreClick={() => alert("Ver mais voos não implementado")}
      flights={sortedFlights}
    />
  );
}

export default EmployeeHome;
