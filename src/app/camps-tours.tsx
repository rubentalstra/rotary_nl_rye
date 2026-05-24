import { Stack } from "expo-router";
import { useCallback, useRef, useState } from "react";
import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  View,
  type ImageSourcePropType,
} from "react-native";
import TuneIcon from "@expo/material-symbols/tune.xml";

import { EmptyState } from "@/components/feedback/empty-state";
import { ErrorState } from "@/components/feedback/error-state";
import { LoadingState } from "@/components/feedback/loading-state";
import { CampCard } from "@/components/camps-tours/CampCard";
import { FilterSheet, type FilterSheetHandle } from "@/components/camps-tours/FilterSheet";
import { useCampsQuery } from "@/features/camps-tours/hooks/use-camps-query";
import { useCampsFilters } from "@/features/camps-tours/hooks/use-camps-filters";
import type { Camp } from "@/features/camps-tours/types";
import { spacing } from "@/lib/theme/spacing";
import { useTheme } from "@/lib/theme/use-theme";

export default function CampsToursScreen() {
  const theme = useTheme();
  const { camps, isLoading, error, refetch } = useCampsQuery();

  const [query, setQuery] = useState("");
  const { filters, setFilters, filteredCamps, hasActiveFilters, clearFilters } = useCampsFilters(
    camps,
    query,
  );

  const filterSheetRef = useRef<FilterSheetHandle>(null);

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

  const renderHeader = useCallback(() => {
    if (camps.length === 0) return null;
    return (
      <Text style={[styles.countText, { color: theme.textSecondary }]}>
        {filteredCamps.length} van {camps.length} kampen
      </Text>
    );
  }, [filteredCamps.length, camps.length, theme.textSecondary]);

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

      <Stack.Toolbar placement="right">
        <Stack.Toolbar.Button
          onPress={() => filterSheetRef.current?.present()}
          accessibilityLabel="Filters openen"
          icon={
            Platform.OS === "ios"
              ? hasActiveFilters
                ? "line.3.horizontal.decrease.circle.fill"
                : "line.3.horizontal.decrease.circle"
              : (TuneIcon as ImageSourcePropType)
          }
        />
      </Stack.Toolbar>

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

      <FilterSheet
        ref={filterSheetRef}
        filters={filters}
        onFiltersChange={setFilters}
        onReset={clearFilters}
        hasActiveFilters={hasActiveFilters}
      />
    </>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: 40,
    flexGrow: 1,
  },
  separator: {
    height: spacing.md,
  },
  countText: {
    fontSize: 12,
    fontWeight: "500",
    paddingVertical: spacing.sm,
    textAlign: "center",
  },
});
