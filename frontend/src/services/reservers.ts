import { api } from "./api";
import {
  SearchReserveResponse,
  CreateReserveRequest,
  CreateReserveResponse,
  DeleteReserveResponse,
  UpdateToCheckInReserveRequest,
  UpdateToCheckInReserveResponse,
  UpdateToEmbarkedReserveRequest,
  UpdateToEmbarkedReserveResponse,
} from "../types/api/reserve";

/** GET /reservas/{codigoReserva} */
export const getReserve = (codigo: number) =>
  api.get<SearchReserveResponse>(`/reservas/${codigo}`);

/** POST /reservas */
export const createReserve = (body: CreateReserveRequest) =>
  api.post<CreateReserveResponse>("/reservas", body);

/** DELETE /reservas/{codigoReserva} */
export const deleteReserve = (codigo: number) =>
  api.delete<DeleteReserveResponse>(`/reservas/${codigo}`);

/** PATCH /reservas/{codigo}/estado  → CHECK-IN */
export const setReserveCheckIn = (
  codigo: number,
  body: UpdateToCheckInReserveRequest
) => api.patch<UpdateToCheckInReserveResponse>(`/reservas/${codigo}/estado`, body);

/** PATCH /reservas/{codigo}/estado  → EMBARCADO */
export const setReserveEmbarked = (
  codigo: number,
  body: UpdateToEmbarkedReserveRequest
) =>
  api.patch<UpdateToEmbarkedReserveResponse>(
    `/reservas/${codigo}/estado`,
    body
  );
