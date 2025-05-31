import { useState } from "react";
import { FaPlaneDeparture, FaPlaneArrival } from "react-icons/fa";
import { ReserveWithFlight } from "../../types/api/reserve";

interface CheckInItemProps {
  reserve: ReserveWithFlight;
  onCheckInConfirm: () => void;
}

function CheckInItem({ reserve, onCheckInConfirm }: CheckInItemProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleConfirm = () => {
    onCheckInConfirm();
    setConfirmOpen(false);
  };

  return (
    <>
      <li className="border border-gray-light p-4 flex justify-between items-center rounded-lg shadow-md bg-white hover:bg-gray-100 transition">
        <article className="font-roboto flex-1 flex flex-col gap-2">
          <h3 className="font-semibold text-lg">Reserva {reserve.codigo}</h3>
          <div className="flex items-center gap-2">
            <FaPlaneDeparture className="text-blue-500" />
            <span className="font-medium">
              {reserve.voo.aeroporto_origem.cidade}
            </span>
            <span className="text-sm text-gray-500">
              (
              {new Date(reserve.voo.data).toLocaleString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
              )
            </span>
          </div>
          <div className="flex items-center gap-2">
            <FaPlaneArrival className="text-green-500" />
            <span className="font-medium">
              {reserve.voo.aeroporto_destino.cidade}
            </span>
          </div>
          <p className="text-sm font-medium text-gray-700">
            Status:{" "}
            <span className="uppercase text-blue-600">{reserve.estado}</span>
          </p>
        </article>
        <div className="flex flex-col gap-2">
          {reserve.estado === "CRIADA" && (
            <button
              className="px-4 py-2 bg-green-600 text-white font-medium rounded-md shadow-md hover:bg-green-700 transition"
              onClick={() => setConfirmOpen(true)}
            >
              Realizar Check-In
            </button>
          )}
        </div>
      </li>

      {confirmOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-0 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 relative">
            <h2 className="text-lg font-bold mb-4">Confirmar Check-In</h2>
            <p>
              Deseja confirmar o check-in para o voo{" "}
              <strong>{reserve.voo.codigo}</strong>?
            </p>
            <div className="mt-6 flex gap-4">
              <button
                className="flex-1 px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition"
                onClick={() => setConfirmOpen(false)}
              >
                Cancelar
              </button>
              <button
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                onClick={handleConfirm}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CheckInItem;
