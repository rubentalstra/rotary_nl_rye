/**
 * Gastgezin section data
 */

import type { SectionPageContent } from "../types";

export const gastgezinContent: SectionPageContent = {
  id: "gastgezin",
  title: "Info Gastgezin",
  description: "Informatie en documentatie voor gastgezinnen die een exchange student ontvangen.",
  type: "documents",
  documents: [
    {
      id: "handboek-gastgezin",
      title: "Handboek Gastgezin",
      icon: "home",
      pdfUrl:
        "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/rotary-club-info/25-26/handboek-gastgezin-versie-2025-2026-def.pdf",
    },
    {
      id: "first-night-questions",
      title: "First Night Questions",
      icon: "question-circle",
      pdfUrl:
        "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/rotary-club-info/25-26/first-nights-questions-aangepast.pdf",
    },
    {
      id: "travel-rules",
      title: "Travel rules within and outside the Netherlands",
      icon: "suitcase-rolling",
      pdfUrl:
        "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/rotary-club-info/25-26/travel-rules-within-and-outside-the-netherlands-2024-2025.pdf",
    },
  ],
};
