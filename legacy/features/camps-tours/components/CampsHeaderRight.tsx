/**
 * Header right component for camps screen
 * Shows filter count and clear button
 */

import { StyleSheet, View, Pressable, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/core/theme";

interface CampsHeaderRightProps {
  filteredCount: number;
  totalCount: number;
  hasActiveFilters: boolean;
  isLoading: boolean;
  onClearFilters: () => void;
}

export function CampsHeaderRight({
  filteredCount,
  totalCount,
  hasActiveFilters,
  isLoading,
  onClearFilters,
}: CampsHeaderRightProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      {hasActiveFilters && (
        <View style={[styles.activeIndicator, { backgroundColor: colors.primary }]} />
      )}
      <Text
        style={[
          styles.statsText,
          { color: colors.textSecondary },
          hasActiveFilters && [styles.statsTextActive, { color: colors.primary }],
        ]}
      >
        {isLoading ? "Laden..." : `${filteredCount}/${totalCount}`}
      </Text>
      {hasActiveFilters && (
        <Pressable
          style={({ pressed }) => [styles.clearButton, pressed && styles.clearButtonPressed]}
          onPress={onClearFilters}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="close-circle" size={20} color="#FF3B30" />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 8,
    marginLeft: 8,
  },
  activeIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  statsText: {
    fontSize: 13,
    fontWeight: "500",
  },
  statsTextActive: {
    fontWeight: "600",
  },
  clearButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  clearButtonPressed: {
    transform: [{ scale: 0.95 }],
  },
});
