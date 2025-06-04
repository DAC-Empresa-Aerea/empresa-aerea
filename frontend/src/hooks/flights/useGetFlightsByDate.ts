import { useQuery } from "@tanstack/react-query";
import { getFlightsByDate } from "../../services/flights";
import { GetFlightByDateResponse } from "../../types/api/flight";

export const useGetFlightsByDate = (
  data: string,
  dataFim: string,
  enabled = true
) =>
  useQuery<GetFlightByDateResponse>({
    queryKey: ["flights", data, dataFim],
    queryFn: () =>
      getFlightsByDate({ data, "data-fim": dataFim }).then((r) => r.data),
    enabled: enabled && Boolean(data) && Boolean(dataFim),
});
