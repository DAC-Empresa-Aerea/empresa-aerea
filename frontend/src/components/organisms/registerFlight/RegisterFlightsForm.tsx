import { useState } from "react";
import { airportsDataExample } from "../../../data/AirportExample";
import LogoImage from "../../atoms/images/LogoImage";
import MaskedInput from "../../atoms/inputs/MaskedInput";
import FlightDate from "../../molecules/registerFlight/FlightDate";
import FlightRoute from "../../molecules/registerFlight/FlightRoute";
import FlightSeats from "../../molecules/registerFlight/FlightSeat";
import SubmitButton from "../../atoms/buttons/SubmitButton";
import FlightPrice from "../../molecules/registerFlight/FlightPrice";

function RegisterFlightsForm() {
  const [flight, setFlight] = useState({
    code: "",
    date: "",
    value: 0,
    totalSeats: 0,
    occupiedSeats: 0,
    originAirportCode: "",
    destinationAirportCode: "",
  });

  const airports = airportsDataExample.map((airport) => airport.code);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Enviando...");
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
            value={flight.code}
            placeholder="Código do Voo (ex: ABCD1234)"
            onChange={(e) =>
              setFlight({ ...flight, code: e.target.value.toUpperCase() })
            }
            required
          />

          <FlightDate
            date={flight.date}
            setDate={(newDate) => setFlight({ ...flight, date: newDate })}
          />

          <FlightRoute
            originAirportCode={flight.originAirportCode}
            destinationAirportCode={flight.destinationAirportCode}
            setOriginAirportCode={(value) =>
              setFlight({ ...flight, originAirportCode: value })
            }
            setDestinationAirportCode={(value) =>
              setFlight({ ...flight, destinationAirportCode: value })
            }
            airports={airports}
          />

          <FlightPrice
            value={flight.value}
            setValue={(value) => setFlight({ ...flight, value })}
          />

          <FlightSeats
            totalSeats={flight.totalSeats}
            occupiedSeats={flight.occupiedSeats}
            setTotalSeats={(value) =>
              setFlight({ ...flight, totalSeats: value })
            }
            setOccupiedSeats={(value) =>
              setFlight({ ...flight, occupiedSeats: value })
            }
          />

          <SubmitButton text="Cadastrar" />
        </form>
      </div>
    </div>
  );
}

export default RegisterFlightsForm;
