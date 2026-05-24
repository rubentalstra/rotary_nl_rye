import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { NavigationBar } from "expo-navigation-bar";
import { Platform } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { RotaryColors, RotaryTheme } from "@/lib/theme/colors";

export default function RootLayout() {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";
  const theme = RotaryTheme[scheme];

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider
        value={{
          ...(isDark ? DarkTheme : DefaultTheme),
          colors: {
            ...(isDark ? DarkTheme : DefaultTheme).colors,
            primary: RotaryColors.royalBlue,
            background: theme.background,
            card: theme.card,
          },
        }}
      >
        <StatusBar style="auto" />
        <NavigationBar style="auto" />
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: theme.card },
            headerTitleStyle: {
              color: theme.text,
              fontWeight: "600",
              fontSize: Platform.OS === "ios" ? 17 : 20,
            },
            headerLargeTitleStyle: { color: theme.text },
            headerTintColor: theme.primary,
            headerLargeTitle: true,
            headerLargeTitleShadowVisible: false,
            headerShadowVisible: Platform.OS === "ios",
            headerBackButtonDisplayMode: "minimal",
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false, title: "" }} />

          {/* News */}
          <Stack.Screen name="news/index" options={{ title: "News" }} />
          <Stack.Screen name="news/[id]" options={{ title: "", headerLargeTitle: false }} />

          {/* Calendar */}
          <Stack.Screen
            name="calendar/index"
            options={{ title: "Calendar", headerLargeTitle: false }}
          />

          {/* Programs */}
          <Stack.Screen name="programs/index" options={{ title: "Programma's" }} />
          <Stack.Screen
            name="programs/information/long-term-exchange"
            options={{ title: "Long Term Exchange" }}
          />
          <Stack.Screen
            name="programs/information/family-to-family"
            options={{ title: "Family to Family" }}
          />
          <Stack.Screen
            name="programs/information/camps-tours"
            options={{ title: "Zomerkampen" }}
          />
          <Stack.Screen name="programs/promo/index" options={{ title: "Promo" }} />
          <Stack.Screen name="programs/promo/podcast" options={{ title: "Podcast" }} />
          <Stack.Screen name="programs/promo/video" options={{ title: "Video" }} />

          {/* Rotary Clubs */}
          <Stack.Screen name="rotary-clubs/index" options={{ title: "Voor Rotary Clubs" }} />
          <Stack.Screen name="rotary-clubs/[section]" options={{ headerLargeTitle: false }} />

          {/* Students — hubs */}
          <Stack.Screen name="students/inbound/index" options={{ title: "Inbounds" }} />
          <Stack.Screen name="students/outbound/index" options={{ title: "Outbounds" }} />
          <Stack.Screen name="students/rebound/index" options={{ title: "Rebounds" }} />

          {/* Students — inbound long-term */}
          <Stack.Screen
            name="students/inbound/long-term/index"
            options={{ title: "Long Term Exchange" }}
          />
          <Stack.Screen
            name="students/inbound/long-term/welcome"
            options={{ title: "Welkom" }}
          />
          <Stack.Screen
            name="students/inbound/long-term/flight-arrival"
            options={{ title: "Vlucht & aankomst" }}
          />
          <Stack.Screen
            name="students/inbound/long-term/insurance"
            options={{ title: "Verzekering" }}
          />
          <Stack.Screen
            name="students/inbound/long-term/language"
            options={{ title: "Taal" }}
          />
          <Stack.Screen
            name="students/inbound/long-term/travel"
            options={{ title: "Reizen" }}
          />
          <Stack.Screen
            name="students/inbound/long-term/students"
            options={{ headerLargeTitle: false }}
          />
          <Stack.Screen
            name="students/inbound/long-term/student-detail"
            options={{ headerLargeTitle: false }}
          />

          {/* Students — outbound long-term */}
          <Stack.Screen
            name="students/outbound/long-term/index"
            options={{ title: "Long Term Exchange" }}
          />
          <Stack.Screen
            name="students/outbound/long-term/how-to-sign-up"
            options={{ title: "Aanmelden" }}
          />
          <Stack.Screen
            name="students/outbound/long-term/comply-with"
            options={{ title: "Voorwaarden" }}
          />
          <Stack.Screen
            name="students/outbound/long-term/selection-weekend"
            options={{ title: "Selectieweekend" }}
          />
          <Stack.Screen
            name="students/outbound/long-term/selection-day"
            options={{ title: "Selectiedag" }}
          />
          <Stack.Screen
            name="students/outbound/long-term/top-3-countries"
            options={{ title: "Top 3 landen" }}
          />
          <Stack.Screen
            name="students/outbound/long-term/students"
            options={{ headerLargeTitle: false }}
          />
          <Stack.Screen
            name="students/outbound/long-term/student-detail"
            options={{ headerLargeTitle: false }}
          />

          {/* Students — short-term */}
          <Stack.Screen name="students/inbound/short-term/index" options={{ title: "Short Term" }} />
          <Stack.Screen name="students/outbound/short-term/index" options={{ title: "Short Term" }} />
          <Stack.Screen
            name="students/inbound/short-term/camps-and-tours/index"
            options={{ title: "Zomerkampen" }}
          />
          <Stack.Screen
            name="students/inbound/short-term/family-to-family/index"
            options={{ title: "Family to Family" }}
          />
          <Stack.Screen
            name="students/outbound/short-term/camps-and-tours/index"
            options={{ title: "Zomerkampen" }}
          />
          <Stack.Screen
            name="students/outbound/short-term/camps-and-tours/how-to-sign-up"
            options={{ title: "Aanmelden" }}
          />
          <Stack.Screen
            name="students/outbound/short-term/camps-and-tours/comply-with"
            options={{ title: "Voorwaarden" }}
          />
          <Stack.Screen
            name="students/outbound/short-term/camps-and-tours/which-countries"
            options={{ title: "Welke landen" }}
          />
          <Stack.Screen
            name="students/outbound/short-term/family-to-family/index"
            options={{ title: "Family to Family" }}
          />
          <Stack.Screen
            name="students/outbound/short-term/family-to-family/how-to-sign-up"
            options={{ title: "Aanmelden" }}
          />
          <Stack.Screen
            name="students/outbound/short-term/family-to-family/comply-with"
            options={{ title: "Voorwaarden" }}
          />
          <Stack.Screen
            name="students/outbound/short-term/family-to-family/countries-preference"
            options={{ title: "Landenvoorkeur" }}
          />

          {/* Students — rebound */}
          <Stack.Screen
            name="students/rebound/[country]"
            options={{ headerLargeTitle: false }}
          />
          <Stack.Screen
            name="students/rebound/student-detail"
            options={{ headerLargeTitle: false }}
          />

          {/* Standalone */}
          <Stack.Screen
            name="camps-tours"
            options={{ title: "Zomerkampen Lijst", headerLargeTitle: false }}
          />
          <Stack.Screen name="pdf-viewer" options={{ headerLargeTitle: false }} />
          <Stack.Screen name="settings/contributors" options={{ title: "Bijdragers" }} />
        </Stack>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
