import { useQuery } from "@tanstack/react-query";
import { getStoreRequest } from "@/api/store";
import { useAuth } from "./useAuth";

export function useStore() {
  const { user } = useAuth();
  const storeId = user?.stores?.[0]?.id;

  return useQuery({
    queryKey: ["store", storeId],
    queryFn: () => getStoreRequest(storeId!),
    enabled: !!storeId,
  });
}
