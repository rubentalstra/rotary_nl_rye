/**
 * Contact types
 */

export type ContactCategory = "mdjc" | "rotex" | "longterm" | "shortterm";

export interface SocialMedia {
  instagram?: string;
  facebook?: string;
  snapchat?: string;
  linkedin?: string;
  website?: string;
}

export interface Contact {
  id: string;
  name: string;
  role: string; // Primary function/role
  functions: string[]; // All functions
  bio?: string;
  imageUrl?: string;

  // Contact methods
  email?: string;
  phone?: string;
  whatsapp?: string;
  socialMedia?: SocialMedia;

  // Organization info (for MDJC)
  club?: string;
  district?: string;

  // Category
  category: ContactCategory;
}

export interface ContactSection {
  id: ContactCategory;
  title: string;
  description?: string;
  contacts: Contact[];
}
