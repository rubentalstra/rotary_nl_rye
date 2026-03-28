/**
 * Environment variables — typed access to EXPO_PUBLIC_* values.
 */
export const env = {
  googleApiKey: process.env.EXPO_PUBLIC_GOOGLE_API_KEY!,
  googleCalendarId: process.env.EXPO_PUBLIC_GOOGLE_CALENDAR_ID!,
  campsXlsxUrl: process.env.EXPO_PUBLIC_CAMPS_XLSX_URL!,
} as const;
