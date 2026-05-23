/**
 * Badge component for event types (Focus Time, Out of Office, etc.)
 */

import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { EventTypeBadge as EventTypeBadgeType } from "../types";

interface EventTypeBadgeProps {
  eventType: EventTypeBadgeType;
  size?: "small" | "medium";
}

/**
 * Displays a badge indicating the event type
 */
export function EventTypeBadge({ eventType, size = "small" }: EventTypeBadgeProps) {
  if (eventType.type === "default" || !eventType.label) {
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
        { backgroundColor: eventType.color + "20" },
      ]}
    >
      <Ionicons
        name={eventType.icon as keyof typeof Ionicons.glyphMap}
        size={iconSize}
        color={eventType.color}
        style={styles.icon}
      />
      <Text style={[styles.text, { color: eventType.color, fontSize }]} numberOfLines={1}>
        {eventType.label}
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
