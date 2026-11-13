import { Platform } from "react-native";

/**
 * Native system font descriptors. Maps to:
 * - iOS: `UIFontDescriptorSystemDesignDefault`, `Serif`, `Rounded`, `Monospaced`.
 * - Android: Material 3 type-scale defaults.
 */
export const Fonts = Platform.select({
  ios: {
    sans: "system-ui",
    serif: "ui-serif",
    rounded: "ui-rounded",
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
}) as { sans: string; serif: string; rounded: string; mono: string };
