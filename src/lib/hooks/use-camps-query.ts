import { useQuery } from "@tanstack/react-query";
import { fetchCamps } from "@/lib/api/fetch-camps";

export function useCampsQuery() {
  return useQuery({
    queryKey: ["camps", "tours"],
    queryFn: fetchCamps,
    staleTime: 15 * 60_000,
  });
}
