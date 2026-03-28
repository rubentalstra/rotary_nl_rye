import { useState, useMemo } from "react";
import {
  View,
  ScrollView,
  Pressable,
  Platform,
  useColorScheme,
  Modal,
  Linking,
} from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { Text } from "@/components/ui/text";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useCalendarEvents } from "@/lib/hooks/use-calendar-events";
import { THEME } from "@/lib/theme";
import type { CalendarEvent, EventsData } from "@/lib/types";

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

function formatDateKey(date: Date): string {
  return date.toISOString().split("T")[0];
}

function formatTime(event: CalendarEvent): string {
  if (event.isAllDay) return "Hele dag";
  return event.start.dateTime.toLocaleTimeString("nl-NL", { hour: "2-digit", minute: "2-digit" });
}

function formatFullDate(date: Date): string {
  return date.toLocaleDateString("nl-NL", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function EventRow({ event, onPress }: { event: CalendarEvent; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} className="flex-row items-start px-5 py-4 active:opacity-60">
      <View
        className="w-3 h-3 rounded-full mt-1.5 mr-4"
        style={{ backgroundColor: event.color?.background ?? "#17458f" }}
      />
      <View className="flex-1">
        <Text className="text-base font-semibold text-foreground">{event.summary}</Text>
        <View className="flex-row items-center mt-1">
          <Ionicons name="time-outline" size={14} className="text-muted-foreground mr-1" />
          <Text className="text-sm text-muted-foreground">{formatTime(event)}</Text>
        </View>
        {event.location ? (
          <View className="flex-row items-center mt-0.5">
            <Ionicons name="location-outline" size={14} className="text-muted-foreground mr-1" />
            <Text className="text-sm text-muted-foreground" numberOfLines={1}>
              {event.location}
            </Text>
          </View>
        ) : null}
      </View>
      <Ionicons name="chevron-forward" size={18} className="text-muted-foreground mt-1" />
    </Pressable>
  );
}

function EventDetailModal({
  event,
  visible,
  onClose,
}: {
  event: CalendarEvent | null;
  visible: boolean;
  onClose: () => void;
}) {
  if (!event) return null;

  const timeStr = formatTime(event);
  const dateStr = formatFullDate(event.start.dateTime);
  const endTimeStr = event.isAllDay
    ? null
    : event.end.dateTime.toLocaleTimeString("nl-NL", { hour: "2-digit", minute: "2-digit" });

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle={Platform.OS === "ios" ? "pageSheet" : "fullScreen"}
      onRequestClose={onClose}
    >
      <View style={{ flex: 1, backgroundColor: "white" }}>
        {Platform.OS === "ios" && (
          <View className="items-center py-3">
            <View className="w-9 h-1 rounded-full bg-muted-foreground/30" />
          </View>
        )}

        <View className="flex-row justify-between items-center px-5 pb-3 border-b border-border">
          <Text className="text-lg font-semibold text-foreground">Evenement</Text>
          <Pressable
            onPress={onClose}
            className="w-8 h-8 rounded-full bg-muted items-center justify-center"
          >
            <Ionicons name="close" size={18} className="text-foreground" />
          </Pressable>
        </View>

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View className="px-5 pt-6 pb-10">
            {/* Color bar + Title */}
            <View className="flex-row items-start mb-6">
              <View
                className="w-1 rounded-full mr-4 self-stretch"
                style={{ backgroundColor: event.color?.background ?? "#17458f" }}
              />
              <View className="flex-1">
                <Text className="text-2xl font-bold text-foreground">{event.summary}</Text>
              </View>
            </View>

            {/* Date & Time */}
            <View className="mb-5">
              <View className="flex-row items-center py-3">
                <View className="w-10 h-10 rounded-xl bg-primary/10 items-center justify-center mr-3">
                  <Ionicons name="calendar" size={20} className="text-primary" />
                </View>
                <View>
                  <Text className="text-base font-medium text-foreground">{dateStr}</Text>
                  <Text className="text-sm text-muted-foreground">
                    {timeStr}
                    {endTimeStr ? ` – ${endTimeStr}` : ""}
                  </Text>
                </View>
              </View>
            </View>

            {/* Location */}
            {event.location && (
              <>
                <Separator className="mb-5" />
                <Pressable
                  onPress={() => {
                    const query = encodeURIComponent(event.location);
                    Linking.openURL(`https://maps.apple.com/?q=${query}`);
                  }}
                  className="flex-row items-center py-2 active:opacity-60"
                >
                  <View className="w-10 h-10 rounded-xl bg-primary/10 items-center justify-center mr-3">
                    <Ionicons name="location" size={20} className="text-primary" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-base font-medium text-foreground">Locatie</Text>
                    <Text className="text-sm text-primary">{event.location}</Text>
                  </View>
                  <Ionicons name="open-outline" size={16} className="text-muted-foreground" />
                </Pressable>
              </>
            )}

            {/* Description */}
            {event.description ? (
              <>
                <Separator className="my-5" />
                <Text className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-3">
                  Beschrijving
                </Text>
                <Text className="text-base leading-7 text-foreground">{event.description}</Text>
              </>
            ) : null}

            {/* Meeting Link */}
            {event.conference?.meetingLink && (
              <>
                <Separator className="my-5" />
                <Pressable
                  onPress={() => Linking.openURL(event.conference!.meetingLink!)}
                  className="flex-row items-center py-2 active:opacity-60"
                >
                  <View className="w-10 h-10 rounded-xl bg-primary/10 items-center justify-center mr-3">
                    <Ionicons name="videocam" size={20} className="text-primary" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-base font-medium text-foreground">
                      {event.conference.name || "Online vergadering"}
                    </Text>
                    <Text className="text-sm text-primary">Deelnemen</Text>
                  </View>
                  <Ionicons name="open-outline" size={16} className="text-muted-foreground" />
                </Pressable>
              </>
            )}

            {/* Open in Calendar */}
            {event.htmlLink && (
              <>
                <Separator className="my-5" />
                <Pressable
                  onPress={() => Linking.openURL(event.htmlLink)}
                  className="flex-row items-center py-2 active:opacity-60"
                >
                  <View className="w-10 h-10 rounded-xl bg-muted items-center justify-center mr-3">
                    <Ionicons name="open-outline" size={20} className="text-foreground" />
                  </View>
                  <Text className="text-base font-medium text-foreground">
                    Openen in Google Agenda
                  </Text>
                </Pressable>
              </>
            )}
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

export default function CalendarScreen() {
  const { t } = useTranslation();
  const colorScheme = useColorScheme() ?? "light";
  const theme = colorScheme === "dark" ? THEME.dark : THEME.light;
  const { data: eventsData, isLoading, error, refetch } = useCalendarEvents();
  const [selectedDate, setSelectedDate] = useState(formatDateKey(new Date()));
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  const selectedEvents = useMemo(
    () => (eventsData as EventsData)?.[selectedDate] ?? [],
    [eventsData, selectedDate],
  );

  const markedDates = useMemo(() => {
    if (!eventsData) return {};
    const marks: Record<
      string,
      { marked: boolean; dotColor: string; selected?: boolean; selectedColor?: string }
    > = {};
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
      <View className="flex-1 bg-background items-center justify-center p-6">
        <View className="w-16 h-16 rounded-2xl bg-muted items-center justify-center mb-4">
          <Ionicons name="calendar-outline" size={32} className="text-primary" />
        </View>
        <Text className="text-lg font-semibold text-foreground mb-1">Kalender laden</Text>
        <Text className="text-sm text-muted-foreground">Even geduld...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 bg-background items-center justify-center p-6">
        <Ionicons name="alert-circle" size={48} className="text-destructive mb-4" />
        <Text className="text-xl font-bold text-foreground mb-2">{t("calendar.loadError")}</Text>
        <Button onPress={() => refetch()}>
          <Text>{t("common.retry")}</Text>
        </Button>
      </View>
    );
  }

  return (
    <>
      <ScrollView
        className="flex-1 bg-background"
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
      >
        {/* Calendar */}
        <Calendar
          current={selectedDate}
          onDayPress={(day) => setSelectedDate(day.dateString)}
          markedDates={markedDates}
          markingType="dot"
          theme={{
            backgroundColor: "transparent",
            calendarBackground: "transparent",
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
            textDayFontWeight: "400",
            textMonthFontWeight: "600",
            textDayHeaderFontWeight: "500",
          }}
          enableSwipeMonths
          hideExtraDays
          firstDay={1}
          style={{ marginHorizontal: 8, marginTop: 8 }}
        />

        <Separator className="mx-5 mt-2 mb-1" />

        {/* Events */}
        {selectedEvents.length > 0 ? (
          <View className={Platform.OS === "android" ? "pb-[100px]" : "pb-10"}>
            <View className="px-5 pt-3 pb-1">
              <Text className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">
                {selectedEvents.length} evenement{selectedEvents.length !== 1 ? "en" : ""}
              </Text>
            </View>
            {selectedEvents.map((event, idx) => (
              <View key={event.id}>
                {idx > 0 && (
                  <View className="ml-[40px] mr-5">
                    <Separator />
                  </View>
                )}
                <EventRow event={event} onPress={() => setSelectedEvent(event)} />
              </View>
            ))}
          </View>
        ) : (
          <View className="items-center py-12 px-5">
            <Ionicons name="calendar-outline" size={40} className="text-muted-foreground mb-3" />
            <Text className="text-base text-muted-foreground text-center">
              {t("calendar.noEvents")}
            </Text>
          </View>
        )}
      </ScrollView>

      <EventDetailModal
        event={selectedEvent}
        visible={selectedEvent !== null}
        onClose={() => setSelectedEvent(null)}
      />
    </>
  );
}
