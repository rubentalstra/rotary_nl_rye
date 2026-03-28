/**
 * IconButton component - Platform-agnostic wrapper
 * Metro bundler will resolve .ios.tsx or .android.tsx automatically
 */

import { Platform } from "react-native";
import type { IconButtonProps } from "./types";

/* eslint-disable @typescript-eslint/no-require-imports */
const PlatformIconButton = Platform.select({
  ios: () => require("./IconButton.ios").IconButton,
  android: () => require("./IconButton.android").IconButton,
  default: () => require("./IconButton.android").IconButton,
})();
/* eslint-enable @typescript-eslint/no-require-imports */

export function IconButton(props: IconButtonProps) {
  return <PlatformIconButton {...props} />;
}
