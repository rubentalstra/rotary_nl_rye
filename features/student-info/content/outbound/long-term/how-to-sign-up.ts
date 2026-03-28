import type { InfoPageContent } from "../../../types";

export const howToSignUpContent: InfoPageContent = {
  pageKey: "outbound-how-to-sign-up",
  header: {
    icon: "document-text-outline",
    title: "Hoe schrijf ik mezelf in",
    subtitle: "Stappen om jezelf in te schrijven voor de lange termijn uitwisseling",
  },
  sections: [
    {
      id: "email-instructions",
      blocks: [
        {
          id: "email-card",
          type: "card",
          content:
            "Je stuurt een gezellig email bericht naar: interesse@rotaryyep.nl. Dan krijg je van ons een bevestiging dat we je mail hebben ontvangen.",
        },
      ],
    },
    {
      id: "cta",
      blocks: [
        {
          id: "email-cta",
          type: "cta",
          action: "email",
          target: "interesse@rotaryyep.nl?subject=Interesse%20in%20lange%20termijn%20uitwisseling",
          label: "Verstuur een Email",
          description: "Opent je email app voor het versturen van een email",
        },
      ],
    },
  ],
};
