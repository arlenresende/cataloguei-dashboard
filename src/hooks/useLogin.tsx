import { loginRequest, profileRequest, type LoginPayload, type LoginResponse } from '@/api/auth';

import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from './useAuth';

interface ApiEnvelope<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
}

export function useLogin() {
  const { signIn, setProfile } = useAuth();
  const navigate = useNavigate();

  return useMutation<LoginResponse, AxiosError<ApiEnvelope<unknown>>, LoginPayload>({
    mutationFn: loginRequest,
    onSuccess: async (data) => {
      signIn(data.token, data.user);

      try {
        const profileResponse = await profileRequest();
        if (profileResponse?.data) {
          setProfile(profileResponse.data);
        }
      } catch (error) {
        console.error('Erro ao buscar perfil do usuário:', error);
      }

      toast.success('Login realizado com sucesso!');
      navigate('/', { replace: true });
    },
    onError: (error: AxiosError<ApiEnvelope<unknown>>) => {
      const status = error.response?.status;
      const apiMessage = error.response?.data?.message ?? '';

      if (status === 401 || /invalid credentials/i.test(apiMessage)) {
        toast.error('E-mail ou senha incorretos. Tente novamente.');
      } else if (status === 429) {
        toast.error('Muitas tentativas. Aguarde um momento e tente novamente.');
      } else if (status && status >= 500) {
        toast.error('Erro no servidor. Tente novamente em alguns instantes.');
      } else if (status === 0 || !status) {
        toast.error('Sem conexão com a internet. Verifique sua rede.');
      } else {
        toast.error(apiMessage || 'Erro ao fazer login. Tente novamente.');
      }
    },
  });
}
