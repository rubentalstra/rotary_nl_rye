import type { ColorValue } from "react-native";
import { SymbolView } from "expo-symbols";

import { Icons, type IconName } from "@/lib/icons";

interface IconProps {
  name: IconName;
  size?: number;
  tintColor?: ColorValue;
}

/**
 * Renders SF Symbols (iOS) or Material Symbols (Android) by logical name.
 * See {@link Icons} for the full catalog.
 */
export function Icon({ name, size = 24, tintColor }: IconProps) {
  const pair = Icons[name];
  return (
    <SymbolView
      name={{ ios: pair.ios, android: pair.android }}
      size={size}
      tintColor={tintColor}
      resizeMode="scaleAspectFit"
    />
  );
}
