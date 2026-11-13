import type { IconName } from "@/lib/icons";

export interface AboutSection {
  id: string;
  icon: IconName;
  title: string;
  subtitle?: string;
  content?: string;
  listItems?: string[];
  quote?: string;
}
