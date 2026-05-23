/**
 * Logical icon → platform symbol mapping.
 *
 * Each entry maps an in-app name to an SF Symbol (iOS) and a Material Symbol
 * (Android). Render via `<Icon name="programs" />` from `@/components/ui/icon`,
 * which delegates to `expo-symbols`' `SymbolView` and picks the right symbol
 * per platform.
 *
 * Add entries here instead of inlining symbol names at the call site — keeps
 * the SF/MS pair colocated and makes platform divergence visible.
 */

import type { SFSymbol } from "sf-symbols-typescript";
import type { AndroidSymbol } from "expo-symbols";

export interface IconPair {
  ios: SFSymbol;
  android: AndroidSymbol;
}

export const Icons = {
  programs: { ios: "list.bullet", android: "list" },
  news: { ios: "newspaper", android: "newspaper" },
  calendar: { ios: "calendar", android: "calendar_month" },
  outbound: { ios: "airplane.departure", android: "flight_takeoff" },
  inbound: { ios: "airplane.arrival", android: "flight_land" },
  rebound: { ios: "arrow.triangle.2.circlepath", android: "refresh" },
  camps: { ios: "tent", android: "holiday_village" },
  clubs: { ios: "building.2", android: "business" },
  // Common UI
  back: { ios: "chevron.backward", android: "arrow_back" },
  forward: { ios: "chevron.forward", android: "arrow_forward" },
  close: { ios: "xmark", android: "close" },
  share: { ios: "square.and.arrow.up", android: "share" },
  phone: { ios: "phone.fill", android: "phone" },
  mail: { ios: "envelope.fill", android: "mail" },
  external: { ios: "arrow.up.right.square", android: "open_in_new" },
  // About
  flag: { ios: "flag.fill", android: "flag" },
  mission: { ios: "paperplane.fill", android: "rocket_launch" },
  airplane: { ios: "airplane", android: "flight" },
  heart: { ios: "heart.fill", android: "favorite" },
  // Emergency / status
  warning: { ios: "exclamationmark.triangle.fill", android: "warning" },
  shield: { ios: "checkmark.shield.fill", android: "verified_user" },
  info: { ios: "info.circle.fill", android: "info" },
  // Profile / people
  person: { ios: "person.fill", android: "person" },
  globe: { ios: "globe", android: "language" },
} as const satisfies Record<string, IconPair>;

export type IconName = keyof typeof Icons;
