/**
 * Hook for filtering camps data — applies the persistent FilterState plus
 * an ephemeral search query against camp title and host-country name.
 */

import { useCallback, useMemo, useState } from "react";

import { isCampPast } from "../api/fetch-camps";
import type { Camp, CampsFilterResult, FilterState } from "@/features/camps-tours/types";
import { getCountryName } from "@/utils/flags";

const INITIAL_FILTERS: FilterState = {
  availability: "alle",
  timing: "alle",
  country: "",
};

export function useCampsFilters(camps: Camp[], query: string): CampsFilterResult {
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);

  const filteredCamps = useMemo(() => {
    let filtered = [...camps];

    if (filters.availability === "niet-vol") {
      filtered = filtered.filter((camp) => !camp.isFull);
    } else if (filters.availability === "vol") {
      filtered = filtered.filter((camp) => camp.isFull);
    }

    if (filters.timing === "toekomstig") {
      filtered = filtered.filter((camp) => !isCampPast(camp));
    } else if (filters.timing === "afgelopen") {
      filtered = filtered.filter((camp) => isCampPast(camp));
    }

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
      filters.availability !== "alle" ||
      filters.timing !== "alle" ||
      filters.country !== "",
    [filters],
  );

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
