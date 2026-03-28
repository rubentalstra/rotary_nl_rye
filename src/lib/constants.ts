import * as Application from "expo-application";

/**
 * App metadata — version is read dynamically from the native bundle
 * so it never drifts from package.json / app.json.
 */
export const APP_NAME = Application.applicationName ?? "Rotary YEP NL";
export const APP_VERSION = Application.nativeApplicationVersion ?? "12.0.3";
export const APP_BUILD = Application.nativeBuildVersion ?? "112";

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
  ANDROID:
    "https://play.google.com/store/apps/details?id=com.caelitechnologies.rotary_nl_rye",
} as const;

/** API URLs */
export const API_URLS = {
  GOOGLE_CALENDAR: "https://www.googleapis.com/calendar/v3/calendars",
  ROTARY_NL: "https://www.rotary.nl",
} as const;
