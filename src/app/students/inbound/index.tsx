import { useCallback, useMemo, useState } from "react";
import { StyleSheet, View, Text, FlatList, Pressable, Platform, Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { router } from "expo-router";
import { longTermContacts, ContactModal } from "@/features/contacts";
import { useTheme } from "@/core/theme";
import * as Haptics from "expo-haptics";

interface ProgramItem {
  title: string;
  subtitle: string;
  icon: keyof typeof FontAwesome5.glyphMap;
  route: string;
  enabled?: boolean;
}

export default function InboundScreen() {
  const { colors: themeColors } = useTheme();
  const [showSandraContact, setShowSandraContact] = useState(false);

  const sandraCools = longTermContacts.find((contact) => contact.name === "Sandra Cools-Wemer");

  const handleSandraContactPress = useCallback(async () => {
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setShowSandraContact(true);
    } catch (error) {
      console.error("Error showing contact:", error);
      // Fallback to email if contact card fails
      if (sandraCools?.email) {
        await Linking.openURL(`mailto:${sandraCools.email}`);
      }
    }
  }, [sandraCools]);

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
        route: "/students/inbound/long-term",
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
        route: "/students/inbound/short-term/camps-and-tours",
        enabled: false,
      },
      {
        title: "Family to Family",
        subtitle: "Exchange between families",
        icon: "home" as keyof typeof FontAwesome5.glyphMap,
        route: "/students/inbound/short-term/family-to-family",
        enabled: false,
      },
    ],
    [],
  );

  const IntroSection = useCallback(
    () => (
      <View style={styles.introContainer}>
        <Text style={[styles.introTitle, { color: themeColors.primary }]}>Inbounds</Text>
        <Text style={[styles.introText, { color: themeColors.textSecondary }]}>
          Wow, we&apos;re so excited that you will be our inbound exchange student for the coming
          year. For this to happen we will need some extra information so please watch your email
          inbox on a regular basis. Also you can find some further information in this app. If you
          have any questions that are not answered, please contact our inbound coordinator{" "}
          <Text
            style={[styles.linkText, { color: themeColors.link }]}
            onPress={handleSandraContactPress}
          >
            Sandra Cools-Wemer
          </Text>
          .
        </Text>
      </View>
    ),
    [handleSandraContactPress, themeColors.link, themeColors.primary, themeColors.textSecondary],
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
      { type: "sectionHeader", title: "Long Term Exchange Program" },
      ...longTermPrograms.map((item) => ({ type: "program", item })),
      { type: "spacer" },
      { type: "sectionHeader", title: "Short Term Exchange Program" },
      ...shortTermPrograms.map((item) => ({ type: "program", item })),
    ];

    return allItems;
  }, [longTermPrograms, shortTermPrograms]);

  const renderItem = useCallback(
    ({ item }: { item: { type: string; title?: string; item?: any } }) => {
      switch (item.type) {
        case "intro":
          return <IntroSection />;
        case "sectionHeader":
          return item.title ? <SectionHeader title={item.title} /> : null;
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

      {/* Sandra Cools Contact Modal */}
      {sandraCools && (
        <ContactModal
          contact={sandraCools}
          visible={showSandraContact}
          onClose={() => setShowSandraContact(false)}
        />
      )}
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
  linkText: {
    textDecorationLine: "underline",
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
  programItemPressed: {
    opacity: Platform.OS === "ios" ? 0.8 : 1,
    transform: Platform.OS === "ios" ? [{ scale: 0.98 }] : [],
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
  programCardInner: {
    flexDirection: "row",
    alignItems: "center",
    opacity: 1,
  },
  programCardDisabled: {
    opacity: 0.5,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  iconContainerDisabled: {},
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
  programTitleDisabled: {},
  programSubtitle: {
    fontSize: 13,
    fontWeight: "400",
  },
  spacer: {
    height: 10,
  },
});
