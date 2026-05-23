import React, { memo } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/core/theme";
import type { HighlightItem } from "../types";

interface HighlightGridProps {
  /** Array of highlight items */
  items: HighlightItem[];
  /** Number of columns (2 or 3) */
  columns?: 2 | 3;
}

/**
 * HighlightGrid - A grid of icon + text highlight items
 *
 * Used for displaying key information like duration, age, timing.
 */
export const HighlightGrid = memo(function HighlightGrid({
  items,
  columns = 2,
}: HighlightGridProps) {
  const { colors } = useTheme();

  const itemWidth = columns === 2 ? "48%" : "31%";

  return (
    <View style={styles.grid}>
      {items.map((item, index) => (
        <View
          key={`${item.title}-${index}`}
          style={[styles.item, { width: itemWidth, backgroundColor: `${colors.accent}15` }]}
        >
          <Ionicons name={item.icon} size={20} color={colors.accent} />
          <View style={styles.textContainer}>
            <Text style={[styles.value, { color: colors.text }]}>{item.value}</Text>
            <Text style={[styles.title, { color: colors.textSecondary }]}>{item.title}</Text>
          </View>
        </View>
      ))}
    </View>
  );
});

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    padding: 12,
    borderRadius: 8,
  },
  textContainer: {
    marginLeft: 8,
    flex: 1,
  },
  value: {
    fontSize: 14,
    fontWeight: "600",
  },
  title: {
    fontSize: 12,
  },
});
