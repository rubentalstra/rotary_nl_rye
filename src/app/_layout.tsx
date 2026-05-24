import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { NavigationBar } from "expo-navigation-bar";
import { Platform } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { useColorScheme } from "@/hooks/use-color-scheme";

export default function RootLayout() {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
        <StatusBar style="auto" />
        <NavigationBar style="auto" />
        <Stack
          screenOptions={{
            headerShadowVisible: Platform.OS === "ios",
            headerBackButtonDisplayMode: "minimal",
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

          {/* News */}
          <Stack.Screen
            name="news/index"
            options={{ title: "News", headerLargeTitleEnabled: true }}
          />
          <Stack.Screen name="news/[id]" options={{ title: "" }} />

          {/* Calendar — page is a month grid, no large title */}
          <Stack.Screen name="calendar/index" options={{ title: "Calendar" }} />

          {/* Programs */}
          <Stack.Screen
            name="programs/index"
            options={{ title: "Programma's", headerLargeTitleEnabled: true }}
          />
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
          <Stack.Screen
            name="rotary-clubs/index"
            options={{ title: "Voor Rotary Clubs", headerLargeTitleEnabled: true }}
          />
          <Stack.Screen name="rotary-clubs/[section]" />

          {/* Students — hubs */}
          <Stack.Screen
            name="students/inbound/index"
            options={{ title: "Inbounds", headerLargeTitleEnabled: true }}
          />
          <Stack.Screen
            name="students/outbound/index"
            options={{ title: "Outbounds", headerLargeTitleEnabled: true }}
          />
          <Stack.Screen
            name="students/rebound/index"
            options={{ title: "Rebounds", headerLargeTitleEnabled: true }}
          />

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
          <Stack.Screen name="students/inbound/long-term/students" />
          <Stack.Screen name="students/inbound/long-term/student-detail" />

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
          <Stack.Screen name="students/outbound/long-term/students" />
          <Stack.Screen name="students/outbound/long-term/student-detail" />

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
          <Stack.Screen name="students/rebound/[country]" />
          <Stack.Screen name="students/rebound/student-detail" />

          {/* Standalone */}
          <Stack.Screen
            name="camps-tours"
            options={{ title: "Zomerkampen", headerLargeTitleEnabled: true }}
          />
          <Stack.Screen name="pdf-viewer" />
          <Stack.Screen name="settings/contributors" options={{ title: "Bijdragers" }} />
        </Stack>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
