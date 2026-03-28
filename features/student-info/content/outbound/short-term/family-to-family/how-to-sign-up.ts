import type { InfoPageContent } from "../../../../types";

export const familyHowToSignUpContent: InfoPageContent = {
  pageKey: "outbound-family-signup",
  header: {
    icon: "document-text-outline",
    title: "Hoe schrijf ik mezelf in",
    subtitle: "Stappen om je aan te melden voor het Family-to-Family programma",
  },
  sections: [
    {
      id: "apply",
      icon: "mail-outline",
      title: "Aanmelding",
      blocks: [
        {
          id: "instruction-card",
          type: "card",
          icon: "mail-outline",
          iconColor: "primary",
          accentColor: "primary",
          content:
            "Je stuurt een gezellig email bericht naar: interesse@rotaryyep.nl. Dan krijg je van ons een bevestiging dat we je mail hebben ontvangen.",
        },
        {
          id: "email-cta",
          type: "cta",
          action: "email",
          target: "interesse@rotaryyep.nl",
          subject: "Interesse in Family-to-Family programma",
          label: "Verstuur Email",
          description: "Klik om direct een email te sturen naar interesse@rotaryyep.nl",
        },
      ],
    },
  ],
};
