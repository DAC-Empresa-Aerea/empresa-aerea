// Colocar os campos como componente e ajustar seu estilo - adicionar nas rotas

import { useState } from "react";
import { Reserve } from "../components/atoms/TableItem";
import CancelReservation from "../components/molecules/modalsMolecules/CancelReservation";

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
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Consultar Reserva</h1>
      <input
        type="text"
        placeholder="Digite o código da reserva"
        value={codigoReserva}
        onChange={(e) => setCodigoReserva(e.target.value)}
        className="border p-2 w-full mb-4 rounded"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        Buscar Reserva
      </button>

      {selectedReserve && (
        <div className="mt-6 border p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-2">Detalhes da Reserva</h2>
          <p><strong>Código:</strong> {selectedReserve.codigo}</p>
          <p><strong>Data:</strong> {selectedReserve.data.toLocaleString()}</p>
          <p><strong>Valor:</strong> R$ {selectedReserve.valor.toFixed(2)}</p>
          <p><strong>Milhas Utilizadas:</strong> {selectedReserve.milhas_utilizadas.toString()}</p>
          <p><strong>Poltronas:</strong> {selectedReserve.quantidade_poltronas.toString()}</p>
          <p><strong>Status:</strong> {selectedReserve.estado}</p>

          <h3 className="text-lg font-bold mt-4">Dados do Voo</h3>
          <p><strong>Código do Voo:</strong> {selectedReserve.voo.codigo}</p>
          <p><strong>Data do Voo:</strong> {selectedReserve.voo.data.toLocaleString()}</p>
          <p><strong>Valor da Passagem:</strong> R$ {selectedReserve.voo.valor_passagem.toFixed(2)}</p>

          <h3 className="text-lg font-bold mt-4">Aeroporto de Origem</h3>
          <p><strong>Nome:</strong> {selectedReserve.voo.aeroporto_origem.nome}</p>
          <p><strong>Cidade:</strong> {selectedReserve.voo.aeroporto_origem.cidade}</p>
          <p><strong>UF:</strong> {selectedReserve.voo.aeroporto_origem.uf}</p>

          <h3 className="text-lg font-bold mt-4">Aeroporto de Destino</h3>
          <p><strong>Nome:</strong> {selectedReserve.voo.aeroporto_destino.nome}</p>
          <p><strong>Cidade:</strong> {selectedReserve.voo.aeroporto_destino.cidade}</p>
          <p><strong>UF:</strong> {selectedReserve.voo.aeroporto_destino.uf}</p>

          {selectedReserve && (selectedReserve.estado === 'CRIADA' || selectedReserve.estado === 'CHECK-IN') && (
          <div className="gap-4 mt-4">
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
        />
      )}
    </div>
  );
};

export default ConsultarReserva;
