import axios from "axios";
import Flight from "../types/Flight";

const API_BASE_URL = "http://localhost:3001/Flights";

export const getFlights = async () => {
    const response = await axios.get(`${API_BASE_URL}`);
    return response.data;
};

export async function createFlight(newFlight: Flight) {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newFlight),
  });

  if (!response.ok) {
    throw new Error("Erro ao criar voo.");
  }
  return response.json();
}

export async function updateFlight(code: string, updatedFlight: any) {
  const response_flight = await axios.get(`http://localhost:3001/Flights?codigo=${code}`);
  const flight = response_flight.data[0];
  
  const response = await fetch(`${API_BASE_URL}/${flight.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedFlight),
  });

  if (!response.ok) {
    throw new Error("Erro ao atualizar voo.");
  }
  return response.json();
}