import { useQuery } from "@tanstack/react-query";
import { GetFlightRequest } from "../../types/api/flight";
import { getFlights } from "../../services/flights";

/**
 * Custom React hook to fetch flight data based on the provided parameters.
 *
 * Utilizes React Query's `useQuery` to manage the fetching, caching, and updating of flight data.
 * The query is enabled only if `params.data`, `params.origem`, and `params.destino` are truthy.
 *
 * @param params - The parameters for fetching flights, omitting the "voos" property from `GetFlightRequest`.
 * @returns The result of the `useQuery` hook, containing flight data and query state.
 */
export const useGetFlights = (params: Omit<GetFlightRequest, "voos">) =>
  useQuery<GetFlightRequest>({
    queryKey: ['flights', params],
    queryFn: () => getFlights(params).then(r => r.data),
    enabled: !!params.data && !!params.origem && !!params.destino,
  });
