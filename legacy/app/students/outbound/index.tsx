import { useCallback, useMemo } from "react";
import { FlatList, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import * as Haptics from "expo-haptics";
import { useTheme } from "@/core/theme";
interface ProgramItem {
  title: string;
  subtitle: string;
  icon: keyof typeof FontAwesome5.glyphMap;
  route: string;
  enabled?: boolean;
}

export const unstable_settings = {
  initialRouteName: "index",
};

export default function OutboundScreen() {
  const { colors: themeColors } = useTheme();

  const handleProgramPress = useCallback(async (route: string, enabled: boolean = true) => {
    if (!enabled) return;

    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      router.push(route as any);
    } catch (error) {
      console.error("Error navigating to route:", error);
      router.push(route as any);
    }
  }, []);

  const renderProgramItem = useCallback(
    ({ item }: { item: ProgramItem }) => (
      <Pressable
        style={({ pressed }) => [
          styles.programItem,
          {
            backgroundColor: themeColors.card,
            borderColor: themeColors.border,
            shadowColor: themeColors.shadow,
          },
          pressed && { opacity: 0.7, transform: [{ scale: 0.98 }] },
          !item.enabled && styles.programItemDisabled,
        ]}
        onPress={() => handleProgramPress(item.route, item.enabled)}
        accessibilityRole="button"
        accessibilityLabel={item.title}
        accessibilityHint={
          item.enabled ? "Tap to view program details" : "This program is not yet available"
        }
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        android_ripple={{
          color: `${themeColors.primary}20`,
          borderless: false,
        }}
        disabled={!item.enabled}
      >
        <View style={styles.programContent}>
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: `${themeColors.primary}15` },
              !item.enabled && styles.iconContainerDisabled,
            ]}
          >
            <FontAwesome5
              name={item.icon}
              size={22}
              color={item.enabled ? themeColors.primary : themeColors.textTertiary}
            />
          </View>
          <View style={styles.textContainer}>
            <Text
              style={[
                styles.programTitle,
                { color: themeColors.text },
                !item.enabled && { color: themeColors.textTertiary },
              ]}
            >
              {item.title}
            </Text>
            <Text style={[styles.programSubtitle, { color: themeColors.textTertiary }]}>
              {item.subtitle}
            </Text>
          </View>
          <Ionicons
            name={Platform.OS === "ios" ? "chevron-forward" : "arrow-forward"}
            size={20}
            color={item.enabled ? themeColors.textTertiary : themeColors.textDisabled}
          />
        </View>
      </Pressable>
    ),
    [
      handleProgramPress,
      themeColors.border,
      themeColors.card,
      themeColors.primary,
      themeColors.shadow,
      themeColors.text,
      themeColors.textDisabled,
      themeColors.textTertiary,
    ],
  );

  const longTermPrograms: ProgramItem[] = useMemo(
    () => [
      {
        title: "Long Term Exchange Program",
        subtitle: "Year Exchange",
        icon: "calendar-alt" as keyof typeof FontAwesome5.glyphMap,
        route: "/students/outbound/long-term",
        enabled: true,
      },
    ],
    [],
  );

  const shortTermPrograms: ProgramItem[] = useMemo(
    () => [
      {
        title: "Zomerkampen",
        subtitle: "Zomerkampen & Culturele Programmas",
        icon: "campground" as keyof typeof FontAwesome5.glyphMap,
        route: "/students/outbound/short-term/camps-and-tours",
        enabled: true,
      },
      {
        title: "Family to Family",
        subtitle: "Exchange between families",
        icon: "home" as keyof typeof FontAwesome5.glyphMap,
        route: "/students/outbound/short-term/family-to-family",
        enabled: true,
      },
    ],
    [],
  );

  const IntroSection = useCallback(
    () => (
      <View style={styles.introContainer}>
        <Text style={[styles.introTitle, { color: themeColors.primary }]}>Kandidaten</Text>
        <Text style={[styles.introText, { color: themeColors.textSecondary }]}>
          Wat leuk dat je geïnteresseerd in de mogelijkheden van Rotary voor uitwisseling.
          Wereldwijd gaan er jaarlijks zo&apos;n 8.000 studenten via Rotary op jaaruitwisseling, een
          hele organisatie.
        </Text>
      </View>
    ),
    [themeColors.primary, themeColors.textSecondary],
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
    return [
      { type: "intro" },
      { type: "sectionHeader", title: "Long Term Exchange Program" },
      ...longTermPrograms.map((item) => ({ type: "program", item })),
      { type: "spacer" },
      { type: "sectionHeader", title: "Short Term Exchange Program" },
      ...shortTermPrograms.map((item) => ({ type: "program", item })),
    ];
  }, [longTermPrograms, shortTermPrograms]);

  const renderItem = useCallback(
    ({ item }: { item: any }) => {
      switch (item.type) {
        case "intro":
          return <IntroSection />;
        case "sectionHeader":
          return <SectionHeader title={item.title} />;
        case "program":
          return renderProgramItem({ item: item.item });
        case "spacer":
          return <View style={styles.spacer} />;
        default:
          return null;
      }
    },
    [IntroSection, SectionHeader, renderProgramItem],
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
  introTitle: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 16,
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
  programItem: {
    borderRadius: 12,
    marginBottom: 12,
    overflow: "hidden",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  programItemDisabled: {
    opacity: 0.6,
  },
  programContent: {
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
  iconContainerDisabled: {
    opacity: 0.5,
  },
  textContainer: {
    flex: 1,
    marginRight: 8,
  },
  programTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    lineHeight: 22,
  },
  programSubtitle: {
    fontSize: 13,
    fontWeight: "400",
  },
  spacer: {
    height: 10,
  },
});
