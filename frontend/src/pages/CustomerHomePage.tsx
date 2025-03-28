import { useState } from "react";
import ReservationTable from "../components/organisms/ReservationTable";
import SeeReservation from "../components/molecules/modalsMolecules/SeeReservation";
import { Reserve } from "../components/atoms/TableItem";

const CustomerHomePage = () => {
  // Estado para armazenar a reserva selecionada e controle do modal
  const [selectedReserve, setSelectedReserve] = useState<Reserve | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Simulação de dados da API
  const [reserves] = useState<Reserve[]>([
    {
      number: 201,
      departure_city: "São Paulo",
      departure_date: new Date("2025-04-10T08:00:00"),
      arrival_city: "Rio de Janeiro",
      arrival_date: new Date("2025-04-10T10:00:00"),
      status: "Cancelado",
    },
    {
      number: 202,
      departure_city: "Brasília",
      departure_date: new Date("2025-05-15T12:00:00"),
      arrival_city: "Salvador",
      arrival_date: new Date("2025-05-15T14:00:00"),
      status: "Concluído",
    },
    {
      number: 203,
      departure_city: "Curitiba",
      departure_date: new Date("2025-06-20T16:00:00"),
      arrival_city: "Porto Alegre",
      arrival_date: new Date("2025-06-20T18:00:00"),
      status: "Reservado",
    },
  ]);

  const handleFlightClick = (reserve: Reserve) => {
    setSelectedReserve(reserve);
    setIsModalOpen(true);
  };

  return (
    <div>
      <ReservationTable reserves={reserves} onFlightClick={handleFlightClick} />

      {/* Modal para ver detalhes da reserva */}
      <SeeReservation
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Detalhes da Reserva #${selectedReserve?.number}`}
      >
        {selectedReserve && (
          <div>
            <p><strong>Origem:</strong> {selectedReserve.departure_city}</p>
            <p><strong>Data de Partida:</strong> {selectedReserve.departure_date.toLocaleString()}</p>
            <p><strong>Destino:</strong> {selectedReserve.arrival_city}</p>
            <p><strong>Data de Chegada:</strong> {selectedReserve.arrival_date.toLocaleString()}</p>
            <p><strong>Status:</strong> {selectedReserve.status}</p>
          </div>
        )}
      </SeeReservation>
    </div>
  );
};

export default CustomerHomePage;
