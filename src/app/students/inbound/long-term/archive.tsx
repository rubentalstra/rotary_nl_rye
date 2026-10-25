import { useCallback, useLayoutEffect } from "react";
import { StyleSheet, View, Text, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams, useNavigation } from "expo-router";

import { useTheme } from "@/lib/theme/use-theme";
import { StudentsList, useInboundArchive, type Student } from "@/features/students";

export default function InboundArchiveScreen() {
  const colors = useTheme();
  const navigation = useNavigation();
  const { year = "" } = useLocalSearchParams<{ year: string }>();
  const { countryGroups, totalCount } = useInboundArchive(year);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={styles.headerTitleContainer}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>
            Class of {year.slice(0, 5)}
            {year.slice(7)}
          </Text>
          <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>
            {totalCount} students · {countryGroups.length} countries
          </Text>
        </View>
      ),
    });
  }, [navigation, colors, year, totalCount, countryGroups.length]);

  const handleStudentPress = useCallback((student: Student) => {
    router.push({
      pathname: "/students/inbound/long-term/student-detail",
      params: { studentId: student.id },
    } as never);
  }, []);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
      edges={["bottom"]}
    >
      <StudentsList
        countryGroups={countryGroups}
        totalCount={totalCount}
        onStudentPress={handleStudentPress}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerTitleContainer: {
    alignItems: "center",
  },
  headerTitle: {
    fontSize: Platform.OS === "ios" ? 17 : 20,
    fontWeight: "600",
  },
  headerSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
});
