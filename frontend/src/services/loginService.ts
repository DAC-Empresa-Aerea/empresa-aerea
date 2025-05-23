// loginService.ts
import axios from "axios";
import CustomerRoutes from "../routes/CustomerRoutes"; // Ajuste o caminho conforme necessário

const API_URL = "http://localhost:3010";

interface LoginPayload {
  login: string;
  senha: string;
}

export const loginService = async ({ login, senha }: LoginPayload) => {
  console.log("Rotas carregadas:", CustomerRoutes);
  try {
    // Buscar funcionário
    const employeeResponse = await axios.get(`${API_URL}/Employee`, {
      params: {
        email: login,
        password: senha,
      },
    });

    if (employeeResponse.data.length > 0) {
      const usuario = employeeResponse.data[0];
      // Simular token
      const access_token = btoa(`${usuario.email}:${Date.now()}`);
      return {
        tipo: "FUNCIONARIO",
        usuario,
        access_token,
        token_type: "bearer" as const,
      };
    }

    // Buscar cliente
    const customerResponse = await axios.get(`${API_URL}/Customer`, {
      params: {
        email: login,
        senha: senha,
      },
    });

    if (customerResponse.data.length > 0) {
      const usuario = customerResponse.data[0];
      // Simular token
      const access_token = btoa(`${usuario.email}:${Date.now()}`);
      return {
        tipo: "CLIENTE",
        usuario,
        access_token,
        token_type: "bearer" as const,
      };
    }

    throw new Error("Usuário ou senha inválidos.");
  } catch {
    throw new Error("Erro na requisição de login.");
  }
};
