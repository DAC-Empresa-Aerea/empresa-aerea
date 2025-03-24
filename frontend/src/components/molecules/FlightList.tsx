import FlightBasicInfo, { Flight } from "../atoms/FlightBasicInfo";

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
    <section className="bg-white m-7 p-4 min-w-3/4 max-w-full h-full shadow-medium flex gap-4 flex-col">
      <h2 className="font-roboto">{title}</h2>
      <ul className="flex flex-col gap-4">
        {flights.map((flight) => (
          <FlightBasicInfo
            key={flight.number}
            flight={flight}
            onClick={() => onFlightClick(flight)}
            buttonText={buttonText}
          />
        ))}
      </ul>
      <button
        className="transition-colors font-roboto text-gray-dark border border-gray-light rounded-lg py-2 cursor-pointer hover:bg-gray-light"
        onClick={onViewMoreClick}
      >
        Ver mais voos
      </button>
    </section>
  );
}

export default FlightList;
