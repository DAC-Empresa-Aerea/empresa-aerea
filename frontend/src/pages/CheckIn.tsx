import CheckInComponent from "../components/organisms/CheckIn";
import { flightsDataExample } from "../data/FlightsExample";

function CheckIn() {
  return <CheckInComponent flights={flightsDataExample} />;
}

export default CheckIn;
