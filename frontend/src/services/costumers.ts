import { api } from "./api";
import {
  CreateCustomerRequest,
  CustomerWithCode,
} from "../types/api/customer";
import { GetReserveResponse } from "../types/api/reserve";
import { GetMilesHistoryResponse, UpdateMilesRequest, UpdateMilesResponse } from "../types/api/miles";

/** POST /clientes */
export const createCustomer = (body: CreateCustomerRequest) =>
  api.post<CustomerWithCode>("/clientes", body);

/** GET /clientes/{codigo} */
export const getCustomer = (id: number) =>
  api.get<CustomerWithCode>(`/clientes/${id}`);

/** GET /clientes/{codigo}/reservas */
export const getCustomerReserves = (id: number) =>
  api.get<GetReserveResponse>(`/clientes/${id}/reservas`);

/** PUT /clientes/{codigo}/milhas */
export const updateMiles = (id: number, body: UpdateMilesRequest) =>
  api.put<UpdateMilesResponse>(`/clientes/${id}/milhas`, body);

/** GET /clientes/{codigo}/milhas */
export const getMilesHistory = (id: number) =>
  api.get<GetMilesHistoryResponse>(`/clientes/${id}/milhas`);
