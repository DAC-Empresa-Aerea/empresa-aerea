import { useEffect, useState } from "react";
import LogoImage from "../../atoms/images/LogoImage";
import MaskedInput from "../../atoms/inputs/MaskedInput";
import FlightDate from "../../molecules/registerFlight/FlightDate";
import FlightRoute from "../../molecules/registerFlight/FlightRoute";
import FlightSeats from "../../molecules/registerFlight/FlightSeat";
import SubmitButton from "../../atoms/buttons/SubmitButton";
import FlightPrice from "../../molecules/registerFlight/FlightPrice";
import Flight from "../../../types/Flight";
import { getAirportByCode } from "../../../services/airportService";
import { createFlight } from "../../../services/flightsService";
import { getAirports } from "../../../services/airportService";
import { useNavigate } from "react-router-dom";
import ConfirmCreateFlightModal from "../../molecules/modalsMolecules/ConfirmCreateFlightModal";

function generateFlightCode() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const letterPart = Array.from({ length: 4 }, () =>
    letters[Math.floor(Math.random() * letters.length)]
  ).join("");
  const numberPart = Math.floor(1000 + Math.random() * 9000); // 1000–9999
  return `${letterPart}${numberPart}`;
}

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
  const [airports, setAirports] = useState([]);
  const [flightDate, setFlightDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [flightTime, setFlightTime] = useState("00:00");
  const [isModalOpen, setIsModalOpen] = useState(false); // Controle do modal
  const navigate = useNavigate();

  useEffect(() => {
    getAirports()
      .then((data) => {
        const airportCodes = data.map((airport: any) => airport.codigo);
        setAirports(airportCodes);

        setFlight((prev) => ({
          ...prev,
          codigo: generateFlightCode(),
          quantidade_poltronas_ocupadas: 0,
        }));
      })
      .catch((error) => {
        console.error("Erro ao buscar voos:", error);
      });
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleCreateFlight = async () => {
    try {
      console.log("Enviando dados do voo:", flight);
      await createFlight(flight);
      alert("Voo cadastrado com sucesso!");
      navigate("/employee/home");
      setIsModalOpen(false); 
    } catch (error) {
      console.error("Erro ao cadastrar voo:", error);
      alert("Erro ao cadastrar voo. Tente novamente.");
      setIsModalOpen(false); 
    }
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
                const aeroporto = await getAirportByCode(value);
                const { id, ...aeroportoSemId } = aeroporto;
                setFlight({
                  ...flight,
                  aeroporto_origem: aeroportoSemId,
                });
              } catch (error) {
                console.error(error);
              }
            }}
            setDestinationAirportCode={async (value) => {
              try {
                const aeroporto = await getAirportByCode(value);
                const { id, ...aeroportoSemId } = aeroporto;
                setFlight({
                  ...flight,
                  aeroporto_destino: aeroportoSemId,
                });
              } catch (error) {
                console.error(error);
              }
            }}
            airports={airports}
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
        flight={flight}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export default RegisterFlightsForm;
