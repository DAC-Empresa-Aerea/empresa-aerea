import { FaCalendar, FaDollarSign } from "react-icons/fa";

interface FlightDetailsProps {
    code: string;
    date: Date;
    price: Number;
}

function FlightDetails({
    code,
    date,
    price,
}: FlightDetailsProps) {
    return (
        <div className="p-4 border rounded-lg shadow w-full">
            <h2 className="text-xl font-bold mb-2">Dados do Voo</h2>
            <p><strong>Código do Voo:</strong> {code}</p>
            <p className="flex items-center gap-2"><FaCalendar size={16} /> {date.toLocaleString()}</p>
            <p className="flex items-center gap-2"><FaDollarSign size={16} /> R$ {price.toFixed(2)}</p>
        </div>
    )
}


export default FlightDetails;