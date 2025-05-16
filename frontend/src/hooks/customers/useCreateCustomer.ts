// hooks/customers/useCreateCustomer.ts
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../../App';
import { createCustomer } from '../../services/costumers';
import {
  CreateCustomerRequest,
  CustomerWithCode,
} from '../../types/api/customer';

export const useCreateCustomer = () =>
  useMutation<CustomerWithCode, Error, CreateCustomerRequest>({
    mutationFn: (data: CreateCustomerRequest) =>  createCustomer(data).then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
    },
});
