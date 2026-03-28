/**
 * ActionButton component for iOS
 * Uses SwiftUI Button from @expo/ui with systemImage support
 */

import { View, ActivityIndicator, StyleSheet } from "react-native";
import { Host, Button as ExpoButton } from "@expo/ui/swift-ui";
import type { SFSymbol } from "sf-symbols-typescript";
import { useTheme } from "@/core/theme";
import { useHaptics } from "@/shared/hooks";
import type { ActionButtonProps } from "./types";

// Map Ionicons names to SF Symbol names
const SF_SYMBOL_MAP: Record<string, SFSymbol> = {
  mail: "envelope.fill",
  "mail-outline": "envelope",
  call: "phone.fill",
  "call-outline": "phone",
  "arrow-forward": "arrow.right",
  "arrow-forward-outline": "arrow.right",
  share: "square.and.arrow.up",
  "share-outline": "square.and.arrow.up",
  copy: "doc.on.doc",
  "copy-outline": "doc.on.doc",
  checkmark: "checkmark",
  "checkmark-outline": "checkmark",
  videocam: "video.fill",
  "videocam-outline": "video",
  play: "play.fill",
  "play-outline": "play",
  pause: "pause.fill",
  "pause-outline": "pause",
  refresh: "arrow.clockwise",
  "refresh-outline": "arrow.clockwise",
  download: "arrow.down.circle.fill",
  "download-outline": "arrow.down.circle",
  open: "arrow.up.right.square",
  "open-outline": "arrow.up.right.square",
  globe: "globe",
  "globe-outline": "globe",
  location: "location.fill",
  "location-outline": "location",
};

export function ActionButton({
  title,
  icon,
  onPress,
  variant = "primary",
  disabled = false,
  loading = false,
  style,
}: ActionButtonProps) {
  const { colors } = useTheme();
  const { lightImpact } = useHaptics();

  const handlePress = () => {
    if (!disabled && !loading) {
      lightImpact();
      onPress();
    }
  };

  if (loading) {
    return (
      <View style={[styles.loadingContainer, style]}>
        <ActivityIndicator size="small" color={colors.primary} />
      </View>
    );
  }

  // Convert Ionicons name to SF Symbol if available (only use mapped symbols)
  const sfSymbol: SFSymbol | undefined = icon ? SF_SYMBOL_MAP[icon] : undefined;

  return (
    <Host matchContents style={style}>
      <ExpoButton onPress={handlePress} systemImage={sfSymbol} label={title} />
    </Host>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 50,
  },
});
