import { useEffect, useState } from "react";
import DropdownInput from "../atoms/inputs/DropdownInput";
import { getAirports } from "../../services/airportService";


interface SearchInputProps {
    handleSearch: (origin: string, destination: string) => void;
    handleCancelSearch: () => void;
}

function SearchInput({
    handleSearch,
    handleCancelSearch,
}: SearchInputProps) {

    const [selectedFirstValue, setSelectedFirstValue] = useState("");
    const [selectedSecondValue, setSelectedSecondValue] = useState("");
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

    function handleResetValues() {
        setSelectedFirstValue("");
        setSelectedSecondValue("");
    }

    return (
        <div className=" w-60 md:w-14rem h-full flex flex-col justify-between bg-white  p-4  shadow-medium rounded-2xl">
            <div className="flex flex-col gap-4">
                <h1 className="font-roboto text-2xl font-semibold text-alien mb-6">
                    Buscar Voos
                </h1>
                <h2 className="font-roboto text-lg font-semibold text-alien">
                    Origem
                </h2>
                <DropdownInput options={airports} setSelectedValue={setSelectedFirstValue} value={selectedFirstValue} />
                <h3 className="font-roboto text-lg font-semibold text-alien"> Chegada</h3>
                <DropdownInput options={airports} setSelectedValue={setSelectedSecondValue} value={selectedSecondValue} />
                <button
                    onClick={() => { handleCancelSearch(); handleResetValues(); }}
                    className="flex items-center justify-center rounded-md bg-blue-600 px-6 py-1 text-white hover:bg-blue-700 cursor-pointer self-end"
                >
                    Limpar
                </button>
            </div>
            <div>
                <button
                    onClick={() => handleSearch(selectedFirstValue, selectedSecondValue)}
                    className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 cursor-pointer"
                >
                    Buscar
                </button>
            </div>
        </div>
    );
}

export default SearchInput;