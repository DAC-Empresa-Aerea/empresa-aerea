import { useState } from "react";
import { Reserve } from "../components/atoms/TableItem";
import CancelReservation from "../components/molecules/modalsMolecules/CancelReservation";
import BasicInput from "../components/atoms/inputs/BasicInput";
import ReservationDetails from "../components/organisms/ReservationDetails/Index";
import CityDetails from "../components/molecules/CityDetails";
import FlightDetails from "../components/organisms/FlightDetails/Index";

const ConsultarReserva = () => {
  const [codigoReserva, setCodigoReserva] = useState("");
  const [selectedReserve, setSelectedReserve] = useState<Reserve | null>(null);
  const [isModalCancelOpen, setIsModalCancelOpen] = useState(false);

  // Simulação de dados da API
  const [reserves] = useState<Reserve[]>([
    {
      "codigo": "XPT789",
      "data": new Date("2024-10-10T14:30:00Z-03:00"),
      "valor": 250.00,
      "milhas_utilizadas": 50,
      "quantidade_poltronas": 1,
      "codigo_cliente": 1,
      "estado": "CONFIRMADO",
      "voo": {
        "codigo": "TADS0001",
        "data": new Date("2024-10-10T14:30:00Z-03:00"),
        "valor_passagem": 500.00,
        "quantidade_poltronas_total": 100,
        "quantidade_poltronas_ocupadas": 90,
        "estado": "CRIADA",
        "aeroporto_origem": {
          "codigo": "GRU",
          "nome": "Aeroporto Internacional de São Paulo/Guarulhos",
          "cidade": "Guarulhos",
          "uf": "SP"
        },
        "aeroporto_destino": {
          "codigo": "GIG",
          "nome": "Aeroporto Internacional do Rio de Janeiro/Galeão",
          "cidade": "Rio de Janeiro",
          "uf": "RJ"
        }
      }
    },
    {
      "codigo": "XPT788",
      "data": new Date("2024-10-10T14:30:00Z-03:00"),
      "valor": 250.00,
      "milhas_utilizadas": 50,
      "quantidade_poltronas": 1,
      "codigo_cliente": 1,
      "estado": "CRIADA",
      "voo": {
        "codigo": "TADS0001",
        "data": new Date("2024-10-15T14:30:00Z-03:00"),
        "valor_passagem": 500.00,
        "quantidade_poltronas_total": 100,
        "quantidade_poltronas_ocupadas": 90,
        "estado": "CONFIRMADO",
        "aeroporto_origem": {
          "codigo": "GRU",
          "nome": "Aeroporto Internacional de São Paulo/Guarulhos",
          "cidade": "Guarulhos",
          "uf": "SP"
        },
        "aeroporto_destino": {
          "codigo": "GIG",
          "nome": "Aeroporto Internacional do Rio de Janeiro/Galeão",
          "cidade": "Rio de Janeiro",
          "uf": "RJ"
        }
      }
    }
  ]);

  const handleSearch = () => {
    const reservaFound = reserves.find((r) => r.codigo === codigoReserva);
    if (reservaFound) {
      setSelectedReserve(reservaFound);
    } else {
      alert("Reserva não encontrada");
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
              date={selectedReserve.voo.data}
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

          {/* Botão para cancelar reserva */}
          {(selectedReserve.estado === "CRIADA" || selectedReserve.estado === "CHECK-IN") && (
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

      {/* Modal de Cancelamento */}
      {selectedReserve && isModalCancelOpen && (
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

export default ConsultarReserva;
