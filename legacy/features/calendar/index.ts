/**
 * Calendar feature public API
 */

// Components
export {
  CalendarView,
  EventCard,
  EventsList,
  EventModal,
  MeetingSection,
  RecurrenceBadge,
  EventTypeBadge,
  AttachmentsList,
} from "./components";

// Hooks
export {
  useCalendarEvents,
  useMarkedDates,
  useSelectedDate,
  useMeetingActions,
  useEventDetails,
} from "./hooks";

// Types
export type {
  CalendarEvent,
  EventsData,
  MarkedDates,
  DotMarking,
  GoogleCalendarEvent,
  GoogleCalendarResponse,
  GoogleCalendarDateTime,
  EventTime,
  RecurrenceInfo,
  RecurrencePattern,
  ConferenceData,
  ConferenceEntryPoint,
  EventColor,
  EventTypeBadge as EventTypeBadgeType,
  EventAttachment,
  GoogleEventPerson,
  GoogleConferenceData,
  GoogleEventAttachment,
} from "./types";

// Constants
export { GOOGLE_CALENDAR_COLORS, EVENT_TYPE_CONFIG } from "./types";

// Utils
export {
  formatDateKey,
  getEventsForDay,
  formatEventDate,
  formatEventTime,
  isMultiDayEvent,
  isAllDayEvent,
  extractLinksFromDescription,
  getDisplayDate,
  getRelativeDateString,
  sortEventsByTime,
  getEventColor,
  getUniqueEventColors,
  parseRRULE,
  getHumanReadableRecurrence,
} from "./utils";

// API
export { fetchCalendarEvents, parseEvent } from "./api";
