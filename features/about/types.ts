/**
 * About feature types
 */

export interface AboutSection {
  id: string;
  icon: string;
  title: string;
  subtitle?: string;
  content?: string;
  listItems?: string[];
  quote?: string;
}
