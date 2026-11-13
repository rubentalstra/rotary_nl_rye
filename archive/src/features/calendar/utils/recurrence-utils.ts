/**
 * Recurrence parsing and formatting utilities
 * Parses RRULE strings and generates human-readable descriptions in Dutch
 */

import type { RecurrencePattern } from "../types";

// Dutch day names for localized output
const DUTCH_DAYS: Record<string, string> = {
  MO: "maandag",
  TU: "dinsdag",
  WE: "woensdag",
  TH: "donderdag",
  FR: "vrijdag",
  SA: "zaterdag",
  SU: "zondag",
};

const DUTCH_MONTHS = [
  "januari",
  "februari",
  "maart",
  "april",
  "mei",
  "juni",
  "juli",
  "augustus",
  "september",
  "oktober",
  "november",
  "december",
];

const ORDINALS: Record<number, string> = {
  1: "eerste",
  2: "tweede",
  3: "derde",
  4: "vierde",
  5: "vijfde",
  [-1]: "laatste",
  [-2]: "voorlaatste",
};

/**
 * Parse RRULE string into RecurrencePattern
 */
export function parseRRULE(rruleString: string): RecurrencePattern {
  // Remove 'RRULE:' prefix if present
  const rule = rruleString.replace("RRULE:", "");

  const parts = rule.split(";");
  const pattern: RecurrencePattern = {
    frequency: "weekly",
    interval: 1,
  };

  for (const part of parts) {
    const [key, value] = part.split("=");

    switch (key) {
      case "FREQ":
        pattern.frequency = value.toLowerCase() as RecurrencePattern["frequency"];
        break;
      case "INTERVAL":
        pattern.interval = parseInt(value, 10);
        break;
      case "BYDAY":
        pattern.byDay = value.split(",");
        break;
      case "BYMONTHDAY":
        pattern.byMonthDay = value.split(",").map((v) => parseInt(v, 10));
        break;
      case "BYMONTH":
        pattern.byMonth = value.split(",").map((v) => parseInt(v, 10));
        break;
      case "BYSETPOS":
        pattern.bySetPos = value.split(",").map((v) => parseInt(v, 10));
        break;
      case "COUNT":
        pattern.count = parseInt(value, 10);
        break;
      case "UNTIL":
        pattern.until = parseRRULEDate(value);
        break;
      case "WKST":
        pattern.weekStart = value;
        break;
    }
  }

  return pattern;
}

/**
 * Parse RRULE date format (YYYYMMDD or YYYYMMDDTHHMMSSZ)
 */
function parseRRULEDate(dateStr: string): Date {
  if (dateStr.includes("T")) {
    // Format: YYYYMMDDTHHMMSSZ
    const year = parseInt(dateStr.substring(0, 4), 10);
    const month = parseInt(dateStr.substring(4, 6), 10) - 1;
    const day = parseInt(dateStr.substring(6, 8), 10);
    const hour = parseInt(dateStr.substring(9, 11), 10);
    const minute = parseInt(dateStr.substring(11, 13), 10);
    const second = parseInt(dateStr.substring(13, 15), 10);
    return new Date(Date.UTC(year, month, day, hour, minute, second));
  }

  // Format: YYYYMMDD
  const year = parseInt(dateStr.substring(0, 4), 10);
  const month = parseInt(dateStr.substring(4, 6), 10) - 1;
  const day = parseInt(dateStr.substring(6, 8), 10);
  return new Date(year, month, day);
}

/**
 * Generate human-readable recurrence description in Dutch
 */
export function getHumanReadableRecurrence(pattern: RecurrencePattern): {
  full: string;
  short: string;
} {
  const { interval } = pattern;

  switch (pattern.frequency) {
    case "daily":
      return getDailyDescription(interval);
    case "weekly":
      return getWeeklyDescription(interval, pattern);
    case "monthly":
      return getMonthlyDescription(interval, pattern);
    case "yearly":
      return getYearlyDescription(interval, pattern);
    default:
      return { full: "Herhaalt", short: "Herhaalt" };
  }
}

function getDailyDescription(interval: number): {
  full: string;
  short: string;
} {
  if (interval === 1) {
    return { full: "Elke dag", short: "Dagelijks" };
  }
  return { full: `Elke ${interval} dagen`, short: "Dagelijks" };
}

