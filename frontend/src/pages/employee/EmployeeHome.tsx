import { useEffect, useState } from "react";
import Flight from "../../types/Flight";
import EmployeeFlightList from "../../components/molecules/flight/EmployeeFlightList";
import { getFlights } from "../../services/flightsService";

interface EmployeeHomeProps {
  title: string;
  onViewMoreClick: () => void;
}

function sortFlightsByDate(flights: Flight[]) {
  return flights.sort((a, b) => {
    return new Date(a.data).getTime() - new Date(b.data).getTime();
  });
}

function EmployeeHome({
  title,
  onViewMoreClick,
}: EmployeeHomeProps) {
  const [sortedFlights, setSortedFlights] = useState<Array<Flight>>([]);

  const fetchFlights = async () => {
    try {
      const data = await getFlights();
      const now = new Date();
      const next48h = new Date(now.getTime() + 48 * 60 * 60 * 1000);

      const flightsNext48Hours = data.filter((flight: any) => {
        const flightDate = new Date(flight.data);
        return flightDate >= now && flightDate <= next48h;
      });

      setSortedFlights(sortFlightsByDate(flightsNext48Hours));
    } catch (error) {
      console.error("Erro ao buscar voos:", error);
    }
  };

  useEffect(() => {
    fetchFlights();
  }, []);

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
