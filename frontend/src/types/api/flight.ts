export enum FlightStatus {
  CONFIRMADO = "CONFIRMADO",
  CANCELADO = "CANCELADO",
  REALIZADO = "REALIZADO",
}

export interface Airport {
  codigo: string;
  nome: string;
  cidade: string;
  uf: string;
}

interface BaseFlight {
  data: string;
  valor_passagem: number;
  quantidade_poltronas_total: number;
  quantidade_poltronas_ocupadas: number;
}

export interface Flight extends BaseFlight {
  estado: FlightStatus;
}

export interface FlightWithCode extends Flight {
  codigo: string;
}

export interface FlightWithAirports extends FlightWithCode {
  aeroporto_origem: Airport;
  aeroporto_destino: Airport;
}

export interface FlightWithAirportCodes extends FlightWithCode {
  codigo_aeroporto_origem: string;
  codigo_aeroporto_destino: string;
}

export interface FlightToCreate extends BaseFlight {
  codigo_aeroporto_origem: string;
  codigo_aeroporto_destino: string;
}

//------------------------------------------------------------------------

// GET -> /voos?data=2025-06-22&origem=CWB&destino=GRU
// PERMISSION -> TODOS
// SUCCESS -> 200
// ERROR -> NENHUM (mas recomendo listar nenhum)

// NO REQUEST BODY

export type GetFlightRequest = {
  data: string;
  origem: string;
  destino: string;
  voos: Array<FlightWithAirports>;
};

//------------------------------------------------------------------------

// GET -> /voos?data=2025-06-22&data-fim=2025-06-23
// PERMISSION -> TODOS
// SUCCESS -> 200
// ERROR -> 401, 403, 404

// NO REQUEST BODY

export type GetFlightByDateResponse = {
  inicio: string;
  fim: string;
  voos: Array<FlightWithAirports>
};

//------------------------------------------------------------------------

// PATCH -> /voos/{codigoVoo}/estado
// PERMISSION -> FUNCIONARIO
// SUCCESS -> 200
// ERROR -> 401, 403, 404

export type UpdateFlightStatusRequest = {
  estado: FlightStatus.REALIZADO | FlightStatus.CANCELADO;
};

export type UpdateFlightStatusResponse = FlightWithAirportCodes;

//------------------------------------------------------------------------

// POST -> /voos
// PERMISSION -> FUNCIONARIO
// SUCCESS -> 201
// ERROR -> 401, 403, 409

export type CreateFlightRequest = FlightToCreate;

export type CreateFlightResponse = FlightWithAirportCodes;

//------------------------------------------------------------------------

// GET -> /aeroportos
// PERMISSION -> FUNCIONARIO
// SUCCESS -> 200, 204
// ERROR -> 401, 403, 404

// NO REQUEST BODY

export type GetAirportsResponse = Array<Airport>;

//------------------------------------------------------------------------

// Get -> /voos/{codigoVoo}
// PERMISSION -> TODOS
// SUCCESS -> 200
// ERROR -> 404

// NO REQUEST BODY

export type GetFlightByCodeResponse = FlightWithAirports;

//------------------------------------------------------------------------
