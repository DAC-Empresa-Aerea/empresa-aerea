import { useState } from "react";
import ReservationTable from "../components/organisms/ReservationTable";
import SeeReservation from "../components/molecules/modalsMolecules/SeeReservation";
import { Reserve } from "../components/atoms/TableItem";
import CancelReservation from "../components/molecules/modalsMolecules/CancelReservation";

const CustomerHomePage = () => {
  // Estado para armazenar a reserva selecionada e controle do modal
  const [selectedReserve, setSelectedReserve] = useState<Reserve | null>(null);
  const [isModalInfoOpen, setIsModalInfoOpen] = useState(false);
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
    },
    {
      "codigo": "XPT789",
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
      <ReservationTable reserves={reserves} onFlightClick={handleFlightClick} cancelFlightClick={cancelFlightClick} />

      {/* Modal para ver detalhes da reserva */}
      {selectedReserve && (
        <SeeReservation
          moreInfoisOpen={isModalInfoOpen}
          moreInfoonClose={() => setIsModalInfoOpen(false)}
          moreInfotitle={`Detalhes da Reserva #${selectedReserve.codigo}`}
          selectedReserve={selectedReserve}
        />
      )}
      {/* Modal para cancelamento */}
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
