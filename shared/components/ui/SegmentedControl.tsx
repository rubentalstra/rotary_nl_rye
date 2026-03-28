/**
 * SegmentedControl component - Platform-agnostic wrapper
 * Metro bundler will resolve .ios.tsx or .android.tsx automatically
 * This file exists for TypeScript compilation
 */

import { Platform } from "react-native";
import type { SegmentedControlProps } from "./types";

/* eslint-disable @typescript-eslint/no-require-imports */
const PlatformSegmentedControl = Platform.select({
  ios: () => require("./SegmentedControl.ios").SegmentedControl,
  android: () => require("./SegmentedControl.android").SegmentedControl,
  default: () => require("./SegmentedControl.android").SegmentedControl,
})();
/* eslint-enable @typescript-eslint/no-require-imports */

export function SegmentedControl(props: SegmentedControlProps) {
  return <PlatformSegmentedControl {...props} />;
}
