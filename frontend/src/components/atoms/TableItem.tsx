import { FaPlaneDeparture, FaPlaneArrival } from "react-icons/fa";

export interface Reserve {
    number: number;
    departure_city: string;
    departure_date: Date;
    arrival_city: string;
    arrival_date: Date;
    status: string;
}

interface TableItemInfoProps {
    reserve: Reserve;
    onClick: () => void;
    buttonText: string;
}

function TableItem({ reserve, onClick, buttonText }: TableItemInfoProps) {
    return (
        <li className="border border-gray-light p-4 flex justify-between items-center rounded-lg shadow-md bg-white hover:bg-gray-100 transition">
            <article className="font-roboto flex-1 flex flex-col gap-2">
                <h3 className="font-semibold text-lg">Voo {reserve.number}</h3>
                <div className="flex items-center gap-2">
                    <FaPlaneDeparture className="text-blue-500" />
                    <span className="font-medium">{reserve.departure_city}</span>
                    <span className="text-sm text-gray-500">({new Date(reserve.departure_date).toLocaleString()})</span>
                </div>
                <div className="flex items-center gap-2">
                    <FaPlaneArrival className="text-green-500" />
                    <span className="font-medium">{reserve.arrival_city}</span>
                    <span className="text-sm text-gray-500">({new Date(reserve.arrival_date).toLocaleString()})</span>
                </div>
                <p className="text-sm font-medium text-gray-700">Status: <span className="uppercase text-blue-600">{reserve.status}</span></p>
            </article>
            <button
                className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md shadow-md hover:bg-blue-700 transition"
                onClick={onClick}
            >
                {buttonText}
            </button>
        </li>
    );
}

export default TableItem;