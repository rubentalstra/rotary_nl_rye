/**
 * Programs feature types
 */

import type { FontAwesome5 } from "@expo/vector-icons";

/**
 * Program navigation item
 */
export interface ProgramItem {
  id: string;
  title: string;
  subtitle?: string;
  icon: keyof typeof FontAwesome5.glyphMap;
  route: string;
}

/**
 * Program section with header and items
 */
export interface ProgramSection {
  id: string;
  title: string;
  items: ProgramItem[];
}

/**
 * Generate ID from title
 */
export function generateId(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
