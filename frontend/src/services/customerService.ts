import axios from "axios";
import Customer from "../types/Customer";

const API_BASE_URL = "http://localhost:3001";

// ===== FUNCS =====
const generate4DigitCode = (): number => {
    return Math.floor(1000 + Math.random() * 9000);
};

const generatePassword = (): string => {
    return String(Math.floor(1000 + Math.random() * 9000));
};

// ===== CUSTOMER =====
export const registerCustomer = async (rawData: {
    cpf: string;
    email: string;
    nome: string;
    endereco: {
        cep: string;
        uf: string;
        cidade: string;
        bairro?: string;
        rua: string;
        numero: string;
        complemento: string;
    };
}) => {
    const customer: Omit<Customer, "codigo" | "saldoMilhas"> & {
        codigo: number;
        saldoMilhas: number;
        senha: string; // <-- Adicionado apenas para envio ao json-server
    } = {
        codigo: generate4DigitCode(),
        cpf: rawData.cpf.replace(/\D/g, ""),
        email: rawData.email,
        nome: rawData.nome.trim(),
        senha: generatePassword(), // só vai pro json-server
        saldoMilhas: 0,
        endereco: {
            cep: rawData.endereco.cep.replace("-", "").trim(),
            uf: rawData.endereco.uf.trim(),
            cidade: rawData.endereco.cidade.trim(),
            bairro: rawData.endereco.bairro?.trim() || "",
            rua: rawData.endereco.rua.trim(),
            numero: rawData.endereco.numero.trim(),
            complemento: rawData.endereco.complemento.trim(),
        }
    };

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