import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/loginContext";
import { EmployeeRoutesEnum } from "../../routes/routes.enum";
import { FlightWithAirports as Flight } from "../../types/api/flight";
import StatCard from "../../components/atoms/cards/StatCard";
import ActionCard from "../../components/atoms/cards/ActionCard";
import PageTitle from "../../components/atoms/typography/PageTitle";
import EmployeeHome from "./EmployeeHome";
import { useGetFlightsByDate } from "../../hooks/flights/useGetFlightsByDate";

function fixDateFormat(dateString: string): string {
  if (dateString.includes("T")) {
    const [datePart, timePart] = dateString.split("T");
    const [year, month, day] = datePart.split("-");

    const fixedMonth = month.padStart(2, "0");
    const fixedDay = day.padStart(2, "0");

    return `${year}-${fixedMonth}-${fixedDay}T${timePart}`;
  }
  return dateString;
}

const EmployeeLandingPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: flightsData } = useGetFlightsByDate(
    new Date().toISOString().split("T")[0], 
    new Date(Date.now() + 1000 * 48 * 60 * 60 * 1000).toISOString().split("T")[0],
    true
  );

  const [stats, setStats] = useState({
    totalFlights: 0,
    pendingReservations: 0,
    todaysFlights: 0,
  });

  useEffect(() => {
    if (flightsData) {
      setStats({
        ...stats,
        totalFlights: flightsData.voos.length,
        todaysFlights: flightsData.voos.filter(
          (flight: Flight) => new Date(flight.data).toDateString() === new Date().toDateString()
        ).length,
      });
    }
  }, [flightsData]);


  const handleCardClick = (route: string) => {
    navigate(route);
  };

  return (
    <div className="p-6">
      <div className="mb-8">



        <PageTitle>Painel do Funcionário</PageTitle>
        <p className="text-gray-600">
          Bem-vindo(a), {user?.nome || "Funcionário"}! Confira as informações e ações disponíveis.
        </p>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Total de Voos"
          value={stats.totalFlights}
          icon="airplane"
          color="bg-blue-500"
        />
        <StatCard
          title="Reservas Pendentes"
          value={stats.pendingReservations}
          icon="clock"
          color="bg-yellow-500"
        />
        <StatCard
          title="Voos Hoje"
          value={stats.todaysFlights}
          icon="calendar"
          color="bg-green-500"
        />
      </div>

      {/* Ações Rápidas */}
      <h2 className="text-xl font-semibold mb-4">Ações Rápidas</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mb-8">
        <ActionCard
          title="Cadastrar Voos"
          description="Cadastro dos voos"
          icon="airplane"
          onClick={() => handleCardClick(`/${EmployeeRoutesEnum.BASE}/register-flights`)}
        />
        <ActionCard
          title="Confirmar Reservas"
          description="Gerenciar reservas de passageiros"
          icon="ticket"
          onClick={() => handleCardClick(`/${EmployeeRoutesEnum.BASE}/confirm`)}
        />
        <ActionCard
          title="Gerenciar Funcionários"
          description="Visualizar e gerenciar contas de clientes"
          icon="users"
          onClick={() => handleCardClick(`/${EmployeeRoutesEnum.BASE}/employee-crud`)}
        />
      </div>

      <EmployeeHome
        title="Voos nas próximas 48 horas"
      />
    </div>
  );
};

export default EmployeeLandingPage;