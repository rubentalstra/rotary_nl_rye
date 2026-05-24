import type { InfoPageContent } from "../../../types";

export const welcomeContent: InfoPageContent = {
  pageKey: "inbound-welcome",
  header: {
    icon: "heart-outline",
    title: "Welcome to the Netherlands!",
    subtitle: "We are excited to have you join our Rotary Youth Exchange family",
  },
  sections: [
    {
      id: "community",
      icon: "people-outline",
      title: "Our Community",
      blocks: [
        {
          id: "highlight-students",
          type: "highlight",
          items: [
            {
              icon: "globe-outline",
              title: "Exchange students",
              value: "35-50 annually",
            },
          ],
        },
        {
          id: "welcome-text",
          type: "card",
          accentColor: "primary",
          content:
            "We are very excited about your upcoming stay with us and looking forward to meeting you. We hope and believe that you will enjoy your stay with us. We have an exciting and active Rotary International Youth Exchange Program with students from around the world.",
        },
        {
          id: "friends-note",
          type: "card",
          icon: "heart-outline",
          iconColor: "secondary",
          accentColor: "secondary",
          content:
            "You will make friends from all over the world, in addition to making many Dutch friends in your school and Rotary.",
        },
      ],
    },
    {
      id: "experience",
      icon: "star-outline",
      title: "Your Exchange Experience",
      blocks: [
        {
          id: "experience-card",
          type: "card",
          icon: "sparkles-outline",
          iconColor: "secondary",
          title: "One of the best years of your life",
          accentColor: "secondary",
          content:
            "A wonderful experience in a new culture, with a new language but also with some rules to make sure that your stay will be both enjoyable for you and us alike. These rules are consistent with the International Rotary rules.",
        },
      ],
    },
    {
      id: "ambassador",
      blocks: [
        {
          id: "ambassador-card",
          type: "card",
          icon: "ribbon-outline",
          iconColor: "primary",
          title: "Ambassador Role",
          accentColor: "primary",
          content:
            "Please remember that under all circumstances you are an ambassador of Rotary and will have to behave accordingly. Also you will be an ambassador of your country. Both functions will be with you at all times and you will be regarded and judged as such at all times during your exchange!",
        },
      ],
    },
    {
      id: "motto",
      icon: "trophy-outline",
      title: "Our Motto",
      blocks: [
        {
          id: "motto-grid",
          type: "grid",
          title: "Live by these values during your exchange:",
          items: [
            { icon: "checkmark-circle", text: "Be grateful" },
            { icon: "checkmark-circle", text: "Be on purpose" },
            { icon: "checkmark-circle", text: "Be of service" },
            { icon: "checkmark-circle", text: "Be here now" },
            { icon: "checkmark-circle", text: "Be first" },
            { icon: "checkmark-circle", text: "Be curious" },
          ],
          columns: 2,
        },
      ],
    },
  ],
};
