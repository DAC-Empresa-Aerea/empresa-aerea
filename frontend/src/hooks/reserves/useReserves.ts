import { useQuery } from "@tanstack/react-query"
import { getReserve } from "../../services/reservers"
import { SearchReserveResponse } from "../../types/api/reserve"

export const useReserves = (codigo: string) => {
    return useQuery<SearchReserveResponse>({
        queryKey: ["reserves"],
        queryFn: () => getReserve(codigo).then((r) => r.data),
        refetchOnWindowFocus: false,
        retry: false,
    })
}