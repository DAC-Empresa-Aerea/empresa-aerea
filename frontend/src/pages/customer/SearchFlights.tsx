import SearchAvailables from "../../components/organisms/SearchAvailables";
import { flightsDataExample } from "../../data/FlightsExample";

function SearchFlights() {
  return <SearchAvailables flightsList={flightsDataExample} />;
}

export default SearchFlights;
