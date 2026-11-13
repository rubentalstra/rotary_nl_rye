/**
 * Typed environment-variable accessor.
 *
 * SDK 56 note: `expo/fetch` is now the default `globalThis.fetch`. All fetches
 * automatically support `AbortSignal.timeout`, brotli/gzip/zstd on Android.
 */
export const env = {
  googleApiKey: process.env.EXPO_PUBLIC_GOOGLE_API_KEY!,
  googleCalendarId: process.env.EXPO_PUBLIC_GOOGLE_CALENDAR_ID!,
  campsXlsxUrl: process.env.EXPO_PUBLIC_CAMPS_XLSX_URL!,
} as const;

export type Env = typeof env;
