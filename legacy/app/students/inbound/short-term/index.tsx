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
}

export default function InboundShortTermScreen() {
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

  const menuItems: MenuItem[] = useMemo(
    () => [
      {
        title: "Summer Camps",
        subtitle: "Experience Dutch culture through summer programs",
        icon: "campground" as keyof typeof FontAwesome5.glyphMap,
        route: "/students/inbound/short-term/camps-and-tours",
      },
      {
        title: "Family to Family",
        subtitle: "Live with a Dutch host family",
        icon: "home" as keyof typeof FontAwesome5.glyphMap,
        route: "/students/inbound/short-term/family-to-family",
      },
    ],
    [],
  );

  const IntroSection = useCallback(
    () => (
      <View style={styles.introContainer}>
        <View style={styles.headerSection}>
          <Text style={[styles.headerTitle, { color: themeColors.text }]}>Short Term Programs</Text>
          <Text style={[styles.headerSubtitle, { color: themeColors.textSecondary }]}>
            Experience the Netherlands through shorter exchange programs
          </Text>
        </View>
        <Text style={[styles.introText, { color: themeColors.textSecondary }]}>
          Rotary short-term programs offer young people the opportunity to experience Dutch culture
          through shorter exchange periods. These programs are perfect for students who want to gain
          international experience and discover what the Netherlands has to offer.
        </Text>
      </View>
    ),
    [themeColors.text, themeColors.textSecondary],
  );

  const renderContent = useCallback(() => {
    const allItems = [{ type: "intro" }, ...menuItems.map((item) => ({ type: "menuItem", item }))];

    return allItems;
  }, [menuItems]);

  const renderItem = useCallback(
    ({ item }: { item: any }) => {
      switch (item.type) {
        case "intro":
          return <IntroSection />;
        case "menuItem":
          return renderMenuItem({ item: item.item });
        default:
          return null;
      }
    },
    [IntroSection, renderMenuItem],
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
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 16,
  },
  introText: {
    fontSize: 15,
    lineHeight: 22,
    textAlign: "left",
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
