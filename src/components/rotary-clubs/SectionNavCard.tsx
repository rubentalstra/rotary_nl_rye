/**
 * Section navigation card for rotary clubs menu
 */

import { Pressable, View, Text, StyleSheet, Platform } from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";
import FontAwesome5 from "@react-native-vector-icons/fontawesome5";
import { useTheme } from "@/lib/theme/use-theme";
import { borderRadius, spacing } from "@/lib/theme/spacing";
import type { ClubSectionNavItem } from "@/features/rotary-clubs/types";

interface SectionNavCardProps {
  item: ClubSectionNavItem;
  onPress: () => void;
}

const shadowStyle = {
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.08,
  shadowRadius: 8,
  elevation: 2,
};

export function SectionNavCard({ item, onPress }: SectionNavCardProps) {
  const colors = useTheme();

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          shadowColor: colors.shadow,
        },
        pressed && styles.cardPressed,
      ]}
      onPress={onPress}
      android_ripple={{
        color: "rgba(0, 122, 255, 0.2)",
        borderless: false,
      }}
      accessibilityRole="button"
      accessibilityLabel={item.title}
      accessibilityHint="Tap to view more information"
    >
      <View style={styles.content}>
        <View style={[styles.iconContainer, { backgroundColor: colors.primary + "15" }]}>
          <FontAwesome5 iconStyle="solid" name={item.icon} size={22} color={colors.link} />
        </View>
        <Text style={[styles.title, { color: colors.text }]}>{item.title}</Text>
        <Ionicons
          name={Platform.OS === "ios" ? "chevron-forward" : "arrow-forward"}
          size={20}
          color={colors.textTertiary}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
    overflow: "hidden",
    ...(Platform.OS === "ios"
      ? shadowStyle
      : { elevation: 2, borderWidth: StyleSheet.hairlineWidth }),
  },
  cardPressed: {
    opacity: Platform.OS === "ios" ? 0.8 : 1,
    transform: Platform.OS === "ios" ? [{ scale: 0.98 }] : [],
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.md,
    minHeight: 72,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.md,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    marginRight: spacing.xs,
  },
});
