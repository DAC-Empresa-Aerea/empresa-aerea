import { use, useEffect, useState } from "react";
import EmployeeFlightList from "../../components/molecules/flight/EmployeeFlightList";
import { useGetFlightsByDate } from "../../hooks/flights/useGetFlightsByDate";
import { FlightWithAirports } from "../../types/api/flight";

interface EmployeeHomeProps {
  title: string;
  onViewMoreClick: () => void;
}

function sortFlightsByDate(flights: FlightWithAirports[]) {
  return flights.sort((a, b) => {
    return new Date(a.data).getTime() - new Date(b.data).getTime();
  });
}

function EmployeeHome({
  title,
  onViewMoreClick,
}: EmployeeHomeProps) {
  const [sortedFlights, setSortedFlights] = useState<Array<FlightWithAirports>>([]);

  const { data: flightsData } = useGetFlightsByDate(
    new Date().toISOString().split("T")[0],
    new Date(Date.now() + 1000 * 48 * 60 * 60 * 100).toISOString().split("T")[0],
    true
  );

  useEffect(() => {
    if (flightsData) {
      console.log("Dados de voos recebidos:", flightsData);
      setSortedFlights(flightsData.voos);
      console.log("Voos ordenados:", sortedFlights);
    }
  }, [flightsData]);

  const fetchFlights = () => {
    console.log("Fetching flights...");
  };

  return (
    <EmployeeFlightList
      title={title}
      onViewMoreClick={onViewMoreClick}
      flights={sortedFlights}
      onUpdate={fetchFlights}
    />
  );
}


export default EmployeeHome;
