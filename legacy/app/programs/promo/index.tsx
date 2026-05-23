import { useCallback } from "react";
import { StyleSheet, View, Text, ScrollView, Pressable, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import * as Haptics from "expo-haptics";
import { useTheme } from "@/core/theme";
const items = [
  {
    key: "podcast",
    title: "Podcast",
    subtitle: "Interviews met gastouders",
    description:
      "Luister naar de ervaringen van gastouders die exchange studenten hebben opgevangen",
    icon: "headset-outline",
    route: "/programs/promo/podcast",
  },
  {
    key: "video",
    title: "Video's",
    subtitle: "Promotievideo's",
    description: "Bekijk inspirerende video's over het Youth Exchange programma",
    icon: "videocam-outline",
    route: "/programs/promo/video",
  },
];

export default function PromoIndex() {
  const { colors: themeColors } = useTheme();

  const onPress = useCallback(async (route: string) => {
    try {
      if (Platform.OS === "ios") await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      router.push(route as any);
    } catch {
      router.push(route as any);
    }
  }, []);

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: themeColors.background }]}
      edges={["bottom"]}
    >
      <ScrollView
        contentContainerStyle={[styles.container, { backgroundColor: themeColors.background }]}
      >
        {/* Header Section */}
        <View style={[styles.headerSection, { backgroundColor: themeColors.card }]}>
          <View style={[styles.headerIcon, { backgroundColor: `${themeColors.primary}15` }]}>
            <Ionicons name="megaphone-outline" size={32} color={themeColors.primary} />
          </View>
          <Text style={[styles.headerTitle, { color: themeColors.text }]}>Promo Materiaal</Text>
          <Text style={[styles.headerSubtitle, { color: themeColors.textSecondary }]}>
            Ontdek inspirerende verhalen en materialen over het Youth Exchange programma
          </Text>
        </View>

        {/* Items Grid */}
        {items.map((item) => (
          <Pressable
            key={item.key}
            style={({ pressed }) => [
              styles.card,
              {
                backgroundColor: themeColors.card,
                borderColor: themeColors.border,
                shadowColor: themeColors.shadow,
              },
              pressed && styles.cardPressed,
            ]}
            onPress={() => onPress(item.route)}
            accessibilityRole="button"
            accessibilityLabel={item.title}
            accessibilityHint="Tap to view details"
          >
            <View style={styles.cardContent}>
              <View style={[styles.iconContainer, { backgroundColor: `${themeColors.primary}15` }]}>
                <Ionicons name={item.icon as any} size={28} color={themeColors.primary} />
              </View>
              <View style={styles.cardText}>
                <Text style={[styles.cardTitle, { color: themeColors.text }]}>{item.title}</Text>
                <Text style={[styles.cardSubtitle, { color: themeColors.primary }]}>
                  {item.subtitle}
                </Text>
                <Text style={[styles.cardDescription, { color: themeColors.textSecondary }]}>
                  {item.description}
                </Text>
              </View>
              <View style={styles.chevronContainer}>
                <Ionicons
                  name={Platform.OS === "ios" ? "chevron-forward" : "arrow-forward"}
                  size={20}
                  color={themeColors.textTertiary}
                />
              </View>
            </View>
          </Pressable>
        ))}

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const shadowStyle = {
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.08,
  shadowRadius: 20,
  elevation: 4,
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    padding: 16,
    paddingBottom: 40,
  },
  // Header Styles
  headerSection: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    alignItems: "center",
    ...shadowStyle,
    ...(Platform.OS === "android" && {
      borderWidth: StyleSheet.hairlineWidth,
    }),
  },
  headerIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 8,
    textAlign: "center",
  },
  headerSubtitle: {
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
    paddingHorizontal: 10,
  },
  // Card Styles
  card: {
    borderRadius: 16,
    marginBottom: 16,
    overflow: "hidden",
    ...shadowStyle,
    ...(Platform.OS === "android" && {
      borderWidth: StyleSheet.hairlineWidth,
    }),
  },
  cardPressed: {
    opacity: Platform.OS === "ios" ? 0.8 : 0.6,
    transform: Platform.OS === "ios" ? [{ scale: 0.98 }] : [],
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  cardText: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 6,
  },
  cardDescription: {
    fontSize: 14,
    lineHeight: 18,
  },
  chevronContainer: {
    marginLeft: 8,
  },
});
