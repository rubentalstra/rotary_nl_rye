/**
 * Card component - Platform-agnostic wrapper
 * Metro bundler will resolve .ios.tsx or .android.tsx automatically
 * This file exists for TypeScript compilation
 */

import { Platform } from "react-native";
import type { CardProps } from "./types";

/* eslint-disable @typescript-eslint/no-require-imports */
const PlatformCard = Platform.select({
  ios: () => require("./Card.ios").Card,
  android: () => require("./Card.android").Card,
  default: () => require("./Card.android").Card,
})();
/* eslint-enable @typescript-eslint/no-require-imports */

export function Card(props: CardProps) {
  return <PlatformCard {...props} />;
}
