import axios from "axios";
import Reserve from "../types/Reserve";

const API_BASE_URL = "http://localhost:3001";

export const createReserve = async (reserva: Reserve) => {
    const response = await axios.post(`${API_BASE_URL}/Reserve`, reserva);
    return response.data;
};

export const getReservesByCustomerCode = async (codigo_cliente: string) => {
    const response = await axios.get(`${API_BASE_URL}/Reserve?codigo_cliente=${codigo_cliente}`);
    return response.data;
};