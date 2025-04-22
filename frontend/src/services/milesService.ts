import axios from "axios";
import { MilesTransactionType, MilesTransaction } from "../types/Miles";

const API_URL = "http://localhost:3001";

export const updateCustomerMiles = async (codigo_cliente: number, milhas: number) => {
  const customer = await axios.get(`${API_URL}/Customer/?codigo=${codigo_cliente}`);
  const clienteAtual = customer.data[0];

  const novoSaldo = clienteAtual.saldo_milhas + milhas;

  await axios.patch(`${API_URL}/Customer/${clienteAtual.id}`, {
    saldo_milhas: novoSaldo,
  });

  return novoSaldo;
};

export const createMilesTransaction = async ({
  codigo_cliente,
  valor_reais,
  quantidade_milhas,
  descricao,
}: Omit<MilesTransaction, "data" | "codigo_reserva" | "tipo">) => {
  const novaTransacao: MilesTransaction = {
    codigo_cliente,
    data: new Date().toISOString(),
    valor_reais,
    quantidade_milhas,
    descricao,
    codigo_reserva: "",
    tipo: MilesTransactionType.ENTRADA,
  };

  const response = await axios.post(`${API_URL}/Miles`, novaTransacao);
  return response.data;
};
