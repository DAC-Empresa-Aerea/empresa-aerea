import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../App";
import { updateEmployee } from "../../services/employees";
import {
  UpdateEmployeeRequest,
  EmployeeWithCode,
} from "../../types/api/employee";

// Hook para atualizar funcionário
export const useUpdateEmployee = () =>
  useMutation<
    EmployeeWithCode,
    Error,
    { codigo: number; data: UpdateEmployeeRequest }
  >({
    mutationFn: ({
      codigo,
      data,
    }: {
      codigo: number;
      data: UpdateEmployeeRequest;
    }) => updateEmployee(codigo, data).then((r) => r.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });
