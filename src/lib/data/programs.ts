import type { ProgramItem, ProgramSection } from "@/lib/types";

export const introText = `Ontdek alle uitwisselingsprogramma's die Rotary YEP Nederland aanbiedt. Van lange termijn jaaruitwisselingen tot korte zomerprogramma's en promotioneel materiaal.`;

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

export const infoPromoPrograms: ProgramItem[] = [
  {
    id: "promo",
    title: "Promo",
    subtitle: "Podcast & Video",
    icon: "podcast",
    route: "/programs/promo",
  },
];

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

export const allPrograms: ProgramItem[] = [...infoPromoPrograms, ...exchangePrograms];

export function getProgramById(id: string): ProgramItem | undefined {
  return allPrograms.find((program) => program.id === id);
}
