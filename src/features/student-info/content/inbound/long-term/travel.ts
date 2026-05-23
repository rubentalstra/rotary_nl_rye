import type { InfoPageContent } from "../../../types";

export const travelContent: InfoPageContent = {
  pageKey: "inbound-travel",
  header: {
    icon: "map-outline",
    title: "Travel",
    subtitle: "Exploring the Netherlands during your exchange year",
  },
  sections: [
    {
      id: "guidelines",
      icon: "document-text-outline",
      title: "Travel Guidelines",
      blocks: [
        {
          id: "allowed-travel",
          type: "card",
          icon: "checkmark-circle",
          iconColor: "success",
          title: "Allowed Travel",
          content:
            "Travel is allowed with your host family, with Rotary club members, and on authorized school trips. Travel rules apply both inside the Netherlands and abroad.",
        },
      ],
    },
    {
      id: "prohibited",
      blocks: [
        {
          id: "warning-card",
          type: "card",
          icon: "close-circle-outline",
          iconColor: "warning",
          title: "Strictly Prohibited",
          accentColor: "warning",
          content: "Visits to family or friends abroad are not permitted!",
        },
      ],
    },
    {
      id: "holidays",
      icon: "airplane-outline",
      title: "Host Family Holidays",
      blocks: [
        {
          id: "holidays-card",
          type: "card",
          icon: "document-outline",
          iconColor: "warning",
          title: "Parental Approval Required",
          accentColor: "warning",
          content:
            "One of your host families might suggest to participate in a holiday somewhere abroad. This is usually OK when you will have a written approval from your parents.",
        },
      ],
    },
  ],
};
