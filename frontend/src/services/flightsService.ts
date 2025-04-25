import axios from "axios";

const API_BASE_URL = "http://localhost:3001/Flights";

export const getFlights = async () => {
    const response = await axios.get(`${API_BASE_URL}`);
    return response.data;
};

export async function createFlight(newFlight: any) {
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

export async function updateFlight(id: number, updatedFlight: any) {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedFlight),
  });

  if (!response.ok) {
    throw new Error("Erro ao atualizar voo.");
  }
  return response.json();
}