/**
 * Calendar feature types - Google Calendar API v3 Complete Integration
 */

// =============================================================================
// Google Calendar API v3 Raw Types (as received from API)
// =============================================================================

/**
 * Google Calendar API DateTime
 */
export interface GoogleCalendarDateTime {
  dateTime?: string;
  date?: string;
  timeZone?: string;
}

/**
 * Conference Entry Point (dial-in, video, etc.)
 */
export interface GoogleConferenceEntryPoint {
  entryPointType: "video" | "phone" | "sip" | "more";
  uri?: string;
  label?: string;
  pin?: string;
  accessCode?: string;
  meetingCode?: string;
  passcode?: string;
  password?: string;
  regionCode?: string;
}

/**
 * Conference Solution Key
 */
export interface GoogleConferenceSolutionKey {
  type: "eventHangout" | "eventNamedHangout" | "hangoutsMeet" | "addOn";
}

/**
 * Conference Solution (Google Meet, etc.)
 */
export interface GoogleConferenceSolution {
  key: GoogleConferenceSolutionKey;
  name: string;
  iconUri?: string;
}

/**
 * Conference Data from Google Calendar API
 */
export interface GoogleConferenceData {
  createRequest?: {
    requestId: string;
    conferenceSolutionKey: GoogleConferenceSolutionKey;
    status: { statusCode: "pending" | "success" | "failure" };
  };
  entryPoints?: GoogleConferenceEntryPoint[];
  conferenceSolution?: GoogleConferenceSolution;
  conferenceId?: string;
  signature?: string;
  notes?: string;
}

/**
 * Event Attachment
 */
export interface GoogleEventAttachment {
  fileUrl: string;
  title: string;
  mimeType: string;
  iconLink?: string;
  fileId?: string;
}

/**
 * Creator/Organizer
 */
export interface GoogleEventPerson {
  id?: string;
  email: string;
  displayName?: string;
  self?: boolean;
}

/**
 * Google Calendar API Event (raw from API)
 */
export interface GoogleCalendarEvent {
  id: string;
  status: "confirmed" | "tentative" | "cancelled";
  htmlLink: string;
  created: string;
  updated: string;
  summary: string;
  description?: string;
  location?: string;
  colorId?: string;
  creator?: GoogleEventPerson;
  organizer?: GoogleEventPerson;
  start: GoogleCalendarDateTime;
  end: GoogleCalendarDateTime;

  // Recurrence fields
  recurrence?: string[]; // RRULE strings for parent events
  recurringEventId?: string; // ID of parent recurring event
  originalStartTime?: GoogleCalendarDateTime; // Original start for exceptions

  // Conference/Meeting fields
  conferenceData?: GoogleConferenceData;
  hangoutLink?: string; // Direct Google Meet link

  // Event metadata
  eventType?: "default" | "outOfOffice" | "focusTime" | "workingLocation" | "fromGmail";
  transparency?: "opaque" | "transparent";
  visibility?: "default" | "public" | "private" | "confidential";

  // Attachments
  attachments?: GoogleEventAttachment[];

  // Extended properties
  extendedProperties?: {
    private?: Record<string, string>;
    shared?: Record<string, string>;
  };
}

/**
 * Google Calendar API Response
 */
export interface GoogleCalendarResponse {
  kind: string;
  etag: string;
  summary: string;
  updated: string;
  timeZone: string;
  accessRole: string;
  nextPageToken?: string;
  nextSyncToken?: string;
  items?: GoogleCalendarEvent[];
}

// =============================================================================
// Parsed/Processed Types (for internal use)
// =============================================================================

/**
 * Parsed Conference Entry Point
 */
export interface ConferenceEntryPoint {
  type: "video" | "phone" | "sip" | "more";
  uri: string;
  label: string;
  pin?: string;
  accessCode?: string;
  meetingCode?: string;
  passcode?: string;
  regionCode?: string;
}

/**
 * Parsed Conference/Meeting Data
 */
export interface ConferenceData {
  type: "googleMeet" | "hangout" | "other";
  name: string;
  iconUri?: string;
  conferenceId?: string;
  notes?: string;

  // Entry points
  videoEntryPoint?: ConferenceEntryPoint;
  phoneEntryPoints: ConferenceEntryPoint[];
  sipEntryPoint?: ConferenceEntryPoint;

  // Quick access
  meetingLink?: string;
  meetingId?: string;
  dialInNumbers: {
    number: string;
    region?: string;
    pin?: string;
  }[];
}

/**
 * Recurrence Pattern (parsed from RRULE)
 */
export interface RecurrencePattern {
  frequency: "daily" | "weekly" | "monthly" | "yearly";
  interval: number;
  byDay?: string[]; // ['MO', 'TU', 'WE', etc.]
  byMonthDay?: number[]; // [1, 15, -1, etc.]
  byMonth?: number[]; // [1, 6, 12, etc.]
  bySetPos?: number[]; // [1, -1, etc.]
  count?: number;
  until?: Date;
  weekStart?: string; // 'MO', 'SU', etc.
}

