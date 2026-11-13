/**
 * Common base types used across the application
 */

/**
 * Base entity with an ID
 */
export interface BaseEntity {
  id: string;
}

/**
 * Entity with an optional image
 */
export interface WithImage {
  imageUrl?: string;
}

/**
 * Social media links
 */
export interface SocialMedia {
  instagram?: string;
  facebook?: string;
  snapchat?: string;
  linkedin?: string;
  website?: string;
}

/**
 * Entity with social media links
 */
export interface WithSocialMedia {
  socialMedia?: SocialMedia;
}

/**
 * Country representation
 */
export interface Country {
  code: string;
  name: string;
  flag: string;
}

/**
 * Contact information
 */
export interface ContactInfo {
  email?: string;
  phone?: string;
  whatsapp?: string;
}

/**
 * Date range for events
 */
export interface DateRange {
  start: string;
  end?: string;
}

/**
 * Generic async state for data fetching
 */
export interface AsyncState<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}
