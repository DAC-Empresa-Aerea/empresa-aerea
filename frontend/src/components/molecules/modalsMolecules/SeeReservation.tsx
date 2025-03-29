import { Reserve } from "../../atoms/TableItem";

interface SeeReservationProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  selectedReserve: Reserve;
}

function SeeReservation({ isOpen, onClose, title, selectedReserve }: SeeReservationProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-30 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative border border-gray-300">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <div>
          <p><strong>Código da Reserva:</strong> {selectedReserve.codigo}</p>
          <p><strong>Data/Hora:</strong> {new Date(selectedReserve.data).toLocaleString()}</p>
          <p><strong>Origem:</strong> {selectedReserve.voo.aeroporto_origem.cidade}</p>
          <p><strong>Destino:</strong> {selectedReserve.voo.aeroporto_destino.cidade}</p>
          <p><strong>Valor Gasto (R$):</strong> {selectedReserve.valor.toFixed(2)}</p>
          <p><strong>Milhas Gastas:</strong> {selectedReserve.milhas_utilizadas.toString()}</p>
          <p><strong>Status:</strong> {selectedReserve.estado}</p>
        </div>
        <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md w-full" onClick={onClose}>
          Fechar
        </button>
      </div>
    </div>
  );
}

export default SeeReservation;