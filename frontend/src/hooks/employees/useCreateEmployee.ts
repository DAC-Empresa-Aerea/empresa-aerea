import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../App";
import { createEmployee } from "../../services/employees";
import {
  CreateEmployeeRequest,
  EmployeeWithCode,
} from "../../types/api/employee";

// Hook para criar funcionário
export const useCreateEmployee = () =>
  useMutation<EmployeeWithCode, Error, CreateEmployeeRequest>({
    mutationFn: (data: CreateEmployeeRequest) =>
      createEmployee(data).then((r) => r.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });
