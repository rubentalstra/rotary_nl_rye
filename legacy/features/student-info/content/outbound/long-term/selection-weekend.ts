import type { InfoPageContent } from "../../../types";

export const selectionWeekendContent: InfoPageContent = {
  pageKey: "outbound-selection-weekend",
  header: {
    icon: "calendar-outline",
    title: "Selectie weekend",
    subtitle: "Het selectieweekend als onderdeel van het uitwisselingsproces",
  },
  sections: [
    {
      id: "goals",
      icon: "flag-outline",
      title: "Het weekend dient een aantal doelen:",
      blocks: [
        {
          id: "weekend-tips",
          type: "tips",
          items: [
            {
              number: 1,
              content:
                "Elkaar beter leren kennen. De groep leert elkaar beter kennen en wij leren jullie beter kennen. Wij kunnen zó beter inschatten waar jullie als toekomstige Outbounds naar toe zouden kunnen gaan.",
            },
            {
              number: 2,
              content: "Jezelf presenteren.",
            },
            {
              number: 3,
              content:
                "Je oriënteren op een top-drie van landen waarnaar je het liefst wilt worden uitgezonden. Zowel Internationaal als Europees.",
            },
            {
              number: 4,
              content:
                'Selectie: Je kunt laten zien dat je uit het goede "uitwisselingshout" bent gesneden. Aanwezigheid is verplicht. Het weekend is dan ook onderdeel van de uiteindelijke selectie.',
            },
          ],
        },
      ],
    },
    {
      id: "important-info",
      blocks: [
        {
          id: "info-card",
          type: "card",
          icon: "information-circle",
          iconColor: "primary",
          title: "Belangrijk om te weten",
          accentColor: "primary",
          content:
            "Je krijgt een mail van ons voor het weekend waarin staat wat je moet meenemen, en wat je moet voorbereiden. Het is altijd een topweekend.",
        },
      ],
    },
  ],
};
