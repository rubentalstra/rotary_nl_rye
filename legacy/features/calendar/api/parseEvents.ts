/**
 * Event parsing utilities for Google Calendar API v3
 * Transforms raw API responses into our internal CalendarEvent format
 */

import type {
  CalendarEvent,
  ConferenceData,
  ConferenceEntryPoint,
  EventAttachment,
  EventColor,
  EventTime,
  EventTypeBadge,
  GoogleCalendarDateTime,
  GoogleCalendarEvent,
  GoogleConferenceData,
  GoogleConferenceEntryPoint,
  GoogleEventAttachment,
  RecurrenceInfo,
} from "../types";
import { EVENT_TYPE_CONFIG, GOOGLE_CALENDAR_COLORS } from "../types";
import { getHumanReadableRecurrence, parseRRULE } from "../utils/recurrenceUtils";

/**
 * Parse a single Google Calendar event into our internal format
 */
export function parseEvent(raw: GoogleCalendarEvent): CalendarEvent {
  const start = parseEventTime(raw.start);
  const end = parseEventTime(raw.end);

  const isAllDay = start.isAllDay;
  const isMultiDay = calculateIsMultiDay(start, end, isAllDay);

  return {
    id: raw.id,
    status: raw.status || "confirmed",
    htmlLink: raw.htmlLink || "",
    created: new Date(raw.created || Date.now()),
    updated: new Date(raw.updated || Date.now()),
    summary: raw.summary || "Naamloos evenement",
    description: raw.description || "",
    location: raw.location || "",

    creator: {
      email: raw.creator?.email || "",
      displayName: raw.creator?.displayName,
    },
    organizer: {
      email: raw.organizer?.email || "",
      displayName: raw.organizer?.displayName,
    },

    start,
    end,
    isAllDay,
    isMultiDay,

    recurrence: parseRecurrence(raw),
    conference: parseConferenceData(raw.conferenceData, raw.hangoutLink),
    hasVideoMeeting: hasVideoMeeting(raw),

    color: parseEventColor(raw.colorId),
    eventType: parseEventType(raw.eventType),
    transparency: raw.transparency === "transparent" ? "free" : "busy",

    attachments: parseAttachments(raw.attachments),

    _original: raw,
  };
}

/**
 * Parse event time from Google Calendar format
 */
function parseEventTime(dt: GoogleCalendarDateTime | undefined): EventTime {
  if (!dt) {
    return { dateTime: new Date(), isAllDay: false };
  }

  if (dt.date) {
    // All-day event
    return {
      dateTime: new Date(`${dt.date}T00:00:00`),
      timeZone: dt.timeZone,
      isAllDay: true,
    };
  }

  return {
    dateTime: new Date(dt.dateTime || Date.now()),
    timeZone: dt.timeZone,
    isAllDay: false,
  };
}

/**
 * Calculate if event spans multiple days
 */
function calculateIsMultiDay(start: EventTime, end: EventTime, isAllDay: boolean): boolean {
  const startDate = new Date(start.dateTime);
  const endDate = new Date(end.dateTime);

  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(0, 0, 0, 0);

  if (isAllDay) {
    // For all-day events, end is exclusive
    const actualEnd = new Date(endDate.getTime() - 24 * 60 * 60 * 1000);
    return startDate.getTime() !== actualEnd.getTime();
  }

  return startDate.getTime() !== endDate.getTime();
}

/**
 * Parse recurrence information
 */
function parseRecurrence(raw: GoogleCalendarEvent): RecurrenceInfo {
  // Check if this is an instance of a recurring event
  if (raw.recurringEventId) {
    return {
      isRecurring: true,
      isInstance: true,
      parentEventId: raw.recurringEventId,
      humanReadable: "Herhalend evenement",
      humanReadableShort: "Herhaalt",
    };
  }

  // Check if this is a recurring event with RRULE
  if (raw.recurrence && raw.recurrence.length > 0) {
    const rruleString = raw.recurrence.find((r) => r.startsWith("RRULE:"));
    if (rruleString) {
      const pattern = parseRRULE(rruleString);
      const { full, short } = getHumanReadableRecurrence(pattern);

      return {
        isRecurring: true,
        isInstance: false,
        pattern,
        humanReadable: full,
        humanReadableShort: short,
      };
    }
  }

  return {
    isRecurring: false,
    isInstance: false,
    humanReadable: "",
    humanReadableShort: "",
  };
}

