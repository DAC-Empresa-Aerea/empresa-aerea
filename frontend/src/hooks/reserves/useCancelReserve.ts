// hooks/useCancelReserve.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteReserve } from '../../services/reservers';
import { DeleteReserveResponse } from '../../types/api/reserve';

export const useCancelReserve = () => {
  const queryClient = useQueryClient();

  return useMutation<DeleteReserveResponse, Error, string>({
    mutationFn: (codigo) => deleteReserve(codigo).then((r) => r.data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reserves'] });
    },
  });
};
