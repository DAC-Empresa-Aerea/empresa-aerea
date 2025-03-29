import { ChangeEvent, useState } from "react";
import SubmitButton from "../components/atoms/buttons/SubmitButton";
import LogoImage from "../components/atoms/images/LogoImage";
import MaskedInput from "../components/atoms/inputs/MaskedInput";
import BasicInput from "../components/atoms/inputs/BasicInput";
import { DropdownInput } from "../components/atoms/inputs/DropdownInput";
import { airportsDataExample } from "../data/AirportExample";

function onSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  alert("Enviando...");
}

interface RegisterFlightsInfo {
  code: string;
  date: string;
  value: number;
  totalSeats: number;
  occupiedSeats: number;
  originAirportCode: string;
  destinationAirportCode: string;
}

function RegisterFlights() {
  const [flight, setFlight] = useState<RegisterFlightsInfo>({
    code: "",
    date: "",
    value: 0,
    totalSeats: 0,
    occupiedSeats: 0,
    originAirportCode: "",
    destinationAirportCode: "",
  });

  const handleMoneyChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Get the current input value and remove non-digits
    const inputValue = e.target.value.replace(/\D/g, "");

    // Convert to number and divide by 100 to handle decimals
    const numberValue = inputValue === "" ? 0 : Number(inputValue) / 100;

    // Update flight with only the numeric value
    setFlight({
      ...flight,
      value: numberValue,
    });
  };

  const moneyMask = (value: number) => {
    if (value === undefined || value === null) return "R$ 0,00";

    // Format the number with Brazilian currency format
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className="flex min-h-dvh items-center justify-center font-roboto">
      <div className="w-full lg:max-w-[35%] rounded-lg bg-white p-8 shadow-lg">
        <LogoImage size="h-10" />
        <h1 className="text-2xl font-bold text-gray-800 text-center cursor-default">
          FlyHigh
        </h1>
        <h2 className="mb-4 text-center text-2xl text-gray-800 cursor-default">
          Cadastrar Voos
        </h2>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          {/* Código do voo */}
          <MaskedInput
            type="text"
            mask="aaaa0000"
            value={flight?.code || ""}
            placeholder="Código do Voo (ex: ABCD1234)"
            onChange={(e) => {
              setFlight({
                ...flight,
                code: e.target.value.toUpperCase(),
              });
            }}
            required
          />

          {/* Data e hora de voo */}
          <div className="flex gap-4 w-full lg:flex-row flex-col">
            <div className="flex-1">
              <h3 className="text-gray-800 ml-2">Data de saída:</h3>
              <BasicInput
                type="date"
                value={flight?.date?.split("T")[0] || ""}
                onChange={(e) => {
                  const newDate = e.target.value;
                  setFlight({
                    ...flight,
                    date: `${newDate}T${
                      flight?.date?.split("T")[1] || "00:00"
                    }`,
                  });
                }}
                placeholder=""
                required
              />
            </div>

            <div className="flex-1">
              <h3 className="text-gray-800 ml-2">Horário de saída:</h3>
              <BasicInput
                type="time"
                value={flight?.date?.split("T")[1] || ""}
                onChange={(e) => {
                  const newTime = e.target.value;
                  setFlight({
                    ...flight,
                    date: `${flight?.date?.split("T")[0] || ""}T${newTime}`,
                  });
                }}
                placeholder=""
                required
              />
            </div>
          </div>

          {/* Rota do voo */}
          <div className="flex gap-4 w-full lg:flex-row flex-col">
            <div className="flex-1">
              <h3 className="text-gray-800 ml-2">Aeroporto de saída:</h3>
              <DropdownInput
                options={airportsDataExample
                  .map((airport) => airport.code)
                  .filter(
                    (airport) => airport !== flight?.destinationAirportCode
                  )}
                setSelectedValue={(value: string) => {
                  setFlight({
                    ...flight,
                    originAirportCode: value,
                  });
                }}
                value={flight?.originAirportCode}
              />
            </div>
            <div className="flex-1">
              <h3 className="text-gray-800 ml-2">Aeroporto de chegada:</h3>
              <DropdownInput
                options={airportsDataExample
                  .map((airport) => airport.code)
                  .filter((airport) => airport !== flight?.originAirportCode)}
                setSelectedValue={(value: string) => {
                  setFlight({
                    ...flight,
                    destinationAirportCode: value,
                  });
                }}
                value={flight?.destinationAirportCode}
              />
            </div>
          </div>

          {/* Valor da passagem */}
          <div className="flex gap-4 w-full lg:flex-row flex-col">
            <BasicInput
              type="text"
              value={moneyMask(flight?.value) || ""}
              placeholder="Preço da passagem (ex: R$ 123,00)"
              onChange={handleMoneyChange}
              required
              classNameAdd="flex-1"
            />
            <BasicInput
              type="number"
              value={
                flight?.value ? Math.ceil(flight?.value / 5).toString() : ""
              }
              placeholder="Total de Milhas"
              disabled
              classNameAdd="flex-1"
            />
          </div>

          <div className="flex flex-col gap-4 w-full lg:flex-row">
            <div className="flex-1">
              <BasicInput
                type="number"
                value={moneyMask(flight?.totalSeats) || ""}
                placeholder="Poltronas totais"
                onChange={(e) => {
                  const newValue = e.target.value.replace(/\D/g, "");
                  setFlight({
                    ...flight,
                    totalSeats: Number(newValue),
                  });
                }}
                required
                classNameAdd="flex-1"
              />
            </div>
            <div className="flex-1">
              <BasicInput
                type="number"
                value={moneyMask(flight?.occupiedSeats) || ""}
                placeholder="Poltronas livres"
                onChange={(e) => {
                  const newValue = e.target.value.replace(/\D/g, "");
                  setFlight({
                    ...flight,
                    occupiedSeats: Number(newValue),
                  });
                }}
                required
                classNameAdd="flex-1"
              />
            </div>
          </div>

          <SubmitButton text="Cadastrar" />
        </form>
      </div>
    </div>
  );
}

export default RegisterFlights;
