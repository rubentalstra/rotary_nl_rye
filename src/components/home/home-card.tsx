import { Pressable, StyleSheet, Text, View } from "react-native";

import { Icon } from "@/components/ui/icon";
import { useHaptics } from "@/hooks/use-haptics";
import type { IconName } from "@/lib/icons";
import { borderRadius, spacing } from "@/lib/theme/spacing";
import { useTheme } from "@/lib/theme/use-theme";

interface HomeCardProps {
  icon: IconName;
  title: string;
  onPress: () => void;
  variant?: "grid" | "wide";
}

/**
 * Tappable home-grid card with a native platform symbol on top and a label
 * underneath. `grid` cards sit three-across, `wide` cards take half a row.
 */
export function HomeCard({ icon, title, onPress, variant = "grid" }: HomeCardProps) {
  const theme = useTheme();
  const haptics = useHaptics();

  return (
    <Pressable
      onPress={() => {
        haptics.lightImpact();
        onPress();
      }}
      style={({ pressed }) => [
        styles.base,
        variant === "grid" ? styles.grid : styles.wide,
        {
          backgroundColor: theme.surface,
          borderColor: theme.outline,
          shadowColor: theme.shadow,
          opacity: pressed ? 0.7 : 1,
        },
      ]}
      android_ripple={{ color: theme.surfaceVariant, foreground: true }}
    >
      <View style={styles.iconWrap}>
        <Icon name={icon} size={32} tintColor={theme.iconActive} />
      </View>
      <Text style={[styles.title, { color: theme.text }]} numberOfLines={2}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderWidth: 1,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
    overflow: "hidden",
  },
  grid: {
    flex: 1,
    aspectRatio: 1,
  },
  wide: {
    flex: 1,
    minHeight: 110,
  },
  iconWrap: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
});
