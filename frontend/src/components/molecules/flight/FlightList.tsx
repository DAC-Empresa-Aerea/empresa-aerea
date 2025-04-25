import FlightBasicInfo from "../../atoms/FlightBasicInfo";
import Flight  from "../../../types/Flight";

interface FlightListProps {
  title: string;
  flights: Flight[];
  buttonText: string;
  onFlightClick: (flight: Flight) => void;
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
      <button
        className="transition-colors font-roboto font-bold text-gray-dark border border-gray-light rounded-lg py-2 cursor-pointer hover:bg-gray-light"
        onClick={onViewMoreClick}
      >
        Ver mais voos
      </button>
    </section>
  );
}

export default FlightList;
