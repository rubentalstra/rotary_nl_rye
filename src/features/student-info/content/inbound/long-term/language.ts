import type { InfoPageContent } from "../../../types";

export const languageContent: InfoPageContent = {
  pageKey: "inbound-language",
  header: {
    icon: "chatbubble-outline",
    title: "Language",
    subtitle: "Learning Dutch for a successful exchange experience",
  },
  sections: [
    {
      id: "challenge",
      blocks: [
        {
          id: "challenge-card",
          type: "card",
          icon: "trending-up-outline",
          iconColor: "secondary",
          title: "The Challenge",
          accentColor: "secondary",
          content:
            "There's no hiding it: Dutch is a very difficult language to learn. However, we do expect you to master the language and that within months after your arrival you will be fluent in our language.",
        },
      ],
    },
    {
      id: "doc",
      icon: "school-outline",
      title: "Dutch Orientation Course (DOC)",
      blocks: [
        {
          id: "doc-highlights",
          type: "highlight",
          items: [
            {
              icon: "calendar-outline",
              title: "Timing",
              value: "September & February",
            },
            {
              icon: "time-outline",
              title: "Duration",
              value: "6 days intensive",
            },
            {
              icon: "people-outline",
              title: "Format",
              value: "Small groups",
            },
            {
              icon: "globe-outline",
              title: "Focus",
              value: "Language + culture",
            },
          ],
        },
        {
          id: "doc-note",
          type: "text",
          content: "Lots of fun included with students from around the world!",
        },
      ],
    },
    {
      id: "support",
      icon: "home-outline",
      title: "Host Family Support",
      blocks: [
        {
          id: "support-card",
          type: "card",
          icon: "heart-outline",
          iconColor: "success",
          title: "Your Learning Partners",
          accentColor: "success",
          content:
            "Your first host family will also help you to learn Dutch and you will receive books to start learning the language as soon as you are in the Netherlands.",
        },
      ],
    },
  ],
};
