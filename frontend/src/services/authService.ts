/*
import { LoginRequest, LoginResponse } from "../types/api/login";
import { User } from "../types/users";

interface AddressData {
  cep: string;
  uf: string;
  cidade: string;
  bairro: string;
  rua: string;
  numero: string;
  complemento: string;
}

interface CustomerData {
  email: string;
  cpf: string;
  nome: string;
  [key: string]: string | number | boolean | undefined;
}

interface Customer {
  codigo: number;
  cpf: string;
  email: string;
  nome: string;
  saldo_milhas: number;
  senha?: string;
  endereco: AddressData;
  [key: string]: string | number | boolean | undefined | AddressData;
}

const API_URL = "http://localhost:3010";

const checkApiConnection = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/Customer?_limit=1`, {
      method: "GET", 
      cache: "no-cache",
    });
    return response.ok;
  } catch (error) {
    console.error("API connection check failed:", error);
    return false;
  }
};

export const login = async (
  credentials: LoginRequest
): Promise<LoginResponse> => {
  try {
    const isConnected = await checkApiConnection();
    if (!isConnected) {
      throw new Error(
        "Cannot connect to the API server."
      );
    }
    const customerResponse = await fetch(
      `${API_URL}/Customer?email=${encodeURIComponent(
        credentials.login
      )}&senha=${encodeURIComponent(credentials.senha)}`
    );

    if (!customerResponse.ok) {
      throw new Error(`Server error: ${customerResponse.status}`);
    }

    const contentType = customerResponse.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error(
        "Please check server configuration."
      );
    }

    const customers = await customerResponse.json();

    if (customers.length > 0) {
      const customer = customers[0];

      const token = btoa(`${customer.email}:${Date.now()}`);

      return {
        access_token: token,
        token_type: "bearer",
        tipo: User.CLIENTE,
        usuario: customer,
      };
    }

    const employeeResponse = await fetch(
      `${API_URL}/Employee?email=${encodeURIComponent(
        credentials.login
      )}&password=${encodeURIComponent(credentials.senha)}`
    );

    if (!employeeResponse.ok) {
      throw new Error(`Server error: ${employeeResponse.status}`);
    }

    const employees = await employeeResponse.json();

    if (employees.length > 0) {
      const employee = employees[0];

      const token = btoa(`${employee.email}:${Date.now()}`);

      return {
        access_token: token,
        token_type: "bearer",
        tipo: User.FUNCIONARIO,
        usuario: employee,
      };
    }

    throw new Error("Invalid credentials");
  } catch (error) {
    console.error("Login error:", error);
    throw new Error(error instanceof Error ? error.message : "Login failed");
  }
};

export const register = async (
  customerData: CustomerData
): Promise<Customer> => {
  try {
    const isConnected = await checkApiConnection();
    if (!isConnected) {
      console.log("API não está disponível, usando registro simulado");
      return mockRegister(customerData); 
    }

    let testResponse;
    try {
      testResponse = await fetch(`${API_URL}/Customer?_limit=1`);

      const contentType = testResponse.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const responseText = await testResponse.text();
        console.error(
          "Server returned non-JSON:",
          responseText.substring(0, 200)
        );
        throw new Error(
          "Check server configuration."
        );
      }
    } catch (networkError) {
      console.error("Network error:", networkError);
      throw new Error(
        `Cannot connect to JSON Server at ${API_URL}. Is it running?`
      );
    }

    if (!testResponse.ok) {
      throw new Error(
        `JSON Server error: ${testResponse.status} ${testResponse.statusText}`
      );
    }

    const emailCheckResponse = await fetch(
      `${API_URL}/Customer?email=${encodeURIComponent(customerData.email)}`
    );

    const existingUsers = await emailCheckResponse.json();
    if (existingUsers.length > 0) {
      throw new Error("A user with this email already exists");
    }

    const cpfCheckResponse = await fetch(
      `${API_URL}/Customer?cpf=${encodeURIComponent(customerData.cpf)}`
    );

    const existingCpf = await cpfCheckResponse.json();
    if (existingCpf.length > 0) {
      throw new Error("A user with this CPF already exists");
    }

    const customersResponse = await fetch(`${API_URL}/Customer`);
    const customers = await customersResponse.json();
    const maxCode = customers.reduce(
      (max: number, customer: Customer) => Math.max(max, customer.codigo || 0),
      1000
    );

    const tempPassword = Math.random().toString(36).slice(-8);

    const newCustomer = {
      codigo: maxCode + 1,
      cpf: customerData.cpf,
      email: customerData.email,
      nome: customerData.nome,
      senha: tempPassword, 
      saldo_milhas: 0,
      endereco: {
        cep: customerData["endereco.cep"] || "",
        uf: customerData["endereco.uf"] || "",
        cidade: customerData["endereco.cidade"] || "",
        bairro: customerData["endereco.bairro"] || "",
        rua: customerData["endereco.rua"] || "",
        numero: customerData["endereco.numero"] || "",
        complemento: customerData["endereco.complemento"] || "",
      },
    };

    console.log("Sending customer data:", JSON.stringify(newCustomer));

    const response = await fetch(`${API_URL}/Customer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCustomer),
    });

    if (!response.ok) {
      try {
        const errorText = await response.text();
        console.error("Registration server error:", errorText);
        throw new Error(
          `Registration failed: ${response.status} ${response.statusText}`
        );
      } catch (parseError) {
        throw new Error(
          `Registration failed: ${response.status} ${response.statusText}`
        );
      }
    }

    let result;
    try {
      result = await response.json();
    } catch (parseError) {
      console.error("Error", parseError);
    }

    console.log("Registration successful:", result);
    console.log(`Password for ${customerData.email}: ${tempPassword}`);

    return result;
  } catch (error) {
    console.error("Registration error:", error);
  }
};

const mockRegister = (customerData: CustomerData): Promise<Customer> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const tempPassword = Math.random().toString(36).slice(-8);

      const newCustomer = {
        codigo: 1001,
        cpf: customerData.cpf,
        email: customerData.email,
        nome: customerData.nome,
        senha: tempPassword,
        saldo_milhas: 0,
        endereco: {
          cep: customerData["endereco.cep"] || "",
          uf: customerData["endereco.uf"] || "",
          cidade: customerData["endereco.cidade"] || "",
          bairro: customerData["endereco.bairro"] || "",
          rua: customerData["endereco.rua"] || "",
          numero: customerData["endereco.numero"] || "",
          complemento: customerData["endereco.complemento"] || "",
        },
      };

      console.log("MOCK Registration successful:", newCustomer);
      console.log(`MOCK Password for ${customerData.email}: ${tempPassword}`);

      resolve(newCustomer as Customer);
    }, 500);
  });
};

export const logout = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("userType");
  localStorage.removeItem("userData");
};

*/