/**
 * Parse conference/meeting data
 */
function parseConferenceData(
  conferenceData?: GoogleConferenceData,
  hangoutLink?: string,
): ConferenceData | undefined {
  // Fallback to hangoutLink if no conferenceData
  if (!conferenceData && hangoutLink) {
    return {
      type: "googleMeet",
      name: "Google Meet",
      meetingLink: hangoutLink,
      phoneEntryPoints: [],
      dialInNumbers: [],
    };
  }

  if (!conferenceData) {
    return undefined;
  }

  const solution = conferenceData.conferenceSolution;
  const type =
    solution?.key?.type === "hangoutsMeet"
      ? "googleMeet"
      : solution?.key?.type === "eventHangout"
        ? "hangout"
        : "other";

  const entryPoints = conferenceData.entryPoints || [];

  const videoEntry = entryPoints.find((ep) => ep.entryPointType === "video");
  const phoneEntries = entryPoints.filter((ep) => ep.entryPointType === "phone");
  const sipEntry = entryPoints.find((ep) => ep.entryPointType === "sip");

  const dialInNumbers = phoneEntries.map((ep) => ({
    number: ep.uri?.replace("tel:", "") || ep.label || "",
    region: ep.regionCode,
    pin: ep.pin || ep.accessCode,
  }));

  return {
    type,
    name: solution?.name || "Video Meeting",
    iconUri: solution?.iconUri,
    conferenceId: conferenceData.conferenceId,
    notes: conferenceData.notes,

    videoEntryPoint: videoEntry ? parseEntryPoint(videoEntry) : undefined,
    phoneEntryPoints: phoneEntries.map(parseEntryPoint),
    sipEntryPoint: sipEntry ? parseEntryPoint(sipEntry) : undefined,

    meetingLink: videoEntry?.uri,
    meetingId: conferenceData.conferenceId || videoEntry?.meetingCode,
    dialInNumbers,
  };
}

/**
 * Parse a single entry point
 */
function parseEntryPoint(ep: GoogleConferenceEntryPoint): ConferenceEntryPoint {
  return {
    type: ep.entryPointType,
    uri: ep.uri || "",
    label: ep.label || "",
    pin: ep.pin,
    accessCode: ep.accessCode,
    meetingCode: ep.meetingCode,
    passcode: ep.passcode || ep.password,
    regionCode: ep.regionCode,
  };
}

/**
 * Check if event has video meeting
 */
function hasVideoMeeting(raw: GoogleCalendarEvent): boolean {
  if (raw.hangoutLink) return true;
  if (raw.conferenceData?.entryPoints?.some((ep) => ep.entryPointType === "video")) return true;
  return false;
}

/**
 * Parse event color
 */
function parseEventColor(colorId?: string): EventColor | undefined {
  if (!colorId) return undefined;
  return GOOGLE_CALENDAR_COLORS[colorId];
}

/**
 * Parse event type
 */
function parseEventType(eventType?: string): EventTypeBadge {
  if (!eventType || eventType === "default") {
    return EVENT_TYPE_CONFIG.default;
  }
  return EVENT_TYPE_CONFIG[eventType] || EVENT_TYPE_CONFIG.default;
}

/**
 * Parse attachments
 */
function parseAttachments(attachments?: GoogleEventAttachment[]): EventAttachment[] {
  if (!attachments) return [];

  return attachments.map((att, index) => ({
    id: att.fileId || `attachment-${index}`,
    title: att.title,
    url: att.fileUrl,
    mimeType: att.mimeType,
    iconUrl: att.iconLink,
    fileType: getFileType(att.mimeType),
  }));
}

/**
 * Determine file type from mime type
 */
function getFileType(mimeType: string): EventAttachment["fileType"] {
  if (mimeType.includes("document") || mimeType.includes("word")) return "document";
  if (mimeType.includes("spreadsheet") || mimeType.includes("excel")) return "spreadsheet";
  if (mimeType.includes("presentation") || mimeType.includes("powerpoint")) return "presentation";
  if (mimeType.includes("pdf")) return "pdf";
  if (mimeType.startsWith("image/")) return "image";
  if (mimeType.startsWith("video/")) return "video";
  if (mimeType.startsWith("audio/")) return "audio";
  return "other";
}
