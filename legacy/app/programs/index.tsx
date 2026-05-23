/**
 * Programs screen route
 * Thin wrapper using the programs feature module
 */

import { useCallback } from "react";
import { FlatList, View, Text, StyleSheet, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import * as Haptics from "expo-haptics";
import { useTheme } from "@/core/theme";
import { spacing } from "@/core/theme/spacing";
import { ProgramCard, ProgramSectionHeader, useProgramSections } from "@/features/programs";
import type { ProgramItem, ProgramSection } from "@/features/programs";

type ListItem =
  | { type: "intro"; introText: string }
  | { type: "sectionHeader"; title: string }
  | { type: "program"; program: ProgramItem }
  | { type: "spacer" };

export default function ProgramsScreen() {
  const { colors } = useTheme();
  const { sections, introText } = useProgramSections();

  const handleProgramPress = useCallback(async (route: string) => {
    if (Platform.OS === "ios") {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    router.push(route as any);
  }, []);

  // Build flat list data from sections
  const listData = useCallback((): ListItem[] => {
    const items: ListItem[] = [{ type: "intro", introText }];

    sections.forEach((section: ProgramSection, index: number) => {
      if (index > 0) {
        items.push({ type: "spacer" });
      }
      items.push({ type: "sectionHeader", title: section.title });
      section.items.forEach((program: ProgramItem) => {
        items.push({ type: "program", program });
      });
    });

    return items;
  }, [sections, introText]);

  const renderItem = useCallback(
    ({ item }: { item: ListItem }) => {
      switch (item.type) {
        case "intro":
          return (
            <View style={styles.introContainer}>
              <Text style={[styles.introTitle, { color: colors.primary }]}>Programma&apos;s</Text>
              <Text style={[styles.introText, { color: colors.textSecondary }]}>
                {item.introText}
              </Text>
            </View>
          );
        case "sectionHeader":
          return <ProgramSectionHeader title={item.title} />;
        case "program":
          return (
            <ProgramCard
              program={item.program}
              onPress={() => handleProgramPress(item.program.route)}
            />
          );
        case "spacer":
          return <View style={styles.spacer} />;
        default:
          return null;
      }
    },
    [colors.primary, colors.textSecondary, handleProgramPress],
  );

  const keyExtractor = useCallback((item: ListItem, index: number) => `${item.type}-${index}`, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={[]}>
      <FlatList
        data={listData()}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
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
  introContainer: {
    marginBottom: spacing.xl,
  },
  introTitle: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: spacing.md,
  },
  introText: {
    fontSize: 15,
    lineHeight: 22,
    textAlign: "left",
  },
  spacer: {
    height: spacing.sm,
  },
});
