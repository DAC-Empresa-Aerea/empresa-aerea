import { useQuery } from "@tanstack/react-query";
import { getAirports } from "../services/airports";

export const useAirports = () =>
  useQuery({
    queryKey: ['airports'],
    queryFn: getAirports,
    staleTime: 1_000 * 60 * 5,
    refetchOnWindowFocus: false,
    retry: false,
});
