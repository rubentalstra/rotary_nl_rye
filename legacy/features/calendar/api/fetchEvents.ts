/**
 * Calendar API for fetching events from Google Calendar API v3
 * With full support for conference data, recurrence, colors, and attachments
 */

import { fetch } from "expo/fetch";
import { env } from "@/core/config/env";
import type { CalendarEvent, EventsData, GoogleCalendarResponse } from "../types";
import { parseEvent } from "./parseEvents";

const TIMEOUT = 30000;
const MAX_RESULTS = 2500;
const YEARS_BEFORE = 1;
const YEARS_AHEAD = 1;

/**
 * Fetches calendar events from Google Calendar API v3
 * Uses a dynamic rolling window: 1 year behind to 1 year ahead
 */
export async function fetchCalendarEvents(): Promise<EventsData> {
  try {
    const now = new Date();
    const timeMin = new Date(now.getFullYear() - YEARS_BEFORE, now.getMonth(), 1);
    const timeMax = new Date(now.getFullYear() + YEARS_AHEAD, now.getMonth() + 1, 0);

    const params = new URLSearchParams({
      key: env.googleApiKey,
      timeMin: timeMin.toISOString(),
      timeMax: timeMax.toISOString(),
      singleEvents: "true",
      orderBy: "startTime",
      maxResults: MAX_RESULTS.toString(),
    });

    const url = `https://www.googleapis.com/calendar/v3/calendars/${env.googleCalendarId}/events?${params}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Calendar API error (${response.status})`);
      }

      const data: GoogleCalendarResponse = await response.json();
      return parseAndGroupEvents(data);
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === "AbortError") {
        throw new Error("Request timed out. Please check your internet connection.");
      }
      throw new Error(`Unable to fetch calendar events: ${error.message}`);
    }
    throw new Error("Unable to fetch calendar events");
  }
}

/**
 * Parse and group events by date
 */
function parseAndGroupEvents(data: GoogleCalendarResponse): EventsData {
  if (!data?.items || !Array.isArray(data.items)) {
    return {};
  }

  const events = data.items.filter((item) => item?.status !== "cancelled").map(parseEvent);

  return groupEventsByDate(events);
}

/**
 * Groups events by date for calendar display
 *
 * Google Calendar API behavior:
 * - All-day events (date field): end date is EXCLUSIVE
 *   Example: start="2015-11-13", end="2015-11-16" → Nov 13, 14, 15 (NOT 16)
 * - Timed events (dateTime field): includes the end day
 */
function groupEventsByDate(events: CalendarEvent[]): EventsData {
  const eventsData: EventsData = {};

  for (const event of events) {
    const startDate = new Date(event.start.dateTime);
    const endDate = new Date(event.end.dateTime);

    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);

    const currentDate = new Date(startDate);

    if (event.isAllDay) {
      // All-day events: end date is EXCLUSIVE (don't include it)
      while (currentDate < endDate) {
        const dateKey = formatDateKey(currentDate);
        if (!eventsData[dateKey]) eventsData[dateKey] = [];
        eventsData[dateKey].push(event);
        currentDate.setDate(currentDate.getDate() + 1);
      }
    } else {
      // Timed events: include the end day
      while (currentDate <= endDate) {
        const dateKey = formatDateKey(currentDate);
        if (!eventsData[dateKey]) eventsData[dateKey] = [];
        eventsData[dateKey].push(event);
        currentDate.setDate(currentDate.getDate() + 1);
      }
    }
  }

  return eventsData;
}

/**
 * Format a date as YYYY-MM-DD
 */
function formatDateKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
