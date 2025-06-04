import { useQuery } from "@tanstack/react-query";
import { GetFlightRequest } from "../../types/api/flight";
import { getFlights } from "../../services/flights";


export const useGetFlights = (params: Omit<GetFlightRequest, "voos">) =>
  useQuery<GetFlightRequest>({
    queryKey: ['flights', params],
    queryFn: () => getFlights(params).then(r => r.data),
    enabled: !!params.data && !!params.origem && !!params.destino,
});
