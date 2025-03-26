import { Flight } from "../components/atoms/FlightBasicInfo";
import SearchAvailables from "../components/organisms/SearchAvailables";

const availableFlightsDataExample: Array<Flight> = [
    { number: 101, departure: "10:00", arrival: "12:00", origin: "GRU", destination: "JFK" },
    { number: 102, departure: "14:00", arrival: "16:00", origin: "CWB", destination: "GIG" },
    { number: 103, departure: "18:00", arrival: "20:00", origin: "JFK", destination: "GRU" },
    { number: 104, departure: "06:00", arrival: "08:00", origin: "SCL", destination: "MEX" },
    { number: 105, departure: "07:00", arrival: "09:00", origin: "FRA", destination: "LHR" },
    { number: 106, departure: "08:00", arrival: "10:00", origin: "CDG", destination: "MAD" },
    { number: 107, departure: "09:00", arrival: "11:00", origin: "LAX", destination: "ORD" },
    { number: 108, departure: "12:00", arrival: "14:00", origin: "BOM", destination: "DEL" },
    { number: 109, departure: "15:00", arrival: "17:00", origin: "SYD", destination: "MEL" },
    { number: 110, departure: "16:00", arrival: "18:00", origin: "PEK", destination: "HKG" },
    { number: 111, departure: "17:00", arrival: "19:00", origin: "SIN", destination: "BKK" },
    { number: 112, departure: "19:00", arrival: "21:00", origin: "AMS", destination: "ZRH" },
    { number: 113, departure: "21:00", arrival: "23:00", origin: "JFK", destination: "DFW" },
];

function SearchFlights() {
    return (
        <SearchAvailables flightsList={availableFlightsDataExample}/>
    )
}

export default SearchFlights;