import Flight from "../../../types/Flight";
import FlightList from "../../molecules/flight/FlightList";

interface AvailableFlightsProps {
  flights: Array<Flight>;
}

function AvailableFlights({ flights }: AvailableFlightsProps) {
  return (
    <FlightList
      title="Voos Disponíveis"
      flights={flights}
      buttonText="Selecionar Voo"
      onFlightClick={(flight) =>
        alert(`Não implementado | Selecionar Voo ${flight.codigo}`)
      }
      onViewMoreClick={() => alert("Não implementado")}
    />
  );
}

export default AvailableFlights;
