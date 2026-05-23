/**
 * Rotary Clubs feature types
 */

import type { FontAwesome5 } from "@expo/vector-icons";

/**
 * Navigation item for rotary clubs sections
 */
export interface ClubSectionNavItem {
  id: string;
  title: string;
  icon: keyof typeof FontAwesome5.glyphMap;
  route: string;
}

/**
 * Information section with title and content text
 */
export interface InfoSection {
  id: string;
  title: string;
  content: string;
}

/**
 * Document item with PDF link
 */
export interface DocumentItem {
  id: string;
  title: string;
  icon: keyof typeof FontAwesome5.glyphMap;
  pdfUrl: string;
}

/**
 * Section page content - can be info sections or document list
 */
export interface SectionPageContent {
  id: string;
  title: string;
  description?: string;
  type: "info" | "documents";
  infoSections?: InfoSection[];
  documents?: DocumentItem[];
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
