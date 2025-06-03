import { useState } from "react";
import DropdownInput from "../atoms/inputs/DropdownInput";
import { useAirports } from "../../hooks/useAiports";
import { Airport } from "../../types/api/flight";

interface SearchInputProps {
  handleSearch: (origin: string, destination: string) => void;
  handleCancelSearch: () => void;
}

function SearchInput({ handleSearch, handleCancelSearch }: SearchInputProps) {
  const [selectedFirstValue, setSelectedFirstValue] = useState("");
  const [selectedSecondValue, setSelectedSecondValue] = useState("");

  // 1) O hook retorna algo como UseQueryResult<AxiosResponse<GetAirportsResponse>, Error>
  const {
    data: airportsResponse,  // axios response ou undefined
    isLoading,
    error,
  } = useAirports();

  // 2) Extrai só o array de Airport do response, ou usa [] enquanto carrega/erro
  const airports: Airport[] = airportsResponse?.data ?? [];

  // 3) Filtra pelos códigos (você pode exibir nome+cidade, se quiser)
  const originOptions = airports
  .filter((a) => a.codigo !== selectedSecondValue)
  .map((a) => `${a.codigo} – ${a.cidade}`);

  const destinationOptions = airports
  .filter((a) => a.codigo !== selectedFirstValue)
  .map((a) => `${a.codigo} – ${a.cidade}`);

  const handleResetValues = () => {
    setSelectedFirstValue("");
    setSelectedSecondValue("");
    handleCancelSearch();
  };

  return (
    <div className="w-60 md:w-14rem h-full flex flex-col justify-between bg-white p-4 shadow-medium rounded-2xl">
      <div className="flex flex-col gap-4">
        <h1 className="font-roboto text-2xl font-semibold text-alien mb-6">
          Buscar Voos
        </h1>

        <div>
          <h2 className="font-roboto text-lg font-semibold text-alien">
            Origem
          </h2>
          {isLoading ? (
            <p>Carregando aeroportos...</p>
          ) : error ? (
            <p>Erro ao carregar aeroportos</p>
          ) : (
            <DropdownInput
              options={originOptions}
              value={
                selectedFirstValue
                  ? originOptions.find((opt) => opt.startsWith(selectedFirstValue)) || ""
                  : ""
              }
              setSelectedValue={(value) => {
                const codigo = value.split(" – ")[0]; // extrai o código
                setSelectedFirstValue(codigo);
              }}
            />
          )}
        </div>

        <div>
          <h2 className="font-roboto text-lg font-semibold text-alien">
            Destino
          </h2>
          {isLoading ? (
            <p>Carregando aeroportos...</p>
          ) : error ? (
            <p>Erro ao carregar aeroportos</p>
          ) : (
            <DropdownInput
              options={destinationOptions}
              value={
                selectedSecondValue
                  ? destinationOptions.find((opt) => opt.startsWith(selectedSecondValue)) || ""
                  : ""
              }
              setSelectedValue={(value) => {
                const codigo = value.split(" – ")[0]; // extrai o código
                setSelectedSecondValue(codigo);
              }}
            />
          )}
        </div>

        <button
          onClick={handleResetValues}
          className="self-end mt-2 px-6 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Limpar
        </button>
      </div>

      <button
        onClick={() => handleSearch(selectedFirstValue, selectedSecondValue)}
        className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Buscar
      </button>
    </div>
  );
}

export default SearchInput;
