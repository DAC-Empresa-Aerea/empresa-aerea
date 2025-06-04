import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../../App';
import { updateMiles } from '../../services/costumers';
import { UpdateMilesRequest, UpdateMilesResponse } from '../../types/api/miles';

export const useUpdateMiles = (codigo: number) =>
  useMutation<UpdateMilesResponse, Error, UpdateMilesRequest>({
    mutationFn: (body: UpdateMilesRequest) => updateMiles(codigo, body).then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customer', codigo] });
    },
});
