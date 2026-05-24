import { SafeAreaView } from "react-native-safe-area-context";

import { CalendarView } from "@/components/calendar/CalendarView";
import { useTheme } from "@/lib/theme/use-theme";

export default function CalendarScreen() {
  const theme = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }} edges={["bottom"]}>
      <CalendarView />
    </SafeAreaView>
  );
}
