export interface Employee {
  cpf: string;
  email: string;
  nome: string;
  telefone: string;
}

export interface EmployeeWithCode extends Employee {
  codigo: number;
}

export interface EmployeeWithPassword extends Employee {
  senha: string;
}

export interface EmployeeWithCodeAndPassword
  extends EmployeeWithCode,
    EmployeeWithPassword {}

//------------------------------------------------------------------------

// GET -> /funcionarios
// PERMISSION -> FUNCIONARIO
// SUCCESS -> 200
// ERROR -> 401, 403, 404

// WHITOUT REQUEST BODY

export type GetEmployeeResponse = Array<EmployeeWithCode>;

//------------------------------------------------------------------------

// POST -> /funcionarios
// PERMISSION -> FUNCIONARIO
// SUCCESS -> 201
// ERROR -> 401, 403, 409

export type CreateEmployeeRequest = EmployeeWithPassword;

export type CreateEmployeeResponse = EmployeeWithCode;

//------------------------------------------------------------------------

// PUT -> /funcionarios/{codigo}
// PERMISSION -> FUNCIONARIO
// SUCCESS -> 200
// ERROR -> 401, 403, 404

export type UpdateEmployeeRequest = EmployeeWithCodeAndPassword;

export type UpdateEmployeeResponse = EmployeeWithCode;

//------------------------------------------------------------------------

// DELETE -> /funcionarios/{codigo}
// PERMISSION -> FUNCIONARIO
// SUCCESS -> 200
// ERROR -> 401, 403, 404

// WHITOUT REQUEST BODY

export type DeleteEmployeeResponse = EmployeeWithCode;

//------------------------------------------------------------------------
