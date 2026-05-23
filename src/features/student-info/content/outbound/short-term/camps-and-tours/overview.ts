import type { InfoPageContent } from "../../../../types";

export const campsOverviewContent: InfoPageContent = {
  pageKey: "outbound-camps-overview",
  header: {
    icon: "sunny-outline",
    title: "Zomerkampen",
    subtitle: "Ervaar andere culturen tijdens de zomervakantie",
  },
  sections: [
    {
      id: "what-are-camps",
      icon: "information-circle-outline",
      title: "Wat zijn Zomerkampen?",
      blocks: [
        {
          id: "camps-intro",
          type: "card",
          icon: "sunny-outline",
          iconColor: "primary",
          accentColor: "primary",
          content:
            "Rotary Zomerkampen zijn kortdurende uitwisselingsprogramma's die meestal 2-6 weken duren tijdens schoolvakanties. Deze programma's bieden jongeren de mogelijkheid om verschillende culturen te ervaren, internationale vriendschappen te sluiten en deel te nemen aan spannende activiteiten terwijl ze verblijven bij gastgezinnen of in georganiseerde accommodaties.",
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
              icon: "school-outline",
              title: "Leeftijd",
              value: "15-21 jaar",
            },
            {
              icon: "sunny-outline",
              title: "Timing",
              value: "Schoolvakanties",
            },
          ],
        },
      ],
    },
  ],
};