/**
 * Recurrence Info (for display)
 */
export interface RecurrenceInfo {
  isRecurring: boolean;
  isInstance: boolean; // Is this an instance of a recurring event?
  parentEventId?: string; // ID of parent recurring event
  pattern?: RecurrencePattern;
  humanReadable: string; // "Every Monday", "Weekly on Tuesday", etc.
  humanReadableShort: string; // "Weekly", "Monthly", etc.
  nextOccurrence?: Date;
}

/**
 * Event Color (Google Calendar color palette)
 */
export interface EventColor {
  id: string;
  background: string;
  foreground: string;
  name: string;
}

/**
 * Event Type Badge Info
 */
export interface EventTypeBadge {
  type: "default" | "focusTime" | "outOfOffice" | "workingLocation";
  label: string;
  icon: string;
  color: string;
}

/**
 * Parsed Attachment
 */
export interface EventAttachment {
  id: string;
  title: string;
  url: string;
  mimeType: string;
  iconUrl?: string;
  fileType:
    | "document"
    | "spreadsheet"
    | "presentation"
    | "pdf"
    | "image"
    | "video"
    | "audio"
    | "other";
}

/**
 * Event time with parsed Date
 */
export interface EventTime {
  dateTime: Date;
  timeZone?: string;
  isAllDay: boolean;
}

/**
 * Parsed calendar event (for internal use)
 */
export interface CalendarEvent {
  // Core fields
  id: string;
  status: "confirmed" | "tentative" | "cancelled";
  htmlLink: string;
  created: Date;
  updated: Date;
  summary: string;
  description: string;
  location: string;

  // People
  creator: { email: string; displayName?: string };
  organizer: { email: string; displayName?: string };

  // Time
  start: EventTime;
  end: EventTime;
  isAllDay: boolean;
  isMultiDay: boolean;

  // Recurrence
  recurrence: RecurrenceInfo;

  // Conference/Meeting
  conference?: ConferenceData;
  hasVideoMeeting: boolean;

  // Visual
  color?: EventColor;
  eventType: EventTypeBadge;
  transparency: "busy" | "free";

  // Attachments
  attachments: EventAttachment[];

  // Original data (for edge cases)
  _original: GoogleCalendarEvent;
}

/**
 * Events grouped by date string (YYYY-MM-DD)
 */
export interface EventsData {
  [date: string]: CalendarEvent[];
}

/**
 * Dot marking for calendar (supports multiple dots)
 */
export interface DotMarking {
  key: string;
  color: string;
}

/**
 * Marked dates for calendar component with multi-dot support
 */
export interface MarkedDates {
  [date: string]: {
    marked?: boolean;
    dots?: DotMarking[];
    selected?: boolean;
    selectedColor?: string;
    selectedTextColor?: string;
  };
}

// =============================================================================
// Constants
// =============================================================================

/**
 * Google Calendar Color Palette
 * These are the standard colorId values and their corresponding colors
 */
export const GOOGLE_CALENDAR_COLORS: Record<string, EventColor> = {
  "1": {
    id: "1",
    background: "#a4bdfc",
    foreground: "#1d1d1d",
    name: "Lavender",
  },
  "2": { id: "2", background: "#7ae7bf", foreground: "#1d1d1d", name: "Sage" },
  "3": { id: "3", background: "#dbadff", foreground: "#1d1d1d", name: "Grape" },
  "4": {
    id: "4",
    background: "#ff887c",
    foreground: "#1d1d1d",
    name: "Flamingo",
  },
  "5": {
    id: "5",
    background: "#fbd75b",
    foreground: "#1d1d1d",
    name: "Banana",
  },
  "6": {
    id: "6",
    background: "#ffb878",
    foreground: "#1d1d1d",
    name: "Tangerine",
  },
  "7": {
    id: "7",
    background: "#46d6db",
    foreground: "#1d1d1d",
    name: "Peacock",
  },
  "8": {
    id: "8",
    background: "#e1e1e1",
    foreground: "#1d1d1d",
    name: "Graphite",
  },
  "9": {
    id: "9",
    background: "#5484ed",
    foreground: "#ffffff",
    name: "Blueberry",
  },
  "10": {
    id: "10",
    background: "#51b749",
    foreground: "#1d1d1d",
    name: "Basil",
  },
  "11": {
    id: "11",
    background: "#dc2127",
    foreground: "#ffffff",
    name: "Tomato",
  },
};

/**
 * Event Type Configurations
 */
export const EVENT_TYPE_CONFIG: Record<string, EventTypeBadge> = {
  default: { type: "default", label: "", icon: "", color: "transparent" },
  focusTime: {
    type: "focusTime",
    label: "Focus Time",
    icon: "headset",
    color: "#9C27B0",
  },
  outOfOffice: {
    type: "outOfOffice",
    label: "Afwezig",
    icon: "airplane",
    color: "#FF5722",
  },
  workingLocation: {
    type: "workingLocation",
    label: "Werklocatie",
    icon: "briefcase",
    color: "#2196F3",
  },
};
