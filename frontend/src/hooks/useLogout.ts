// hooks/useLogout.ts
import { useMutation } from '@tanstack/react-query';
import { logout } from '../services/auth';
import { LogoutRequest, LogoutResponse } from '../types/api/login';

export const useLogout = () =>
  useMutation<LogoutResponse, Error, LogoutRequest>({
    mutationFn: (data: LogoutRequest) => logout(data).then(res => res.data),
});
