import axios from "axios";
import Reserve from "../types/Reserve";
import { updateCustomerMiles } from "./milesService";
import { createMilesTransaction } from "./milesService";
import { MilesTransactionType } from "../types/Miles";

const API_BASE_URL = "http://localhost:3001";



export const createReserve = async (reserva: Reserve) => {

    if (reserva.milhas_utilizadas > 0) {
        const response_update_miles = await updateCustomerMiles(reserva.codigo_cliente, -reserva.milhas_utilizadas);

        const newTransaction = await createMilesTransaction({
            codigo_cliente: reserva.codigo_cliente.toString(),
            valor_reais: reserva.valor,
            quantidade_milhas: reserva.milhas_utilizadas,
            descricao: `${reserva.voo.aeroporto_origem.codigo}->${reserva.voo.aeroporto_destino.codigo}`,
            codigo_reserva: reserva.codigo,
            tipo: MilesTransactionType.SAIDA,
        });
    }

    const response = await axios.post(`${API_BASE_URL}/Reserve`, reserva);
    return response.data;
};

export const getReservesByCustomerCode = async (customerCode: string) => {
    const response = await axios.get(`${API_BASE_URL}/Reserve?codigo_cliente=${customerCode}`);
    return response.data;
};

const getReserveByCode = async (code: string) => {
    const response = await axios.get(`http://localhost:3001/Reserve?codigo=${code}`);
    return response.data[0];
};

export const UpdateReserve = async (code: string, reserveUpdate: Partial<Reserve>) => {
    console.log("Updating reserve with code:", code, "and update data:", reserveUpdate);
    try {
        const reserva = await getReserveByCode(code);
        if (!reserva || !reserva.id) throw new Error("Reserva não encontrada");
        const response = await axios.patch(`${API_BASE_URL}/Reserve/${reserva.id}`, reserveUpdate);
        if (reserveUpdate.estado === "CANCELADA") {
            const response_update_miles = await updateCustomerMiles(reserva.codigo_cliente, reserva.milhas_utilizadas);
            const newTransaction = await createMilesTransaction({
                codigo_cliente: reserva.codigo_cliente.toString(),
                valor_reais: reserva.valor,
                quantidade_milhas: reserva.milhas_utilizadas,
                descricao: `Reserva ${reserva.codigo} cancelada`,
                codigo_reserva: reserva.codigo,
                tipo: MilesTransactionType.ENTRADA,
            });
        }
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar a reserva:', error, code);
        throw error;
    }
};

export const getReservesByFlightCode = async (flightCode: string) => {
    const response = await axios.get(`${API_BASE_URL}/Reserve?codigo_voo=${flightCode}`);
    return response.data;
};