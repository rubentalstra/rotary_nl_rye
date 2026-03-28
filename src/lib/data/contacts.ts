import type { ContactSection } from "@/lib/types";
import { mdjcContacts } from "./contacts-mdjc";
import { longTermContacts } from "./contacts-long-term";
import { shortTermContacts } from "./contacts-short-term";
import { rotexContacts } from "./contacts-rotex";

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
