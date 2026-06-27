import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateStoreRequest, type UpdateStoreRequest } from "@/api/store";
import { useAuth } from "./useAuth";
import { toast } from "sonner";

export function useUpdateStore() {
  const queryClient = useQueryClient();
  const { updateUserProfile, user } = useAuth();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateStoreRequest }) =>
      updateStoreRequest(id, data),
    onSuccess: (response) => {
      const store = response.data;
      if (user?.stores && user.stores.length > 0) {
        updateUserProfile({
          stores: [{ id: store.id, name: store.name, slug: store.slug, url: store.url }],
        });
      }
      queryClient.invalidateQueries({ queryKey: ["store"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Loja atualizada com sucesso!");
    },
    onError: (error: any) => {
      const msg =
        error?.response?.data?.message ||
        "Erro ao atualizar loja. Tente novamente.";
      toast.error(msg);
    },
  });
}
