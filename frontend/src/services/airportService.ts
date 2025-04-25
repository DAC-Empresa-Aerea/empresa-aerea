import axios from "axios";

const API_BASE_URL = "http://localhost:3001/Airports";

export const getAirports = async () => {
    const response = await axios.get(`${API_BASE_URL}`);
    return response.data;
};