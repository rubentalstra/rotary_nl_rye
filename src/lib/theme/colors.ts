/**
 * Rotary Brand Colors — https://brandcenter.rotary.org/en-us/our-brand/brand-elements/colors
 */
export const RotaryColors = {
  // Main brand
  royalBlue: "#17458f", // PMS 286C
  gold: "#f7a81b", // PMS 130C
  azure: "#0067c8", // PMS 2175C

  // Program
  skyBlue: "#00a2e0", // PMS 2202C (Interact)
  cranberry: "#d41367", // PMS 214C (Rotaract)
  cardinal: "#e02927", // PMS 485C (End Polio Now)

  // Accent
  turquoise: "#00adbb", // PMS 7466C
  orange: "#ff7600", // PMS 2018C
  violet: "#901f93", // PMS 2070C
  grass: "#009739", // PMS 355C

  // Soft
  powderBlue: "#b9d9eb", // PMS 290C
  moss: "#a7aca2", // PMS 7537C
  lavender: "#c6bcd0", // PMS 665C
  taupe: "#d9c89e", // PMS 7501C

  // Neutral cool
  stone: "#9ba4b4",
  slate: "#657f99",
  charcoal: "#54565a",
  pewter: "#898a8d",
  smoke: "#b1b1b1",
  silver: "#d0cfcd",

  // Neutral warm
  storm: "#7a6e66",
  ash: "#968b83",
  platinum: "#bfb7b0",
  cloud: "#d6d1ca",

  // Base
  white: "#ffffff",
  black: "#000000",
} as const;

export interface ThemeColors {
  primary: string;
  primaryVariant: string;
  secondary: string;
  accent: string;

  background: string;
  backgroundElevated: string;
  card: string;
  surface: string;
  surfaceVariant: string;

  text: string;
  textSecondary: string;
  textTertiary: string;
  textDisabled: string;
  onPrimary: string;
  onSecondary: string;
  onBackground: string;
  onSurface: string;

  border: string;
  divider: string;
  outline: string;

  icon: string;
  iconActive: string;

  success: string;
  warning: string;
  error: string;
  info: string;

  link: string;
  linkVisited: string;

  shadow: string;
  shadowLight: string;

  notification: string;
  badge: string;
}

const lightColors: ThemeColors = {
  primary: RotaryColors.royalBlue,
  primaryVariant: RotaryColors.azure,
  secondary: RotaryColors.gold,
  accent: RotaryColors.skyBlue,

  background: "#F2F2F7",
  backgroundElevated: RotaryColors.white,
  card: RotaryColors.white,
  surface: RotaryColors.white,
  surfaceVariant: "#F8F8F8",

  text: RotaryColors.black,
  textSecondary: "#3C3C43",
  textTertiary: "#8E8E93",
  textDisabled: "#C7C7CC",
  onPrimary: RotaryColors.white,
  onSecondary: RotaryColors.black,
  onBackground: RotaryColors.black,
  onSurface: RotaryColors.black,

  border: "#E5E5EA",
  divider: "#C6C6C8",
  outline: "#E0E0E0",

  icon: "#8E8E93",
  iconActive: RotaryColors.royalBlue,

  success: RotaryColors.grass,
  warning: RotaryColors.orange,
  error: RotaryColors.cardinal,
  info: RotaryColors.azure,

  link: RotaryColors.azure,
  linkVisited: RotaryColors.violet,

  shadow: RotaryColors.black,
  shadowLight: "rgba(0, 0, 0, 0.1)",

  notification: RotaryColors.cardinal,
  badge: RotaryColors.gold,
};

const darkColors: ThemeColors = {
  primary: RotaryColors.skyBlue,
  primaryVariant: RotaryColors.azure,
  secondary: RotaryColors.gold,
  accent: RotaryColors.powderBlue,

  background: "#000000",
  backgroundElevated: "#1C1C1E",
  card: "#1C1C1E",
  surface: "#1C1C1E",
  surfaceVariant: "#2C2C2E",

  text: RotaryColors.white,
  textSecondary: "#EBEBF5",
  textTertiary: "#8E8E93",
  textDisabled: "#636366",
  onPrimary: RotaryColors.white,
  onSecondary: RotaryColors.black,
  onBackground: RotaryColors.white,
  onSurface: RotaryColors.white,

  border: "#38383A",
  divider: "#48484A",
  outline: "#545456",

  icon: "#8E8E93",
  iconActive: RotaryColors.skyBlue,

  success: "#32D74B",
  warning: "#FF9F0A",
  error: "#FF453A",
  info: RotaryColors.skyBlue,

  link: RotaryColors.skyBlue,
  linkVisited: "#BF5AF2",

  shadow: RotaryColors.black,
  shadowLight: "rgba(0, 0, 0, 0.3)",

  notification: "#FF453A",
  badge: RotaryColors.gold,
};

export const RotaryTheme = {
  light: lightColors,
  dark: darkColors,
} as const;

export type ColorScheme = "light" | "dark";
