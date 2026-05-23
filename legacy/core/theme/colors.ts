/**
 * Rotary Brand Colors
 * Official Rotary brand colors as per Rotary International Brand Guidelines
 * https://brandcenter.rotary.org/en-us/our-brand/brand-elements/colors
 */

// Rotary Official Brand Colors (Primary)
export const RotaryColors = {
  // Main Brand Colors
  royalBlue: "#17458f", // Rotary Royal Blue - PMS 286C
  gold: "#f7a81b", // Rotary Gold - PMS 130C
  azure: "#0067c8", // Azure - PMS 2175C

  // Program Colors
  skyBlue: "#00a2e0", // Sky Blue - PMS 2202C (Interact)
  cranberry: "#d41367", // Cranberry - PMS 214C (Rotaract)
  cardinal: "#e02927", // Cardinal - PMS 485C (End Polio Now)

  // Accent Colors
  turquoise: "#00adbb", // PMS 7466C
  orange: "#ff7600", // PMS 2018C
  violet: "#901f93", // PMS 2070C
  grass: "#009739", // PMS 355C

  // Soft Colors
  powderBlue: "#b9d9eb", // PMS 290C
  moss: "#a7aca2", // PMS 7537C
  lavender: "#c6bcd0", // PMS 665C
  taupe: "#d9c89e", // PMS 7501C

  // Neutral Cool Colors
  stone: "#9ba4b4", // PMS 2162C
  slate: "#657f99", // PMS 2165C
  charcoal: "#54565a", // Cool Gray 11C
  pewter: "#898a8d", // Cool Gray 8C
  smoke: "#b1b1b1", // Cool Gray 5C
  silver: "#d0cfcd", // Cool Gray 2C

  // Neutral Warm Colors
  storm: "#7a6e66", // Warm Gray 10C
  ash: "#968b83", // Warm Gray 7C
  platinum: "#bfb7b0", // Warm Gray 3C
  cloud: "#d6d1ca", // Warm Gray 1C

  // Base Colors
  white: "#ffffff",
  black: "#000000",
} as const;

// Theme color interface
export interface ThemeColors {
  // Primary brand colors
  primary: string;
  primaryVariant: string;
  secondary: string;
  accent: string;

  // Backgrounds
  background: string;
  backgroundElevated: string;
  card: string;
  surface: string;
  surfaceVariant: string;

  // Text colors
  text: string;
  textSecondary: string;
  textTertiary: string;
  textDisabled: string;
  onPrimary: string;
  onSecondary: string;
  onBackground: string;
  onSurface: string;

  // Borders & Dividers
  border: string;
  divider: string;
  outline: string;

  // Icons
  icon: string;
  iconActive: string;

  // Status colors
  success: string;
  warning: string;
  error: string;
  info: string;

  // Interactive elements
  link: string;
  linkVisited: string;

  // Shadow
  shadow: string;
  shadowLight: string;

  // Special
  notification: string;
  badge: string;
}

// Light theme colors
const lightColors: ThemeColors = {
  // Primary brand colors
  primary: RotaryColors.royalBlue,
  primaryVariant: RotaryColors.azure,
  secondary: RotaryColors.gold,
  accent: RotaryColors.skyBlue,

  // Backgrounds
  background: "#F2F2F7", // iOS system background
  backgroundElevated: RotaryColors.white,
  card: RotaryColors.white,
  surface: RotaryColors.white,
  surfaceVariant: "#F8F8F8",

  // Text colors
  text: RotaryColors.black,
  textSecondary: "#3C3C43",
  textTertiary: "#8E8E93",
  textDisabled: "#C7C7CC",
  onPrimary: RotaryColors.white,
  onSecondary: RotaryColors.black,
  onBackground: RotaryColors.black,
  onSurface: RotaryColors.black,

  // Borders & Dividers
  border: "#E5E5EA",
  divider: "#C6C6C8",
  outline: "#E0E0E0",

  // Icons
  icon: "#8E8E93",
  iconActive: RotaryColors.royalBlue,

  // Status colors
  success: RotaryColors.grass,
  warning: RotaryColors.orange,
  error: RotaryColors.cardinal,
  info: RotaryColors.azure,

  // Interactive elements
  link: RotaryColors.azure,
  linkVisited: RotaryColors.violet,

  // Shadow
  shadow: RotaryColors.black,
  shadowLight: "rgba(0, 0, 0, 0.1)",

  // Special
  notification: RotaryColors.cardinal,
  badge: RotaryColors.gold,
};

// Dark theme colors
const darkColors: ThemeColors = {
  // Primary brand colors (adjusted for dark mode visibility)
  primary: RotaryColors.skyBlue,
  primaryVariant: RotaryColors.azure,
  secondary: RotaryColors.gold,
  accent: RotaryColors.powderBlue,

  // Backgrounds
  background: "#000000", // True black for OLED
  backgroundElevated: "#1C1C1E",
  card: "#1C1C1E",
  surface: "#1C1C1E",
  surfaceVariant: "#2C2C2E",

  // Text colors
  text: RotaryColors.white,
  textSecondary: "#EBEBF5",
  textTertiary: "#8E8E93",
  textDisabled: "#636366",
  onPrimary: RotaryColors.white,
  onSecondary: RotaryColors.black,
  onBackground: RotaryColors.white,
  onSurface: RotaryColors.white,

  // Borders & Dividers
  border: "#38383A",
  divider: "#48484A",
  outline: "#545456",

  // Icons
  icon: "#8E8E93",
  iconActive: RotaryColors.skyBlue,

  // Status colors (adjusted for dark mode)
  success: "#32D74B",
  warning: "#FF9F0A",
  error: "#FF453A",
  info: RotaryColors.skyBlue,

  // Interactive elements
  link: RotaryColors.skyBlue,
  linkVisited: "#BF5AF2",

  // Shadow
  shadow: RotaryColors.black,
  shadowLight: "rgba(0, 0, 0, 0.3)",

  // Special
  notification: "#FF453A",
  badge: RotaryColors.gold,
};

// Export colors object with light and dark themes
export const colors = {
  light: lightColors,
  dark: darkColors,
} as const;

export type ColorScheme = "light" | "dark";
