import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createStoreRequest, type CreateStoreRequest } from "@/api/store";
import { useAuth } from "./useAuth";
import { toast } from "sonner";

export function useCreateStore() {
  const queryClient = useQueryClient();
  const { updateUserProfile } = useAuth();

  return useMutation({
    mutationFn: (data: CreateStoreRequest) => createStoreRequest(data),
    onSuccess: (response) => {
      const store = response.data;
      updateUserProfile({
        stores: [{ id: store.id, name: store.name, slug: store.slug, url: store.url }],
      });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Loja criada com sucesso!");
    },
    onError: (error: any) => {
      const msg =
        error?.response?.data?.message ||
        "Erro ao criar loja. Tente novamente.";
      toast.error(msg);
    },
  });
}
