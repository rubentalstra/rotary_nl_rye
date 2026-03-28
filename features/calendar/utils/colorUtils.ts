/**
 * Color utilities for calendar events
 */

import { type CalendarEvent, type EventColor, GOOGLE_CALENDAR_COLORS } from "../types";

// Default Rotary Royal Blue
const DEFAULT_EVENT_COLOR = "#17458f";

/**
 * Get event color by ID or return default
 */
export function getEventColor(
  colorId?: string,
  defaultColor: string = DEFAULT_EVENT_COLOR,
): string {
  if (colorId && GOOGLE_CALENDAR_COLORS[colorId]) {
    return GOOGLE_CALENDAR_COLORS[colorId].background;
  }
  return defaultColor;
}

/**
 * Get full event color object by ID
 */
export function getEventColorObject(colorId?: string): EventColor | undefined {
  if (colorId && GOOGLE_CALENDAR_COLORS[colorId]) {
    return GOOGLE_CALENDAR_COLORS[colorId];
  }
  return undefined;
}

/**
 * Get text color for event background
 */
export function getEventTextColor(colorId?: string): string {
  if (colorId && GOOGLE_CALENDAR_COLORS[colorId]) {
    return GOOGLE_CALENDAR_COLORS[colorId].foreground;
  }
  return "#ffffff";
}

/**
 * Get a lighter version of a color for backgrounds
 */
export function lightenColor(color: string, amount: number = 0.3): string {
  const hex = color.replace("#", "");
  const r = Math.min(255, parseInt(hex.slice(0, 2), 16) + 255 * amount);
  const g = Math.min(255, parseInt(hex.slice(2, 4), 16) + 255 * amount);
  const b = Math.min(255, parseInt(hex.slice(4, 6), 16) + 255 * amount);

  return `#${Math.round(r).toString(16).padStart(2, "0")}${Math.round(g).toString(16).padStart(2, "0")}${Math.round(b).toString(16).padStart(2, "0")}`;
}

/**
 * Get unique colors for multi-dot display (max 3)
 */
export function getUniqueEventColors(events: CalendarEvent[], maxDots: number = 3): string[] {
  const colors = new Set<string>();

  for (const event of events) {
    if (colors.size >= maxDots) break;

    const color = event.color?.background || DEFAULT_EVENT_COLOR;
    colors.add(color);
  }

  return Array.from(colors);
}

/**
 * Adjust color opacity
 */
export function withOpacity(color: string, opacity: number): string {
  const hex = color.replace("#", "");
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

/**
 * Check if a color is light (for determining text color)
 */
export function isLightColor(color: string): boolean {
  const hex = color.replace("#", "");
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  // Using luminance formula
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5;
}

/**
 * Get contrasting text color for a background
 */
export function getContrastingTextColor(backgroundColor: string): string {
  return isLightColor(backgroundColor) ? "#1d1d1d" : "#ffffff";
}
