import FlightBasicInfo from "../../atoms/FlightBasicInfo";
import { FlightWithAirports } from "../../../types/api/flight";

interface FlightListProps {
  title: string;
  flights: Array<FlightWithAirports>;
  buttonText: string;
  onFlightClick: (flight: FlightWithAirports) => void;
  onViewMoreClick: () => void;
}

function FlightList({
  title,
  flights,
  buttonText,
  onFlightClick,
  onViewMoreClick,
}: FlightListProps) {
  return (
    <section className="bg-white m-7 p-4 min-w-3/4 max-w-full h-full shadow-medium flex gap-4 flex-col rounded-2xl">
      <h2 className="font-roboto font-bold">{title}</h2>
      <ul className="flex flex-col gap-4 overflow-y-auto">
        {flights.map((flight) => (
          <FlightBasicInfo
            key={flight.codigo}
            flight={flight}
            onClick={() => onFlightClick(flight)}
            buttonText={buttonText}
          />
        ))}
      </ul>
    </section>
  );
}

export default FlightList;
