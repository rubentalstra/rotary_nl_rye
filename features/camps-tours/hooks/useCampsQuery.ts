/**
 * Hook for fetching and managing camps data with caching
 */

import { useState, useEffect, useCallback } from "react";
import { getCached, setCache } from "@/core/cache/fileCache";
import { fetchCamps } from "../api";
import type { Camp, CountryWithCode, CampsQueryResult } from "../types";

const CACHE_KEY = "camps-tours";
const CACHE_TTL_MINUTES = 15;

interface CachedCampsData {
  camps: Camp[];
  countries: CountryWithCode[];
}

export function useCampsQuery(): CampsQueryResult {
  const [camps, setCamps] = useState<Camp[]>([]);
  const [countries, setCountries] = useState<CountryWithCode[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCamps = useCallback(async (forceRefresh = false) => {
    try {
      setIsLoading(true);
      setError(null);

      // Try cache first (unless forcing refresh)
      if (!forceRefresh) {
        const cached = await getCached<CachedCampsData>(CACHE_KEY);
        if (cached) {
          setCamps(cached.camps);
          setCountries(cached.countries);
          setIsLoading(false);
          return;
        }
      }

      // Fetch fresh data
      const freshData = await fetchCamps();
      setCamps(freshData.camps);
      setCountries(freshData.countries);

      // Save to cache
      await setCache(CACHE_KEY, freshData, CACHE_TTL_MINUTES);
    } catch (err) {
      console.error("Camps loading error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Kan zomerkampen-gegevens niet laden. Probeer opnieuw.",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    loadCamps();
  }, [loadCamps]);

  return {
    camps,
    countries,
    isLoading,
    error,
    refetch: () => loadCamps(true),
  };
}
