import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../App";
import { createReserve } from "../../services/reservers";
import {
  CreateReserveRequest,
  CreateReserveResponse,
} from "../../types/api/reserve";

export const useCreateReserve = () =>
  useMutation<CreateReserveResponse, Error, CreateReserveRequest>({
    mutationFn: (data: CreateReserveRequest) =>
      createReserve(data).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reserves"] });
      queryClient.invalidateQueries({ queryKey: ["customerReserves"] });
    },
  });
