import type { InfoPageContent } from "../../../../types";

export const familyOverviewContent: InfoPageContent = {
  pageKey: "outbound-family-overview",
  header: {
    icon: "home-outline",
    title: "Family to Family",
    subtitle: "Verblijf bij een gastgezin in het buitenland",
  },
  sections: [
    {
      id: "what-is-family",
      icon: "information-circle-outline",
      title: "Wat is Family-to-Family?",
      blocks: [
        {
          id: "family-intro",
          type: "card",
          icon: "home-outline",
          iconColor: "primary",
          accentColor: "primary",
          content:
            "Het Family-to-Family programma biedt jongeren de mogelijkheid om het leven in een andere cultuur te ervaren door 2-6 weken bij een gastgezin te verblijven. Deze authentieke culturele uitwisseling stelt deelnemers in staat zich volledig onder te dompelen in het dagelijkse leven, lokale gewoonten en familietradities.",
        },
      ],
    },
    {
      id: "highlights",
      icon: "star-outline",
      title: "Programma Overzicht",
      blocks: [
        {
          id: "highlights-grid",
          type: "highlight",
          items: [
            {
              icon: "calendar-outline",
              title: "Duur",
              value: "2-6 weken",
            },
            {
              icon: "people-outline",
              title: "Leeftijd",
              value: "15-25 jaar",
            },
            {
              icon: "home-outline",
              title: "Onderdak",
              value: "Gastgezinnen",
            },
          ],
        },
      ],
    },
  ],
};
