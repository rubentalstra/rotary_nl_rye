/**
 * Hook for fetching and managing calendar events with caching
 */

import { useCallback, useEffect, useState } from "react";
import { clearCache, getCached, setCache } from "@/core/cache/fileCache";
import { fetchCalendarEvents } from "../api";
import type { EventsData } from "../types";

const CACHE_KEY = "calendar-events";
const CACHE_TTL_MINUTES = 5; // Reduced for faster updates

interface UseCalendarEventsResult {
  eventsData: EventsData;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useCalendarEvents(): UseCalendarEventsResult {
  const [eventsData, setEventsData] = useState<EventsData>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadEvents = useCallback(async (forceRefresh = false) => {
    try {
      setIsLoading(true);
      setError(null);

      // Clear cache if forcing refresh
      if (forceRefresh) {
        await clearCache(CACHE_KEY);
      }

      // Try cache first (unless forcing refresh)
      if (!forceRefresh) {
        const cached = await getCached<EventsData>(CACHE_KEY);
        if (cached && Object.keys(cached).length > 0) {
          setEventsData(cached);
          setIsLoading(false);
          return;
        }
      }

      // Fetch fresh data
      const freshData = await fetchCalendarEvents();
      setEventsData(freshData);

      // Save to cache
      await setCache(CACHE_KEY, freshData, CACHE_TTL_MINUTES);
    } catch (err) {
      console.error("Calendar events loading error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load events. Please check your internet connection and try again.",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial load - always fetch fresh on first mount
  useEffect(() => {
    loadEvents(true); // Force refresh on initial load to pick up code changes
  }, [loadEvents]);

  return {
    eventsData,
    isLoading,
    error,
    refetch: () => loadEvents(true),
  };
}
