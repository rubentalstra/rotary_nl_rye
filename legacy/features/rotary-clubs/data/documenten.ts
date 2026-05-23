/**
 * Documenten section data
 */

import type { SectionPageContent } from "../types";

export const documentenContent: SectionPageContent = {
  id: "documenten",
  title: "Belangrijke Documenten",
  description:
    "Essentiële documenten en regelgeving voor alle Rotary clubs die deelnemen aan het uitwisselingsprogramma.",
  type: "documents",
  documents: [
    {
      id: "code-of-policies",
      title: "Code of Policies 'Regels en Interventies'",
      icon: "home",
      pdfUrl:
        "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/rotary-club-info/jaaruitwisseling-regels-en-interventies-v7-1-2020.pdf",
    },
    {
      id: "mdjc-gedragscode",
      title: "MDJC gedragscode - VJV - 'Vrijwilliger Jeugd Verklaring'",
      icon: "users",
      pdfUrl:
        "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/rotary-club-info/25-26/def.-gedragscode-vrijwilligers-mdjc-26-27.pdf",
    },
    {
      id: "first-night-questions",
      title: "First Night Questions",
      icon: "question-circle",
      pdfUrl:
        "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/rotary-club-info/25-26/first-nights-questions-aangepast.pdf",
    },
  ],
};
