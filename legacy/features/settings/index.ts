/**
 * Settings feature - Public API
 *
 * This module provides components and hooks for the Settings screen.
 */

// Components
export { SettingsSection, SettingsItem, SettingsFooter } from "./components";

// Hooks
export { useSettingsActions, useAppVersion } from "./hooks";

// Types
export type {
  SettingsSectionData,
  SettingsItem as SettingsItemType,
  SettingsAction,
} from "./types";
