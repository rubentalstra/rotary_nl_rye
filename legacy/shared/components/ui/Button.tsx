/**
 * Button component - Platform-agnostic wrapper
 * Metro bundler will resolve .ios.tsx or .android.tsx automatically
 * This file exists for TypeScript compilation
 */

import { Platform } from "react-native";
import type { ButtonProps } from "./types";

/* eslint-disable @typescript-eslint/no-require-imports */
const PlatformButton = Platform.select({
  ios: () => require("./Button.ios").Button,
  android: () => require("./Button.android").Button,
  default: () => require("./Button.android").Button,
})();
/* eslint-enable @typescript-eslint/no-require-imports */

export function Button(props: ButtonProps) {
  return <PlatformButton {...props} />;
}
