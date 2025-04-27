import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/loginContext";
import { EmployeeRoutesEnum } from "../../routes/routes.enum";
import Flight from "../../types/Flight";
import StatCard from "../../components/atoms/cards/StatCard";
import ActionCard from "../../components/atoms/cards/ActionCard";
import PageTitle from "../../components/atoms/typography/PageTitle";
import EmployeeHome from "./EmployeeHome";
import { getFlights } from "../../services/flightsService";

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
  const [flightsList, setFlightsList] = useState([]);

  const [stats, setStats] = useState({
    totalFlights: 0,
    pendingReservations: 0,
    todaysFlights: 0,
  });

  useEffect(() => {
    const fetchFlightsAndStats = async () => {
      try {
        const data = await getFlights();
        setFlightsList(data);

        const totalFlights = data.length;
        const pendingReservations = data.filter((flight : Flight) => flight.estado === "CONFIRMADO").length;

        const today = new Date();
        const todaysFlights = data.filter((flight: Flight) => {
          const flightDate = new Date(
            typeof flight.data === "string" ? fixDateFormat(flight.data) : flight.data
          );
        
          return (
            flightDate.getFullYear() === today.getFullYear() &&
            flightDate.getMonth() === today.getMonth() &&
            flightDate.getDate() === today.getDate()
          );
        }).length;
        

        setStats({
          totalFlights,
          pendingReservations,
          todaysFlights,
        });
      } catch (error) {
        console.error("Erro ao buscar voos ou estatísticas:", error);
      }
    };

    fetchFlightsAndStats();
  }, []);


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
      />
    </div>
  );
};

export default EmployeeLandingPage;