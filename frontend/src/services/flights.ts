import { api } from "./api";
import {
  GetFlightRequest,
  GetFlightByDateResponse,
  FlightWithAirports,
  CreateFlightRequest,
  FlightWithAirportCodes,
  UpdateFlightStatusRequest,
} from "../types/api/flight";

/** GET /voos?data&origem&destino */
export const getFlights = (params: Omit<GetFlightRequest, "voos">) =>
  api.get<GetFlightRequest>("/voos", { params });

/** GET /voos?data&data-fim */
export const getFlightsByDate = (params: {
  data: string;
  "data-fim": string;
}) => api.get<GetFlightByDateResponse>("/voos", { params });

/** GET /voos/{codigoVoo} */
export const getFlightByCode = (codigo: string) =>
  api.get<FlightWithAirports>(`/voos/${codigo}`);

/** POST /voos */
export const createFlight = (body: CreateFlightRequest) =>
  api.post<FlightWithAirportCodes>("/voos", body);

/** PATCH /voos/{codigoVoo}/estado */
export const updateFlightStatus = (
  codigo: string,
  body: UpdateFlightStatusRequest
) => api.patch<FlightWithAirportCodes>(`/voos/${codigo}/estado`, body);
