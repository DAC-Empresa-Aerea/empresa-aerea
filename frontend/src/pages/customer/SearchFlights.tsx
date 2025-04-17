import { useEffect, useState } from "react";
import SearchAvailables from "../../components/organisms/SearchAvailables";

function SearchFlights() {
  // return <SearchAvailables flightsList={flightsDataExample} />;
  const [flightsList, setFlightsList] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  fetch("http://localhost:3001/flights")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Erro ao buscar voos disponíveis");
    }
    return response.json();
  })
  .then((data) => {
    setFlightsList(data);
    setLoading(false);
  })
  .catch((error) => {
    console.error("Erro ao buscar dados no JSON Server:", error);
    setLoading(false);
  });
}, []);

if (loading) return <p>Carregando voos...</p>;

  return <SearchAvailables flightsList={flightsList} />;
}
export default SearchFlights;
