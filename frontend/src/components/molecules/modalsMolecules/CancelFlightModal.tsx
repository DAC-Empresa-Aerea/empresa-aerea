import { FaTimes } from "react-icons/fa";
import Flight from "../../../types/Flight";
import { updateFlight } from "../../../services/flightsService";
import { getReservesByFlightCode, UpdateReserve } from "../../../services/reserveService";

interface CancelFlightModalProps {
  flight: Flight;
  isOpen: boolean;
  onClose: () => void;
}

function CancelFlightModal({ flight, isOpen, onClose  }: CancelFlightModalProps) {
  if (!isOpen) return null;

  const handleCancelFlight = async () => {
    try {
      if (flight.estado !== "CONFIRMADO") {
        alert("Somente voos CONFIRMADOS podem ser cancelados.");
        onClose();
        return;
      }

      const reservas = await getReservesByFlightCode(flight.codigo);

      await Promise.all(
        reservas.map((reserva: any) =>
          UpdateReserve(reserva.codigo, {
            ...reserva,
            estado: "CANCELADA",
          })
        )
      );

      await updateFlight(flight.codigo, { ...flight, estado: "CANCELADO" });

      alert("Voo e reservas cancelados com sucesso!");
      onClose();
    } catch (error) {
      console.error("Erro ao cancelar voo:", error);
      alert("Erro ao cancelar voo.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-30 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative border border-gray-300">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          <FaTimes size={24} />
        </button>

        <h2 className="text-xl font-bold mb-4">Confirmar Cancelamento</h2>
        <div className="mb-4">
          <p><strong>Código do Voo:</strong> {flight.codigo}</p>
          <p><strong>Data:</strong> {new Date(flight.data).toLocaleString()}</p>
          <p><strong>Status Atual:</strong> {flight.estado}</p>
        </div>

        <button
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md w-full hover:bg-red-700"
          onClick={handleCancelFlight}
        >
          Confirmar Cancelamento
        </button>
      </div>
    </div>
  );
}

export default CancelFlightModal;
