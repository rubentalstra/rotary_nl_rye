/**
 * Rebound countries list screen
 * Shows list of destination countries for rebound students
 */

import { useMemo, useCallback } from "react";
import { StyleSheet, View, FlatList, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import { useTheme } from "@/core/theme";
import { spacing } from "@/core/theme/spacing";
import { getCountryName } from "@/shared/utils/flags";
import {
  useStudents,
  groupByHostCountry,
  CountryNavCard,
  type CountryGroup,
} from "@/features/students";

export default function ReboundCountriesScreen() {
  const { colors } = useTheme();
  const { students } = useStudents("rebound");

  const countryGroups = useMemo(() => {
    return groupByHostCountry(students).sort((a, b) => b.students.length - a.students.length);
  }, [students]);

  const handleCountryPress = useCallback(async (country: CountryGroup) => {
    try {
      if (Platform.OS === "ios") {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
      router.push({
        pathname: "/students/rebound/[country]" as const,
        params: {
          country: country.countryCode,
          countryName: getCountryName(country.countryCode),
        },
      } as never);
    } catch {
      router.push({
        pathname: "/students/rebound/[country]" as const,
        params: {
          country: country.countryCode,
          countryName: getCountryName(country.countryCode),
        },
      } as never);
    }
  }, []);

  const renderCountry = useCallback(
    ({ item }: { item: CountryGroup }) => (
      <CountryNavCard country={item} onPress={() => handleCountryPress(item)} />
    ),
    [handleCountryPress],
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={[]}>
      <FlatList
        data={countryGroups}
        renderItem={renderCountry}
        keyExtractor={(item) => item.countryCode}
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.contentContainer}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
  },
  separator: {
    height: spacing.sm,
  },
});
