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
  role: string;
  functions: string[];
  bio?: string;
  imageUrl?: string;

  email?: string;
  phone?: string;
  whatsapp?: string;
  socialMedia?: SocialMedia;

  club?: string;
  district?: string;

  category: ContactCategory;
}

export interface ContactSection {
  id: ContactCategory;
  title: string;
  description?: string;
  contacts: Contact[];
}
