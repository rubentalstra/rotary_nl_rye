/**
 * About screen data
 */

import type { AboutSection } from "../types";

export const aboutSections: AboutSection[] = [
  {
    id: "wie-zijn-wij",
    icon: "flag",
    title: "Wie zijn wij",
    subtitle: "Nederland MDJC - Multi district Jeugd Commissie",
    content:
      "Internationale jeugduitwisselingen met Rotary worden al 55 jaar met succes georganiseerd. Jeugduitwisselingen zit in het DNA van Rotary. De jeugd heeft de toekomst, niet alleen voor de Rotary, maar ook voor de wereld. In 2010 is Jeugdzaken met jeugduitwisseling de vijfde Avenue binnen Rotary geworden. Jaarlijks zijn er 7000 Exchanges wereldwijd.",
  },
  {
    id: "onze-missie",
    icon: "rocket",
    title: "Onze Missie",
    content:
      "Rotary Youth Exchange biedt jongeren de kans om een jaar (of kortere periode) in het buitenland te wonen, studeren en een nieuwe cultuur te ontdekken. Het programma stimuleert:",
    listItems: [
      "Internationaal begrip en vrede door jongeren wereldwijd met elkaar te verbinden",
      "Persoonlijke ontwikkeling door jongeren uit hun comfortzone te laten stappen, zelfstandig te worden en zich aan te passen aan een nieuwe omgeving",
      "Culturele uitwisseling door het leren van talen, gebruiken en gewoonten in een ander land",
      "Ambassadeurschap: deelnemers vertegenwoordigen hun eigen land en cultuur, en brengen deze in contact met hun gastland",
    ],
  },
  {
    id: "exchange-programs",
    icon: "airplane",
    title: "Exchange Programs",
    listItems: [
      "Longterm exchanges 10-11 maanden",
      "Short term 2x2 weken (Noordelijk Halfrond) of 4x4 weken (Zuidelijk Halfrond)",
      "Zomerkampen",
    ],
    quote: '"To build peace one young person at a time."',
  },
  {
    id: "values",
    icon: "heart",
    title: "Values",
    listItems: [
      "Cultural understanding and respect",
      "Personal growth and development",
      "Global friendship and peace",
      "Service above self",
    ],
  },
];
