/**
 * Navigation type definitions for Expo Router
 */

/**
 * Tab route names
 */
export type TabRoute = "index" | "about" | "emergency" | "contact" | "settings";

/**
 * Student type for routing
 */
export type StudentRouteType = "inbound" | "outbound" | "rebound";

/**
 * Student term type
 */
export type StudentTermType = "long-term" | "short-term";

/**
 * PDF viewer params
 */
export interface PDFViewerParams {
  uri: string;
  title?: string;
}

/**
 * News detail params
 */
export interface NewsDetailParams {
  id: string;
}

/**
 * Program detail params
 */
export interface ProgramDetailParams {
  program: string;
}

/**
 * Rotary clubs section params
 */
export interface RotaryClubsSectionParams {
  section: string;
}

/**
 * Rebound country params
 */
export interface ReboundCountryParams {
  country: string;
}
