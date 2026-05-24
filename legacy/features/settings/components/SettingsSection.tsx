/**
 * Settings section component
 */

import { View, Text, StyleSheet, Platform } from "react-native";
import { useTheme } from "@/core/theme";
import { spacing } from "@/core/theme/spacing";

const shadowStyle = {
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.08,
  shadowRadius: 20,
  elevation: 4,
};

interface SettingsSectionProps {
  title: string;
  children: React.ReactNode;
}

export function SettingsSection({ title, children }: SettingsSectionProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      <View
        style={[
          styles.content,
          {
            backgroundColor: colors.card,
            shadowColor: colors.shadow,
            borderColor: colors.border,
          },
        ]}
      >
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: Platform.OS === "ios" ? 22 : 18,
    fontWeight: Platform.OS === "ios" ? "700" : "600",
    marginBottom: spacing.sm,
    paddingHorizontal: 4,
    letterSpacing: Platform.OS === "ios" ? 0.35 : 0,
  },
  content: {
    borderRadius: Platform.OS === "ios" ? 16 : 12,
    overflow: "hidden",
    ...(Platform.OS === "ios"
      ? shadowStyle
      : { elevation: 2, borderWidth: StyleSheet.hairlineWidth }),
  },
});
