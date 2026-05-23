/**
 * Environment variables accessor
 * All environment variables should be accessed through this module
 */

export const env = {
  googleApiKey: process.env.EXPO_PUBLIC_GOOGLE_API_KEY!,
  googleCalendarId: process.env.EXPO_PUBLIC_GOOGLE_CALENDAR_ID!,
  campsXlsxUrl: process.env.EXPO_PUBLIC_CAMPS_XLSX_URL!,
} as const;

// Type for the env object
export type Env = typeof env;
