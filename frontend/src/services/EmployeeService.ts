// src/services/EmployeeService.ts
import Employee from "../types/Employee";

const API_URL = "http://localhost:3001/Employee";

const getAll = async (): Promise<Employee[]> => {
  const response = await fetch(API_URL);
  return response.json();
};

const getByCodigo = async (codigo: number): Promise<Employee> => {
  const response = await fetch(`${API_URL}?codigo=${codigo}`);
  const data = await response.json();
  if (!data.length) throw new Error("Funcionário não encontrado");
  return data[0];
};

const create = async (employee: Employee): Promise<Employee> => {
    const novoCodigo = employee.codigo ?? Math.floor(100000 + Math.random() * 900000); // 6 dígitos
  
    const gerarSenha = (): string => {
      const letras = "abcdefghijklmnopqrstuvwxyz";
      const numeros = "0123456789";
      let senha = "";
      for (let i = 0; i < 3; i++) {
        senha += letras.charAt(Math.floor(Math.random() * letras.length));
      }
      for (let i = 0; i < 3; i++) {
        senha += numeros.charAt(Math.floor(Math.random() * numeros.length));
      }
      return senha;
    };
  
    const novaSenha = gerarSenha();
  
    const employeeComDefaults = {
      ...employee,
      codigo: novoCodigo,
      senha: novaSenha,
    };
  
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(employeeComDefaults),
    });
  
    return response.json();
  };

const update = async (id: number, employee: Employee): Promise<Employee> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(employee),
  });
  return response.json();
};

const remove = async (id: number): Promise<void> => {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
};

export default { getAll, getByCodigo, create, update, remove };
