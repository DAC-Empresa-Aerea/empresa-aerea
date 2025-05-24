import FlightList from "../../molecules/flight/FlightList";
import { useNavigate } from "react-router-dom";
import { FlightWithAirports } from "../../../types/api/flight";

interface AvailableFlightsProps {
  flights: Array<FlightWithAirports>;
}

function AvailableFlights({ flights }: AvailableFlightsProps) {
  const navigate = useNavigate();
  const handleFlightClick = (flight: Array<FlightWithAirports>[number]) => {
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
