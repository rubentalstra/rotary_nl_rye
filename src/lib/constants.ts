import { Theme } from "@react-navigation/native";
import * as Application from "expo-application";

/**
 * App metadata — version is read dynamically from the native bundle
 * so it never drifts from package.json / app.json.
 */
export const APP_NAME = Application.applicationName ?? "Rotary YEP NL";
export const APP_VERSION = Application.nativeApplicationVersion ?? "12.0.3";
export const APP_BUILD = Application.nativeBuildVersion ?? String(Application.nativeBuildVersion);

/**
 * Navigation theme — the only JS theme object needed.
 * Everything else is handled by NativeWind CSS variables in global.css.
 */
export const NAV_THEME: Record<"light" | "dark", Theme> = {
  light: {
    dark: false,
    colors: {
      primary: "#17458f",
      background: "#F2F2F7",
      card: "#ffffff",
      text: "#000000",
      border: "#E5E5EA",
      notification: "#e02927",
    },
    fonts: {
      regular: { fontFamily: "System", fontWeight: "400" },
      medium: { fontFamily: "System", fontWeight: "500" },
      bold: { fontFamily: "System", fontWeight: "700" },
      heavy: { fontFamily: "System", fontWeight: "800" },
    },
  },
  dark: {
    dark: true,
    colors: {
      primary: "#00a2e0",
      background: "#000000",
      card: "#1C1C1E",
      text: "#ffffff",
      border: "#38383A",
      notification: "#FF453A",
    },
    fonts: {
      regular: { fontFamily: "System", fontWeight: "400" },
      medium: { fontFamily: "System", fontWeight: "500" },
      bold: { fontFamily: "System", fontWeight: "700" },
      heavy: { fontFamily: "System", fontWeight: "800" },
    },
  },
};

/** Social media base URLs */
export const SOCIAL_URLS = {
  INSTAGRAM: "https://instagram.com/",
  FACEBOOK: "https://facebook.com/",
  LINKEDIN: "https://linkedin.com/in/",
  SNAPCHAT: "https://snapchat.com/add/",
} as const;

/** App Store URLs */
export const STORE_URLS = {
  IOS: "https://apps.apple.com/nl/app/rotary-youth-exchange-nl/id1567096118",
  ANDROID: "https://play.google.com/store/apps/details?id=com.caelitechnologies.rotary_nl_rye",
} as const;

/** API URLs */
export const API_URLS = {
  GOOGLE_CALENDAR: "https://www.googleapis.com/calendar/v3/calendars",
  ROTARY_NL: "https://www.rotary.nl",
} as const;
