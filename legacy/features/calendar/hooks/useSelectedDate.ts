/**
 * Hook for managing selected date state
 */

import { useCallback, useState } from "react";
import { formatDateKey } from "../utils";

export function useSelectedDate(initialDate?: Date) {
  const [selectedDate, setSelectedDate] = useState<string>(
    formatDateKey(initialDate || new Date()),
  );

  const onDayPress = useCallback((day: { dateString: string }) => {
    setSelectedDate(day.dateString);
  }, []);

  const selectToday = useCallback(() => {
    setSelectedDate(formatDateKey(new Date()));
  }, []);

  return {
    selectedDate,
    setSelectedDate,
    onDayPress,
    selectToday,
  };
}
