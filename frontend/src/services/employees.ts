import { api } from "./api";
import {
  CreateEmployeeRequest,
  EmployeeWithCode,
  UpdateEmployeeRequest,
  DeleteEmployeeResponse,
  GetEmployeeResponse,
} from "../types/api/employee";

/** GET /funcionarios */
export const getEmployees = () =>
  api.get<GetEmployeeResponse>("/funcionarios");

/** POST /funcionarios */
export const createEmployee = (body: CreateEmployeeRequest) =>
  api.post<EmployeeWithCode>("/funcionarios", body);

/** PUT /funcionarios/{codigo} */
export const updateEmployee = (codigo: number, body: UpdateEmployeeRequest) =>
  api.put<EmployeeWithCode>(`/funcionarios/${codigo}`, body);

/** DELETE /funcionarios/{codigo} */
export const deleteEmployee = (codigo: number) =>
  api.delete<DeleteEmployeeResponse>(`/funcionarios/${codigo}`);
