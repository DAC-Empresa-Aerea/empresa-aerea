import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../App";
import { deleteEmployee } from "../../services/employees";
import { DeleteEmployeeResponse } from "../../types/api/employee";

// Hook para deletar funcionário
export const useDeleteEmployee = () =>
  useMutation<DeleteEmployeeResponse, Error, number>({
    mutationFn: (codigo: number) => deleteEmployee(codigo).then((r) => r.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });
