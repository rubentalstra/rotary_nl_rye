import { Stack } from "expo-router";
import { Platform } from "react-native";

import { useTheme } from "@/lib/theme/use-theme";

export default function ProgramsLayout() {
  const theme = useTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: theme.card },
        headerTitleStyle: {
          color: theme.text,
          fontWeight: "600",
          fontSize: Platform.OS === "ios" ? 17 : 20,
        },
        headerTintColor: theme.primary,
        headerShadowVisible: Platform.OS === "ios",
      }}
    >
      <Stack.Screen name="index" options={{ title: "Programma's" }} />
      <Stack.Screen name="information/long-term-exchange" options={{ title: "Long Term Exchange" }} />
      <Stack.Screen name="information/family-to-family" options={{ title: "Family to Family" }} />
      <Stack.Screen name="information/camps-tours" options={{ title: "Zomerkampen" }} />
      <Stack.Screen name="promo/index" options={{ title: "Promo" }} />
      <Stack.Screen name="promo/podcast" options={{ title: "Podcast" }} />
      <Stack.Screen name="promo/video" options={{ title: "Video" }} />
    </Stack>
  );
}
