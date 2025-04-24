import Reserve from "../../../types/Reserve";
import { FaTimes } from "react-icons/fa";
import { UpdateReserve } from "../../../services/reserveService";

interface CancelReservationProps {
  cancelisOpen: boolean;
  cancelClose: () => void;
  canceltitle: string;
  selectedReserve: Reserve;
  onUpdate: () => void; 
}

function CancelReservation({
  cancelisOpen,
  cancelClose,
  canceltitle,
  selectedReserve,
  onUpdate,
}: CancelReservationProps) {
  if (!cancelisOpen) return null;

  const handleCancel = async () => {
    try {
      await UpdateReserve(selectedReserve.codigo, {
        ...selectedReserve,
        estado: "CANCELADA",
      });
      onUpdate();
      cancelClose();
    } catch (error) {
      console.error("Erro ao cancelar a reserva:", error);
      setErrorMessage("Não foi possível cancelar a reserva. Tente novamente mais tarde.");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-30 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative border border-gray-300">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          onClick={cancelClose}
        >
          <FaTimes size={24} />
        </button>

        <h2 className="text-xl font-bold mb-4">{canceltitle}</h2>
        <div>
          <p><strong>Código da Reserva:</strong> {selectedReserve.codigo}</p>
          <p><strong>Data/Hora:</strong> {new Date(selectedReserve.data).toLocaleString()}</p>
          <p><strong>Origem:</strong> {selectedReserve.voo.aeroporto_origem.cidade}</p>
          <p><strong>Destino:</strong> {selectedReserve.voo.aeroporto_destino.cidade}</p>
          <p><strong>Valor Gasto (R$):</strong> {selectedReserve.valor.toFixed(2)}</p>
          <p><strong>Milhas Gastas:</strong> {selectedReserve.milhas_utilizadas.toString()}</p>
          <p><strong>Status:</strong> {selectedReserve.estado}</p>
        </div>
        <button
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md w-full"
          onClick={handleCancel}
        >
          Confirmar Cancelamento
        </button>
      </div>
    </div>
  );
}

export default CancelReservation;
