import { useState } from "react";
import { getReserveByCode } from "../../services/reserveService";
import Reserve from "../../types/Reserve";
import CancelReservation from "../../components/molecules/modalsMolecules/CancelReservation";
import BasicInput from "../../components/atoms/inputs/BasicInput";
import ReservationDetails from "../../components/organisms/ReservationDetails/Index";
import CityDetails from "../../components/molecules/flight/CityDetails";
import FlightDetails from "../../components/organisms/FlightDetails/Index";
import { useNavigate } from "react-router-dom";


const ConsultarReserva = () => {
  const [codigoReserva, setCodigoReserva] = useState("");
  const [selectedReserve, setSelectedReserve] = useState<Reserve | null>(null);
  const [isModalCancelOpen, setIsModalCancelOpen] = useState(false);
  const navigate = useNavigate();

  const goToCustomerHome = () => {
    navigate("/customer/home");
  };

  const handleSearch = async () => {
    try {
      const reserva = await getReserveByCode(codigoReserva);
      if (reserva) {
        setSelectedReserve(reserva);
      } else {
        alert("Reserva não encontrada");
      }
    } catch (error) {
      console.error("Erro ao buscar reserva:", error);
      alert("Erro ao buscar reserva. Tente novamente.");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Consultar Reserva</h1>
      <BasicInput
        type="text"
        placeholder="Digite o código da reserva"
        value={codigoReserva}
        onChange={(e) => setCodigoReserva(e.target.value)}
      />
      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full mt-2"
      >
        Buscar Reserva
      </button>

      {selectedReserve && (
        <div className="mt-6 border p-4 rounded shadow">
          <div className="grid grid-cols-2 gap-4">
            <ReservationDetails reservation={selectedReserve} />
            <FlightDetails
              code={selectedReserve.voo.codigo}
              date={new Date(selectedReserve.voo.data)}
              price={selectedReserve.voo.valor_passagem}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <CityDetails
              title="Aeroporto de Origem"
              city={selectedReserve.voo.aeroporto_origem.cidade}
              uf={selectedReserve.voo.aeroporto_origem.uf}
              airport={selectedReserve.voo.aeroporto_origem.nome}
              arriving={false}
              airportCode={selectedReserve.voo.aeroporto_origem.codigo}
            />
            <CityDetails
              title="Aeroporto de Destino"
              city={selectedReserve.voo.aeroporto_destino.cidade}
              uf={selectedReserve.voo.aeroporto_destino.uf}
              airport={selectedReserve.voo.aeroporto_destino.nome}
              arriving={true}
              airportCode={selectedReserve.voo.aeroporto_destino.codigo}
            />
          </div>

          {(selectedReserve.estado === "CRIADA" ||
            selectedReserve.estado === "CHECK-IN") && (
              <div className="mt-4">
                <button
                  onClick={() => setIsModalCancelOpen(true)}
                  className="bg-red-500 text-white px-4 py-2 rounded w-full"
                >
                  Cancelar Reserva
                </button>
              </div>
            )}
        </div>
      )}

      {selectedReserve && isModalCancelOpen && (
        <CancelReservation
          cancelisOpen={isModalCancelOpen}
          cancelClose={() => setIsModalCancelOpen(false)}
          canceltitle={`Confirmar cancelamento da Reserva #${selectedReserve.codigo}`}
          selectedReserve={selectedReserve}
          onUpdate={goToCustomerHome}
        />
      )}
    </div>
  );
};

export default ConsultarReserva;
