/**
 * ActionButton component - Platform-agnostic wrapper
 * Metro bundler will resolve .ios.tsx or .android.tsx automatically
 */

import { Platform } from "react-native";
import type { ActionButtonProps } from "./types";

/* eslint-disable @typescript-eslint/no-require-imports */
const PlatformActionButton = Platform.select({
  ios: () => require("./ActionButton.ios").ActionButton,
  android: () => require("./ActionButton.android").ActionButton,
  default: () => require("./ActionButton.android").ActionButton,
})();
/* eslint-enable @typescript-eslint/no-require-imports */

export function ActionButton(props: ActionButtonProps) {
  return <PlatformActionButton {...props} />;
}
