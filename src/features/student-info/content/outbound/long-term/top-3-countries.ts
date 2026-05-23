import type { InfoPageContent } from "../../../types";

export const top3CountriesContent: InfoPageContent = {
  pageKey: "outbound-top-3-countries",
  header: {
    icon: "earth-outline",
    title: "Goede top 3 van landen",
    subtitle: "Tips voor het kiezen van jouw voorkeursbestemmingen",
  },
  sections: [
    {
      id: "tips",
      icon: "bulb-outline",
      title: "Tips voor een goede keuze",
      blocks: [
        {
          id: "country-tips",
          type: "tips",
          items: [
            {
              number: 1,
              content: "Lees in deze app de verhalen van exchange studenten",
            },
            {
              number: 2,
              content:
                'Kijk op YouTube en google "Rotary Youth Exchange" dan kom je ook heel veel te weten.',
            },
            {
              number: 3,
              content:
                "Praat met voormalige uitwisselingsstudenten over hun ervaringen in verschillende landen.",
            },
          ],
        },
      ],
    },
    {
      id: "video",
      icon: "play-circle-outline",
      title: "Inspiratie Video",
      blocks: [
        {
          id: "promo-video",
          type: "video",
          videoUrl:
            "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/videos/promo/proud_to_be_European.mp4",
          title: "Proud to be European",
          description:
            "Ontdek wat het betekent om een Europese uitwisselingsstudent te zijn en laat je inspireren door de verhalen van anderen.",
          thumbnailTime: 15000,
        },
      ],
    },
  ],
};
