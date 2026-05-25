import { useEffect } from "react";
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { NavigationBar } from "expo-navigation-bar";
import { Platform } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { LocaleProvider } from "@/lib/i18n/locale-context";
import { useTranslation } from "@/lib/i18n/use-translation";
import { ensureAudioSession } from "@/lib/media/audio-session";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <LocaleProvider>
        <RootLayoutInner />
      </LocaleProvider>
    </GestureHandlerRootView>
  );
}

function RootLayoutInner() {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";
  const { t } = useTranslation();

  useEffect(() => {
    ensureAudioSession().catch((error) => {
      console.warn("[audio-session] init failed", error);
    });
  }, []);

  return (
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
          options={{ title: t("routes.news_index"), headerLargeTitleEnabled: true }}
        />
        <Stack.Screen name="news/[id]" options={{ title: "" }} />

        {/* Calendar — page is a month grid, no large title */}
        <Stack.Screen name="calendar/index" options={{ title: t("routes.calendar") }} />

        {/* Programs */}
        <Stack.Screen
          name="programs/index"
          options={{ title: t("routes.programs_index"), headerLargeTitleEnabled: true }}
        />
        <Stack.Screen
          name="programs/information/long-term-exchange"
          options={{ title: t("routes.programs_long_term") }}
        />
        <Stack.Screen
          name="programs/information/family-to-family"
          options={{ title: t("routes.programs_family_to_family") }}
        />
        <Stack.Screen
          name="programs/information/camps-tours"
          options={{ title: t("routes.programs_camps_tours") }}
        />
        <Stack.Screen name="programs/promo/index" options={{ title: t("routes.programs_promo_index") }} />
        <Stack.Screen name="programs/promo/podcast" options={{ title: t("routes.programs_promo_podcast") }} />
        <Stack.Screen name="programs/promo/video" options={{ title: t("routes.programs_promo_video") }} />

        {/* Rotary Clubs */}
        <Stack.Screen
          name="rotary-clubs/index"
          options={{ title: t("routes.rotary_clubs_index"), headerLargeTitleEnabled: true }}
        />
        <Stack.Screen name="rotary-clubs/[section]" />

        {/* Students — hubs */}
        <Stack.Screen
          name="students/inbound/index"
          options={{ title: t("routes.inbounds"), headerLargeTitleEnabled: true }}
        />
        <Stack.Screen
          name="students/outbound/index"
          options={{ title: t("routes.outbounds"), headerLargeTitleEnabled: true }}
        />
        <Stack.Screen
          name="students/rebound/index"
          options={{ title: t("routes.rebounds"), headerLargeTitleEnabled: true }}
        />

        {/* Students — inbound long-term */}
        <Stack.Screen
          name="students/inbound/long-term/index"
          options={{ title: t("routes.inbound_long_term") }}
        />
        <Stack.Screen
          name="students/inbound/long-term/welcome"
          options={{ title: t("routes.welcome") }}
        />
        <Stack.Screen
          name="students/inbound/long-term/flight-arrival"
          options={{ title: t("routes.flight_arrival") }}
        />
        <Stack.Screen
          name="students/inbound/long-term/insurance"
          options={{ title: t("routes.insurance") }}
        />
        <Stack.Screen
          name="students/inbound/long-term/language"
          options={{ title: t("routes.language_section") }}
        />
        <Stack.Screen
          name="students/inbound/long-term/travel"
          options={{ title: t("routes.travel") }}
        />
        <Stack.Screen name="students/inbound/long-term/students" />
        <Stack.Screen name="students/inbound/long-term/student-detail" />

        {/* Students — outbound long-term */}
        <Stack.Screen
          name="students/outbound/long-term/index"
          options={{ title: t("routes.outbound_long_term") }}
        />
        <Stack.Screen
          name="students/outbound/long-term/how-to-sign-up"
          options={{ title: t("routes.how_to_sign_up") }}
        />
        <Stack.Screen
          name="students/outbound/long-term/comply-with"
          options={{ title: t("routes.comply_with") }}
        />
        <Stack.Screen
          name="students/outbound/long-term/selection-weekend"
          options={{ title: t("routes.selection_weekend") }}
        />
        <Stack.Screen
          name="students/outbound/long-term/selection-day"
          options={{ title: t("routes.selection_day") }}
        />
        <Stack.Screen
          name="students/outbound/long-term/top-3-countries"
          options={{ title: t("routes.top_3_countries") }}
        />
        <Stack.Screen name="students/outbound/long-term/students" />
        <Stack.Screen name="students/outbound/long-term/student-detail" />

        {/* Students — short-term */}
        <Stack.Screen
          name="students/inbound/short-term/index"
          options={{ title: t("routes.short_term") }}
        />
        <Stack.Screen
          name="students/outbound/short-term/index"
          options={{ title: t("routes.short_term") }}
        />
        <Stack.Screen
          name="students/inbound/short-term/camps-and-tours/index"
          options={{ title: t("routes.camps_and_tours") }}
        />
        <Stack.Screen
          name="students/inbound/short-term/family-to-family/index"
          options={{ title: t("routes.family_to_family") }}
        />
        <Stack.Screen
          name="students/outbound/short-term/camps-and-tours/index"
          options={{ title: t("routes.camps_and_tours") }}
        />
        <Stack.Screen
          name="students/outbound/short-term/camps-and-tours/how-to-sign-up"
          options={{ title: t("routes.how_to_sign_up") }}
        />
        <Stack.Screen
          name="students/outbound/short-term/camps-and-tours/comply-with"
          options={{ title: t("routes.comply_with") }}
        />
        <Stack.Screen
          name="students/outbound/short-term/camps-and-tours/which-countries"
          options={{ title: t("routes.which_countries") }}
        />
        <Stack.Screen
          name="students/outbound/short-term/family-to-family/index"
          options={{ title: t("routes.family_to_family") }}
        />
        <Stack.Screen
          name="students/outbound/short-term/family-to-family/how-to-sign-up"
          options={{ title: t("routes.how_to_sign_up") }}
        />
        <Stack.Screen
          name="students/outbound/short-term/family-to-family/comply-with"
          options={{ title: t("routes.comply_with") }}
        />
        <Stack.Screen
          name="students/outbound/short-term/family-to-family/countries-preference"
          options={{ title: t("routes.countries_preference") }}
        />

        {/* Students — rebound */}
        <Stack.Screen name="students/rebound/[country]" />
        <Stack.Screen name="students/rebound/student-detail" />

        {/* Standalone */}
        <Stack.Screen
          name="camps-tours"
          options={{ title: t("routes.camps_and_tours"), headerLargeTitleEnabled: true }}
        />
        <Stack.Screen
          name="country-picker"
          options={{
            presentation: "modal",
            title: t("routes.country_picker"),
            headerLargeTitleEnabled: true,
          }}
        />
        <Stack.Screen name="pdf-viewer" />
        <Stack.Screen name="settings/contributors" options={{ title: t("routes.contributors") }} />
      </Stack>
    </ThemeProvider>
  );
}
