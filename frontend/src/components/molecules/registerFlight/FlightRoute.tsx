import DropdownInput from "../../atoms/inputs/DropdownInput";
import { Airport } from "../../../types/api/flight";
interface FlightRouteProps {
  originAirportCode: string;
  destinationAirportCode: string;
  setOriginAirportCode: (value: string) => void;
  setDestinationAirportCode: (value: string) => void;
  airports: Airport[];
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
            (airport) => airport.codigo !== destinationAirportCode
          ).map((airport) => airport.codigo)}
          setSelectedValue={setOriginAirportCode}
          value={originAirportCode}
          required
        />
      </div>
      <div className="flex-1">
        <h3 className="text-gray-800 ml-2">Aeroporto de chegada:</h3>
        <DropdownInput
          options={airports.filter((airport) => airport.codigo !== originAirportCode).map((airport) => airport.codigo)}
          setSelectedValue={setDestinationAirportCode}
          value={destinationAirportCode}
          required
        />
      </div>
    </div>
  );
};

export default FlightRoute;
