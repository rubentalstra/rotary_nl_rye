import { DarkTheme, DefaultTheme, type Theme } from "@react-navigation/native";

/**
 * Theme tokens — mirrors the CSS variables in global.css.
 * Used by lib/theme.ts for navigation and any JS that needs color values.
 */
export const THEME = {
  light: {
    background: "hsl(240 5% 96%)",
    foreground: "hsl(0 0% 0%)",
    card: "hsl(0 0% 100%)",
    cardForeground: "hsl(0 0% 0%)",
    popover: "hsl(0 0% 100%)",
    popoverForeground: "hsl(0 0% 0%)",
    primary: "hsl(216 73% 32%)",
    primaryForeground: "hsl(0 0% 100%)",
    secondary: "hsl(39 93% 54%)",
    secondaryForeground: "hsl(0 0% 0%)",
    muted: "hsl(240 5% 96%)",
    mutedForeground: "hsl(240 4% 46%)",
    accent: "hsl(197 100% 44%)",
    accentForeground: "hsl(0 0% 100%)",
    destructive: "hsl(2 79% 52%)",
    border: "hsl(240 6% 90%)",
    input: "hsl(240 6% 90%)",
    ring: "hsl(216 73% 32%)",
    radius: "0.625rem",
  },
  dark: {
    background: "hsl(0 0% 0%)",
    foreground: "hsl(0 0% 100%)",
    card: "hsl(240 6% 12%)",
    cardForeground: "hsl(0 0% 100%)",
    popover: "hsl(240 6% 12%)",
    popoverForeground: "hsl(0 0% 100%)",
    primary: "hsl(197 100% 44%)",
    primaryForeground: "hsl(0 0% 100%)",
    secondary: "hsl(39 93% 54%)",
    secondaryForeground: "hsl(0 0% 0%)",
    muted: "hsl(240 4% 18%)",
    mutedForeground: "hsl(240 2% 56%)",
    accent: "hsl(200 58% 81%)",
    accentForeground: "hsl(0 0% 0%)",
    destructive: "hsl(0 100% 63%)",
    border: "hsl(240 4% 22%)",
    input: "hsl(240 4% 22%)",
    ring: "hsl(197 100% 44%)",
    radius: "0.625rem",
  },
};

/** React Navigation theme — extends defaults with Rotary brand colors */
export const NAV_THEME: Record<"light" | "dark", Theme> = {
  light: {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: THEME.light.background,
      text: THEME.light.foreground,
      primary: THEME.light.primary,
      card: THEME.light.card,
      border: THEME.light.border,
      notification: THEME.light.destructive,
    },
  },
  dark: {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: THEME.dark.background,
      text: THEME.dark.foreground,
      primary: THEME.dark.primary,
      card: THEME.dark.card,
      border: THEME.dark.border,
      notification: THEME.dark.destructive,
    },
  },
};
