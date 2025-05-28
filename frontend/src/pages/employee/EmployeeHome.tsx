import { useEffect, useState } from "react";
import Flight from "../../types/Flight";
import EmployeeFlightList from "../../components/molecules/flight/EmployeeFlightList";
import { getFlightsByDate } from "../../services/flights"; 
import { FlightWithAirports, GetFlightByDateResponse } from "../../types/api/flight";

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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFlightsFromApi = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const today = new Date();
      const dayAfterTomorrow = new Date(today);
      dayAfterTomorrow.setDate(today.getDate() + 2);

      const todayString = today.toISOString().split('T')[0];
      const endDateString = dayAfterTomorrow.toISOString().split('T')[0];

      const response = await getFlightsByDate({ 
        data: todayString, 
        "data-fim": endDateString 
      });
      
      const apiDataWrapper: GetFlightByDateResponse = response.data; 
      const apiData: FlightWithAirports[] = apiDataWrapper && apiDataWrapper.voos ? apiDataWrapper.voos : [];

      const now = new Date();
      const next48h = new Date(now.getTime() + 48 * 60 * 60 * 1000);

      const flightsNext48Hours = apiData.filter((flightApi) => {
        const flightDate = new Date(flightApi.data);
        return flightDate >= now && flightDate <= next48h && flightApi.estado === "CONFIRMADO";
      }).map((flightApi): Flight => {
        return {
          codigo: flightApi.codigo,
          data: new Date(flightApi.data),
          valor_passagem: flightApi.valor_passagem,
          quantidade_poltronas_total: flightApi.quantidade_poltronas_total,
          quantidade_poltronas_ocupadas: flightApi.quantidade_poltronas_ocupadas,
          estado: flightApi.estado,
          aeroporto_origem: flightApi.aeroporto_origem,
          aeroporto_destino: flightApi.aeroporto_destino,
        };
      });

      setSortedFlights(sortFlightsByDate(flightsNext48Hours));
    } catch (err) {
      console.error("Erro ao buscar voos da API em EmployeeHome:", err);
      setError("Falha ao carregar voos. Verifique o console para mais detalhes.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFlightsFromApi();
  }, []);

  if (isLoading) {
    return <p>Carregando voos...</p>;
  }

  if (error) {
    return <p className="text-red-500 p-4">{error}</p>;
  }

  return (
    <EmployeeFlightList
      title={title}
      onViewMoreClick={onViewMoreClick}
      flights={sortedFlights}
      onUpdate={fetchFlightsFromApi} 
    />
  );
}

export default EmployeeHome;