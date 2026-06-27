import { registerRequest, loginRequest, profileRequest, type LoginResponse, type RegisterPayload } from '@/api/auth';

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

export function useRegister() {
  const { signIn, setProfile } = useAuth();
  const navigate = useNavigate();

  return useMutation<LoginResponse, AxiosError<ApiEnvelope<unknown>>, RegisterPayload>({
    mutationFn: registerRequest,
    onSuccess: async (data, variables) => {
      try {
        const loginResponse = await loginRequest({
          email: variables.email,
          password: variables.password,
        });

        if (loginResponse?.token) {
          signIn(loginResponse.token, loginResponse.user);

          try {
            const profileResponse = await profileRequest();
            if (profileResponse?.data) {
              setProfile(profileResponse.data);
            }
          } catch (error) {
            console.error('Erro ao buscar perfil do usuário:', error);
          }
        } else {
          signIn(data.token, data.user);
        }
      } catch (error) {
        console.error('Erro ao fazer login após cadastro:', error);
        signIn(data.token, data.user);
      }

      toast.success('Cadastro realizado com sucesso!');
      navigate('/', { replace: true });
    },
    onError: (error: AxiosError<ApiEnvelope<unknown>>) => {
      const status = error.response?.status;
      const apiMessage = error.response?.data?.message ?? '';

      if (status === 409 || /already exists|already registered/i.test(apiMessage)) {
        toast.error('Este e-mail já está cadastrado. Faça login para continuar.');
      } else if (status === 429) {
        toast.error('Muitas tentativas. Aguarde um momento e tente novamente.');
      } else if (status && status >= 500) {
        toast.error('Erro no servidor. Tente novamente em alguns instantes.');
      } else if (status === 0 || !status) {
        toast.error('Sem conexão com a internet. Verifique sua rede.');
      } else {
        toast.error(apiMessage || 'Erro ao criar conta. Tente novamente.');
      }
    },
  });
}
