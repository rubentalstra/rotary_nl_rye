/**
 * Students feature types
 */

import type { SocialMedia } from "@/core/types/common";
import { getCountryName } from "@/shared/utils/flags";

/**
 * Student type: inbound (coming to NL), outbound (going abroad), or rebound (returned)
 */
export type StudentType = "inbound" | "outbound" | "rebound";

/**
 * Generate a unique student ID from name and type
 */
export function generateStudentId(name: string, type: StudentType): string {
  return `${type}-${name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")}`;
}

/**
 * Base student interface
 * Country codes are stored internally and resolved via getCountryName() for display
 */
export interface Student {
  id: string;
  name: string;
  bio: string;
  description?: string;
  imageUrl?: string;
  videoUrl?: string;

  // Contact
  email?: string;
  phone?: string;
  socialMedia?: SocialMedia;

  // Exchange info - country codes (e.g., "nl", "us", "ar")
  homeCountryCode: string;
  hostCountryCode: string;
  year?: string; // e.g., "2025-2026"

  // Type
  type: StudentType;
}

/**
 * Grouped students by country
 */
export interface CountryGroup {
  countryCode: string;
  students: Student[];
}

/**
 * Grouped students by year (for rebound)
 */
export interface YearGroup {
  year: string;
  students: Student[];
}

/**
 * Raw student data from existing data files
 * Used for migration from old format
 */
export interface RawStudent {
  name: string;
  bio: string;
  description?: string;
  imageUrl?: string;
  videoUrl?: string | null;
  email?: string | null;
  phoneNumber?: string | null;
  snapchatUrl?: string | null;
  facebookUrl?: string | null;
  instagramUrl?: string | null;
  websiteUrl?: string | null;
  linkedinUrl?: string | null;
  from: string;
  fromFlag: string;
  to: string;
  toFlag: string;
}

/**
 * Helper to convert raw student to new format
 */
export function convertRawStudent(raw: RawStudent, type: StudentType, year?: string): Student {
  // Build social media object
  const socialMedia: SocialMedia | undefined =
    raw.instagramUrl || raw.facebookUrl || raw.snapchatUrl || raw.linkedinUrl || raw.websiteUrl
      ? {
          instagram: raw.instagramUrl || undefined,
          facebook: raw.facebookUrl || undefined,
          snapchat: raw.snapchatUrl || undefined,
          linkedin: raw.linkedinUrl || undefined,
          website: raw.websiteUrl || undefined,
        }
      : undefined;

  return {
    id: generateStudentId(raw.name, type),
    name: raw.name,
    bio: raw.bio,
    description: raw.description,
    imageUrl: raw.imageUrl,
    videoUrl: raw.videoUrl || undefined,
    email: raw.email || undefined,
    phone: raw.phoneNumber || undefined,
    socialMedia,
    homeCountryCode: raw.fromFlag,
    hostCountryCode: raw.toFlag,
    year,
    type,
  };
}

/**
 * Group students by their home country (for inbound display)
 */
export function groupByHomeCountry(students: Student[]): CountryGroup[] {
  const grouped = new Map<string, CountryGroup>();

  for (const student of students) {
    const key = student.homeCountryCode;
    const existing = grouped.get(key);

    if (existing) {
      existing.students.push(student);
    } else {
      grouped.set(key, {
        countryCode: student.homeCountryCode,
        students: [student],
      });
    }
  }

  // Sort by country name using the flags utility
  return Array.from(grouped.values()).sort((a, b) =>
    getCountryName(a.countryCode).localeCompare(getCountryName(b.countryCode)),
  );
}

/**
 * Group students by their host country (for outbound display)
 */
export function groupByHostCountry(students: Student[]): CountryGroup[] {
  const grouped = new Map<string, CountryGroup>();

  for (const student of students) {
    const key = student.hostCountryCode;
    const existing = grouped.get(key);

    if (existing) {
      existing.students.push(student);
    } else {
      grouped.set(key, {
        countryCode: student.hostCountryCode,
        students: [student],
      });
    }
  }

  // Sort by country name using the flags utility
  return Array.from(grouped.values()).sort((a, b) =>
    getCountryName(a.countryCode).localeCompare(getCountryName(b.countryCode)),
  );
}

/**
 * Group students by year
 */
export function groupByYear(students: Student[]): YearGroup[] {
  const grouped = new Map<string, YearGroup>();

  for (const student of students) {
    const year = student.year || "Unknown";
    const existing = grouped.get(year);

    if (existing) {
      existing.students.push(student);
    } else {
      grouped.set(year, {
        year,
        students: [student],
      });
    }
  }

  // Sort by year descending (newest first)
  return Array.from(grouped.values()).sort((a, b) => b.year.localeCompare(a.year));
}
