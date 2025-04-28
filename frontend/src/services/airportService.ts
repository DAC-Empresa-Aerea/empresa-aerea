import axios from "axios";

const API_BASE_URL = "http://localhost:3001/Airports";

export const getAirports = async () => {
    const response = await axios.get(`${API_BASE_URL}`);
    return response.data;
};

export const getAirportByCode = async (codigo: string) => {
    const response = await axios.get(`${API_BASE_URL}?codigo=${codigo}`);
    if (response.data.length > 0) {
        return response.data[0];
    } else {
        throw new Error(`Aeroporto com código ${codigo} não encontrado`);
    }
};