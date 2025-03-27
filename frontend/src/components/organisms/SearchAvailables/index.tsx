import { useState } from "react";
import { Flight } from "../../atoms/FlightBasicInfo";
import SearchInput from "../../molecules/SearchInput";
import AvailableFlights from "../AvailableFlights";

interface SearchAvailables {
    flightsList: Array<Flight>;
}

function SearchAvailables({
    flightsList,
}: SearchAvailables) {

    const [flights, setFlights] = useState<Array<Flight>>(flightsList || []);

    function handleSearch(origin: string, destination: string) {
        if(origin !==  "" && destination == "")  {
            setFlights((flightsList || []).filter(flight => flight.origin === origin));
            return;
        }
        else if(origin === "" && destination !== "") {
            setFlights((flightsList || []).filter(flight => flight.destination === destination));
            return;
        }
        setFlights((flightsList || []).filter(flight => flight.origin === origin && flight.destination === destination));
    }

    function handleCancelSearch() {
        setFlights(flightsList || []);
    }

    return (
        <div className="mx-auto flex flex-row justify-center items-center w-full pl-7 h-[60dvh]  m-auto">  
            <SearchInput handleSearch={handleSearch} handleCancelSearch={handleCancelSearch}/>
            <AvailableFlights flights={flights}/>
        </div>
    );
}

export default SearchAvailables;