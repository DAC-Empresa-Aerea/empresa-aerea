
import SearchAvailables from "../../components/organisms/SearchAvailables";
import { useGetFlightsByDate } from "../../hooks/flights/useGetFlightsByDate";

function SearchFlights() {
  const hoje = new Date();
  const data = hoje.toISOString().split("T")[0];

  const futuro = new Date(hoje);
  futuro.setFullYear(futuro.getFullYear() + 3);
  const dataFim = futuro.toISOString().split("T")[0];

  const {
    data: flightsList = { voos: [] },
    isLoading,
    isError,
    error,
  } = useGetFlightsByDate(data, dataFim);
  if (isLoading) return <p>Carregando voos...</p>;
  if (isError) return <p>Erro ao buscar voos: {error?.message}</p>;

  return <SearchAvailables flightsList={flightsList?.voos} />;
}

export default SearchFlights;
