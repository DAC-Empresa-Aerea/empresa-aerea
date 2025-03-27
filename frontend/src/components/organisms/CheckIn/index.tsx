import { Flight } from "../../atoms/FlightBasicInfo";
import FlightList from "../../molecules/FlightList";

// Não deixe como opcional, apenas leve a constante acima para o componente pai
interface CheckInProps {
  flights: Array<Flight>;
}

function CheckInComponent({ flights }: CheckInProps) {
  return (
    <FlightList
      title="Voos nas próximas 48 horas"
      flights={flights}
      buttonText="Fazer Check-in"
      onFlightClick={(flight) =>
        alert(`Não implementado | CheckIn ${flight.number}`)
      }
      onViewMoreClick={() => alert("Não implementado")}
    />
  );
}

export default CheckInComponent;
