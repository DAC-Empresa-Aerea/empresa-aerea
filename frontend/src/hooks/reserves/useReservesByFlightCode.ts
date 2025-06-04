import { useQuery } from "@tanstack/react-query";
import { getReservesByFlightCode } from "../../services/reserveService";

/**
 * Custom React hook to fetch reserves by flight code using React Query.
 *
 * @param flightCode - The flight code to fetch reserves for
 * @param enabled - Optional flag to enable or disable the query. Defaults to true.
 * @returns The result of the React Query for reserves by flight code
 */
export const useReservesByFlightCode = (flightCode: string, enabled = true) => {
  return useQuery({
    queryKey: ["reserves", "by-flight", flightCode],
    queryFn: () => getReservesByFlightCode(flightCode),
    enabled: enabled && !!flightCode,
    refetchOnWindowFocus: false,
    retry: false,
  });
};
