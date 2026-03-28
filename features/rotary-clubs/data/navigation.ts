/**
 * Rotary clubs navigation data
 */

import type { ClubSectionNavItem } from "../types";

/**
 * Introduction text for the rotary clubs section
 */
export const introText = `Wat leuk dat jullie als Rotary club van plan zijn om een jaarstudent te supporten en daarmee dus ook een jaar lang een kind binnen jullie club te ontvangen en te begeleiden. Misschien zijn jullie benaderd door een scholier van buiten jullie of mogelijk vanuit de wens van één van jullie clubleden.`;

/**
 * Navigation items for rotary clubs sections
 */
export const clubSections: ClubSectionNavItem[] = [
  {
    id: "algemene-informatie",
    title: "Algemene Informatie",
    icon: "info-circle",
    route: "/rotary-clubs/algemene-informatie",
  },
  {
    id: "jeugdcommissaris",
    title: "Info voor de Jeugdcommissaris",
    icon: "user-tie",
    route: "/rotary-clubs/jeugdcommissaris",
  },
  {
    id: "gastgezin",
    title: "Info Gastgezin",
    icon: "home",
    route: "/rotary-clubs/gastgezin",
  },
  {
    id: "counselor",
    title: "Info Counselor",
    icon: "hands-helping",
    route: "/rotary-clubs/counselor",
  },
  {
    id: "documenten",
    title: "Belangrijke Documenten",
    icon: "exclamation-triangle",
    route: "/rotary-clubs/documenten",
  },
];

/**
 * Get a section by ID
 */
export function getSectionById(id: string): ClubSectionNavItem | undefined {
  return clubSections.find((section) => section.id === id);
}
