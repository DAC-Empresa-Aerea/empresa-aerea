import { FaPlaneDeparture, FaPlaneArrival } from "react-icons/fa";

export interface Reserve {
    "codigo": string,
    "data": Date,
    "valor": Number,
    "milhas_utilizadas": Number,
    "quantidade_poltronas": Number,
    "codigo_cliente": Number,
    "estado": string,
    "voo": {
        "codigo": string,
        "data": Date,
        "valor_passagem": Number,
        "quantidade_poltronas_total": Number,
        "quantidade_poltronas_ocupadas": Number,
        "estado": string,
        "aeroporto_origem": {
            "codigo": string,
            "nome": string,
            "cidade": string,
            "uf": string
        },
        "aeroporto_destino": {
            "codigo": string,
            "nome": string,
            "cidade": string,
            "uf": string
        }
    }
}

interface TableItemInfoProps {
    reserve: Reserve;
    moreInfoClick: () => void;
    cancelClick?: () => void;
    buttonText: string;
}

function TableItem({ reserve, moreInfoClick, cancelClick ,buttonText }: TableItemInfoProps) {

    return (
        <li className="border border-gray-light p-4 flex justify-between items-center rounded-lg shadow-md bg-white hover:bg-gray-100 transition">
            <article className="font-roboto flex-1 flex flex-col gap-2">
                <h3 className="font-semibold text-lg">Voo {reserve.codigo}</h3>
                <div className="flex items-center gap-2">
                    <FaPlaneDeparture className="text-blue-500" />
                    <span className="font-medium">{reserve.voo.aeroporto_origem.cidade}</span>
                    <span className="text-sm text-gray-500">({reserve.data.toLocaleString()})</span>
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
