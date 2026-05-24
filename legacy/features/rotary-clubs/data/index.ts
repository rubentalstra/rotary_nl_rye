/**
 * Rotary clubs data exports
 */

import { algemeneInformatieContent } from "./algemene-informatie";
import { jeugdcommissarisContent } from "./jeugdcommissaris";
import { gastgezinContent } from "./gastgezin";
import { counselorContent } from "./counselor";
import { documentenContent } from "./documenten";
import type { SectionPageContent } from "../types";

export { introText, clubSections, getSectionById } from "./navigation";
export { algemeneInformatieContent } from "./algemene-informatie";
export { jeugdcommissarisContent } from "./jeugdcommissaris";
export { gastgezinContent } from "./gastgezin";
export { counselorContent } from "./counselor";
export { documentenContent } from "./documenten";

/**
 * All section page contents
 */
export const allSectionContents: Record<string, SectionPageContent> = {
  "algemene-informatie": algemeneInformatieContent,
  jeugdcommissaris: jeugdcommissarisContent,
  gastgezin: gastgezinContent,
  counselor: counselorContent,
  documenten: documentenContent,
};

/**
 * Get section content by ID
 */
export function getSectionContent(id: string): SectionPageContent | undefined {
  return allSectionContents[id];
}
