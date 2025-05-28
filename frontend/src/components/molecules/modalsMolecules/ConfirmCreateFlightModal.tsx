import { FaTimes } from "react-icons/fa";
import Flight from "../../../types/Flight";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCreateFlight } from "../../../hooks/flights/useCreateFlight";

interface ConfirmCreateFlightModalProps {
  flight: Flight;
  isOpen: boolean;
  onClose: () => void;
}

function ConfirmCreateFlightModal({ flight, isOpen, onClose }: ConfirmCreateFlightModalProps) {
  const navigate = useNavigate();
  const [status, setStatus] = useState<"loading" | "success" | "error" | null>(null);

  const { mutateAsync: createFlight } = useCreateFlight();

  if (!isOpen) return null;



  const handleCreateFlight = async () => {
    setStatus("loading");
    try {
      await createFlight({
        ...flight,
        data: new Date(flight.data).toISOString(),
        codigo_aeroporto_origem: flight.aeroporto_origem.codigo,
        codigo_aeroporto_destino: flight.aeroporto_destino.codigo,
      });
      setStatus("success");
      setTimeout(() => {
        navigate("/employee/home");
        onClose();
      }, 1000);
    } catch (error) {
      setStatus("error");
    }
  };

  const renderModalContent = () => {
    if (status === "loading") {
      return (
        <div>
          <p>Estamos criando seu voo...</p>
        </div>
      );
    }

    if (status === "success") {
      return (
        <div>
          <p>Sucesso! O voo foi criado com sucesso.</p>
        </div>
      );
    }

    if (status === "error") {
      return (
        <div>
          <p>Erro ao criar voo. Tente novamente.</p>
        </div>
      );
    }

    return (
      <div>
        <p><strong>Código do Voo:</strong> {flight.codigo}</p>
        <p><strong>Data:</strong> {new Date(flight.data).toLocaleString()}</p>
        <p><strong>Status:</strong> {flight.estado}</p>
        <p><strong>Valor da Passagem:</strong> {flight.valor_passagem}</p>
        <p><strong>Quantidade de Poltronas:</strong> {flight.quantidade_poltronas_total}</p>
        <p><strong>Aeroporto de Origem:</strong> {flight.aeroporto_origem.nome}</p>
        <p><strong>Aeroporto de Destino:</strong> {flight.aeroporto_destino.nome}</p>
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md w-full hover:bg-blue-700"
          onClick={handleCreateFlight}
        >
          Confirmar Criação
        </button>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-30 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative border border-gray-300">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          <FaTimes size={24} />
        </button>

        <h2 className="text-xl font-bold mb-4">Confirmar Criação do Voo</h2>
        {renderModalContent()}

        {status !== "loading" && status !== "success" && (
          <button
            className="mt-4 px-4 py-2 bg-gray-400 text-white rounded-md w-full hover:bg-gray-500"
            onClick={onClose}
          >
            Cancelar
          </button>
        )}
      </div>
    </div>
  );
}

export default ConfirmCreateFlightModal;
