import CheckInTable from "../../components/organisms/CheckInTable";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/loginContext";
import { useCustomerReserves } from "../../hooks/customers/useCustomerReserves";
import { useUpdateReserveToCheckIn } from "../../hooks/reserves/useUpdateReserveStatus";
import { ReserveStatus, ReserveWithFlight } from "../../types/api/reserve";

function CheckIn() {
  const { user, isAuthenticated, loading } = useAuth();
  const [reserves, setReserves] = useState<ReserveWithFlight[]>([]);
  const [error, setError] = useState<string>("");

  const getReserves = useCustomerReserves(user?.codigo || 0, !loading);
  const { mutateAsync: updateToCheckIn } = useUpdateReserveToCheckIn();

  const fetchReserves = async () => {
    if (isAuthenticated && user && user.codigo) {
      try {
        const response = await getReserves.refetch();
        console.log("Reservas do cliente:", response.data);
        if (response.data) {
          const now = new Date();
          const next48h = new Date(now.getTime() + 48 * 60 * 60 * 1000);

          const filteredReserves = response.data.filter(
            (reserve: ReserveWithFlight) => {
              const reserveDate = new Date(reserve.voo.data);
              return (
                (reserve.estado == ReserveStatus.CRIADA ||
                  reserve.estado == ReserveStatus.CHECKIN) &&
                reserveDate >= now &&
                reserveDate <= next48h
              );
            }
          );

          setReserves(filteredReserves);
        }
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

  const handleCheckIn = async (reserve: ReserveWithFlight) => {
    try {
      await updateToCheckIn(reserve.codigo);
      console.log("Check-in confirmado para:", reserve.codigo);
      fetchReserves();
    } catch (error) {
      console.error("Erro ao fazer check-in:", error);
      setError("Erro ao realizar check-in. Tente novamente.");
    }
  };

  return (
    <div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {reserves.length > 0 ? (
        <CheckInTable reserves={reserves} onCheckInClick={handleCheckIn} />
      ) : (
        <p className="text-xl font-bold mb-4 text-center">
          Nenhuma reserva disponível para check-in.
        </p>
      )}
    </div>
  );
}

export default CheckIn;
