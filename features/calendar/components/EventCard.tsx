/**
 * Enhanced event card component for calendar events list
 * Features: color accent, recurrence badge, event type badge
 */

import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useTheme } from "@/core/theme";
import { useEventDetails } from "../hooks";
import { RecurrenceBadge } from "./RecurrenceBadge";
import { EventTypeBadge } from "./EventTypeBadge";
import type { CalendarEvent } from "../types";

interface EventCardProps {
  event: CalendarEvent;
  onPress: (event: CalendarEvent) => void;
}

export function EventCard({ event, onPress }: EventCardProps) {
  const { colors } = useTheme();
  const details = useEventDetails(event);

  const handlePress = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress(event);
  };

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          opacity: pressed ? 0.7 : 1,
        },
        Platform.OS === "ios" ? styles.shadowIOS : styles.shadowAndroid,
      ]}
    >
      {/* Color accent bar */}
      <View style={[styles.accentBar, { backgroundColor: details.accentColor }]} />

      <View style={styles.content}>
        {/* Top row: time and badges */}
        <View style={styles.topRow}>
          <View style={styles.timeContainer}>
            <Ionicons
              name={details.isAllDay ? "calendar" : "time-outline"}
              size={14}
              color={colors.primary}
            />
            <Text style={[styles.timeText, { color: colors.primary }]}>{details.timeDisplay}</Text>
          </View>

          <View style={styles.badgesContainer}>
            {details.isRecurring && <RecurrenceBadge recurrence={event.recurrence} size="small" />}
            {details.showEventTypeBadge && (
              <EventTypeBadge eventType={event.eventType} size="small" />
            )}
            {details.isMultiDay && (
              <View style={[styles.multiDayBadge, { backgroundColor: colors.primary }]}>
                <Text style={styles.multiDayText}>Meerdaags</Text>
              </View>
            )}
          </View>
        </View>

        {/* Title */}
        <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>
          {event.summary}
        </Text>

        {/* Location */}
        {event.location && (
          <View style={styles.locationContainer}>
            <Ionicons name="location-outline" size={14} color={colors.textSecondary} />
            <Text style={[styles.locationText, { color: colors.textSecondary }]} numberOfLines={1}>
              {event.location}
            </Text>
          </View>
        )}
      </View>

      {/* Chevron */}
      <View style={styles.chevronContainer}>
        <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 12,
    borderWidth: Platform.OS === "android" ? StyleSheet.hairlineWidth : 0,
    overflow: "hidden",
  },
  shadowIOS: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  shadowAndroid: {
    elevation: 2,
  },
  accentBar: {
    width: 4,
  },
  content: {
    flex: 1,
    padding: 12,
    paddingRight: 32,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  timeText: {
    fontSize: 13,
    fontWeight: "600",
    marginLeft: 4,
  },
  badgesContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  multiDayBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  multiDayText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  locationText: {
    fontSize: 13,
    marginLeft: 4,
    flex: 1,
  },
  chevronContainer: {
    position: "absolute",
    right: 12,
    top: "50%",
    marginTop: -10,
  },
});
