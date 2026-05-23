/**
 * Hook for accessing contacts data
 */

import { useMemo } from "react";
import { contactSections } from "../data";
import type { Contact, ContactCategory, ContactSection } from "../types";

/**
 * Get all contact sections
 */
export function useContactSections(): ContactSection[] {
  return contactSections;
}

/**
 * Get contacts by category
 */
export function useContactsByCategory(category: ContactCategory): Contact[] {
  return useMemo(() => {
    const section = contactSections.find((s) => s.id === category);
    return section?.contacts ?? [];
  }, [category]);
}

/**
 * Get a single contact by ID
 */
export function useContact(id: string): Contact | undefined {
  return useMemo(() => {
    for (const section of contactSections) {
      const contact = section.contacts.find((c) => c.id === id);
      if (contact) return contact;
    }
    return undefined;
  }, [id]);
}

/**
 * Search contacts by name
 */
export function useSearchContacts(query: string): Contact[] {
  return useMemo(() => {
    if (!query.trim()) return [];

    const lowerQuery = query.toLowerCase();
    const results: Contact[] = [];

    for (const section of contactSections) {
      for (const contact of section.contacts) {
        if (
          contact.name.toLowerCase().includes(lowerQuery) ||
          contact.role.toLowerCase().includes(lowerQuery)
        ) {
          results.push(contact);
        }
      }
    }

    return results;
  }, [query]);
}

/**
 * Get contact counts by category
 */
export function useContactCounts(): Record<ContactCategory, number> {
  return useMemo(() => {
    const counts: Record<ContactCategory, number> = {
      mdjc: 0,
      longterm: 0,
      shortterm: 0,
      rotex: 0,
    };

    for (const section of contactSections) {
      counts[section.id] = section.contacts.length;
    }

    return counts;
  }, []);
}
