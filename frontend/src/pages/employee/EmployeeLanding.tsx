import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import { EmployeeRoutesEnum } from "../../routes/routes.enum";

// Importe componentes necessários
import StatCard from "../../components/atoms/cards/StatCard";
import ActionCard from "../../components/atoms/cards/ActionCard";
import PageTitle from "../../components/atoms/typography/PageTitle";
import EmployeeHome from "./EmployeeHome";

const EmployeeLandingPage= () => {
  const { userData } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalFlights: 0,
    pendingReservations: 0,
    todaysFlights: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setStats({
          totalFlights: 24,
          pendingReservations: 8,
          todaysFlights: 3,
        });
      } catch (error) {
        console.error("Erro ao buscar estatísticas:", error);
      }
    };

    fetchStats();
  }, []);

  const handleCardClick = (route: string) => {
    navigate(route);
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <PageTitle>Painel do Funcionário</PageTitle>
        <p className="text-gray-600">
          Bem-vindo(a), {userData?.nome || "Funcionário"}! Confira as informações e ações disponíveis.
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        <ActionCard
          title="Gerenciar Voos"
          description="Gerenciar voos nas próximas 48 horas"
          icon="users"
          onClick={() => handleCardClick(`/${EmployeeRoutesEnum.BASE}/home`)}
        />
        <ActionCard
          title="Cadastrar Voos"
          description="Cadastro dos voos"
          icon="airplane"
          onClick={() => handleCardClick(`/${EmployeeRoutesEnum.BASE}/register-flights`)}
        />
        <ActionCard
          title="Visualizar Reservas"
          description="Ver e gerenciar reservas de passageiros"
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
        onViewMoreClick={() => alert("Ver mais voos nas próximas 48 horas")}
        flights={[]}
        />
    </div>
  );
};

export default EmployeeLandingPage;