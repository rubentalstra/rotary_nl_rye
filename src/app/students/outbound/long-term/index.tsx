import { useCallback, useMemo } from "react";
import { StyleSheet, View, Text, FlatList, Pressable, Platform } from "react-native";
import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { router } from "expo-router";

import * as Haptics from "expo-haptics";
import { useTheme } from "@/core/theme";
interface MenuItem {
  title: string;
  subtitle?: string;
  icon: keyof typeof FontAwesome5.glyphMap;
  route: string;
  type: "class" | "info";
}

export default function LongTermExchangeScreen() {
  const { colors: themeColors } = useTheme();

  const handleItemPress = useCallback(async (route: string) => {
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      router.push(route as any);
    } catch (error) {
      console.error("Error navigating to route:", error);
      router.push(route as any);
    }
  }, []);

  const renderMenuItem = useCallback(
    ({ item }: { item: MenuItem }) => (
      <Pressable
        style={({ pressed }) => [
          styles.menuItem,
          {
            backgroundColor: themeColors.card,
            borderColor: themeColors.border,
            shadowColor: themeColors.shadow,
          },
          pressed && { opacity: 0.7, transform: [{ scale: 0.98 }] },
        ]}
        onPress={() => handleItemPress(item.route)}
        accessibilityRole="button"
        accessibilityLabel={item.title}
        accessibilityHint="Tap to view details"
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        android_ripple={{
          color: `${themeColors.primary}20`,
          borderless: false,
        }}
      >
        <View style={styles.menuContent}>
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: `${themeColors.primary}15` },
              item.type === "class" ? styles.classIconContainer : styles.infoIconContainer,
            ]}
          >
            <FontAwesome5 name={item.icon} size={22} color={themeColors.primary} />
          </View>
          <View style={styles.textContainer}>
            <Text style={[styles.menuTitle, { color: themeColors.text }]}>{item.title}</Text>
            {item.subtitle && (
              <Text style={[styles.menuSubtitle, { color: themeColors.textSecondary }]}>
                {item.subtitle}
              </Text>
            )}
          </View>
          <Ionicons
            name={Platform.OS === "ios" ? "chevron-forward" : "arrow-forward"}
            size={20}
            color={themeColors.textTertiary}
          />
        </View>
      </Pressable>
    ),
    [
      handleItemPress,
      themeColors.border,
      themeColors.card,
      themeColors.primary,
      themeColors.shadow,
      themeColors.text,
      themeColors.textSecondary,
      themeColors.textTertiary,
    ],
  );

  const classOfItems: MenuItem[] = useMemo(
    () => [
      {
        title: "Huidige Studenten",
        subtitle: "Onze studenten in het buitenland dit jaar",
        icon: "users" as keyof typeof FontAwesome5.glyphMap,
        route: "/students/outbound/long-term/students",
        type: "class",
      },
    ],
    [],
  );

  const informationItems: MenuItem[] = useMemo(
    () => [
      {
        title: "Hoe meld ik me aan?",
        subtitle: "Volledige aanmeldprocedure en vereisten",
        icon: "edit" as keyof typeof FontAwesome5.glyphMap,
        route: "/students/outbound/long-term/how-to-sign-up",
        type: "info",
      },
      {
        title: "Selectie dag",
        subtitle: "Wat je kunt verwachten tijdens het selectieproces",
        icon: "calendar-day" as keyof typeof FontAwesome5.glyphMap,
        route: "/students/outbound/long-term/selection-day",
        type: "info",
      },
      {
        title: "Selectie weekend",
        subtitle: "Finale selectieweekend activiteiten en verwachtingen",
        icon: "calendar-week" as keyof typeof FontAwesome5.glyphMap,
        route: "/students/outbound/long-term/selection-weekend",
        type: "info",
      },
      {
        title: "Goede top 3 van landen",
        subtitle: "Hoe kies je jouw voorkeursbestemmingen",
        icon: "globe-americas" as keyof typeof FontAwesome5.glyphMap,
        route: "/students/outbound/long-term/top-3-countries",
        type: "info",
      },
      {
        title: "Waar moet ik aan voldoen?",
        subtitle: "Regels en richtlijnen voor uitwisselingsstudenten",
        icon: "shield-alt" as keyof typeof FontAwesome5.glyphMap,
        route: "/students/outbound/long-term/comply-with",
        type: "info",
      },
    ],
    [],
  );

  const IntroSection = useCallback(
    () => (
      <View style={styles.introContainer}>
        <Text style={[styles.introText, { color: themeColors.textSecondary }]}>
          Dit programma van Rotary International is bestemd voor alle hierin geïnteresseerde
          scholieren uit het Voortgezet Onderwijs. Het is de bedoeling dat je in het buitenland een
          jaar High School volgt. Omgekeerd komen buitenlandse scholieren hier om gedurende een jaar
          samen met leeftijdgenoten naar school te gaan.
        </Text>
      </View>
    ),
    [themeColors.textSecondary],
  );

  const SectionHeader = useCallback(
    ({ title }: { title: string }) => (
      <View style={styles.sectionHeaderContainer}>
        <Text style={[styles.sectionHeaderTitle, { color: themeColors.primary }]}>{title}</Text>
        <View style={[styles.sectionHeaderDivider, { backgroundColor: themeColors.border }]} />
      </View>
    ),
    [themeColors.border, themeColors.primary],
  );

  const renderContent = useCallback(() => {
    const allItems = [
      { type: "image" },
      { type: "intro" },
      { type: "sectionHeader", title: "Klas van 25-26" },
      ...classOfItems.map((item) => ({ type: "menuItem", item })),
      { type: "spacer" },
      { type: "sectionHeader", title: "Informatie" },
      ...informationItems.map((item) => ({ type: "menuItem", item })),
    ];

    return allItems;
  }, [classOfItems, informationItems]);

  const renderItem = useCallback(
    ({ item }: { item: any }) => {
      switch (item.type) {
        case "image":
          return (
            <Image
              source={require("@/assets/pictures/outbound-25-26-group.jpeg")}
              style={styles.headerImage}
              contentFit="cover"
            />
          );
        case "intro":
          return <IntroSection />;
        case "sectionHeader":
          return <SectionHeader title={item.title} />;
        case "menuItem":
          return renderMenuItem({ item: item.item });
        case "spacer":
          return <View style={styles.spacer} />;
        default:
          return null;
      }
    },
    [IntroSection, SectionHeader, renderMenuItem],
  );

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: themeColors.background }]}
      edges={["bottom"]}
    >
      <View style={styles.container}>
        <FlatList
          data={renderContent()}
          renderItem={renderItem}
          keyExtractor={useCallback((item: any, index: number) => `${item.type}-${index}`, [])}
          showsVerticalScrollIndicator={false}
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={styles.listContainer}
          removeClippedSubviews={true}
          maxToRenderPerBatch={10}
          windowSize={10}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  listContainer: {
    padding: Platform.OS === "ios" ? 20 : 16,
    paddingBottom: Platform.OS === "ios" ? 40 : 34,
  },
  headerImage: {
    width: "100%",
    height: 150,
    marginBottom: 16,
    borderRadius: 8,
  },
  introContainer: {
    marginBottom: 32,
  },
  introText: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: "left",
  },
  sectionHeaderContainer: {
    marginBottom: 20,
    marginTop: 12,
  },
  sectionHeaderTitle: {
    fontSize: Platform.OS === "ios" ? 20 : 18,
    fontWeight: "600",
    marginBottom: 8,
    lineHeight: 24,
  },
  sectionHeaderDivider: {
    height: 3,
    borderRadius: 1.5,
    opacity: 0.8,
  },
  menuItem: {
    borderRadius: 12,
    marginBottom: 12,
    overflow: "hidden",
    borderWidth: Platform.OS === "android" ? StyleSheet.hairlineWidth : 0,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  menuContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: Platform.OS === "ios" ? 20 : 16,
    minHeight: Platform.OS === "ios" ? 80 : 72,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  classIconContainer: {},
  infoIconContainer: {},
  textContainer: {
    flex: 1,
    marginRight: 8,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    lineHeight: 20,
  },
  menuSubtitle: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 18,
  },
  spacer: {
    height: 16,
  },
});
