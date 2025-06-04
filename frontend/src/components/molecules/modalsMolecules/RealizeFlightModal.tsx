import { FaTimes } from "react-icons/fa";
import { FlightWithAirports as Flight, FlightStatus } from "../../../types/api/flight";
import { useUpdateFlightStatus } from "../../../hooks/flights/useUpdateFlights";

interface RealizeFlightModalProps {
  flight: Flight;
  isOpen: boolean;
  onClose: () => void;
}

function RealizeFlightModal({ flight, isOpen, onClose }: RealizeFlightModalProps) {
  const { mutateAsync: updateStatus } = useUpdateFlightStatus();

  if (!isOpen) return null;

  const handleRealizeFlight = async () => {
    try {
      if (flight.estado !== "CONFIRMADO") {
        alert("Somente voos CONFIRMADOS podem ser realizados.");
        onClose();
        return;
      }

      await updateStatus({
        codigo: flight.codigo,
        estado: FlightStatus.REALIZADO,
      });

      onClose();
    } catch (error) {
      console.error("Erro ao realizar voo:", error);
      alert("Erro ao realizar voo.");
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

        <h2 className="text-xl font-bold mb-4">Confirmar Realização do Voo</h2>
        <div className="mb-4">
          <p><strong>Código do Voo:</strong> {flight.codigo}</p>
          <p><strong>Data:</strong> {new Date(flight.data).toLocaleString()}</p>
          <p><strong>Status Atual:</strong> {flight.estado}</p>
        </div>

        <button
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md w-full hover:bg-green-700"
          onClick={handleRealizeFlight}
        >
          Confirmar Realização
        </button>
      </div>
    </div>
  );
}

export default RealizeFlightModal;
