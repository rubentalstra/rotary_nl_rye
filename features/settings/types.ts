/**
 * Settings feature types
 */

export interface SettingsSectionData {
  id: string;
  title: string;
  items: SettingsItem[];
}

export interface SettingsItem {
  id: string;
  title: string;
  subtitle?: string;
  action?: SettingsAction;
  showChevron?: boolean;
}

export type SettingsAction =
  | { type: "navigate"; route: string }
  | { type: "url"; url: string }
  | { type: "review" }
  | { type: "appVersion" };
