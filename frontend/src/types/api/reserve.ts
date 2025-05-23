import { FlightWithAirports } from "./flight";

export enum ReserveStatus {
  CRIADA = "CRIADA", 
  CONFIRMADO = "CONFIRMADO",
  CHECKIN = "CHECK-IN",
  EMBARCADO = "EMBARCADA",
}

export interface Reserve {
  codigo: string;
  data: number;
  valor: number;
  milhas_utilizadas: number;
  quantidade_poltronas: number;
  codigo_cliente: number;
  estado: ReserveStatus;
}

export interface ReserveWithFlight extends Reserve {
  voo: FlightWithAirports;
}

export interface ReserveWithCodes extends Reserve {
  codigo_voo: string;
  codigo_aeroporto_origem: string;
  codigo_aeroporto_destino: string;
}

//------------------------------------------------------------------------

// GET -> /clientes/{codigoCliente}/reservas
// PERMISSION -> CLIENTE
// SUCCESS -> 200
// ERROR -> 401, 403, 404

// NO REQUEST BODY

export type GetReserveResponse = Array<ReserveWithFlight>;

//------------------------------------------------------------------------

// GET -> /reservas/{codigoReserva}
// PERMISSION -> TODOS
// SUCCESS -> 200, 204
// ERROR -> 401, 403, 404

// NO REQUEST BODY

export type SearchReserveResponse = ReserveWithFlight;

//------------------------------------------------------------------------

// POST -> /reservas
// PERMISSION -> CLIENTE
// SUCCESS -> 201
// ERROR -> 401, 403, 409, 400

export type CreateReserveRequest = {
  codigo_cliente: number;
  valor: number;
  milhas_utilizadas: number;
  quantidade_poltronas: number;
  codigo_voo: string;
  codigo_aeroporto_origem: string;
  codigo_aeroporto_destino: string;
};

export type CreateReserveResponse = ReserveWithCodes;

//------------------------------------------------------------------------

// DELETE -> /reservas/{codigoReserva}
// PERMISSION -> CLIENTE
// SUCCESS -> 200
// ERROR -> 401, 403, 404

// NO REQUEST BODY

export type DeleteReserveResponse = ReserveWithCodes;

//------------------------------------------------------------------------

// PATCH -> /reservas/{codigoReserva}/estado
// PERMISSION -> CLIENTE
// SUCCESS -> 200
// ERROR -> 401, 403, 404

export type UpdateToCheckInReserveRequest = {
  estado: ReserveStatus.CHECKIN;
};

export type UpdateToCheckInReserveResponse = ReserveWithCodes;

//------------------------------------------------------------------------

// PATCH -> /reservas/{codigoReserva}/estado
// PERMISSION -> FUNCIONARIO
// SUCCESS -> 200
// ERROR -> 401, 403, 404

export type UpdateToEmbarkedReserveRequest = {
  estado: ReserveStatus.EMBARCADO;
};

export type UpdateToEmbarkedReserveResponse = ReserveWithCodes;

// ------------------------------------------------------------------------
