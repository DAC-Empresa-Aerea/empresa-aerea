import Flight from "../../../types/Flight";
import FlightList from "../../molecules/flight/FlightList";
import { useNavigate } from "react-router-dom";

interface AvailableFlightsProps {
  flights: Array<Flight>;
}

function AvailableFlights({ flights }: AvailableFlightsProps) {
  const navigate = useNavigate();
  const handleFlightClick = (flight: Flight) => {
    navigate("/customer/cart", { state: { flight } });
  };
  return (
    <FlightList
      title="Voos Disponíveis"
      flights={flights}
      buttonText="Selecionar Voo"
      onFlightClick={(flight) =>
        handleFlightClick(flight)
      }
      onViewMoreClick={() => alert("Não implementado")}
    />
  );
}

export default AvailableFlights;
