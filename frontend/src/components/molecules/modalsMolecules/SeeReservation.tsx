import { ReserveWithFlight } from "../../../types/api/reserve";

interface SeeReservationProps {
  moreInfoisOpen: boolean;
  moreInfoonClose: () => void;
  moreInfotitle: string;
  selectedReserve: ReserveWithFlight;
}

function SeeReservation({ moreInfoisOpen, moreInfoonClose, moreInfotitle, selectedReserve }: SeeReservationProps) {
  if (!moreInfoisOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-30 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative border border-gray-300">
        <h2 className="text-xl font-bold mb-4">{moreInfotitle}</h2>
        <div>
          <p><strong>Código da Reserva:</strong> {selectedReserve.codigo}</p>
          <p><strong>Data/Hora reserva:</strong> {new Date(selectedReserve.data).toLocaleString()}</p>
          <p><strong>Data/Hora voo:</strong> {new Date(selectedReserve.voo.data).toLocaleString()}</p>
          <p><strong>Origem:</strong> {selectedReserve.voo.aeroporto_origem.cidade}</p>
          <p><strong>Destino:</strong> {selectedReserve.voo.aeroporto_destino.cidade}</p>
          <p><strong>Valor Gasto (R$):</strong> {selectedReserve.valor.toFixed(2)}</p>
          <p><strong>Milhas Gastas:</strong> {selectedReserve.milhas_utilizadas.toString()}</p>
          <p><strong>Status:</strong> {selectedReserve.estado}</p>
        </div>
        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md w-full" onClick={moreInfoonClose}>
          Fechar
        </button>
      </div>
    </div>
  );
}

export default SeeReservation;