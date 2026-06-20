import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfileRequest } from "@/api/auth";
import { useAuth } from "./useAuth";
import { toast } from "sonner";

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const { updateUserProfile } = useAuth();

  return useMutation({
    mutationFn: async ({
      userId,
      data,
    }: {
      userId: string;
      data: Record<string, any>;
    }) => {
      console.log('🚀 Enviando para API:', { userId, data });
      const response = await updateProfileRequest(userId, data);
      console.log('📥 Resposta da API:', response);
      return response.data;
    },
    onSuccess: (updatedUser) => {
      updateUserProfile(updatedUser);
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Perfil atualizado com sucesso!");
    },
    onError: (error: any) => {
      const msg =
        error?.response?.data?.message ||
        "Erro ao atualizar perfil. Tente novamente.";
      toast.error(msg);
    },
  });
}
