/**
 * Calendar view component with month calendar and events list
 * Features: multi-dot marking, color-coded events
 */

import { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { useTheme } from "@/core/theme";
import { ErrorState, LoadingState } from "@/shared/components/feedback";
import { useCalendarEvents, useMarkedDates, useSelectedDate } from "../hooks";
import { EventsList } from "./EventsList";
import { EventModal } from "./EventModal";
import type { CalendarEvent } from "../types";

// Configure Dutch locale
LocaleConfig.locales["nl"] = {
  monthNames: [
    "Januari",
    "Februari",
    "Maart",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Augustus",
    "September",
    "Oktober",
    "November",
    "December",
  ],
  monthNamesShort: [
    "Jan",
    "Feb",
    "Mrt",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Okt",
    "Nov",
    "Dec",
  ],
  dayNames: ["Zondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag"],
  dayNamesShort: ["Zo", "Ma", "Di", "Wo", "Do", "Vr", "Za"],
  today: "Vandaag",
};
LocaleConfig.defaultLocale = "nl";

export function CalendarView() {
  const { colors } = useTheme();
  const { eventsData, isLoading, error, refetch } = useCalendarEvents();
  const { selectedDate, onDayPress } = useSelectedDate();
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  const markedDates = useMarkedDates({
    eventsData,
    selectedDate,
    defaultDotColor: colors.primary,
    selectedColor: colors.primary,
    selectedTextColor: "#FFFFFF",
  });

  const handleEventPress = useCallback((event: CalendarEvent) => {
    setSelectedEvent(event);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedEvent(null);
  }, []);

  if (isLoading && Object.keys(eventsData).length === 0) {
    return <LoadingState message="Kalender laden..." />;
  }

  if (error && Object.keys(eventsData).length === 0) {
    return <ErrorState message={error} onRetry={refetch} />;
  }

  const calendarTheme = {
    backgroundColor: colors.background,
    calendarBackground: colors.background,
    textSectionTitleColor: colors.textSecondary,
    selectedDayBackgroundColor: colors.primary,
    selectedDayTextColor: "#FFFFFF",
    todayTextColor: colors.primary,
    dayTextColor: colors.text,
    textDisabledColor: colors.textSecondary,
    dotColor: colors.primary,
    selectedDotColor: "#FFFFFF",
    arrowColor: colors.primary,
    monthTextColor: colors.text,
    indicatorColor: colors.primary,
    textDayFontWeight: "400" as const,
    textMonthFontWeight: "600" as const,
    textDayHeaderFontWeight: "500" as const,
    textDayFontSize: 16,
    textMonthFontSize: 18,
    textDayHeaderFontSize: 13,
  };

  const calendarComponent = (
    <View style={[styles.calendarContainer, { backgroundColor: colors.background }]}>
      <Calendar
        current={selectedDate}
        onDayPress={onDayPress}
        markedDates={markedDates}
        markingType="multi-dot"
        theme={calendarTheme}
        enableSwipeMonths
        hideExtraDays
        firstDay={1}
        style={styles.calendar}
      />
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <EventsList
        eventsData={eventsData}
        selectedDate={selectedDate}
        onEventPress={handleEventPress}
        ListHeaderComponent={calendarComponent}
      />

      <EventModal
        event={selectedEvent}
        visible={selectedEvent !== null}
        onClose={handleCloseModal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  calendarContainer: {
    paddingBottom: 8,
  },
  calendar: {
    borderRadius: 12,
    marginHorizontal: 16,
    marginTop: 8,
  },
});
