import type { InfoPageContent } from "../../../../types";

export const familyCountriesPreferenceContent: InfoPageContent = {
  pageKey: "outbound-family-countries",
  header: {
    icon: "globe-outline",
    title: "Landenvoorkeur",
    subtitle: "Kies je voorkeursbestemming voor de Family-to-Family ervaring",
  },
  sections: [
    {
      id: "how-to-choose",
      icon: "help-circle-outline",
      title: "Hoe kies je je voorkeur?",
      blocks: [
        {
          id: "choose-info",
          type: "card",
          icon: "information-circle-outline",
          iconColor: "primary",
          accentColor: "primary",
          content:
            "Als je mee wilt doen aan het Family to Family programma geef je op of je voor het noordelijk of zuidelijk halfrond gaat. Bij de landenkeuze dien je drie landen op 2 continenten op te geven. Hierbij gelden de Verenigde Staten en Canada als één bestemming. De reden hiervoor is dat we niet alle kandidaten in de VS en Canada kunnen plaatsen. Daarbij komt dat als jij de juiste instelling hebt voor een Family to Family uitwisseling het uiteindelijk niet uitmaakt naar welk land je gaat.",
        },
      ],
    },
    {
      id: "europe",
      icon: "star-outline",
      title: "Europa: Noordelijk of Zuidelijk",
      blocks: [
        {
          id: "europe-card",
          type: "card",
          icon: "flag-outline",
          iconColor: "primary",
          accentColor: "primary",
          content:
            "Binnen Europa, ook al ligt dit naast de deur, vinden de mooiste uitwisselingen plaats en ontstaan de mooiste vriendschappen met het voordeel dat je deze vrienden makkelijker kunt herbezoeken. De reiskosten zijn veel lager.",
        },
      ],
    },
    {
      id: "tips",
      icon: "bulb-outline",
      title: "Tips voor een goede keuze",
      blocks: [
        {
          id: "tips-list",
          type: "tips",
          items: [
            {
              number: 1,
              title: "Taal en cultuur",
              content: "Overweeg landen waar je de taal spreekt of wilt leren",
            },
            {
              number: 2,
              title: "Cultuur",
              content: "Kies landen waarvan de cultuur en geschiedenis je echt interesseren.",
            },
            {
              number: 3,
              title: "Reiskosten",
              content: "Houd rekening met reiskosten en afstand, vooral bij kortere programma's.",
            },
          ],
        },
      ],
    },
  ],
};
