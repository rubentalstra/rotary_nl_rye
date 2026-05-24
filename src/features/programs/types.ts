import type { FontAwesome5SolidIconName } from "@react-native-vector-icons/fontawesome5";

/**
 * Program navigation item — `icon` is a FontAwesome5 solid glyph name (see `<FontAwesome5 iconStyle="solid" />` in ProgramCard).
 */
export interface ProgramItem {
  id: string;
  title: string;
  subtitle?: string;
  icon: FontAwesome5SolidIconName;
  route: string;
}

export interface ProgramSection {
  id: string;
  title: string;
  items: ProgramItem[];
}

export function generateId(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
