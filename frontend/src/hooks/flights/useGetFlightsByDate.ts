import { useQuery } from "@tanstack/react-query";
import { getFlightsByDate } from "../../services/flights";

/**
 * Custom React hook to fetch flights within a specified date range.
 *
 * @param data - The start date for the flight search (in string format).
 * @param dataFim - The end date for the flight search (in string format).
 * @param enabled - Optional flag to enable or disable the query. Defaults to true.
 * @returns The result of the `useQuery` hook containing the fetched flights data.
 */
export const useGetFlightsByDate = (data: string, dataFim: string, enabled = true) =>
    useQuery({
        queryKey: ['flights', data, dataFim],
        queryFn: () => getFlightsByDate({ data, "data-fim": dataFim }).then(r => r.data),
        enabled: enabled && !!data && !!dataFim,
    });