function getWeeklyDescription(
  interval: number,
  pattern: RecurrencePattern,
): { full: string; short: string } {
  const days = pattern.byDay;

  if (!days || days.length === 0) {
    if (interval === 1) {
      return { full: "Elke week", short: "Wekelijks" };
    }
    return { full: `Elke ${interval} weken`, short: "Wekelijks" };
  }

  // Parse days (could be like '1MO' for first Monday, or just 'MO')
  const dayNames = days.map((d) => {
    const dayCode = d.replace(/^-?\d+/, "");
    return DUTCH_DAYS[dayCode] || dayCode;
  });

  if (days.length === 1) {
    if (interval === 1) {
      return {
        full: `Elke ${dayNames[0]}`,
        short: "Wekelijks",
      };
    }
    return {
      full: `Elke ${interval} weken op ${dayNames[0]}`,
      short: "Wekelijks",
    };
  }

  if (
    days.length === 5 &&
    days.includes("MO") &&
    days.includes("TU") &&
    days.includes("WE") &&
    days.includes("TH") &&
    days.includes("FR")
  ) {
    if (interval === 1) {
      return { full: "Elke werkdag", short: "Werkdagen" };
    }
    return { full: `Elke ${interval} weken op werkdagen`, short: "Werkdagen" };
  }

  const lastDay = dayNames.pop();
  const daysStr = dayNames.join(", ") + " en " + lastDay;

  if (interval === 1) {
    return { full: `Elke week op ${daysStr}`, short: "Wekelijks" };
  }
  return { full: `Elke ${interval} weken op ${daysStr}`, short: "Wekelijks" };
}

function getMonthlyDescription(
  interval: number,
  pattern: RecurrencePattern,
): { full: string; short: string } {
  const shortText = interval === 1 ? "Maandelijks" : `Elke ${interval} maanden`;

  // Monthly by day of month
  if (pattern.byMonthDay && pattern.byMonthDay.length > 0) {
    const day = pattern.byMonthDay[0];
    const dayStr = day === -1 ? "de laatste dag" : `dag ${day}`;

    if (interval === 1) {
      return { full: `Elke maand op ${dayStr}`, short: "Maandelijks" };
    }
    return { full: `Elke ${interval} maanden op ${dayStr}`, short: shortText };
  }

  // Monthly by week position (e.g., second Tuesday)
  if (pattern.byDay && pattern.bySetPos) {
    const pos = pattern.bySetPos[0];
    const dayCode = pattern.byDay[0].replace(/^-?\d+/, "");
    const dayName = DUTCH_DAYS[dayCode] || dayCode;
    const ordinal = ORDINALS[pos] || `${pos}e`;

    if (interval === 1) {
      return {
        full: `Elke ${ordinal} ${dayName} van de maand`,
        short: "Maandelijks",
      };
    }
    return {
      full: `Elke ${interval} maanden op de ${ordinal} ${dayName}`,
      short: shortText,
    };
  }

  if (interval === 1) {
    return { full: "Elke maand", short: "Maandelijks" };
  }
  return { full: `Elke ${interval} maanden`, short: shortText };
}

function getYearlyDescription(
  interval: number,
  pattern: RecurrencePattern,
): { full: string; short: string } {
  const shortText = interval === 1 ? "Jaarlijks" : `Elke ${interval} jaar`;

  if (pattern.byMonth && pattern.byMonth.length > 0) {
    const monthName = DUTCH_MONTHS[pattern.byMonth[0] - 1];

    if (pattern.byMonthDay && pattern.byMonthDay.length > 0) {
      const day = pattern.byMonthDay[0];
      if (interval === 1) {
        return { full: `Elk jaar op ${day} ${monthName}`, short: "Jaarlijks" };
      }
      return {
        full: `Elke ${interval} jaar op ${day} ${monthName}`,
        short: shortText,
      };
    }

    if (interval === 1) {
      return { full: `Elk jaar in ${monthName}`, short: "Jaarlijks" };
    }
    return { full: `Elke ${interval} jaar in ${monthName}`, short: shortText };
  }

  if (interval === 1) {
    return { full: "Elk jaar", short: "Jaarlijks" };
  }
  return { full: `Elke ${interval} jaar`, short: shortText };
}

/**
 * Get short recurrence badge text
 */
export function getRecurrenceBadgeText(pattern: RecurrencePattern): string {
  switch (pattern.frequency) {
    case "daily":
      return pattern.interval === 1 ? "Dag" : `${pattern.interval}d`;
    case "weekly":
      return pattern.interval === 1 ? "Week" : `${pattern.interval}w`;
    case "monthly":
      return pattern.interval === 1 ? "Maand" : `${pattern.interval}m`;
    case "yearly":
      return pattern.interval === 1 ? "Jaar" : `${pattern.interval}j`;
    default:
      return "Herhaalt";
  }
}

/**
 * Get icon name for recurrence frequency
 */
export function getRecurrenceIcon(frequency: RecurrencePattern["frequency"]): string {
  switch (frequency) {
    case "daily":
      return "today-outline";
    case "weekly":
      return "calendar-outline";
    case "monthly":
      return "calendar";
    case "yearly":
      return "calendar-sharp";
    default:
      return "repeat";
  }
}
