import { useQuery } from "@tanstack/react-query";
import { fetchCalendarEvents } from "@/lib/api/fetch-events";

export function useCalendarEvents() {
  return useQuery({
    queryKey: ["calendar", "events"],
    queryFn: fetchCalendarEvents,
    staleTime: 5 * 60_000,
  });
}
