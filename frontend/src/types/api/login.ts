import { User } from "../users";
import { CustomerWithCode } from "./customer";
import { EmployeeWithCode } from "./employee";

// POST -> /login
// PERMISSION -> Nenhuma
// SUCCESS -> 200
// ERROR -> 401

export type LoginRequest = {
  login: string;
  senha: string;
};

export type LoginResponse = {
  access_token: string;
  token_type: "bearer";
  tipo: User;
  usuario: CustomerWithCode | EmployeeWithCode;
};

//------------------------------------------------------------------------

// POST -> /logout
// PERMISSION -> TODAS
// SUCCESS -> 200
// ERROR -> 401

export type LogoutRequest = {
  login: string;
};

export type LogoutResponse = {
  login: string;
};

//------------------------------------------------------------------------
