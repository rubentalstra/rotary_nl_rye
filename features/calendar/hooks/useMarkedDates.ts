/**
 * Hook for creating multi-dot marked dates for calendar component
 * Supports color-coded dots based on event colors
 */

import { useMemo } from "react";
import type { EventsData, MarkedDates } from "../types";
import { getUniqueEventColors } from "../utils/colorUtils";

interface UseMarkedDatesOptions {
  eventsData: EventsData;
  selectedDate: string;
  defaultDotColor: string;
  selectedColor: string;
  selectedTextColor: string;
  maxDotsPerDay?: number;
}

/**
 * Creates marked dates object with multi-dot support for calendar display
 * Each day with events shows up to 3 colored dots based on event colors
 */
export function useMarkedDates({
  eventsData,
  selectedDate,
  defaultDotColor,
  selectedColor,
  selectedTextColor,
  maxDotsPerDay = 3,
}: UseMarkedDatesOptions): MarkedDates {
  return useMemo(() => {
    const marked: MarkedDates = {};

    // Add dots for days with events
    Object.keys(eventsData).forEach((dateKey) => {
      const events = eventsData[dateKey];
      if (events && events.length > 0) {
        // Get unique colors for this day (max 3)
        const colors = getUniqueEventColors(events, maxDotsPerDay);

        // Create dot objects
        const dots = colors.map((color, index) => ({
          key: `dot-${index}`,
          color,
        }));

        marked[dateKey] = {
          marked: true,
          dots,
        };
      }
    });

    // Add selection styling
    marked[selectedDate] = {
      ...marked[selectedDate],
      selected: true,
      selectedColor,
      selectedTextColor,
    };

    return marked;
  }, [eventsData, selectedDate, selectedColor, selectedTextColor, maxDotsPerDay]);
}
