import { useEffect, useState } from "react";
import ReservationTable from "../../components/organisms/ReservationTable";
import SeeReservation from "../../components/molecules/modalsMolecules/SeeReservation";
import CancelReservation from "../../components/molecules/modalsMolecules/CancelReservation";
import { Reserve } from "../../components/atoms/TableItem";
import { getReservesByCustomerCode } from "../../services/reserveService"; // ajuste o caminho se necessário

const CustomerHomePage = () => {
  const [reserves, setReserves] = useState<Reserve[]>([]);
  const [selectedReserve, setSelectedReserve] = useState<Reserve | null>(null);
  const [isModalInfoOpen, setIsModalInfoOpen] = useState(false);
  const [isModalCancelOpen, setIsModalCancelOpen] = useState(false);
  const [error, setError] = useState<string>("");

  const codigoCliente = "1010";

  useEffect(() => {
    const fetchReserves = async () => {
      try {
        const response = await getReservesByCustomerCode(codigoCliente);
        setReserves(response);
      } catch (err) {
        setError("Erro ao buscar reservas do cliente.");
        console.error(err);
      }
    };

    fetchReserves();
  }, []);

  const handleFlightClick = (reserve: Reserve) => {
    setSelectedReserve(reserve);
    setIsModalInfoOpen(true);
  };

  const cancelFlightClick = (reserve: Reserve) => {
    setSelectedReserve(reserve);
    setIsModalCancelOpen(true);
  };

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ReservationTable
        reserves={reserves}
        onFlightClick={handleFlightClick}
        cancelFlightClick={cancelFlightClick}
      />

      {selectedReserve && (
        <SeeReservation
          moreInfoisOpen={isModalInfoOpen}
          moreInfoonClose={() => setIsModalInfoOpen(false)}
          moreInfotitle={`Detalhes da Reserva #${selectedReserve.codigo}`}
          selectedReserve={selectedReserve}
        />
      )}

      {selectedReserve && (
        <CancelReservation
          cancelisOpen={isModalCancelOpen}
          cancelClose={() => setIsModalCancelOpen(false)}
          canceltitle={`Confirmar cancelamento da Reserva #${selectedReserve.codigo}`}
          selectedReserve={selectedReserve}
        />
      )}
    </div>
  );
};

export default CustomerHomePage;
