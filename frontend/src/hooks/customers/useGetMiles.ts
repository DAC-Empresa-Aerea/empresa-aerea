import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../App";
import { getMilesHistory } from "../../services/customers";
import { GetMilesHistoryResponse } from "../../types/api/miles";

export const useGetMiles = (codigo: number) =>
  useMutation<GetMilesHistoryResponse, Error, void>({
    mutationFn: () => getMilesHistory(codigo).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customer", codigo] });
    },
  });
