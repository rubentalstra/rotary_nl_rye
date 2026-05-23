/**
 * Contacts feature - Public API
 *
 * This module provides components and hooks for displaying and managing
 * organization contacts (MDJC, Long Term, Short Term, ROTEX).
 */

// Components
export { ContactCard, ContactModal, ContactSection } from "./components";

// Hooks
export {
  useContactSections,
  useContactsByCategory,
  useContact,
  useSearchContacts,
  useContactCounts,
} from "./hooks";

// Data
export {
  contactSections,
  longTermContacts,
  shortTermContacts,
  mdjcContacts,
  rotexContacts,
} from "./data";

// Types
export type { Contact, ContactCategory, ContactSection as ContactSectionType } from "./types";
