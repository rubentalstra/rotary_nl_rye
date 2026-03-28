/**
 * Country section component for grouping students by country
 */

import { View, Text, StyleSheet, Platform } from "react-native";
import { Image } from "expo-image";
import { useTheme } from "@/core/theme";
import { spacing } from "@/core/theme/spacing";
import { getFlagAsset, getCountryName } from "@/shared/utils/flags";
import { StudentCard } from "./StudentCard";
import type { CountryGroup, Student } from "../types";

interface CountrySectionProps {
  group: CountryGroup;
  onStudentPress: (student: Student) => void;
}

export function CountrySection({ group, onStudentPress }: CountrySectionProps) {
  const { colors } = useTheme();
  const flagAsset = getFlagAsset(group.countryCode);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.header,
          {
            backgroundColor: colors.background,
            borderBottomColor: colors.divider,
          },
        ]}
      >
        <View style={styles.headerContent}>
          {flagAsset ? (
            <Image source={flagAsset} style={styles.flag} contentFit="contain" />
          ) : (
            <View style={[styles.flagPlaceholder, { backgroundColor: colors.backgroundElevated }]}>
              <Text style={[styles.flagText, { color: colors.textTertiary }]}>
                {group.countryCode.toUpperCase()}
              </Text>
            </View>
          )}
          <Text style={[styles.title, { color: colors.primary }]}>
            {getCountryName(group.countryCode)}
          </Text>
        </View>
        <Text style={[styles.count, { color: colors.textSecondary }]}>
          {group.students.length} student{group.students.length !== 1 ? "s" : ""}
        </Text>
      </View>

      <View style={styles.list}>
        {group.students.map((student, index) => (
          <View key={student.id} style={index > 0 ? styles.cardSpacing : undefined}>
            <StudentCard
              student={student}
              onPress={() => onStudentPress(student)}
              showExchangeInfo={false}
            />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    paddingVertical: Platform.OS === "ios" ? spacing.sm : spacing.md,
    borderBottomWidth: Platform.OS === "ios" ? 0 : StyleSheet.hairlineWidth,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  flag: {
    width: 28,
    height: 20,
    marginRight: spacing.sm,
    borderRadius: 2,
  },
  flagPlaceholder: {
    width: 28,
    height: 20,
    marginRight: spacing.sm,
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  flagText: {
    fontSize: 10,
    fontWeight: "600",
  },
  title: {
    fontSize: Platform.OS === "ios" ? 22 : 18,
    fontWeight: Platform.OS === "ios" ? "700" : "500",
    letterSpacing: Platform.OS === "ios" ? 0.35 : 0,
  },
  count: {
    fontSize: 14,
    fontWeight: "400",
  },
  list: {
    paddingTop: Platform.OS === "ios" ? spacing.sm : 0,
  },
  cardSpacing: {
    marginTop: Platform.OS === "ios" ? spacing.sm : 0,
  },
});
