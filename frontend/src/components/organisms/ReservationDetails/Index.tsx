import { FaCalendar, FaDollarSign, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import Reserve from "../../../types/Reserve";

interface ReservationDetailsProps {
    reservation: Reserve
}


function ReservationDetails({
    reservation,
}: ReservationDetailsProps) {
    return (
        <div className="p-4 border rounded-lg shadow w-full">
            <h2 className="text-xl font-bold mb-2">Detalhes da Reserva</h2>
            <p><strong>Código:</strong> {reservation.codigo}</p>
            <p className="flex items-center gap-2"><FaCalendar size={16} /> {new Date(reservation.data).toLocaleString()}</p>
            <p className="flex items-center gap-2"><FaDollarSign size={16} /> R$ {reservation.valor.toFixed(2)}</p>
            <p><strong>Milhas Utilizadas:</strong> {reservation.milhas_utilizadas.toString()}</p>
            <p><strong>Poltronas:</strong> {reservation.quantidade_poltronas.toString()}</p>
            <p className="flex items-center gap-2">
                {reservation.estado === "CRIADA" ? <FaCheckCircle size={16} className="text-green-500" /> : <FaTimesCircle size={16} className="text-red-500" />}
                {reservation.estado}
            </p>
        </div>
    );
}

export default ReservationDetails;