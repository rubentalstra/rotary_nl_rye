/**
 * Calendar screen route
 * Thin wrapper using the calendar feature module
 */

import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/core/theme";
import { CalendarView } from "@/features/calendar";

export default function CalendarScreen() {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={["bottom"]}>
      <CalendarView />
    </SafeAreaView>
  );
}
