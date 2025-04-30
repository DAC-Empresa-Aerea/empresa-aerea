import axios from "axios";
import Customer from "../types/Customer";
import Reserve from "../types/Reserve";
import Flight from "../types/Flight";

const API_BASE_URL = "http://localhost:3000";

// ===== CUSTOMER =====
export const registerCustomer = async (customer: Customer) => {
    const response = await axios.post(`${API_BASE_URL}/Customer`, customer);
    return response.data;
};

export const getCustomers = async () => {
    const response = await axios.get(`${API_BASE_URL}/Customer`);
    return response.data;
};

export const getCustomerByCpf = async (cpf: string) => {
    const response = await axios.get(`${API_BASE_URL}/Customer?cpf=${cpf}`);
    return response.data[0];
};

// ===== EMPLOYEE =====
export const getEmployees = async () => {
    const response = await axios.get(`${API_BASE_URL}/Employee`);
    return response.data;
};

export const getEmployeeByEmail = async (email: string) => {
    const response = await axios.get(`${API_BASE_URL}/Employee?email=${email}`);
    return response.data[0];
};

// ===== AIRPORTS =====
export const getAirports = async () => {
    const response = await axios.get(`${API_BASE_URL}/Airports`);
    return response.data;
};

export const getAirportByCode = async (codigo: string) => {
    const response = await axios.get(`${API_BASE_URL}/Airports?codigo=${codigo}`);
    return response.data[0];
};

// ===== FLIGHTS =====
export const getAllFlights = async () => {
    const response = await axios.get(`${API_BASE_URL}/Flights`);
    return response.data;
};

// Retorna apenas os voos futuros disponíveis
export const getAvailableFlights = async (): Promise<Flight[]> => {
    const allFlights = await getAllFlights();
    return allFlights.filter((flight: Flight) => flight.estado === "CONFIRMADO");
};


// ===== RESERVAS =====
export const createReserve = async (reserva: Reserve) => {
    const response = await axios.post(`${API_BASE_URL}/Reserve`, reserva);
    return response.data;
};

export const getReservesByCustomerCode = async (codigo_cliente: string) => {
    const response = await axios.get(`${API_BASE_URL}/Reserve?codigo_cliente=${codigo_cliente}`);
    return response.data;
};
