import { useQuery } from "@tanstack/react-query";
import { getEmployees } from "../../services/employees";
import { GetEmployeeResponse } from "../../types/api/employee";

// Hook para buscar todos os funcionários
export const useEmployees = () =>
  useQuery<GetEmployeeResponse>({
    queryKey: ["employees"],
    queryFn: () => getEmployees().then((r) => r.data),
  });
