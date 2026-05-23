/**
 * Rotary clubs hooks for accessing sections and content
 */

import { useMemo } from "react";
import { clubSections, getSectionById, getSectionContent, introText } from "../data";
import type { ClubSectionNavItem, SectionPageContent } from "../types";

/**
 * Get all club sections for navigation
 */
export function useClubSections() {
  return useMemo(
    () => ({
      sections: clubSections,
      introText,
      count: clubSections.length,
    }),
    [],
  );
}

/**
 * Get a single section by ID
 */
export function useClubSection(id: string): ClubSectionNavItem | undefined {
  return useMemo(() => getSectionById(id), [id]);
}

/**
 * Get section page content by ID
 */
export function useSectionContent(id: string): SectionPageContent | undefined {
  return useMemo(() => getSectionContent(id), [id]);
}
