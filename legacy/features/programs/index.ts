/**
 * Programs feature - Public API
 *
 * This module provides components, hooks, and data for displaying
 * exchange program information and navigation.
 */

// Components
export { ProgramCard, ProgramSectionHeader } from "./components";

// Hooks
export { useProgramSections, useProgram, useAllPrograms } from "./hooks";

// Data
export {
  introText,
  exchangePrograms,
  infoPromoPrograms,
  programSections,
  allPrograms,
  getProgramById,
} from "./data";

// Types
export type { ProgramItem, ProgramSection } from "./types";

// Utilities
export { generateId } from "./types";
