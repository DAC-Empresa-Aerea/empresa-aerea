import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  setReserveCheckIn,
  setReserveEmbarked,
} from "../../services/reservers";
import {
  UpdateToCheckInReserveRequest,
  UpdateToEmbarkedReserveRequest,
  ReserveStatus,
} from "../../types/api/reserve";

export const useUpdateReserveToCheckIn = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (codigo: string) => {
      const body: UpdateToCheckInReserveRequest = {
        estado: ReserveStatus.CHECKIN,
      };
      return setReserveCheckIn(codigo, body);
    },
    onSuccess: () => {
      // Invalidate reserve-related queries
      queryClient.invalidateQueries({ queryKey: ["reserves"] });
      queryClient.invalidateQueries({ queryKey: ["customer-reserves"] });
    },
    onError: (error) => {
      console.error("Erro ao atualizar reserva para check-in:", error);
    },
  });
};

export const useUpdateReserveToEmbarked = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (codigo: string) => {
      const body: UpdateToEmbarkedReserveRequest = {
        estado: ReserveStatus.EMBARCADO,
      };
      return setReserveEmbarked(codigo, body);
    },
    onSuccess: () => {
      // Invalidate reserve-related queries
      queryClient.invalidateQueries({ queryKey: ["reserves"] });
      queryClient.invalidateQueries({ queryKey: ["customer-reserves"] });
    },
    onError: (error) => {
      console.error("Erro ao atualizar reserva para embarcado:", error);
    },
  });
};
