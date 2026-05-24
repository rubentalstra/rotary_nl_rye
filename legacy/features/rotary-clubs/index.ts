/**
 * Rotary Clubs feature - Public API
 *
 * This module provides components, hooks, and data for displaying
 * information relevant to Rotary clubs participating in the exchange program.
 */

// Components
export { SectionNavCard, InfoSectionCard, DocumentCard, SectionPageView } from "./components";

// Hooks
export { useClubSections, useClubSection, useSectionContent } from "./hooks";

// Data
export {
  introText,
  clubSections,
  getSectionById,
  getSectionContent,
  allSectionContents,
  algemeneInformatieContent,
  jeugdcommissarisContent,
  gastgezinContent,
  counselorContent,
  documentenContent,
} from "./data";

// Types
export type { ClubSectionNavItem, InfoSection, DocumentItem, SectionPageContent } from "./types";

// Utilities
export { generateId } from "./types";
