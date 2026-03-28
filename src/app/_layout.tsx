import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Platform } from "react-native";
import { useMemo } from "react";
import { ThemeProvider, useTheme } from "@/core/theme";
import "react-native-reanimated";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

function RootLayoutNav() {
  const { colors, isDark } = useTheme();

  const customTheme = useMemo(
    () => ({
      ...(isDark ? DarkTheme : DefaultTheme),
      colors: {
        ...(isDark ? DarkTheme.colors : DefaultTheme.colors),
        primary: colors.primary,
        background: colors.background,
        card: colors.card,
        text: colors.text,
        border: colors.border,
      },
    }),
    [isDark, colors],
  );

  const screenOptions = useMemo(
    () => ({
      headerStyle: { backgroundColor: colors.card },
      headerTitleStyle: {
        color: colors.text,
        fontWeight: "600" as const,
        fontSize: Platform.OS === "ios" ? 17 : 20,
      },
      headerTintColor: colors.primary,
      headerShadowVisible: false,
      headerBackTitle: Platform.OS === "ios" ? "Terug" : undefined,
      contentStyle: { backgroundColor: colors.background },
    }),
    [colors],
  );

  return (
    <NavigationThemeProvider value={customTheme}>
      <Stack screenOptions={screenOptions}>
        {/* Main tab navigator */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        {/* Students - Inbound */}
        <Stack.Screen
          name="students/inbound/index"
          options={{ title: "Inbound", headerBackTitle: "Home" }}
        />
        <Stack.Screen
          name="students/inbound/short-term/index"
          options={{ title: "Short Term", headerBackTitle: "Inbound" }}
        />
        <Stack.Screen
          name="students/inbound/short-term/camps-and-tours/index"
          options={{ title: "Summer Camps", headerBackTitle: "Short Term" }}
        />
        <Stack.Screen
          name="students/inbound/short-term/family-to-family/index"
          options={{ title: "Family to Family", headerBackTitle: "Short Term" }}
        />
        <Stack.Screen
          name="students/inbound/long-term/index"
          options={{ title: "Long Term", headerBackTitle: "Inbound" }}
        />
        <Stack.Screen
          name="students/inbound/long-term/students"
          options={{ title: "Class of 2025-26", headerBackTitle: "Long Term" }}
        />
        <Stack.Screen
          name="students/inbound/long-term/student-detail"
          options={{ title: "Student", headerBackTitle: "Terug" }}
        />
        <Stack.Screen
          name="students/inbound/long-term/welcome"
          options={{ title: "Welcome", headerBackTitle: "Long Term" }}
        />
        <Stack.Screen
          name="students/inbound/long-term/flight-arrival"
          options={{ title: "Flight & Arrival", headerBackTitle: "Long Term" }}
        />
        <Stack.Screen
          name="students/inbound/long-term/insurance"
          options={{ title: "Insurance", headerBackTitle: "Long Term" }}
        />
        <Stack.Screen
          name="students/inbound/long-term/language"
          options={{ title: "Language", headerBackTitle: "Long Term" }}
        />
        <Stack.Screen
          name="students/inbound/long-term/travel"
          options={{ title: "Travel", headerBackTitle: "Long Term" }}
        />

        {/* Students - Outbound */}
        <Stack.Screen
          name="students/outbound/index"
          options={{ title: "Outbound", headerBackTitle: "Home" }}
        />
        <Stack.Screen
          name="students/outbound/long-term/index"
          options={{ title: "Long Term", headerBackTitle: "Outbound" }}
        />
        <Stack.Screen
          name="students/outbound/long-term/students"
          options={{ title: "Klas van 25-26", headerBackTitle: "Long Term" }}
        />
        <Stack.Screen
          name="students/outbound/long-term/student-detail"
          options={{ title: "Student", headerBackTitle: "Terug" }}
        />
        <Stack.Screen
          name="students/outbound/long-term/how-to-sign-up"
          options={{ title: "Aanmelden", headerBackTitle: "Long Term" }}
        />
        <Stack.Screen
          name="students/outbound/long-term/comply-with"
          options={{ title: "Vereisten", headerBackTitle: "Long Term" }}
        />
        <Stack.Screen
          name="students/outbound/long-term/selection-day"
          options={{ title: "Selectie dag", headerBackTitle: "Long Term" }}
        />
        <Stack.Screen
          name="students/outbound/long-term/selection-weekend"
          options={{ title: "Selectie weekend", headerBackTitle: "Long Term" }}
        />
        <Stack.Screen
          name="students/outbound/long-term/top-3-countries"
          options={{ title: "Top 3 landen", headerBackTitle: "Long Term" }}
        />
        <Stack.Screen
          name="students/outbound/short-term/index"
          options={{ title: "Short Term", headerBackTitle: "Outbound" }}
        />
        <Stack.Screen
          name="students/outbound/short-term/camps-and-tours/index"
          options={{ title: "Zomerkampen", headerBackTitle: "Short Term" }}
        />
        <Stack.Screen
          name="students/outbound/short-term/camps-and-tours/how-to-sign-up"
          options={{ title: "Aanmelden", headerBackTitle: "Zomerkampen" }}
        />
        <Stack.Screen
          name="students/outbound/short-term/camps-and-tours/which-countries"
          options={{ title: "Landen", headerBackTitle: "Zomerkampen" }}
        />
        <Stack.Screen
          name="students/outbound/short-term/camps-and-tours/comply-with"
          options={{ title: "Voor wie?", headerBackTitle: "Zomerkampen" }}
        />
        <Stack.Screen
          name="students/outbound/short-term/family-to-family/index"
          options={{ title: "Family to Family", headerBackTitle: "Short Term" }}
        />
        <Stack.Screen
          name="students/outbound/short-term/family-to-family/how-to-sign-up"
          options={{ title: "Aanmelden", headerBackTitle: "Family to Family" }}
        />
        <Stack.Screen
          name="students/outbound/short-term/family-to-family/countries-preference"
          options={{ title: "Landen", headerBackTitle: "Family to Family" }}
        />
        <Stack.Screen
          name="students/outbound/short-term/family-to-family/comply-with"
          options={{ title: "Vereisten", headerBackTitle: "Family to Family" }}
        />

        {/* Students - Rebound */}
        <Stack.Screen
          name="students/rebound/index"
          options={{ title: "Rebound", headerBackTitle: "Home" }}
        />
        <Stack.Screen
          name="students/rebound/[country]"
          options={{ title: "Students", headerBackTitle: "Rebound" }}
        />
        <Stack.Screen
          name="students/rebound/student-detail"
          options={{ title: "Student", headerBackTitle: "Terug" }}
        />

        {/* Settings sub-screen */}
        <Stack.Screen
          name="settings/contributors"
          options={{
            title: "Contributors",
            headerBackTitle: "Settings",
          }}
        />

        {/* Utility Screens */}
        <Stack.Screen
          name="camps-tours"
          options={{
            title: "Zomerkampen",
            headerBackTitle: "Home",
          }}
        />
        <Stack.Screen
          name="pdf-viewer"
          options={{ title: "PDF Document", headerBackTitle: "Terug" }}
        />

        {/* Calendar */}
        <Stack.Screen
          name="calendar/index"
          options={{
            title: "Evenementen Kalender",
            headerBackTitle: "Home",
          }}
        />

        {/* News */}
        <Stack.Screen
          name="news/index"
          options={{
            title: "Nieuws & Updates",
            headerBackTitle: "Home",
          }}
        />
        <Stack.Screen name="news/[id]" options={{ title: "Nieuws", headerBackTitle: "Nieuws" }} />

        {/* Rotary Clubs */}
        <Stack.Screen
          name="rotary-clubs/index"
          options={{
            title: "Voor Rotary Clubs",
            headerBackTitle: "Home",
          }}
        />
        <Stack.Screen
          name="rotary-clubs/[section]"
          options={{ title: "Rotary Clubs", headerBackTitle: "Rotary Clubs" }}
        />

        {/* Programs */}
        <Stack.Screen
          name="programs/index"
          options={{
            title: "Programma's",
            headerBackTitle: "Home",
          }}
        />
        <Stack.Screen
          name="programs/promo/index"
          options={{
            title: "Promo Materiaal",
            headerBackTitle: "Programma's",
          }}
        />
        <Stack.Screen
          name="programs/promo/podcast"
          options={{
            title: "Promo Podcast",
            headerBackTitle: "Promo",
          }}
        />
        <Stack.Screen
          name="programs/promo/video"
          options={{
            title: "Promo Video",
            headerBackTitle: "Promo",
          }}
        />
        <Stack.Screen
          name="programs/information/long-term-exchange"
          options={{
            title: "Long Term Exchange",
            headerBackTitle: "Programma's",
          }}
        />
        <Stack.Screen
          name="programs/information/family-to-family"
          options={{
            title: "Family To Family",
            headerBackTitle: "Programma's",
          }}
        />
        <Stack.Screen
          name="programs/information/camps-tours"
          options={{
            title: "Zomerkampen",
            headerBackTitle: "Programma's",
          }}
        />
      </Stack>
      <StatusBar style={isDark ? "light" : "dark"} />
    </NavigationThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <RootLayoutNav />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
