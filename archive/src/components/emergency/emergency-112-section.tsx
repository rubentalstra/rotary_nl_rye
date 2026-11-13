import { Image } from "expo-image";
import { Platform, StyleSheet, Text, View } from "react-native";

import { Icon } from "@/components/ui/icon";
import { borderRadius, spacing } from "@/lib/theme/spacing";
import { useTheme } from "@/lib/theme/use-theme";

const shadowStyle = {
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.08,
  shadowRadius: 20,
  elevation: 4,
};

export function Emergency112Section() {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: `${theme.error}10`,
          shadowColor: theme.shadow,
          borderColor: theme.border,
        },
      ]}
    >
      <View style={styles.header}>
        <Icon name="warning" size={24} tintColor={theme.error} />
        <Text style={[styles.title, { color: theme.text }]}>Emergency Services</Text>
      </View>
      <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
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
    borderRadius: borderRadius.lg,
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
    gap: spacing.sm,
  },
  title: {
    fontSize: Platform.OS === "ios" ? 20 : 18,
    fontWeight: Platform.OS === "ios" ? "700" : "600",
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
