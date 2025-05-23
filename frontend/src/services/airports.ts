import { api } from "./api";
import { GetAirportsResponse } from "../types/api/flight";

/** GET /aeroportos */
export const getAirports = () =>
  api.get<GetAirportsResponse>("/aeroportos");
