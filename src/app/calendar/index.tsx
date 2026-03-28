import { useCallback, useState, useMemo } from "react";
import { View, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { FlashList } from "@shopify/flash-list";
import { useTranslation } from "react-i18next";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCalendarEvents } from "@/lib/hooks/use-calendar-events";
import { THEME } from "@/lib/theme";
import type { CalendarEvent, EventsData } from "@/lib/types";

// Dutch locale
LocaleConfig.locales["nl"] = {
  monthNames: [
    "Januari", "Februari", "Maart", "April", "Mei", "Juni",
    "Juli", "Augustus", "September", "Oktober", "November", "December",
  ],
  monthNamesShort: [
    "Jan", "Feb", "Mrt", "Apr", "Mei", "Jun",
    "Jul", "Aug", "Sep", "Okt", "Nov", "Dec",
  ],
  dayNames: ["Zondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag"],
  dayNamesShort: ["Zo", "Ma", "Di", "Wo", "Do", "Vr", "Za"],
  today: "Vandaag",
};
LocaleConfig.defaultLocale = "nl";

function formatDateKey(date: Date): string {
  return date.toISOString().split("T")[0];
}

function EventCard({ event }: { event: CalendarEvent }) {
  const timeStr = event.isAllDay
    ? "Hele dag"
    : event.start.dateTime.toLocaleTimeString("nl-NL", { hour: "2-digit", minute: "2-digit" });

  return (
    <Card className="mb-2 mx-4">
      <CardContent className="p-3">
        <View className="flex-row items-start justify-between">
          <View className="flex-1 mr-2">
            <Text className="text-base font-semibold">{event.summary}</Text>
            <Text className="text-sm text-muted-foreground mt-0.5">{timeStr}</Text>
            {event.location ? (
              <Text className="text-sm text-muted-foreground mt-0.5" numberOfLines={1}>
                {event.location}
              </Text>
            ) : null}
          </View>
          {event.color && (
            <View
              className="w-3 h-3 rounded-full mt-1.5"
              style={{ backgroundColor: event.color.background }}
            />
          )}
        </View>
      </CardContent>
    </Card>
  );
}

export default function CalendarScreen() {
  const { t } = useTranslation();
  const colorScheme = useColorScheme() ?? "light";
  const theme = colorScheme === "dark" ? THEME.dark : THEME.light;
  const { data: eventsData, isLoading, error, refetch } = useCalendarEvents();
  const [selectedDate, setSelectedDate] = useState(formatDateKey(new Date()));

  const selectedEvents = useMemo(
    () => (eventsData as EventsData)?.[selectedDate] ?? [],
    [eventsData, selectedDate],
  );

  const markedDates = useMemo(() => {
    if (!eventsData) return {};
    const marks: Record<string, { marked: boolean; dotColor: string; selected?: boolean; selectedColor?: string }> = {};
    for (const dateKey of Object.keys(eventsData as EventsData)) {
      marks[dateKey] = { marked: true, dotColor: theme.primary };
    }
    if (selectedDate) {
      marks[selectedDate] = {
        ...marks[selectedDate],
        selected: true,
        selectedColor: theme.primary,
      };
    }
    return marks;
  }, [eventsData, selectedDate, theme.primary]);

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-background items-center justify-center" edges={["bottom"]}>
        <Skeleton className="w-[90%] h-[300px] rounded-xl mb-4" />
        <Skeleton className="w-[90%] h-[60px] rounded-lg mb-2" />
        <Skeleton className="w-[90%] h-[60px] rounded-lg" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1 bg-background items-center justify-center p-6" edges={["bottom"]}>
        <Text className="text-xl font-bold mb-2">{t("calendar.loadError")}</Text>
        <Button onPress={() => refetch()}>
          <Text>{t("common.retry")}</Text>
        </Button>
      </SafeAreaView>
    );
  }

  const calendarTheme = {
    backgroundColor: theme.background,
    calendarBackground: theme.background,
    selectedDayBackgroundColor: theme.primary,
    selectedDayTextColor: "#FFFFFF",
    todayTextColor: theme.primary,
    dayTextColor: theme.foreground,
    arrowColor: theme.primary,
    monthTextColor: theme.foreground,
    indicatorColor: theme.primary,
    textDayFontSize: 16,
    textMonthFontSize: 18,
    textDayHeaderFontSize: 13,
    textDayFontWeight: "400" as const,
    textMonthFontWeight: "600" as const,
    textDayHeaderFontWeight: "500" as const,
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["bottom"]}>
      <FlashList
        data={selectedEvents}
        renderItem={({ item }) => <EventCard event={item} />}
        keyExtractor={(item) => item.id}
        estimatedItemSize={80}
        ListHeaderComponent={
          <View className="pb-2">
            <Calendar
              current={selectedDate}
              onDayPress={(day) => setSelectedDate(day.dateString)}
              markedDates={markedDates}
              markingType="dot"
              theme={calendarTheme}
              enableSwipeMonths
              hideExtraDays
              firstDay={1}
              style={{ borderRadius: 12, marginHorizontal: 16, marginTop: 8 }}
            />
          </View>
        }
        ListEmptyComponent={
          <View className="items-center py-10 px-4">
            <Text className="text-base text-muted-foreground text-center">
              {t("calendar.noEvents")}
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
