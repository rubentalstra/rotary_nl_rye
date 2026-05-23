import type { InfoPageContent } from "../../../../types";

export const familyComplyWithContent: InfoPageContent = {
  pageKey: "outbound-family-comply",
  header: {
    icon: "shield-checkmark-outline",
    title: "Waar moet ik aan voldoen?",
    subtitle: "Vereisten en richtlijnen voor Family-to-Family deelnemers",
  },
  sections: [
    {
      id: "eligibility",
      icon: "information-circle-outline",
      title: "Geschiktheid voor deelname",
      blocks: [
        {
          id: "eligibility-card",
          type: "card",
          icon: "people-outline",
          iconColor: "primary",
          accentColor: "primary",
          content:
            "Alle jongens en meisjes in de leeftijd van 15 t/m 19* jaar, die open staan voor anderen, van hen willen leren, met hen ervaringen willen uitwisselen, die uit hun eigen vertrouwde omgeving willen stappen en die anderen zonder vooroordelen willen ontmoeten zijn geschikt om aan dit programma deel te nemen.",
        },
      ],
    },
    {
      id: "age-note",
      icon: "calendar-outline",
      title: "Leeftijdsvereisten",
      blocks: [
        {
          id: "age-note-card",
          type: "card",
          icon: "calendar-outline",
          iconColor: "info",
          accentColor: "info",
          content:
            "*Deelnemers moeten tussen 15 en 19 jaar oud zijn om deel te kunnen nemen aan het Family-to-Family programma.",
        },
      ],
    },
  ],
};
