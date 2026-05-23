import { useColorScheme } from "@/hooks/use-color-scheme";
import { RotaryTheme, type ThemeColors } from "@/lib/theme/colors";

/**
 * Returns the active Rotary theme palette (light or dark) based on the system
 * color scheme. SSR/unspecified falls back to light.
 */
export function useTheme(): ThemeColors & { scheme: "light" | "dark" } {
  const scheme = useColorScheme();
  return { ...RotaryTheme[scheme], scheme };
}
