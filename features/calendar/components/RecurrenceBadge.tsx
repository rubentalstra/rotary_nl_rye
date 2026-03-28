/**
 * Badge component showing recurrence pattern
 */

import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/core/theme";
import type { RecurrenceInfo } from "../types";

interface RecurrenceBadgeProps {
  recurrence: RecurrenceInfo;
  size?: "small" | "medium";
}

/**
 * Displays a badge indicating the recurrence pattern of an event
 */
export function RecurrenceBadge({ recurrence, size = "small" }: RecurrenceBadgeProps) {
  const { colors } = useTheme();

  if (!recurrence.isRecurring) {
    return null;
  }

  const isSmall = size === "small";
  const iconSize = isSmall ? 12 : 14;
  const fontSize = isSmall ? 10 : 12;

  return (
    <View
      style={[
        styles.container,
        isSmall ? styles.containerSmall : styles.containerMedium,
        { backgroundColor: colors.primary + "20" },
      ]}
    >
      <Ionicons name="repeat" size={iconSize} color={colors.primary} style={styles.icon} />
      <Text style={[styles.text, { color: colors.primary, fontSize }]} numberOfLines={1}>
        {recurrence.humanReadableShort}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
  },
  containerSmall: {
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  containerMedium: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  icon: {
    marginRight: 3,
  },
  text: {
    fontWeight: "600",
  },
});
