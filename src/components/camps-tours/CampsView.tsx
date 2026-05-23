/**
 * Main camps view component combining all sub-components
 */

import { useState, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "@/lib/theme/use-theme";
import { ErrorState } from "@/components/feedback/error-state";
import { LoadingState } from "@/components/feedback/loading-state";
import { useCampsQuery } from "@/features/camps-tours/hooks/use-camps-query";
import { useCampsFilters } from "@/features/camps-tours/hooks/use-camps-filters";
import { FilterBar } from "@/components/camps-tours/FilterBar";
import { CampsList } from "@/components/camps-tours/CampsList";
import { CountryModal } from "@/components/camps-tours/CountryModal";

export function CampsView() {
  const colors = useTheme();
  const { camps, countries, isLoading, error, refetch } = useCampsQuery();
  const { filters, setFilters, filteredCamps, hasActiveFilters } = useCampsFilters(camps);
  const [showCountryModal, setShowCountryModal] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  }, [refetch]);

  const handleSelectCountry = useCallback(
    (country: string) => {
      setFilters((prev) => ({ ...prev, country }));
    },
    [setFilters],
  );

  if (isLoading && camps.length === 0) {
    return <LoadingState message="Zomerkampen laden..." />;
  }

  if (error && camps.length === 0) {
    return <ErrorState message={error} onRetry={refetch} />;
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FilterBar
        filters={filters}
        setFilters={setFilters}
        onCountryPress={() => setShowCountryModal(true)}
      />

      <CampsList
        camps={filteredCamps}
        totalCount={camps.length}
        isRefreshing={isRefreshing}
        onRefresh={handleRefresh}
        hasActiveFilters={hasActiveFilters}
      />

      <CountryModal
        visible={showCountryModal}
        onClose={() => setShowCountryModal(false)}
        countries={countries}
        selectedCountry={filters.country}
        onSelectCountry={handleSelectCountry}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
