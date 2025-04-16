import { useEffect, useState } from "react";
import { flightsDataExample } from "../../data/FlightsExample";
import { Flight } from "../../components/atoms/FlightBasicInfo";
import EmployeeFlightList from "../../components/molecules/flight/EmployeeFlightList";

interface EmployeeHomeProps {
  title: string;
  onViewMoreClick: () => void;
  flights: Flight[];
}

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

function EmployeeHome({
  title,
  onViewMoreClick,
  flights = [],
}: EmployeeHomeProps) {
  const [sortedFlights, setSortedFlights] = useState<Array<Flight>>([]);

  useEffect(() => {
    const flightsToSort = flights.length > 0 ? flights : flightsDataExample;
    setSortedFlights(FAKE_sortFlightsByDate(flightsToSort));
  }, [flights]);

  return (
    <EmployeeFlightList
      title={title}
      onViewMoreClick={onViewMoreClick}
      flights={sortedFlights}
    />
  );
}

export default EmployeeHome;
