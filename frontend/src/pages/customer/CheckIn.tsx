import CheckInTable from "../../components/organisms/CheckInTable";
import { useEffect, useState } from "react";
import Reserve from "../../types/Reserve";
import { getReservesByCustomerCode } from "../../services/reserveService";
import { useAuth } from "../../contexts/loginContext";
import { UpdateReserve } from "../../services/reserveService";

function CheckIn() {
  const { user, isAuthenticated, loading } = useAuth();
  const [reserves, setReserves] = useState<Reserve[]>([]);
  const [error, setError] = useState<string>("");

  const fetchReserves = async () => {
    if (isAuthenticated && user && user.codigo) {
      try {
        const response = await getReservesByCustomerCode(user.codigo.toString());

        const now = new Date();
        const next48h = new Date(now.getTime() + 48 * 60 * 60 * 1000);

        const filteredReserves = response.filter((reserve: Reserve) => {
          const reserveDate = new Date(reserve.data);
          return (
            reserve.estado === "CRIADA" || reserve.estado === "CHECK-IN" &&
            reserveDate >= now &&
            reserveDate <= next48h
          );
        });

        setReserves(filteredReserves);

      } catch (err) {
        setError("Erro ao buscar reservas do cliente.");
      }
    }
  };

  useEffect(() => {
    if (!loading) {
      fetchReserves();
    }
  }, [isAuthenticated, user, loading]);

  const handleCheckIn = async (reserve: Reserve) => {
    try {
      await UpdateReserve(reserve.codigo, {
        ...reserve,
        estado: "CHECK-IN",
      });
      console.log("Check-in confirmado para:", reserve.codigo);
      fetchReserves();
    } catch (error) {
      console.error("Erro ao checkin:", error);
    };
  };

  return (
    <div>
      {reserves.length > 0 ? (
        <CheckInTable reserves={reserves} onCheckInClick={handleCheckIn} />
      ) : (
        <p className="text-xl font-bold mb-4 text-center">Nenhuma reserva disponível para check-in.</p>
      )}
    </div>
  );
}

export default CheckIn;
