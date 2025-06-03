import { useEffect, useState } from "react";
import EmployeeFlightList from "../../components/molecules/flight/EmployeeFlightList";
import { useGetFlightsByDate } from "../../hooks/flights/useGetFlightsByDate";
import { FlightWithAirports } from "../../types/api/flight";

interface EmployeeHomeProps {
  title: string;
}

function sortFlightsByDate(flights: FlightWithAirports[]) {
  return flights.sort((a, b) => {
    return new Date(a.data).getTime() - new Date(b.data).getTime();
  });
}

function EmployeeHome({
  title,
}: EmployeeHomeProps) {
  const [sortedFlights, setSortedFlights] = useState<Array<FlightWithAirports>>([]);

  const { data: flightsData } = useGetFlightsByDate(
    new Date().toISOString().split("T")[0],
    new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    true
  );

  useEffect(() => {
    if (flightsData) {
      setSortedFlights(() => sortFlightsByDate(flightsData.voos));
    }
  }, [flightsData]);

  const fetchFlights = () => {
    console.log("Fetching flights...");
  };

  return (
    <EmployeeFlightList
      title={title}
      flights={sortedFlights}
      onUpdate={fetchFlights}
    />
  );
}

export default EmployeeHome;
