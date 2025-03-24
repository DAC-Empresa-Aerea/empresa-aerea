import { Flight } from "../../atoms/FlightBasicInfo";
import FlightList from "../../molecules/FlightList";

const next48HoursFlightsDataExample: Array<Flight> = [
  { number: 101, departure: "10:00", arrival: "12:00" },
  { number: 102, departure: "14:00", arrival: "16:00" },
  { number: 103, departure: "18:00", arrival: "20:00" },
];

// Não deixe como opcional, apenas leve a constante acima para o componente pai
interface CheckInProps {
  flights: Array<Flight>;
}

function CheckIn({ flights = next48HoursFlightsDataExample }: CheckInProps) {
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

export default CheckIn;
