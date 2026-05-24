import type { InfoPageContent } from "../../../../types";

export const campsComplyWithContent: InfoPageContent = {
  pageKey: "outbound-camps-comply",
  header: {
    icon: "people-outline",
    title: "Voor wie?",
    subtitle: "Leeftijd en deelname informatie voor Zomerkampen",
  },
  sections: [
    {
      id: "age-requirements",
      icon: "calendar-outline",
      title: "Leeftijdsvereisten",
      blocks: [
        {
          id: "age-card",
          type: "card",
          icon: "person-outline",
          iconColor: "primary",
          title: "15 - 21 jaar",
          accentColor: "primary",
          content: "Perfecte leeftijd voor internationale ervaringen en persoonlijke groei",
        },
      ],
    },
    {
      id: "eligibility",
      icon: "checkmark-circle-outline",
      title: "Wie kan deelnemen?",
      blocks: [
        {
          id: "rotarian-families",
          type: "card",
          icon: "people-outline",
          iconColor: "primary",
          title: "Rotarian Families",
          accentColor: "primary",
          content: "Kinderen en kleinkinderen van Rotary leden",
        },
        {
          id: "non-rotarian",
          type: "card",
          icon: "heart-outline",
          iconColor: "secondary",
          title: "Non-Rotarian Youth",
          accentColor: "secondary",
          content: "Alle gemotiveerde jongeren uit de gemeenschap",
        },
      ],
    },
    {
      id: "what-to-expect",
      icon: "star-outline",
      title: "Wat kun je verwachten?",
      blocks: [
        {
          id: "international",
          type: "card",
          icon: "globe-outline",
          iconColor: "primary",
          title: "Internationale Ervaring",
          accentColor: "primary",
          content: "Ontdek nieuwe culturen en maak vrienden over de hele wereld",
        },
        {
          id: "development",
          type: "card",
          icon: "school-outline",
          iconColor: "success",
          title: "Persoonlijke Ontwikkeling",
          accentColor: "success",
          content: "Ontwikkel zelfvertrouwen en leiderschapsvaardigheden",
        },
        {
          id: "memories",
          type: "card",
          icon: "camera-outline",
          iconColor: "info",
          title: "Onvergetelijke Herinneringen",
          accentColor: "info",
          content: "Creëer levenslange herinneringen en verhalen om te delen",
        },
      ],
    },
  ],
};
