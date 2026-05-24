/**
 * Rebound countries list screen
 * Shows list of destination countries for rebound students
 */

import { useMemo, useCallback } from "react";
import { StyleSheet, View, FlatList, Platform } from "react-native";
import * as Haptics from "expo-haptics";
import { router, Stack } from "expo-router";
import { useTheme } from "@/lib/theme/use-theme";
import { spacing } from "@/lib/theme/spacing";
import { getCountryName } from "@/utils/flags";
import {
  useStudents,
  groupByHostCountry,
  CountryNavCard,
  type CountryGroup,
} from "@/features/students";

export default function ReboundCountriesScreen() {
  const colors = useTheme();
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
    <>
      <Stack.Title large>Rebounds</Stack.Title>
      <FlatList
        style={{ backgroundColor: colors.background, flex: 1 }}
        data={countryGroups}
        renderItem={renderCountry}
        keyExtractor={(item) => item.countryCode}
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.contentContainer}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </>
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
