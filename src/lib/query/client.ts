import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60_000, // 5 minutes
      gcTime: 30 * 60_000, // 30 minutes
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});
