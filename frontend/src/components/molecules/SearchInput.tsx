import { useEffect, useState } from "react";
import { DropdownInput } from "../atoms/DropdownInput";


interface SearchInputProps {
    handleSearch: (origin: string, destination: string) => void;
    handleCancelSearch: () => void;
}

function SearchInput({
    handleSearch,
    handleCancelSearch,
} : SearchInputProps) {

    const [selectedFirstValue, setSelectedFirstValue] = useState("");
    const [selectedSecondValue, setSelectedSecondValue] = useState("");

    const singles = [
        "JFK",
        "LAX",
        "ORD",
        "ATL",
        "DFW",
        "DEN",
        "SFO",
        "LAS",
        "SEA",
        "MIA",
        "CWB",
        "GIG",
        "GRU",
        "SCL",
        "MEX",
        "FRA",
        "LHR",
        "CDG",
        "MAD",
        "BOM",
    ];

    useEffect(() => {
        if(selectedFirstValue && selectedSecondValue) {
           handleSearch(selectedFirstValue, selectedSecondValue); 
        }
    }, [selectedFirstValue, selectedSecondValue]);

    function handleResetValues() {
        setSelectedFirstValue("");
        setSelectedSecondValue("");
    }

    return (
        <div className="w-full md:w-14rem h-full flex flex-col justify-between bg-white  p-4  shadow-medium">
            <div className="flex flex-col gap-4">
                <h1 className="font-roboto text-2xl font-semibold text-alien mb-6">
                    Buscar Voos
                </h1>
                <DropdownInput options={singles} setSelectedValue={setSelectedFirstValue} value={selectedFirstValue}/>   
                <DropdownInput options={singles} setSelectedValue={setSelectedSecondValue} value={selectedSecondValue}/>
                <button
                        onClick={() => {handleCancelSearch(); handleResetValues()}}
                        className="w-10 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 cursor-pointer self-end"
                        >
                        X
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