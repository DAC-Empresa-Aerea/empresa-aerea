import { useMutation } from '@tanstack/react-query';
import { login } from '../services/auth';
import { LoginRequest, LoginResponse } from '../types/api/login';

export const useLogin = () =>
  useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: (data: LoginRequest) => login(data).then(res => res.data),
});
