import { useColorScheme as useRNColorScheme } from "react-native";

/**
 * Like `react-native`'s `useColorScheme`, but narrows the legacy `"unspecified"`
 * value (returned by RN 0.83+ on certain devices) down to `"light" | "dark"`.
 * Treat unspecified as light.
 */
export function useColorScheme(): "light" | "dark" {
  const scheme = useRNColorScheme();
  return scheme === "dark" ? "dark" : "light";
}
