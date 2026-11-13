import type { InfoPageContent } from "../../../types";

export const insuranceContent: InfoPageContent = {
  pageKey: "inbound-insurance",
  header: {
    icon: "shield-checkmark-outline",
    title: "Insurance",
    subtitle: "Comprehensive insurance coverage for your exchange year",
  },
  sections: [
    {
      id: "compulsory",
      blocks: [
        {
          id: "compulsory-card",
          type: "card",
          icon: "alert-circle-outline",
          iconColor: "primary",
          title: "Compulsory Coverage",
          accentColor: "primary",
          content:
            "The insurance policy from the Netherlands is compulsory. We will pre-insure you, so you will be fully insured as soon as you will land at Amsterdam Schiphol airport up until you are leaving at the airport again.",
        },
      ],
    },
    {
      id: "timeline",
      icon: "time-outline",
      title: "Coverage Timeline",
      blocks: [
        {
          id: "coverage-timeline",
          type: "timeline",
          items: [
            {
              icon: "airplane-outline",
              iconColor: "info",
              title: "Arrival at Schiphol",
              description: "Coverage begins immediately upon landing",
            },
            {
              icon: "calendar-outline",
              iconColor: "success",
              title: "During Exchange",
              description: "Full coverage throughout your stay",
            },
            {
              icon: "home-outline",
              iconColor: "warning",
              title: "Departure",
              description: "Coverage ends when you leave the airport",
            },
          ],
        },
      ],
    },
    {
      id: "documents",
      icon: "document-text-outline",
      title: "Policy Documents",
      blocks: [
        {
          id: "documents-card",
          type: "card",
          icon: "mail-outline",
          iconColor: "success",
          title: "Document Delivery",
          accentColor: "success",
          content:
            "A copy of the Insurance Policy will be sent to you a few days before you leave your home country.",
        },
      ],
    },
  ],
};
