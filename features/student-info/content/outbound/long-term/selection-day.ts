import type { InfoPageContent } from "../../../types";

export const selectionDayContent: InfoPageContent = {
  pageKey: "outbound-selection-day",
  header: {
    icon: "people-outline",
    title: "Selectie dag",
    subtitle: "Wat je kunt verwachten tijdens de selectiedag voor Rotary Youth Exchange",
  },
  sections: [
    {
      id: "what-to-do",
      icon: "checkmark-circle-outline",
      title: "Wat moet ik doen voor de selectie dag:",
      blocks: [
        {
          id: "advice-card",
          type: "card",
          content: "Ik zou gewoon je best en doen en jezelf zijn.",
        },
      ],
    },
    {
      id: "what-to-expect",
      icon: "eye-outline",
      title: "Dit is wat je deze dag kan verwachten:",
      blocks: [
        {
          id: "activities-card",
          type: "card",
          content:
            "Je krijgt een interview, een groepsgesprek, een discussie en een test over je kennis van Nederland.",
        },
        {
          id: "preview-card",
          type: "card",
          content:
            "Dit zijn een paar voorbeeld vragen uit het interview tijdens de selectie dag. We gaan je niet alles vertellen, maar zo krijg je een beetje een idee.",
        },
      ],
    },
    {
      id: "example-questions",
      icon: "help-circle-outline",
      title: "Voorbeeld vragen:",
      blocks: [
        {
          id: "question-1",
          type: "card",
          accentColor: "primary",
          content: "Wat betekent volgens jou het zijn van Ambassadeur voor Rotary",
        },
        {
          id: "question-2",
          type: "card",
          accentColor: "primary",
          content: "Wie is je rolmodel, voor wie heb je bewondering",
        },
        {
          id: "question-3",
          type: "card",
          accentColor: "primary",
          content: "Wat was de gelukkigste/mooiste dag in je leven",
        },
        {
          id: "question-4",
          type: "card",
          accentColor: "primary",
          content: "Op welke eigenschap ben je het meest trots",
        },
        {
          id: "question-5",
          type: "card",
          accentColor: "primary",
          content: "Wat denk je dat het moeilijkste is als je een jaar in het buitenland bent",
        },
      ],
    },
  ],
};
