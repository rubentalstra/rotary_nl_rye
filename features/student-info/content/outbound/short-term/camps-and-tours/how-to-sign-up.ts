import type { InfoPageContent } from "../../../../types";

export const campsHowToSignUpContent: InfoPageContent = {
  pageKey: "outbound-camps-signup",
  header: {
    icon: "airplane-outline",
    title: "Hoe schrijf ik mezelf in?",
    subtitle: "Eenvoudige stappen om je aan te melden voor Zomerkampen",
  },
  sections: [
    {
      id: "apply",
      icon: "mail-outline",
      title: "Aanmelden",
      blocks: [
        {
          id: "email-card",
          type: "card",
          icon: "mail-outline",
          iconColor: "primary",
          title: "Stuur een email",
          accentColor: "primary",
          content:
            "Je stuurt een gezellig email bericht naar: zomerkamp@rotaryyep.nl. Dan krijg je van ons een bevestiging dat we je mail hebben ontvangen.",
        },
        {
          id: "email-cta",
          type: "cta",
          action: "email",
          target: "zomerkamp@rotaryyep.nl",
          label: "Verstuur een Email",
          description: "Klik om direct een email te sturen",
        },
      ],
    },
  ],
};
