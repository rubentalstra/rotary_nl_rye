/**
 * Student Info Feature Types
 *
 * Defines the structure for content pages, blocks, and navigation items
 * used throughout the student information sections.
 */

import type { Ionicons } from "@expo/vector-icons";

// Icon type from Ionicons
export type IconName = keyof typeof Ionicons.glyphMap;

// Color variants for theming
export type AccentColor = "primary" | "secondary" | "success" | "warning" | "info" | "accent";

// ============================================
// Page Header Types
// ============================================

export interface PageHeader {
  /** Icon displayed in the header circle */
  icon: IconName;
  /** Main title of the page */
  title: string;
  /** Optional subtitle below the title */
  subtitle?: string;
}

// ============================================
// Content Block Types
// ============================================

/** Base interface for all content blocks */
interface BaseBlock {
  /** Unique identifier for the block */
  id: string;
}

/** Simple text paragraph */
export interface TextBlock extends BaseBlock {
  type: "text";
  /** The text content to display */
  content: string;
}

/** Card with optional icon and accent border */
export interface CardBlock extends BaseBlock {
  type: "card";
  /** Optional icon to display */
  icon?: IconName;
  /** Color for the icon */
  iconColor?: AccentColor;
  /** Optional card title */
  title?: string;
  /** Card content text */
  content: string;
  /** Color for the left border accent */
  accentColor?: AccentColor;
}

/** Single highlight item */
export interface HighlightItem {
  /** Icon for the highlight */
  icon: IconName;
  /** Title/label */
  title: string;
  /** Value or description */
  value: string;
}

/** Grid of highlight items (e.g., duration, age, timing) */
export interface HighlightBlock extends BaseBlock {
  type: "highlight";
  /** Array of highlight items */
  items: HighlightItem[];
}

/** Single timeline step */
export interface TimelineItem {
  /** Icon for the step */
  icon: IconName;
  /** Color for the icon background */
  iconColor: AccentColor;
  /** Step title */
  title: string;
  /** Step description */
  description: string;
}

/** Timeline display (e.g., insurance coverage periods) */
export interface TimelineBlock extends BaseBlock {
  type: "timeline";
  /** Array of timeline steps */
  items: TimelineItem[];
}

/** Single grid item */
export interface GridItem {
  /** Optional icon */
  icon?: IconName;
  /** Text content */
  text: string;
}

/** Grid layout for items (e.g., motto values) */
export interface GridBlock extends BaseBlock {
  type: "grid";
  /** Optional section title */
  title?: string;
  /** Array of grid items */
  items: GridItem[];
  /** Number of columns (2 or 3) */
  columns?: 2 | 3;
}

/** Numbered tip card */
export interface TipItem {
  /** Tip number */
  number: number;
  /** Optional tip title */
  title?: string;
  /** Tip content */
  content: string;
}

/** List of numbered tips */
export interface TipBlock extends BaseBlock {
  type: "tips";
  /** Array of tips */
  items: TipItem[];
}

/** Embedded video player */
export interface VideoBlock extends BaseBlock {
  type: "video";
  /** URL to the video file */
  videoUrl: string;
  /** Video title */
  title: string;
  /** Video description */
  description: string;
  /** Time in ms to capture thumbnail (default: 15000) */
  thumbnailTime?: number;
}

/** Call-to-action button */
export interface CTABlock extends BaseBlock {
  type: "cta";
  /** Action type */
  action: "email" | "link" | "route";
  /** Target (email address, URL, or route path) */
  target: string;
  /** Button label */
  label: string;
  /** Optional email subject (for email actions) */
  subject?: string;
  /** Optional description below button */
  description?: string;
}

/** Union of all block types */
export type ContentBlock =
  | TextBlock
  | CardBlock
  | HighlightBlock
  | TimelineBlock
  | GridBlock
  | TipBlock
  | VideoBlock
  | CTABlock;

// ============================================
// Section Types
// ============================================

/** A section groups related content blocks */
export interface Section {
  /** Unique identifier for the section */
  id: string;
  /** Optional icon for section header */
  icon?: IconName;
  /** Optional section title */
  title?: string;
  /** Content blocks within this section */
  blocks: ContentBlock[];
}

// ============================================
// Page Content Types
// ============================================

/** Full info page content structure */
export interface InfoPageContent {
  /** Unique key for the page (used for caching/analytics) */
  pageKey: string;
  /** Page header configuration */
  header: PageHeader;
  /** Array of content sections */
  sections: Section[];
}

// ============================================
// Menu & Navigation Types
// ============================================

/** A menu item for navigation */
export interface MenuItem {
  /** Unique identifier */
  id: string;
  /** Display title */
  title: string;
  /** Optional subtitle */
  subtitle?: string;
  /** Icon name (FontAwesome5 or Ionicons) */
  icon: string;
  /** Route to navigate to */
  route: string;
  /** Whether the item is enabled (default: true) */
  enabled?: boolean;
}

/** A group of menu items */
export interface MenuSection {
  /** Unique identifier */
  id: string;
  /** Section title */
  title: string;
  /** Menu items in this section */
  items: MenuItem[];
}

/** Hub page content structure */
export interface HubPageContent {
  /** Unique key for the page */
  pageKey: string;
  /** Optional page header */
  header?: PageHeader;
  /** Optional intro text */
  introText?: string;
  /** Menu sections */
  menuSections: MenuSection[];
}

// ============================================
// Utility Types
// ============================================

/** Student type for routing */
export type StudentInfoType = "inbound" | "outbound";

/** Program type */
export type ProgramType = "long-term" | "short-term";
