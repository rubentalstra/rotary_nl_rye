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

export default function LongTermInboundScreen() {
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
        android_ripple={{
          color: "rgba(0, 122, 255, 0.2)",
          borderless: false,
        }}
        accessibilityRole="button"
        accessibilityLabel={item.title}
        accessibilityHint="Tap to view details"
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <View style={styles.menuContent}>
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: themeColors.primary + "15" },
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
        title: "Class of 2025-26",
        subtitle: "Meet the incoming exchange students",
        icon: "users" as keyof typeof FontAwesome5.glyphMap,
        route: "/students/inbound/long-term/students",
        type: "class",
      },
    ],
    [],
  );

  const informationItems: MenuItem[] = useMemo(
    () => [
      {
        title: "Welcome to the Netherlands!",
        subtitle: "Important information for new students",
        icon: "door-open" as keyof typeof FontAwesome5.glyphMap,
        route: "/students/inbound/long-term/welcome",
        type: "info",
      },
      {
        title: "Flight and Arrival",
        subtitle: "Information about traveling to the Netherlands",
        icon: "plane" as keyof typeof FontAwesome5.glyphMap,
        route: "/students/inbound/long-term/flight-arrival",
        type: "info",
      },
      {
        title: "Language",
        subtitle: "Learning Dutch and language assistance",
        icon: "language" as keyof typeof FontAwesome5.glyphMap,
        route: "/students/inbound/long-term/language",
        type: "info",
      },
      {
        title: "Insurance",
        subtitle: "Healthcare and insurance information",
        icon: "umbrella" as keyof typeof FontAwesome5.glyphMap,
        route: "/students/inbound/long-term/insurance",
        type: "info",
      },
      {
        title: "Travel",
        subtitle: "Tips for exploring the Netherlands and Europe",
        icon: "passport" as keyof typeof FontAwesome5.glyphMap,
        route: "/students/inbound/long-term/travel",
        type: "info",
      },
    ],
    [],
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
      { type: "sectionHeader", title: "Current Students" },
      ...classOfItems.map((item) => ({ type: "menuItem", item })),
      { type: "spacer" },
      { type: "sectionHeader", title: "Information for Incoming Students" },
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
              source={require("@/assets/pictures/inbounds-with-flags.jpeg")}
              style={styles.headerImage}
              contentFit="cover"
            />
          );
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
    [SectionHeader, renderMenuItem],
  );

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: themeColors.background }]}
      edges={["bottom"]}
    >
      <View style={[styles.container, { backgroundColor: themeColors.background }]}>
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
    fontSize: 15,
    lineHeight: 22,
    textAlign: "left",
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
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  menuItemPressed: {
    opacity: Platform.OS === "ios" ? 0.8 : 1,
    transform: Platform.OS === "ios" ? [{ scale: 0.98 }] : [],
  },
  menuContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    minHeight: 72,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
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
    lineHeight: 22,
  },
  menuSubtitle: {
    fontSize: 13,
    fontWeight: "400",
  },
  spacer: {
    height: 10,
  },
});
