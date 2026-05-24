import {
  SegmentedControl,
  type NativeSegmentedControlChangeEvent,
} from "@expo/ui/community/segmented-control";
import { Stack } from "expo-router";
import { Image } from "expo-image";
import { useCallback, useState } from "react";
import {
  FlatList,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  type ImageSourcePropType,
} from "react-native";
import CloseIcon from "@expo/material-symbols/close.xml";

import { EmptyState } from "@/components/feedback/empty-state";
import { ErrorState } from "@/components/feedback/error-state";
import { LoadingState } from "@/components/feedback/loading-state";
import { CampCard } from "@/components/camps-tours/CampCard";
import { CountryPickerSheet } from "@/components/camps-tours/CountryPickerSheet";
import { Icon } from "@/components/ui/icon";
import { useCampsQuery } from "@/features/camps-tours/hooks/use-camps-query";
import { useCampsFilters } from "@/features/camps-tours/hooks/use-camps-filters";
import type {
  AvailabilityFilter,
  Camp,
  CountryWithCode,
  FilterState,
  TimingFilter,
} from "@/features/camps-tours/types";
import { borderRadius, spacing } from "@/lib/theme/spacing";
import { useTheme } from "@/lib/theme/use-theme";
import { getCountryName, getFlagAsset } from "@/utils/flags";

const AVAILABILITY_VALUES: AvailabilityFilter[] = ["alle", "niet-vol", "vol"];
const AVAILABILITY_LABELS = ["Alle", "Beschikbaar", "Vol"];

const TIMING_VALUES: TimingFilter[] = ["alle", "toekomstig", "afgelopen"];
const TIMING_LABELS = ["Alle", "Toekomstig", "Afgelopen"];

export default function CampsToursScreen() {
  const theme = useTheme();
  const { camps, countries, isLoading, error, refetch } = useCampsQuery();

  const [query, setQuery] = useState("");
  const { filters, setFilters, filteredCamps, hasActiveFilters, clearFilters } = useCampsFilters(
    camps,
    query,
  );

  const [countryPickerOpen, setCountryPickerOpen] = useState(false);

  const handleSelectCountry = useCallback(
    (code: string) => {
      setFilters((prev) => ({ ...prev, country: code }));
    },
    [setFilters],
  );

  const renderItem = useCallback(
    ({ item }: { item: Camp }) => <CampCard camp={item} />,
    [],
  );

  const renderSeparator = useCallback(() => <View style={styles.separator} />, []);

  const renderEmpty = useCallback(() => {
    if (isLoading) return <LoadingState message="Zomerkampen laden..." />;
    if (error) return <ErrorState message={error} onRetry={refetch} />;
    if (hasActiveFilters || query.trim().length > 0) {
      return (
        <EmptyState
          icon="search"
          title="Geen overeenkomende kampen"
          message="Pas je filters of zoekterm aan om meer resultaten te zien."
        />
      );
    }
    return (
      <EmptyState
        icon="calendar"
        title="Geen kampen beschikbaar"
        message="Er zijn momenteel geen zomerkampen beschikbaar. Kijk later nog eens."
      />
    );
  }, [error, hasActiveFilters, isLoading, query, refetch]);

  const renderHeader = useCallback(
    () => (
      <FilterPanel
        filters={filters}
        onFiltersChange={setFilters}
        countries={countries}
        onCountryPress={() => setCountryPickerOpen(true)}
        totalCount={camps.length}
        filteredCount={filteredCamps.length}
        hasActiveFilters={hasActiveFilters}
      />
    ),
    [filters, setFilters, countries, camps.length, filteredCamps.length, hasActiveFilters],
  );

  return (
    <>
      <Stack.Screen
        options={{
          headerSearchBarOptions: {
            placeholder: "Zoek op kamp of land",
            autoCapitalize: "none",
            inputType: "text",
            onChangeText: (e) => setQuery(e.nativeEvent.text),
            onClose: () => setQuery(""),
          },
        }}
      />

      {hasActiveFilters ? (
        <Stack.Toolbar placement="right">
          <Stack.Toolbar.Button
            onPress={clearFilters}
            accessibilityLabel="Wis filters"
            icon={
              Platform.OS === "ios"
                ? "xmark.circle"
                : (CloseIcon as ImageSourcePropType)
            }
          />
        </Stack.Toolbar>
      ) : null}

      <FlatList
        data={filteredCamps}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        ItemSeparatorComponent={renderSeparator}
        style={{ backgroundColor: theme.background }}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        keyboardDismissMode="on-drag"
        refreshing={isLoading && camps.length > 0}
        onRefresh={refetch}
        removeClippedSubviews
        initialNumToRender={8}
        maxToRenderPerBatch={8}
        windowSize={10}
      />

      <CountryPickerSheet
        visible={countryPickerOpen}
        onClose={() => setCountryPickerOpen(false)}
        countries={countries}
        selectedCountry={filters.country}
        onSelect={handleSelectCountry}
      />
    </>
  );
}

