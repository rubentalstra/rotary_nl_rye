/**
 * Application constants
 */

export const APP_NAME = "Rotary YEP NL";
export const APP_VERSION = "11.0.1";

// Cache TTL values (in minutes)
export const CACHE_TTL = {
  CALENDAR_EVENTS: 10,
  CAMPS_DATA: 15,
  DEFAULT: 10,
} as const;

// API URLs
export const API_URLS = {
  GOOGLE_CALENDAR: "https://www.googleapis.com/calendar/v3/calendars",
  ROTARY_NL: "https://www.rotary.nl",
} as const;

// Social media base URLs
export const SOCIAL_URLS = {
  INSTAGRAM: "https://instagram.com/",
  FACEBOOK: "https://facebook.com/",
  LINKEDIN: "https://linkedin.com/in/",
  SNAPCHAT: "https://snapchat.com/add/",
} as const;

// App Store URLs for reviews
export const STORE_URLS = {
  IOS: "https://apps.apple.com/app/id1234567890",
  ANDROID: "https://play.google.com/store/apps/details?id=com.rotary.yepnl",
} as const;
