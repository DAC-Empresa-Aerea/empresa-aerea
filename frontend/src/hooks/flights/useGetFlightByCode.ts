import { useQuery } from "@tanstack/react-query";
import { getFlightByCode } from "../../services/flights";

/**
 * Custom React hook to fetch flight details by flight code using React Query.
 *
 * @param codigo - The unique code identifying the flight to fetch.
 * @param enabled - Optional flag to enable or disable the query. Defaults to true.
 * @returns The result of the React Query for the specified flight, including status and data.
 */
export const useGetFlightByCode = (codigo: string, enabled = true) =>
  useQuery({
    queryKey: ['flight', codigo],
    queryFn: () => getFlightByCode(codigo).then(r => r.data),
    enabled: enabled && !!codigo,
  });