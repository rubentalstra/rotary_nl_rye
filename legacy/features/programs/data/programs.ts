/**
 * Programs navigation data
 */

import type { ProgramItem, ProgramSection } from "../types";

/**
 * Introduction text for programs
 */
export const introText = `Ontdek alle uitwisselingsprogramma's die Rotary YEP Nederland aanbiedt. Van lange termijn jaaruitwisselingen tot korte zomerprogramma's en promotioneel materiaal.`;

/**
 * Exchange programs section
 */
export const exchangePrograms: ProgramItem[] = [
  {
    id: "long-term-exchange",
    title: "Long Term Exchange",
    subtitle: "Year exchange & info",
    icon: "calendar-alt",
    route: "/programs/information/long-term-exchange",
  },
  {
    id: "family-to-family",
    title: "Family to Family",
    subtitle: "Short-term family exchanges",
    icon: "home",
    route: "/programs/information/family-to-family",
  },
  {
    id: "camps-tours",
    title: "Zomerkampen",
    subtitle: "Zomerkampen informatie",
    icon: "campground",
    route: "/programs/information/camps-tours",
  },
];

/**
 * Info and promo programs section
 */
export const infoPromoPrograms: ProgramItem[] = [
  {
    id: "promo",
    title: "Promo",
    subtitle: "Podcast & Video",
    icon: "podcast",
    route: "/programs/promo",
  },
];

/**
 * All program sections
 */
export const programSections: ProgramSection[] = [
  {
    id: "info-promo",
    title: "Informatie & Promo",
    items: infoPromoPrograms,
  },
  {
    id: "exchange",
    title: "Uitwisselingsprogramma's",
    items: exchangePrograms,
  },
];

/**
 * Get all programs flat list
 */
export const allPrograms: ProgramItem[] = [...infoPromoPrograms, ...exchangePrograms];

/**
 * Get program by ID
 */
export function getProgramById(id: string): ProgramItem | undefined {
  return allPrograms.find((program) => program.id === id);
}
