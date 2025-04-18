// loginService.ts
import axios from "axios";

const API_URL = "http://localhost:3001";

interface LoginPayload {
  login: string;
  senha: string;
}

export const loginService = async ({ login, senha }: LoginPayload) => {
  try {
    // Tentando acessar o funcionário primeiro
    const employeeResponse = await axios.get(`${API_URL}/Employee`, {
      params: {
        email: login,
        password: senha,
      },
    });

    if (employeeResponse.data.length > 0) {
      const usuario = employeeResponse.data[0];
      return { tipo: "FUNCIONARIO", usuario };
    }

    // Se não encontrou, tenta acessar o cliente
    const customerResponse = await axios.get(`${API_URL}/Customer`, {
      params: {
        email: login,
        senha: senha,
      },
    });

    if (customerResponse.data.length > 0) {
      const usuario = customerResponse.data[0];
      return { tipo: "CLIENTE", usuario };
    }

    // Se não encontrar nenhum, lança um erro
    throw new Error("Usuário ou senha inválidos.");
  } catch (error) {
    throw new Error("Erro na requisição de login.");
  }
};
