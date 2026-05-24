/**
 * Camps list component with FlatList
 */

import { StyleSheet, View, FlatList, RefreshControl, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/core/theme";
import { CampCard } from "./CampCard";
import type { Camp } from "../types";

interface CampsListProps {
  camps: Camp[];
  totalCount: number;
  isRefreshing: boolean;
  onRefresh: () => void;
  hasActiveFilters: boolean;
}

export function CampsList({
  camps,
  totalCount,
  isRefreshing,
  onRefresh,
  hasActiveFilters,
}: CampsListProps) {
  const { colors } = useTheme();

  const renderItem = ({ item }: { item: Camp }) => <CampCard camp={item} />;

  const renderEmptyState = () => {
    if (totalCount > 0) {
      // Has data but filtered to empty
      return (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIcon}>
            <Ionicons name="search-outline" size={64} color={colors.textSecondary} />
          </View>
          <Text style={[styles.emptyTitle, { color: colors.text }]}>
            Geen Overeenkomende Kampen
          </Text>
          <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
            Pas je filters aan om meer resultaten te zien.
          </Text>
        </View>
      );
    }

    // No data at all
    return (
      <View style={styles.emptyContainer}>
        <View style={styles.emptyIcon}>
          <Ionicons name="calendar-outline" size={64} color={colors.textSecondary} />
        </View>
        <Text style={[styles.emptyTitle, { color: colors.text }]}>Geen Kampen Beschikbaar</Text>
        <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
          Er zijn momenteel geen zomerkampen beschikbaar. Kijk later nog eens!
        </Text>
      </View>
    );
  };

  return (
    <FlatList
      data={camps}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      style={styles.list}
      contentContainerStyle={[styles.content, camps.length === 0 && styles.emptyContent]}
      showsVerticalScrollIndicator={false}
      contentInsetAdjustmentBehavior="automatic"
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={onRefresh}
          tintColor={colors.primary}
          colors={[colors.primary]}
        />
      }
      ListEmptyComponent={renderEmptyState}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 34,
  },
  emptyContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  emptyContainer: {
    alignItems: "center",
    paddingVertical: 60,
    paddingHorizontal: 32,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "400",
    textAlign: "center",
    lineHeight: 22,
  },
});