interface FilterPanelProps {
  filters: FilterState;
  onFiltersChange: React.Dispatch<React.SetStateAction<FilterState>>;
  countries: CountryWithCode[];
  onCountryPress: () => void;
  totalCount: number;
  filteredCount: number;
  hasActiveFilters: boolean;
}

function FilterPanel({
  filters,
  onFiltersChange,
  onCountryPress,
  totalCount,
  filteredCount,
  hasActiveFilters,
}: FilterPanelProps) {
  const theme = useTheme();

  const availabilityIndex = AVAILABILITY_VALUES.indexOf(filters.availability);
  const timingIndex = TIMING_VALUES.indexOf(filters.timing);

  const countryFlag = filters.country ? getFlagAsset(filters.country.toLowerCase()) : null;
  const countryLabel = filters.country ? getCountryName(filters.country) : "Alle landen";

  return (
    <View style={styles.filterPanel}>
      <SegmentedControl
        values={AVAILABILITY_LABELS}
        selectedIndex={availabilityIndex === -1 ? 0 : availabilityIndex}
        onChange={(e: NativeSegmentedControlChangeEvent) => {
          const next = AVAILABILITY_VALUES[e.nativeEvent.selectedSegmentIndex];
          onFiltersChange((prev) => ({ ...prev, availability: next ?? "alle" }));
        }}
        style={styles.segmented}
      />
      <SegmentedControl
        values={TIMING_LABELS}
        selectedIndex={timingIndex === -1 ? 0 : timingIndex}
        onChange={(e: NativeSegmentedControlChangeEvent) => {
          const next = TIMING_VALUES[e.nativeEvent.selectedSegmentIndex];
          onFiltersChange((prev) => ({ ...prev, timing: next ?? "alle" }));
        }}
        style={styles.segmented}
      />

      <Pressable
        onPress={onCountryPress}
        style={({ pressed }) => [
          styles.countryChip,
          { backgroundColor: theme.card, borderColor: theme.border },
          pressed && styles.countryChipPressed,
        ]}
      >
        <View style={styles.countryChipLeft}>
          {countryFlag ? (
            <Image source={countryFlag} style={styles.countryChipFlag} contentFit="cover" />
          ) : (
            <Icon name="globe" size={16} tintColor={theme.textSecondary} />
          )}
          <Text style={[styles.countryChipText, { color: theme.text }]}>{countryLabel}</Text>
        </View>
        <Icon name="forward" size={14} tintColor={theme.textSecondary} />
      </Pressable>

      {hasActiveFilters || filteredCount !== totalCount ? (
        <Text style={[styles.countText, { color: theme.textSecondary }]}>
          {filteredCount} van {totalCount} kampen
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: 40,
    flexGrow: 1,
  },
  separator: {
    height: spacing.md,
  },
  filterPanel: {
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
    gap: spacing.sm,
  },
  segmented: {
    height: Platform.OS === "ios" ? 32 : 40,
  },
  countryChip: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: borderRadius.md,
    borderWidth: Platform.OS === "android" ? StyleSheet.hairlineWidth : 0,
  },
  countryChipPressed: {
    opacity: 0.7,
  },
  countryChipLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
  },
  countryChipFlag: {
    width: 20,
    height: 15,
    borderRadius: 2,
  },
  countryChipText: {
    fontSize: 15,
    fontWeight: "500",
  },
  countText: {
    fontSize: 12,
    fontWeight: "500",
    marginTop: 2,
    textAlign: "center",
  },
});
