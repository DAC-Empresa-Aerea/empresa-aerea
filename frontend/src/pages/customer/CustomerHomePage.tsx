import { useEffect, useState } from "react";
import ReservationTable from "../../components/organisms/ReservationTable";
import SeeReservation from "../../components/molecules/modalsMolecules/SeeReservation";
import CancelReservation from "../../components/molecules/modalsMolecules/CancelReservation";
import Reserve from "../../types/Reserve";
import { getReservesByCustomerCode } from "../../services/reserveService";
import { useAuth } from "../../contexts/loginContext";

const CustomerHomePage = () => {
  const { user, isAuthenticated, loading } = useAuth();
  const [reserves, setReserves] = useState<Reserve[]>([]);
  const [selectedReserve, setSelectedReserve] = useState<Reserve | null>(null);
  const [isModalInfoOpen, setIsModalInfoOpen] = useState(false);
  const [isModalCancelOpen, setIsModalCancelOpen] = useState(false);
  const [error, setError] = useState<string>("");

  const fetchReserves = async () => {
    if (isAuthenticated && user && user.codigo) {
      try {
        const response = await getReservesByCustomerCode(user.codigo.toString());

        setReserves(response);
      } catch (err) {
        setError("Erro ao buscar reservas do cliente.");
        console.error(err);
      }
    }
  };

  useEffect(() => {
    if (!loading) {
      fetchReserves();
    }
  }, [isAuthenticated, user, loading]);

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
  
      {reserves.length === 0 ? (
        <p className="text-xl font-bold mb-4 text-center">Nenhuma reserva encontrada.</p>
      ) : (
        <ReservationTable
          reserves={reserves}
          onFlightClick={handleFlightClick}
          cancelFlightClick={cancelFlightClick}
        />
      )}
  
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
          onUpdate={fetchReserves}
        />
      )}
    </div>
  );
  
};

export default CustomerHomePage;
