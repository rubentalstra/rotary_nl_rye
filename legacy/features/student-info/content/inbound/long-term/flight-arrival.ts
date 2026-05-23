import type { InfoPageContent } from "../../../types";

export const flightArrivalContent: InfoPageContent = {
  pageKey: "inbound-flight-arrival",
  header: {
    icon: "airplane-outline",
    title: "Flight & Arrival",
    subtitle: "Important information about your flight and arrival in the Netherlands",
  },
  sections: [
    {
      id: "flight",
      icon: "airplane-outline",
      title: "Flight",
      blocks: [
        {
          id: "flight-info",
          type: "card",
          content:
            "You should obtain a changeable open return airline ticket. Your arrival airport is Amsterdam (Schiphol) Airport.",
        },
      ],
    },
    {
      id: "arrival",
      icon: "location-outline",
      title: "Arrival",
      blocks: [
        {
          id: "arrival-info",
          type: "card",
          content: "More arrival information will be provided closer to your departure date.",
        },
      ],
    },
  ],
};
