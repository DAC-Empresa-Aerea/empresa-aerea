import { useState } from "react";
import LogoImage from "../../atoms/images/LogoImage";
import MaskedInput from "../../atoms/inputs/MaskedInput";
import FlightDate from "../../molecules/registerFlight/FlightDate";
import FlightRoute from "../../molecules/registerFlight/FlightRoute";
import FlightSeats from "../../molecules/registerFlight/FlightSeat";
import SubmitButton from "../../atoms/buttons/SubmitButton";
import FlightPrice from "../../molecules/registerFlight/FlightPrice";
import Flight from "../../../types/Flight";
import { useAirports } from "../../../hooks/useAiports";
import ConfirmCreateFlightModal from "../../molecules/modalsMolecules/ConfirmCreateFlightModal";

function RegisterFlightsForm() {
  const [flight, setFlight] = useState<Flight>({
    codigo: "",
    data: new Date(),
    valor_passagem: 0,
    quantidade_poltronas_total: 0,
    quantidade_poltronas_ocupadas: 0,
    estado: "CONFIRMADO",
    aeroporto_origem: {
      codigo: "",
      nome: "",
      cidade: "",
      uf: "",
    },
    aeroporto_destino: {
      codigo: "",
      nome: "",
      cidade: "",
      uf: "",
    },
  });
  const [flightDate, setFlightDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [flightTime, setFlightTime] = useState("00:00");
  const [isModalOpen, setIsModalOpen] = useState(false); 

  const { data: airports = [], isLoading, error } = useAirports();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsModalOpen(true);
  };


  return (
    <div className="flex min-h-dvh items-center justify-center font-roboto">
      <div className="w-full lg:max-w-[35%] rounded-lg bg-white p-8 shadow-lg">
        <LogoImage size="h-10" />
        <h1 className="text-2xl font-bold text-gray-800 text-center">FlyHigh</h1>
        <h2 className="text-center text-2xl text-gray-800">Cadastrar Voos</h2>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <FlightDate
            date={flightDate}
            setDate={setFlightDate}
            time={flightTime}
            setTime={setFlightTime}
          />

          <FlightRoute
            originAirportCode={flight.aeroporto_origem?.codigo || ""}
            destinationAirportCode={flight.aeroporto_destino?.codigo || ""}
            setOriginAirportCode={async (value) => {
              try {
                const aeroporto = (Array.isArray(airports) ? airports : airports.data).find((a) => a.codigo === value);
                setFlight({
                  ...flight,
                  aeroporto_origem: aeroporto ? aeroporto : { codigo: "", nome: "", cidade: "", uf: "" },
                });
              } catch (error) {
                console.error(error);
              }
            }}
            setDestinationAirportCode={async (value) => {
              try {
                const aeroporto = (Array.isArray(airports) ? airports : airports.data).find((a) => a.codigo === value);
                setFlight({
                  ...flight,
                  aeroporto_destino: aeroporto ? aeroporto : { codigo: "", nome: "", cidade: "", uf: "" },
                });
              } catch (error) {
                console.error(error);
              }
            }}
            airports={Array.isArray(airports) ? airports : airports.data}
          />

          <FlightPrice
            value={flight.valor_passagem}
            setValue={(value) => setFlight({ ...flight, valor_passagem: value })}
          />

          <FlightSeats
            totalSeats={flight.quantidade_poltronas_total}
            setTotalSeats={(value) => setFlight({ ...flight, quantidade_poltronas_total: value })}
          />

          <SubmitButton text="Cadastrar" />
        </form>
      </div>

      {/* Modal de confirmação */}
      <ConfirmCreateFlightModal
          flight={{
            ...flight,
            data: new Date(`${flightDate}T${flightTime}:00`),
          }}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export default RegisterFlightsForm;
