/**
 * Enhanced events list component for displaying events on a selected date
 * Features: relative date display, event count badge, improved empty state
 */

import { FlatList, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/core/theme";
import { EventCard } from "./EventCard";
import { getDisplayDate, getEventsForDay, sortEventsByTime } from "../utils/dateUtils";
import type { CalendarEvent, EventsData } from "../types";

interface EventsListProps {
  eventsData: EventsData;
  selectedDate: string;
  onEventPress: (event: CalendarEvent) => void;
  ListHeaderComponent?: React.ReactElement;
}

export function EventsList({
  eventsData,
  selectedDate,
  onEventPress,
  ListHeaderComponent,
}: EventsListProps) {
  const { colors } = useTheme();
  const selectedDateObj = new Date(selectedDate);
  const events = sortEventsByTime(getEventsForDay(eventsData, selectedDateObj));
  const displayDate = getDisplayDate(selectedDateObj);

  const renderItem = ({ item }: { item: CalendarEvent }) => (
    <EventCard event={item} onPress={onEventPress} />
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <View style={[styles.emptyIconContainer, { backgroundColor: colors.primary + "15" }]}>
        <Ionicons name="calendar-outline" size={40} color={colors.primary} />
      </View>
      <Text style={[styles.emptyTitle, { color: colors.text }]}>Geen evenementen</Text>
      <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}>
        Er zijn geen evenementen gepland voor deze dag
      </Text>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      {ListHeaderComponent}
      <View style={[styles.dateHeader, { borderBottomColor: colors.border }]}>
        <View style={styles.dateInfo}>
          <Text style={[styles.dateText, { color: colors.text }]}>{displayDate}</Text>
        </View>
        {events.length > 0 && (
          <View style={[styles.countBadge, { backgroundColor: colors.primary }]}>
            <Text style={styles.countText}>{events.length}</Text>
          </View>
        )}
      </View>
    </View>
  );

  return (
    <FlatList
      data={events}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      ListHeaderComponent={renderHeader}
      ListEmptyComponent={renderEmptyState}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  headerContainer: {
    marginBottom: 8,
  },
  dateHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  dateInfo: {
    flex: 1,
  },
  dateText: {
    fontSize: 18,
    fontWeight: "600",
  },
  countBadge: {
    minWidth: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  countText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    paddingTop: 48,
  },
  emptyIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },
});
