import { useEffect, useState } from "react";
import SearchAvailables from "../../components/organisms/SearchAvailables";
import { getFlights } from "../../services/flightsService";

function SearchFlights() {
  const [flightsList, setFlightsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFlights()
      .then((data) => {
        setFlightsList(data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Carregando voos...</p>;

  return <SearchAvailables flightsList={flightsList} />;
}

export default SearchFlights;
