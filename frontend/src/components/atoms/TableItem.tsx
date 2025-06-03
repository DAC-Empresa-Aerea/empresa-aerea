import { FaPlaneDeparture, FaPlaneArrival } from "react-icons/fa";
import { ReserveWithFlight } from "../../types/api/reserve";
interface TableItemInfoProps {
    reserve: ReserveWithFlight;
    moreInfoClick: () => void;
    cancelClick?: () => void;
    buttonText: string;
}

function TableItem({ reserve, moreInfoClick, cancelClick ,buttonText }: TableItemInfoProps) {

    return (
        <li className="border border-gray-light p-4 flex justify-between items-center rounded-lg shadow-md bg-white hover:bg-gray-100 transition">
            <article className="font-roboto flex-1 flex flex-col gap-2">
                <h2 className="font-semibold text-lg"> Reserva {reserve.codigo} </h2>
                <h4 className="font-semibold text-base">Voo {reserve.voo.codigo} </h4>
                <div className="flex items-center gap-2">
                    <FaPlaneDeparture className="text-blue-500" />
                    <span className="font-medium">{reserve.voo.aeroporto_origem.cidade}</span>
                    <span className="text-sm text-gray-500">({new Date(reserve.voo.data).toLocaleString()})</span>
                </div>
                <div className="flex items-center gap-2">
                    <FaPlaneArrival className="text-green-500" />
                    <span className="font-medium">{reserve.voo.aeroporto_destino.cidade}</span>
                </div>
                <p className="text-sm font-medium text-gray-700">Status: <span className="uppercase text-blue-600">{reserve.estado}</span></p>
            </article>
            <div className="flex flex-col gap-2">
                {(reserve.estado === 'CRIADA' || reserve.estado === 'CHECK-IN') && (
                    <button
                        className="px-4 py-2 bg-red-600 text-white font-medium rounded-md shadow-md hover:bg-red-700 transition"
                        onClick={cancelClick}
                    >
                        Cancelar Reserva
                    </button>
                )}
                <button
                    className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md shadow-md hover:bg-blue-700 transition"
                    onClick={moreInfoClick}
                >
                    {buttonText}
                </button>
            </div>
        </li>
    );
}

export default TableItem;
