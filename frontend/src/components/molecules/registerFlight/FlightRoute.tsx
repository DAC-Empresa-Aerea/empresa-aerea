import DropdownInput from "../../atoms/inputs/DropdownInput";
import { getAirports } from "../../../services/airportService";
interface FlightRouteProps {
  originAirportCode: string;
  destinationAirportCode: string;
  setOriginAirportCode: (value: string) => void;
  setDestinationAirportCode: (value: string) => void;
  airports: string[];
}

const FlightRoute = ({
  originAirportCode,
  destinationAirportCode,
  setOriginAirportCode,
  setDestinationAirportCode,
  airports,
}: FlightRouteProps) => {
  return (
    <div className="flex gap-4 w-full lg:flex-row flex-col">
      <div className="flex-1">
        <h3 className="text-gray-800 ml-2">Aeroporto de saída:</h3>
        <DropdownInput
          options={airports.filter(
            (airport) => airport !== destinationAirportCode
          )}
          setSelectedValue={setOriginAirportCode}
          value={originAirportCode}
          required
        />
      </div>
      <div className="flex-1">
        <h3 className="text-gray-800 ml-2">Aeroporto de chegada:</h3>
        <DropdownInput
          options={airports.filter((airport) => airport !== originAirportCode)}
          setSelectedValue={setDestinationAirportCode}
          value={destinationAirportCode}
          required
        />
      </div>
    </div>
  );
};

export default FlightRoute;
