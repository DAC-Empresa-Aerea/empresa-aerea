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

  useEffect(() => {
    getAirports()
      .then((data) => {
        const airportCodes = data.map((airport: any) => airport.codigo);
        setAirports(airportCodes);
      })
      .catch((error) => {
        console.error("Erro ao buscar voos:", error);
      });
  }, []);


  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      console.log("Enviando dados do voo:", flight);
      await createFlight(flight);
      alert("Voo cadastrado com sucesso!");
    } catch (error) {
      console.error("Erro ao cadastrar voo:", error);
      alert("Erro ao cadastrar voo. Tente novamente.");
    }
  };


  return (
    <div className="flex min-h-dvh items-center justify-center font-roboto">
      <div className="w-full lg:max-w-[35%] rounded-lg bg-white p-8 shadow-lg">
        <LogoImage size="h-10" />
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          FlyHigh
        </h1>
        <h2 className="text-center text-2xl text-gray-800">Cadastrar Voos</h2>
        <form
          onSubmit={onSubmit}
          className="flex flex-col gap-4"
        >
          <MaskedInput
            type="text"
            mask="aaaa0000"
            value={flight.codigo}
            placeholder="Código do Voo (ex: ABCD1234)"
            onChange={(e) =>
              setFlight({ ...flight, codigo: e.target.value.toUpperCase() })
            }
            required
          />

          <FlightDate
            date={flight.data.toISOString().substring(0, 10)}
            setDate={(newDate) =>
              setFlight({ ...flight, data: new Date(newDate) })
            }
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
            setValue={(value) =>
              setFlight({ ...flight, valor_passagem: value })
            }
          />

          <FlightSeats
            totalSeats={flight.quantidade_poltronas_total}
            occupiedSeats={flight.quantidade_poltronas_ocupadas}
            setTotalSeats={(value) =>
              setFlight({ ...flight, quantidade_poltronas_total: value })
            }
            setOccupiedSeats={(value) =>
              setFlight({ ...flight, quantidade_poltronas_ocupadas: value })
            }
          />

          <SubmitButton text="Cadastrar" />
        </form>
      </div>
    </div>
  );
}

export default RegisterFlightsForm;
