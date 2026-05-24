/**
 * Calendar utilities exports
 */

export {
  ensureDate,
  isSameDay,
  formatDateKey,
  getEventsForDay,
  formatEventDate,
  formatEventDateCapitalized,
  formatEventTime,
  formatShortDate,
  formatSectionDate,
  getRelativeDateString,
  getDisplayDate,
  isMultiDayEvent,
  isAllDayEvent,
  getDisplayEndDate,
  formatDateRange,
  extractLinksFromDescription,
  sortEventsByTime,
  getEventTimeDisplay,
  getEventDayCount,
} from "./dateUtils";

export {
  parseRRULE,
  getHumanReadableRecurrence,
  getRecurrenceBadgeText,
  getRecurrenceIcon,
} from "./recurrenceUtils";

export {
  openMeetingLink,
  copyToClipboard,
  formatMeetingId,
  formatPhoneNumber,
  dialPhoneNumber,
  getMeetingTypeIcon,
  getMeetingProviderName,
  hasDialInOptions,
  getDialInDetails,
  buildDialInInfoText,
} from "./meetingUtils";

export {
  getEventColor,
  getEventColorObject,
  getEventTextColor,
  lightenColor,
  getUniqueEventColors,
  withOpacity,
  isLightColor,
  getContrastingTextColor,
} from "./colorUtils";
