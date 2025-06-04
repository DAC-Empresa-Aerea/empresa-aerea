import { useState } from "react";
import SearchInput from "../../molecules/SearchInput";
import AvailableFlights from "../AvailableFlights";
import { FlightWithAirports } from "../../../types/api/flight";

interface SearchAvailables {
    flightsList: Array<FlightWithAirports>;
}

function SearchAvailables({
    flightsList,
}: SearchAvailables) {

    const [flights, setFlights] = useState<Array<FlightWithAirports>>(flightsList || []);

    function handleSearch(origin: string, destination: string) {
        if(origin !==  "" && destination == "")  {
            setFlights((flightsList || []).filter(flight => flight.aeroporto_origem.codigo === origin));
            return;
        }
        else if(origin === "" && destination !== "") {
            setFlights((flightsList || []).filter(flight => flight.aeroporto_destino.codigo === destination));
            return;
        }
        setFlights((flightsList || []).filter(flight => flight.aeroporto_origem.codigo === origin && flight.aeroporto_destino.codigo === destination));
    }

    function handleCancelSearch() {
        setFlights(flightsList || []);
    }

    return (
        <div className="mx-auto flex flex-row justify-center items-center w-full pl-7 h-[75dvh] mb-7 mt-7">  
            <SearchInput handleSearch={handleSearch} handleCancelSearch={handleCancelSearch}/>
            <AvailableFlights flights={flights}/>
        </div>
    );
}

export default SearchAvailables;