/**
 * Hook for filtering camps data
 */

import { useState, useMemo, useCallback } from "react";
import { isCampPast } from "../api";
import type { Camp, FilterState, CampsFilterResult } from "../types";

const INITIAL_FILTERS: FilterState = {
  availability: "alle",
  timing: "alle",
  country: "",
};

export function useCampsFilters(camps: Camp[]): CampsFilterResult {
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);

  const filteredCamps = useMemo(() => {
    let filtered = [...camps];

    // Apply availability filter
    if (filters.availability === "niet-vol") {
      filtered = filtered.filter((camp) => !camp.isFull);
    } else if (filters.availability === "vol") {
      filtered = filtered.filter((camp) => camp.isFull);
    }

    // Apply timing filter
    if (filters.timing === "toekomstig") {
      filtered = filtered.filter((camp) => !isCampPast(camp));
    } else if (filters.timing === "afgelopen") {
      filtered = filtered.filter((camp) => isCampPast(camp));
    }

    // Apply country filter (by country code)
    if (filters.country) {
      filtered = filtered.filter((camp) => {
        const codes = camp.hostCountryCode.split(/[\s,]+/).map((c) => c.trim().toLowerCase());
        return codes.includes(filters.country.toLowerCase());
      });
    }

    return filtered;
  }, [camps, filters]);

  const hasActiveFilters = useMemo(() => {
    return filters.availability !== "alle" || filters.timing !== "alle" || filters.country !== "";
  }, [filters]);

  const clearFilters = useCallback(() => {
    setFilters(INITIAL_FILTERS);
  }, []);

  return {
    filters,
    setFilters,
    filteredCamps,
    hasActiveFilters,
    clearFilters,
  };
}
