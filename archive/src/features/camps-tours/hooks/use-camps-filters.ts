/**
 * Hook for filtering camps data — applies the persistent FilterState plus
 * an ephemeral search query against camp title and host-country name.
 */

import { useCallback, useMemo, useState } from "react";

import { isCampPast } from "../api/fetch-camps";
import type { Camp, CampsFilterResult, FilterState } from "@/features/camps-tours/types";
import { getCountryName } from "@/utils/flags";

const DEFAULT_FILTERS: FilterState = {
  availability: "niet-vol",
  timing: "toekomstig",
  country: "",
};

export function useCampsFilters(camps: Camp[], query: string): CampsFilterResult {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);

  const filteredCamps = useMemo(() => {
    let filtered = camps.filter((camp) =>
      filters.availability === "vol" ? camp.isFull : !camp.isFull,
    );

    filtered = filtered.filter((camp) =>
      filters.timing === "afgelopen" ? isCampPast(camp) : !isCampPast(camp),
    );

    if (filters.country) {
      const want = filters.country.toLowerCase();
      filtered = filtered.filter((camp) =>
        camp.hostCountryCode
          .split(/[\s,]+/)
          .map((c) => c.trim().toLowerCase())
          .includes(want),
      );
    }

    const trimmed = query.trim().toLowerCase();
    if (trimmed) {
      filtered = filtered.filter((camp) => {
        if (camp.title.toLowerCase().includes(trimmed)) return true;
        const codes = camp.hostCountryCode.split(/[\s,]+/).filter(Boolean);
        return codes.some((code) => getCountryName(code).toLowerCase().includes(trimmed));
      });
    }

    return filtered;
  }, [camps, filters, query]);

  const hasActiveFilters = useMemo(
    () =>
      filters.availability !== DEFAULT_FILTERS.availability ||
      filters.timing !== DEFAULT_FILTERS.timing ||
      filters.country !== DEFAULT_FILTERS.country,
    [filters],
  );

  const clearFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
  }, []);

  return {
    filters,
    setFilters,
    filteredCamps,
    hasActiveFilters,
    clearFilters,
  };
}
