import { useQuery } from "@tanstack/react-query";
import { getCustomerReserves } from "../../services/costumers";
import { GetReserveResponse } from "../../types/api/reserve";

export const useCustomerReserves = (codigo: number, enabled = true) =>
  useQuery<GetReserveResponse>({
    queryKey: ["customerReserves", codigo],
    queryFn: () => getCustomerReserves(codigo).then((r) => r.data),
    enabled: enabled && !!codigo,
});