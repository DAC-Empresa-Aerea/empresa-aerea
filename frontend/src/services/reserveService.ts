import axios from "axios";
import Reserve from "../types/Reserve";

const API_BASE_URL = "http://localhost:3001";

export const createReserve = async (reserva: Reserve) => {
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
    try {
        const reserva = await getReserveByCode(code);
        if (!reserva || !reserva.id) throw new Error("Reserva não encontrada");
        const response = await axios.patch(`${API_BASE_URL}/Reserve/${reserva.id}`, reserveUpdate);
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar a reserva:', error);
        throw error;
    }
};