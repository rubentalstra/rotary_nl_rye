/**
 * Rotary Clubs screen route
 * Thin wrapper using the rotary-clubs feature module
 */

import { useCallback } from "react";
import { FlatList, View, Text, StyleSheet, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import * as Haptics from "expo-haptics";
import { useTheme } from "@/core/theme";
import { spacing } from "@/core/theme/spacing";
import { SectionNavCard, useClubSections } from "@/features/rotary-clubs";
import type { ClubSectionNavItem } from "@/features/rotary-clubs";

export default function RotaryClubsScreen() {
  const { colors } = useTheme();
  const { sections, introText } = useClubSections();

  const handleSectionPress = useCallback(async (sectionId: string) => {
    if (Platform.OS === "ios") {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    router.push(`/rotary-clubs/${sectionId}` as any);
  }, []);

  const renderHeader = useCallback(
    () => (
      <View style={styles.header}>
        <Text style={[styles.introText, { color: colors.textSecondary }]}>{introText}</Text>
      </View>
    ),
    [colors.textSecondary, introText],
  );

  const renderItem = useCallback(
    ({ item }: { item: ClubSectionNavItem }) => (
      <SectionNavCard item={item} onPress={() => handleSectionPress(item.id)} />
    ),
    [handleSectionPress],
  );

  const keyExtractor = useCallback((item: ClubSectionNavItem) => item.id, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={["bottom"]}>
      <FlatList
        data={sections}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  list: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
  header: {
    marginBottom: spacing.md,
  },
  introText: {
    fontSize: 15,
    lineHeight: 22,
    textAlign: "left",
    paddingHorizontal: spacing.md,
  },
});
