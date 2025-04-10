import { Flight } from "../../atoms/FlightBasicInfo";
import FlightList from "../../molecules/FlightList";

// Não deixe como opcional, apenas leve a constante acima para o componente pai
interface CheckInProps {
  flights: Array<Flight>;
}

function CheckInComponent({ flights }: CheckInProps) {
  return (
    <div className="flex flex-col p-4 bg-gray rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold text-blue-700 border-b-2 border-blue-500 ml-2 pb-1 mb-2 flex items-center">
        <span className="bg-blue-100 text-blue-700 p-1 rounded-full mr-2">
        </span>
        Check-in
      </h2>
      <FlightList
        title="" 
        flights={flights}
        buttonText="Fazer Check-in"
        onFlightClick={(flight) =>
          alert(`Não implementado | CheckIn ${flight.number}`)
        }
        onViewMoreClick={() => alert("Não implementado")}
      />
    </div>
  );
}

export default CheckInComponent;
