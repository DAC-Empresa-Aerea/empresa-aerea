import { FaTimes } from "react-icons/fa";
import { ReserveWithFlight } from "../../../types/api/reserve";
import { useUpdateReserveToCheckIn } from "../../../hooks/reserves/useUpdateReserveStatus";

interface CheckinReservationProps {
  checkinIsOpen: boolean;
  checkinClose: () => void;
  checkinTitle: string;
  selectedReserve: ReserveWithFlight;
  onUpdate: () => void;
}

function CheckinReservation({
  checkinIsOpen,
  checkinClose,
  checkinTitle,
  selectedReserve,
  onUpdate,
}: CheckinReservationProps) {
  const { mutateAsync: checkinReserve } = useUpdateReserveToCheckIn();
  if (!checkinIsOpen) return null;

  const handleCheckin = async () => {
    try {
      await checkinReserve(selectedReserve.codigo);
      onUpdate();
      checkinClose();
    } catch (error) {
      console.error("Erro ao realizar o check-in:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-30 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative border border-gray-300">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          onClick={checkinClose}
        >
          <FaTimes size={24} />
        </button>

        <h2 className="text-xl font-bold mb-4">{checkinTitle}</h2>
        <div>
          <p>
            <strong>Código da Reserva:</strong> {selectedReserve.codigo}
          </p>
          <p>
            <strong>Data/Hora:</strong>{" "}
            {new Date(selectedReserve.data).toLocaleString()}
          </p>
          <p>
            <strong>Origem:</strong>{" "}
            {selectedReserve.voo.aeroporto_origem.cidade}
          </p>
          <p>
            <strong>Destino:</strong>{" "}
            {selectedReserve.voo.aeroporto_destino.cidade}
          </p>
          <p>
            <strong>Valor Gasto (R$):</strong>{" "}
            {selectedReserve.valor.toFixed(2)}
          </p>
          <p>
            <strong>Milhas Gastas:</strong>{" "}
            {selectedReserve.milhas_utilizadas.toString()}
          </p>
          <p>
            <strong>Status:</strong> {selectedReserve.estado}
          </p>
        </div>
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md w-full"
          onClick={handleCheckin}
        >
          Confirmar Check-in
        </button>
      </div>
    </div>
  );
}

export default CheckinReservation;
