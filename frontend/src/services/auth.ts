import { api } from "./api";
import {
  LoginRequest,
  LoginResponse,
  LogoutRequest,
  LogoutResponse,
} from "../types/api/login";

export const login = (body: LoginRequest) =>
  api.post<LoginResponse>("/login", body);

export const logout = (body: LogoutRequest) =>
  api.post<LogoutResponse>("/logout", body);
