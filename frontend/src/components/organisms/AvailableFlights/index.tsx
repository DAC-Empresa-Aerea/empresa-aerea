import { Flight } from "../../atoms/FlightBasicInfo";
import FlightList from "../../molecules/FlightList";

const availableFlightsDataExample: Array<Flight> = [
  { number: 101, departure: "10:00", arrival: "12:00", origin: "GRU", destination: "JFK" },
  { number: 102, departure: "14:00", arrival: "16:00", origin: "CWB", destination: "GIG" },
  { number: 103, departure: "18:00", arrival: "20:00", origin: "JFK", destination: "GRU" },
];

// Não deixe como opcional, apenas leve a constante acima para o componente pai
interface AvailableFlightsProps {
  flights: Array<Flight>;
}

function AvailableFlights({
  flights = availableFlightsDataExample,
}: AvailableFlightsProps) {
  return (
    <FlightList
      title="Voos Disponíveis"
      flights={flights}
      buttonText="Selecionar Voo"
      onFlightClick={(flight) =>
        alert(`Não implementado | Selecionar Voo ${flight.number}`)
      }
      onViewMoreClick={() => alert("Não implementado")}
    />
  );
}

export default AvailableFlights;
