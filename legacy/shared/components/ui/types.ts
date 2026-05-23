/**
 * Shared UI component types
 */

import type { ReactNode } from "react";
import type { StyleProp, ViewStyle, TextStyle } from "react-native";

/**
 * Section component props
 */
export interface SectionProps {
  /** Section title */
  title?: string;
  /** Section footer text */
  footer?: string;
  /** Child components */
  children: ReactNode;
}

/**
 * Card component props
 */
export interface CardProps {
  /** Card content */
  children: ReactNode;
  /** Optional style override */
  style?: StyleProp<ViewStyle>;
  /** Callback when card is pressed */
  onPress?: () => void;
}

/**
 * Button component props
 */
export interface ButtonProps {
  /** Button title */
  title: string;
  /** Callback when button is pressed */
  onPress: () => void;
  /** Button variant */
  variant?: "primary" | "secondary" | "destructive";
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Whether the button is in a loading state */
  loading?: boolean;
  /** Optional style override */
  style?: StyleProp<ViewStyle>;
}

/**
 * Text component props (for platform-specific text)
 */
export interface UITextProps {
  /** Text content */
  children: string;
  /** Text style */
  style?: StyleProp<TextStyle>;
  /** Text variant */
  variant?: "body" | "headline" | "subheadline" | "caption" | "footnote";
}

/**
 * Segmented Control component props
 */
export interface SegmentedControlProps {
  /** Array of segment labels */
  values: string[];
  /** Currently selected segment index */
  selectedIndex: number;
  /** Callback when segment changes */
  onChange: (index: number) => void;
  /** Optional style override */
  style?: StyleProp<ViewStyle>;
}

/**
 * IconButton component props
 */
export interface IconButtonProps {
  /** Icon name (Ionicons) */
  icon: string;
  /** Callback when button is pressed */
  onPress: () => void;
  /** Button size */
  size?: "small" | "medium" | "large";
  /** Button variant */
  variant?: "default" | "filled" | "tinted";
  /** Custom icon color */
  color?: string;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Optional style override */
  style?: StyleProp<ViewStyle>;
}

/**
 * ActionButton component props
 */
export interface ActionButtonProps {
  /** Button title */
  title: string;
  /** Optional icon name (Ionicons) */
  icon?: string;
  /** Callback when button is pressed */
  onPress: () => void;
  /** Button variant */
  variant?: "primary" | "secondary";
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Whether the button is in a loading state */
  loading?: boolean;
  /** Optional style override */
  style?: StyleProp<ViewStyle>;
}
