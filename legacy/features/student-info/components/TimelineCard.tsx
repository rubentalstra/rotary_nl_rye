import React, { memo } from "react";
import { StyleSheet, View, Text, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/core/theme";
import type { TimelineItem, AccentColor } from "../types";

interface TimelineCardProps {
  /** Array of timeline items */
  items: TimelineItem[];
}

/**
 * TimelineCard - Displays a vertical timeline with connected steps
 *
 * Used for showing sequences like insurance coverage periods.
 */
export const TimelineCard = memo(function TimelineCard({ items }: TimelineCardProps) {
  const { colors } = useTheme();

  const getIconColor = (color: AccentColor): string => {
    const colorMap: Record<AccentColor, string> = {
      primary: colors.primary,
      secondary: colors.secondary,
      success: colors.success,
      warning: colors.warning,
      info: colors.info,
      accent: colors.accent,
    };
    return colorMap[color];
  };

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          shadowColor: colors.shadow,
          borderColor: colors.border,
        },
      ]}
    >
      {items.map((item, index) => (
        <React.Fragment key={`timeline-${index}`}>
          <View style={styles.timelineItem}>
            <View style={[styles.timelineIcon, { backgroundColor: colors.background }]}>
              <Ionicons name={item.icon} size={20} color={getIconColor(item.iconColor)} />
            </View>
            <View style={styles.timelineContent}>
              <Text style={[styles.timelineTitle, { color: colors.text }]}>{item.title}</Text>
              <Text style={[styles.timelineText, { color: colors.textSecondary }]}>
                {item.description}
              </Text>
            </View>
          </View>
          {index < items.length - 1 && (
            <View style={[styles.timelineLine, { backgroundColor: colors.border }]} />
          )}
        </React.Fragment>
      ))}
    </View>
  );
});

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 4,
    borderWidth: Platform.OS === "android" ? StyleSheet.hairlineWidth : 0,
  },
  timelineItem: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  timelineIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  timelineContent: {
    flex: 1,
    paddingBottom: 4,
  },
  timelineTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  timelineText: {
    fontSize: 14,
    lineHeight: 20,
  },
  timelineLine: {
    width: 2,
    height: 20,
    marginLeft: 19,
    marginVertical: 4,
  },
});
