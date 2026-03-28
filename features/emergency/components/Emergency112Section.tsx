/**
 * Emergency 112 section component
 */

import { View, Text, StyleSheet, Platform } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/core/theme";
import { spacing } from "@/core/theme/spacing";

const shadowStyle = {
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.08,
  shadowRadius: 20,
  elevation: 4,
};

export function Emergency112Section() {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: `${colors.error}10`,
          shadowColor: colors.shadow,
          borderColor: colors.border,
        },
      ]}
    >
      <View style={styles.header}>
        <Ionicons name="warning" size={24} color={colors.error} />
        <Text style={[styles.title, { color: colors.text }]}>Emergency Services</Text>
      </View>
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        112 for ambulance, fire brigade or police
      </Text>
      <Image
        source={require("@/assets/emergency/112_logo.png")}
        style={styles.image}
        contentFit="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: spacing.radiusLg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    alignItems: "center",
    ...(Platform.OS === "ios"
      ? shadowStyle
      : { elevation: 3, borderWidth: StyleSheet.hairlineWidth }),
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  title: {
    fontSize: Platform.OS === "ios" ? 20 : 18,
    fontWeight: Platform.OS === "ios" ? "700" : "600",
    marginLeft: spacing.sm,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: spacing.md,
  },
  image: {
    width: "100%",
    height: 100,
    maxWidth: 200,
  },
});
