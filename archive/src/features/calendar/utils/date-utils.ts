/**
 * Calendar date utilities with Dutch locale support
 */

import type { CalendarEvent, EventsData } from "../types";

/**
 * Ensures a value is a Date object
 */
export function ensureDate(date: Date | string | number | undefined | null): Date {
  if (!date) {
    return new Date();
  }
  if (date instanceof Date) {
    return date;
  }
  return new Date(date);
}

/**
 * Check if two dates are the same day
 */
export function isSameDay(
  date1: Date | string | undefined | null,
  date2: Date | string | undefined | null,
): boolean {
  const d1 = ensureDate(date1);
  const d2 = ensureDate(date2);
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

/**
 * Format a date as YYYY-MM-DD
 */
export function formatDateKey(date: Date | string | undefined | null): string {
  const d = ensureDate(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/**
 * Gets events for a specific day
 */
export function getEventsForDay(eventsData: EventsData, date: Date): CalendarEvent[] {
  const dateKey = formatDateKey(date);
  return eventsData[dateKey] || [];
}

/**
 * Formats a date for display in Dutch (e.g., "maandag 1 januari 2024")
 */
export function formatEventDate(date: Date | string | undefined | null): string {
  const d = ensureDate(date);
  return new Intl.DateTimeFormat("nl-NL", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(d);
}

/**
 * Formats a date for display in Dutch with capitalized weekday
 */
export function formatEventDateCapitalized(date: Date | string | undefined | null): string {
  const formatted = formatEventDate(date);
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

/**
 * Formats a time for display in Dutch (24-hour format)
 * If endDate is provided, formats as a time range (e.g., "14:30 - 16:00")
 */
export function formatEventTime(
  startDate: Date | string | undefined | null,
  endDate?: Date | string | undefined | null,
): string {
  const formatter = new Intl.DateTimeFormat("nl-NL", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const start = ensureDate(startDate);
  const startTime = formatter.format(start);

  if (endDate) {
    const end = ensureDate(endDate);
    const endTime = formatter.format(end);
    return `${startTime} - ${endTime}`;
  }

  return startTime;
}

/**
 * Format short date (e.g., "ma 15 jan")
 */
export function formatShortDate(date: Date | string | undefined | null): string {
  const d = ensureDate(date);
  return new Intl.DateTimeFormat("nl-NL", {
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(d);
}

/**
 * Format date for section header (e.g., "Maandag 15 januari")
 */
export function formatSectionDate(date: Date | string | undefined | null): string {
  const d = ensureDate(date);
  const formatted = new Intl.DateTimeFormat("nl-NL", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(d);
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

/**
 * Get relative date string (Today, Tomorrow, etc.) in Dutch
 */
export function getRelativeDateString(date: Date | string | undefined | null): string | null {
  const d = ensureDate(date);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (isSameDay(d, today)) {
    return "Vandaag";
  }

  if (isSameDay(d, tomorrow)) {
    return "Morgen";
  }

  if (isSameDay(d, yesterday)) {
    return "Gisteren";
  }

  return null;
}

/**
 * Get display date with relative string if applicable
 */
export function getDisplayDate(date: Date | string | undefined | null): string {
  const relative = getRelativeDateString(date);
  if (relative) {
    return relative;
  }
  return formatSectionDate(date);
}

/**
 * Check if an event spans multiple days (using new CalendarEvent type)
 */
export function isMultiDayEvent(event: CalendarEvent): boolean {
  return event.isMultiDay;
}

/**
 * Check if an event is all-day (using new CalendarEvent type)
 */
export function isAllDayEvent(event: CalendarEvent): boolean {
  return event.isAllDay;
}

/**
 * Gets the display end date for an event
 * For all-day events, the API end date is EXCLUSIVE, so we subtract 1 day
 */
export function getDisplayEndDate(event: CalendarEvent): Date {
  const endDate = ensureDate(event.end?.dateTime);

  if (event.isAllDay) {
    // For all-day events, subtract 1 day to get the actual last day
    return new Date(endDate.getTime() - 24 * 60 * 60 * 1000);
  }

  return endDate;
}

/**
 * Format date range for multi-day events
 */
export function formatDateRange(event: CalendarEvent): string {
  const startStr = formatShortDate(event.start.dateTime);
  const endStr = formatShortDate(getDisplayEndDate(event));
  return `${startStr} - ${endStr}`;
}

/**
 * Extracts URLs from event description
 */
export function extractLinksFromDescription(description: string): string[] {
  const urlRegex = /(?:(?:https?|ftp):\/\/)?[\w/\-?=%.]+\.[\w/\-?=%.]+/g;
  return description.match(urlRegex) || [];
}

/**
 * Sort events by time within a day
 */
export function sortEventsByTime(events: CalendarEvent[]): CalendarEvent[] {
  return [...events].sort((a, b) => {
    // All-day events first
    if (a.isAllDay && !b.isAllDay) return -1;
    if (!a.isAllDay && b.isAllDay) return 1;

    // Then by start time
    return a.start.dateTime.getTime() - b.start.dateTime.getTime();
  });
}

/**
 * Format time for event display
 * Returns "Hele dag" for all-day events
 */
export function getEventTimeDisplay(event: CalendarEvent): string {
  if (event.isAllDay) {
    return "Hele dag";
  }
  return formatEventTime(event.start.dateTime, event.end.dateTime);
}

/**
 * Get the number of days an event spans
 */
export function getEventDayCount(event: CalendarEvent): number {
  if (!event.isMultiDay) return 1;

  const startDate = new Date(event.start.dateTime);
  startDate.setHours(0, 0, 0, 0);

  const endDate = getDisplayEndDate(event);
  endDate.setHours(0, 0, 0, 0);

  const diffTime = endDate.getTime() - startDate.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays + 1;
}
