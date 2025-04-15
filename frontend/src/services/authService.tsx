import { LoginRequest, LoginResponse } from '../types/api/login';
import { User } from '../types/users';

interface CustomerData {
  email: string;
  cpf: string;
  nome: string;
  [key: string]: string | number | boolean | undefined; 
}

interface Customer extends CustomerData {
  codigo: number;
  saldo_milhas: number;
}

const API_URL = 'http://localhost:3000'; 


export const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
  try {
    // Check if user exists in Customer collection
    const customerResponse = await fetch(
      `${API_URL}/Customer?email=${credentials.login}&cpf=${credentials.senha}`
    );
    const customers = await customerResponse.json();
    
    if (customers.length > 0) {
      const customer = customers[0];
      
      const token = btoa(`${customer.email}:${Date.now()}`);
      
      return {
        access_token: token,
        token_type: "bearer",
        tipo: User.CLIENTE,
        usuario: customer
      };
    }
    
    const employeeResponse = await fetch(
      `${API_URL}/Employee?email=${credentials.login}&password=${credentials.senha}`
    );
    const employees = await employeeResponse.json();
    
    if (employees.length > 0) {
      const employee = employees[0];
      
      const token = btoa(`${employee.email}:${Date.now()}`);
      
      return {
        access_token: token,
        token_type: "bearer",
        tipo: User.FUNCIONARIO,
        usuario: employee
      };
    }
    
    throw new Error('Login failed');
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const register = async (customerData: CustomerData): Promise<Customer> => {
  try {
    const customersResponse = await fetch(`${API_URL}/Customer`);
    const customers = await customersResponse.json();
    const maxCode = customers.reduce(
      (max: number, customer: Customer) => Math.max(max, customer.codigo || 0),
      1000
    );
    
    const newCustomer = {
      ...customerData,
      codigo: maxCode + 1,
      saldo_milhas: 0, 
    };
    
    const response = await fetch(`${API_URL}/Customer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newCustomer),
    });
    
    if (!response.ok) {
      throw new Error('Registration failed');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};
export const logout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('userType');
  localStorage.removeItem('userData');
};