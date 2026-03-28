/**
 * Contact data exports
 */

import type { ContactSection } from "../types";
import { mdjcContacts } from "./mdjc";
import { longTermContacts } from "./long-term";
import { shortTermContacts } from "./short-term";
import { rotexContacts } from "./rotex";

export { mdjcContacts } from "./mdjc";
export { longTermContacts } from "./long-term";
export { shortTermContacts } from "./short-term";
export { rotexContacts } from "./rotex";

export const contactSections: ContactSection[] = [
  {
    id: "mdjc",
    title: "MDJC",
    description: "Multi District Jeugd Commissie",
    contacts: mdjcContacts,
  },
  {
    id: "longterm",
    title: "Long Term",
    description: "Long Term Exchange Team",
    contacts: longTermContacts,
  },
  {
    id: "shortterm",
    title: "Short Term",
    description: "Short Term Exchange Team",
    contacts: shortTermContacts,
  },
  {
    id: "rotex",
    title: "ROTEX",
    description: "Returned Exchange Students",
    contacts: rotexContacts,
  },
];
