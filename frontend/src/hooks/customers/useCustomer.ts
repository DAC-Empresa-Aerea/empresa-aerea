import { useQuery } from "@tanstack/react-query";
import { getCustomer } from "../../services/customers";
import { CustomerWithCode } from "../../types/api/customer";

export const useCustomer = (codigo: number, enabled = true) =>
  useQuery<CustomerWithCode>({
    queryKey: ["customer", codigo],
    queryFn: () => getCustomer(codigo).then((r) => r.data),
    enabled: enabled && !!codigo,
  });
