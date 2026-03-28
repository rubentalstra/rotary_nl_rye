/**
 * Hook for computing event display details
 */

import { useMemo } from "react";
import type { CalendarEvent } from "../types";
import {
  formatDateRange,
  formatEventDateCapitalized,
  formatEventTime,
  getRelativeDateString,
} from "../utils/dateUtils";
import { getEventColor } from "../utils/colorUtils";

interface EventDetails {
  /** Time display (e.g., "14:30 - 16:00" or "Hele dag") */
  timeDisplay: string;
  /** Date display in Dutch format */
  dateDisplay: string;
  /** Relative date if applicable ("Vandaag", "Morgen", null) */
  relativeDateDisplay: string | null;
  /** Date range for multi-day events */
  dateRange: string | null;
  /** Whether this event has a video meeting */
  hasMeeting: boolean;
  /** Text for the meeting join button */
  meetingButtonText: string;
  /** Full recurrence text */
  recurrenceText: string;
  /** Short recurrence badge text */
  recurrenceBadgeText: string;
  /** Accent color for the event */
  accentColor: string;
  /** Whether to show event type badge */
  showEventTypeBadge: boolean;
  /** Event type label */
  eventTypeLabel: string;
  /** Event type icon */
  eventTypeIcon: string;
  /** Event type color */
  eventTypeColor: string;
  /** Whether this is a multi-day event */
  isMultiDay: boolean;
  /** Whether this is an all-day event */
  isAllDay: boolean;
  /** Whether this is a recurring event */
  isRecurring: boolean;
}

const DEFAULT_DETAILS: EventDetails = {
  timeDisplay: "",
  dateDisplay: "",
  relativeDateDisplay: null,
  dateRange: null,
  hasMeeting: false,
  meetingButtonText: "",
  recurrenceText: "",
  recurrenceBadgeText: "",
  accentColor: "#666666",
  showEventTypeBadge: false,
  eventTypeLabel: "",
  eventTypeIcon: "calendar",
  eventTypeColor: "#666666",
  isMultiDay: false,
  isAllDay: false,
  isRecurring: false,
};

/**
 * Hook for computing display values from a CalendarEvent
 */
export function useEventDetails(event: CalendarEvent | null): EventDetails {
  return useMemo(() => {
    if (!event) return DEFAULT_DETAILS;

    const timeDisplay = event.isAllDay
      ? "Hele dag"
      : formatEventTime(event.start.dateTime, event.end.dateTime);

    const dateDisplay = formatEventDateCapitalized(event.start.dateTime);
    const relativeDateDisplay = getRelativeDateString(event.start.dateTime);

    const dateRange = event.isMultiDay ? formatDateRange(event) : null;

    const hasMeeting = event.hasVideoMeeting;
    const meetingButtonText =
      event.conference?.type === "googleMeet" ? "Deelnemen" : "Deelnemen aan vergadering";

    const recurrenceText = event.recurrence.humanReadable;
    const recurrenceBadgeText = event.recurrence.humanReadableShort;

    const accentColor = getEventColor(event.color?.id);

    const showEventTypeBadge = event.eventType.type !== "default";
    const eventTypeLabel = event.eventType.label;
    const eventTypeIcon = event.eventType.icon;
    const eventTypeColor = event.eventType.color;

    return {
      timeDisplay,
      dateDisplay,
      relativeDateDisplay,
      dateRange,
      hasMeeting,
      meetingButtonText,
      recurrenceText,
      recurrenceBadgeText,
      accentColor,
      showEventTypeBadge,
      eventTypeLabel,
      eventTypeIcon,
      eventTypeColor,
      isMultiDay: event.isMultiDay,
      isAllDay: event.isAllDay,
      isRecurring: event.recurrence.isRecurring,
    };
  }, [event]);
}
