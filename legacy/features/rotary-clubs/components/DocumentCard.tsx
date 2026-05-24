/**
 * Document card for PDF links
 */

import { Pressable, View, Text, StyleSheet, Platform } from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { useTheme } from "@/core/theme";
import { spacing } from "@/core/theme/spacing";
import type { DocumentItem } from "../types";

interface DocumentCardProps {
  document: DocumentItem;
  onPress: () => void;
}

const shadowStyle = {
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.08,
  shadowRadius: 8,
  elevation: 2,
};

export function DocumentCard({ document, onPress }: DocumentCardProps) {
  const { colors } = useTheme();

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
      accessibilityLabel={`Open ${document.title} PDF document`}
      accessibilityHint="Tap to view PDF in document viewer"
    >
      <View style={styles.content}>
        <View style={[styles.iconContainer, { backgroundColor: colors.primary + "15" }]}>
          <FontAwesome5 name={document.icon} size={20} color={colors.link} />
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.title, { color: colors.text }]}>{document.title}</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Tik om PDF te openen
          </Text>
        </View>
        <Ionicons
          name={Platform.OS === "ios" ? "chevron-forward" : "arrow-forward"}
          size={18}
          color={colors.textTertiary}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: spacing.radiusMd,
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
  textContainer: {
    flex: 1,
    marginRight: spacing.xs,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    lineHeight: 22,
  },
  subtitle: {
    fontSize: 13,
    fontWeight: "400",
  },
});
