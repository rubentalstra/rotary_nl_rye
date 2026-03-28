/**
 * Spacing scale for consistent layout
 * Based on 4px grid system
 */

export const spacing = {
  /** 4px */
  xs: 4,
  /** 8px */
  sm: 8,
  /** 12px */
  md: 12,
  /** 16px */
  lg: 16,
  /** 24px */
  xl: 24,
  /** 32px */
  xxl: 32,
  /** 48px */
  xxxl: 48,
  // Border radius aliases for convenience
  /** 4px border radius */
  radiusXs: 4,
  /** 8px border radius */
  radiusSm: 8,
  /** 12px border radius */
  radiusMd: 12,
  /** 16px border radius */
  radiusLg: 16,
  /** 24px border radius */
  radiusXl: 24,
  /** Full rounded (large value) */
  radiusFull: 9999,
} as const;

export type Spacing = typeof spacing;
export type SpacingKey = keyof Spacing;

/**
 * Border radius values
 */
export const borderRadius = {
  /** 4px */
  xs: 4,
  /** 8px */
  sm: 8,
  /** 12px */
  md: 12,
  /** 16px */
  lg: 16,
  /** 24px */
  xl: 24,
  /** Full rounded (large value) */
  full: 9999,
} as const;

export type BorderRadius = typeof borderRadius;

/**
 * Icon sizes
 */
export const iconSize = {
  /** 16px */
  xs: 16,
  /** 20px */
  sm: 20,
  /** 24px */
  md: 24,
  /** 32px */
  lg: 32,
  /** 48px */
  xl: 48,
} as const;

export type IconSize = typeof iconSize;
