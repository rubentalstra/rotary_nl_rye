import { useCallback, useMemo } from "react";
import { StyleSheet, View, Text, FlatList, Pressable, Platform } from "react-native";
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
  type: "info";
}

export default function FamilyToFamilyScreen() {
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
        accessibilityHint="Tik om details te bekijken"
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        android_ripple={{
          color: `${themeColors.primary}20`,
          borderless: false,
        }}
      >
        <View style={styles.menuContent}>
          <View style={[styles.iconContainer, { backgroundColor: `${themeColors.primary}15` }]}>
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

  const informationItems: MenuItem[] = useMemo(
    () => [
      {
        title: "Hoe aanmelden",
        subtitle: "Stap-voor-stap aanmeldingsproces",
        icon: "edit" as keyof typeof FontAwesome5.glyphMap,
        route: "/students/outbound/short-term/family-to-family/how-to-sign-up",
        type: "info",
      },
      {
        title: "Landen & Voorkeur",
        subtitle: "Beschikbare bestemmingen en hoe te kiezen",
        icon: "globe-americas" as keyof typeof FontAwesome5.glyphMap,
        route: "/students/outbound/short-term/family-to-family/countries-preference",
        type: "info",
      },
      {
        title: "Vereisten",
        subtitle: "Regels en richtlijnen om te volgen",
        icon: "shield-alt" as keyof typeof FontAwesome5.glyphMap,
        route: "/students/outbound/short-term/family-to-family/comply-with",
        type: "info",
      },
    ],
    [],
  );

  const IntroSection = useCallback(
    () => (
      <View style={styles.introContainer}>
        <View
          style={[
            styles.programCard,
            {
              backgroundColor: themeColors.card,
              borderColor: themeColors.border,
              shadowColor: themeColors.shadow,
            },
          ]}
        >
          <Text style={[styles.programTitle, { color: themeColors.text }]}>
            Wat is Family-to-Family?
          </Text>
          <Text style={[styles.programDescription, { color: themeColors.textSecondary }]}>
            Het Family-to-Family programma biedt jongeren de mogelijkheid om het leven in een andere
            cultuur te ervaren door 2-6 weken bij een gastgezin te verblijven. Deze authentieke
            culturele uitwisseling stelt deelnemers in staat zich volledig onder te dompelen in het
            dagelijkse leven, lokale gewoonten en familietradities.
          </Text>
        </View>

        <View style={styles.highlightsContainer}>
          <View
            style={[
              styles.highlight,
              {
                backgroundColor: themeColors.card,
                borderColor: themeColors.border,
                shadowColor: themeColors.shadow,
              },
            ]}
          >
            <View style={[styles.highlightIcon, { backgroundColor: `${themeColors.primary}15` }]}>
              <Ionicons name="calendar-outline" size={20} color={themeColors.primary} />
            </View>
            <View style={styles.highlightContent}>
              <Text style={[styles.highlightTitle, { color: themeColors.text }]}>Duur</Text>
              <Text style={[styles.highlightText, { color: themeColors.textSecondary }]}>
                2-6 weken
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.highlight,
              {
                backgroundColor: themeColors.card,
                borderColor: themeColors.border,
                shadowColor: themeColors.shadow,
              },
            ]}
          >
            <View style={[styles.highlightIcon, { backgroundColor: `${themeColors.primary}15` }]}>
              <Ionicons name="people-outline" size={20} color={themeColors.primary} />
            </View>
            <View style={styles.highlightContent}>
              <Text style={[styles.highlightTitle, { color: themeColors.text }]}>Leeftijd</Text>
              <Text style={[styles.highlightText, { color: themeColors.textSecondary }]}>
                15-25 jaar
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.highlight,
              {
                backgroundColor: themeColors.card,
                borderColor: themeColors.border,
                shadowColor: themeColors.shadow,
              },
            ]}
          >
            <View style={[styles.highlightIcon, { backgroundColor: `${themeColors.primary}15` }]}>
              <Ionicons name="home-outline" size={20} color={themeColors.primary} />
            </View>
            <View style={styles.highlightContent}>
              <Text style={[styles.highlightTitle, { color: themeColors.text }]}>Onderdak</Text>
              <Text style={[styles.highlightText, { color: themeColors.textSecondary }]}>
                Gastgezinnen
              </Text>
            </View>
          </View>
        </View>
      </View>
    ),
    [
      themeColors.border,
      themeColors.card,
      themeColors.primary,
      themeColors.shadow,
      themeColors.text,
      themeColors.textSecondary,
    ],
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
      { type: "intro" },
      { type: "sectionHeader", title: "Informatie & Richtlijnen" },
      ...informationItems.map((item) => ({ type: "menuItem", item })),
    ];

    return allItems;
  }, [informationItems]);

  const renderItem = useCallback(
    ({ item }: { item: any }) => {
      switch (item.type) {
        case "intro":
          return <IntroSection />;
        case "sectionHeader":
          return <SectionHeader title={item.title} />;
        case "menuItem":
          return renderMenuItem({ item: item.item });
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
    padding: 16,
    paddingBottom: 34,
  },
  introContainer: {
    marginBottom: 32,
  },
  headerSection: {
    alignItems: "center",
    marginBottom: 24,
  },
  headerIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  programCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: Platform.OS === "android" ? StyleSheet.hairlineWidth : 0,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 4,
  },
  programTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  programDescription: {
    fontSize: 15,
    lineHeight: 22,
  },
  highlightsContainer: {
    gap: 16,
  },
  highlight: {
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: Platform.OS === "android" ? StyleSheet.hairlineWidth : 0,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  highlightIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  highlightContent: {
    flex: 1,
  },
  highlightTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 2,
  },
  highlightText: {
    fontSize: 13,
  },
  sectionHeaderContainer: {
    marginBottom: 16,
    marginTop: 8,
  },
  sectionHeaderTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  sectionHeaderDivider: {
    height: 2,
    borderRadius: 1,
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
    padding: 16,
    minHeight: 72,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
    marginRight: 8,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    lineHeight: 22,
  },
  menuSubtitle: {
    fontSize: 13,
    fontWeight: "400",
  },
});
