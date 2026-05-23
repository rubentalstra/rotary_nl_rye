import { Pressable, StyleSheet, Text, View } from "react-native";

import { Icon } from "@/components/ui/icon";
import { useHaptics } from "@/hooks/use-haptics";
import { spacing } from "@/lib/theme/spacing";
import { useTheme } from "@/lib/theme/use-theme";

interface SettingsRowProps {
  title: string;
  subtitle?: string;
  onPress?: () => void;
  /** Optional trailing static value (e.g. version string) shown right-aligned. */
  value?: string;
}

/**
 * One row of an iOS-Settings-style grouped list. Tappable rows show a chevron
 * and ripple/active state; rows without `onPress` render as read-only.
 */
export function SettingsRow({ title, subtitle, onPress, value }: SettingsRowProps) {
  const theme = useTheme();
  const haptics = useHaptics();
  const interactive = !!onPress;

  return (
    <Pressable
      disabled={!interactive}
      onPress={() => {
        haptics.lightImpact();
        onPress?.();
      }}
      android_ripple={interactive ? { color: theme.surfaceVariant } : undefined}
      style={({ pressed }) => [
        styles.row,
        interactive && pressed && { backgroundColor: theme.surfaceVariant },
      ]}
    >
      <View style={styles.textWrap}>
        <Text style={[styles.title, { color: theme.text }]} numberOfLines={1}>
          {title}
        </Text>
        {subtitle ? (
          <Text style={[styles.subtitle, { color: theme.textSecondary }]} numberOfLines={2}>
            {subtitle}
          </Text>
        ) : null}
      </View>

      {value ? (
        <Text style={[styles.value, { color: theme.textSecondary }]} numberOfLines={1}>
          {value}
        </Text>
      ) : null}

      {interactive ? <Icon name="forward" size={16} tintColor={theme.textTertiary} /> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    minHeight: 56,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  textWrap: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontSize: 17,
  },
  subtitle: {
    fontSize: 13,
  },
  value: {
    fontSize: 15,
  },
});
