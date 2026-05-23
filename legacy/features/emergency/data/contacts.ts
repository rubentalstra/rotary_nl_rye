/**
 * Emergency contacts data
 */

import type { EmergencyContact, EmergencySection } from "../types";

/**
 * Rotary Youth Exchange contacts
 */
export const rotaryYouthExchangeContacts: EmergencyContact[] = [
  {
    id: "emergency-barbara-tusveld",
    name: "Barbara Tusveld",
    role: "Voorzitter Rotary Youth Exchange",
    phone: "+31655128529",
  },
  {
    id: "emergency-marga-oosterveld",
    name: "Marga Oosterveld",
    role: "Voorzitter Longterm",
    phone: "+31629586813",
  },
  {
    id: "emergency-clasine-scheepers",
    name: "Clasine Scheepers",
    role: "Secretaris",
    phone: "+31652710977",
  },
  {
    id: "emergency-hilleke-van-der-veer",
    name: "Hilleke van der Veer",
    role: "Landelijke Counselor",
    phone: "+31638300427",
  },
];

/**
 * Independent confidants
 */
export const confidantContacts: EmergencyContact[] = [
  {
    id: "confidant-pauline-memelink",
    name: "Pauline Memelink",
    role: "Lawyer",
    phone: "+31624235624",
    email: "p.memelink@t-mobilethuis.nl",
  },
  {
    id: "confidant-reinout-vriesendorp",
    name: "Reinout Vriesendorp",
    role: "Doctor's office",
    phone: "+31182612676",
    email: "info@medischcentrumwest.org",
  },
];

/**
 * Emergency sections with all contacts
 */
export const emergencySections: EmergencySection[] = [
  {
    id: "rotary-youth-exchange",
    title: "Rotary Youth Exchange",
    icon: "shield-checkmark",
    contacts: rotaryYouthExchangeContacts,
  },
  {
    id: "confidants",
    title: "Independent Confidants",
    description: "Not connected to Rotary - In case of f.e. sexual harassment",
    icon: "heart",
    contacts: confidantContacts,
  },
];
