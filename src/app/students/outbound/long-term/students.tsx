import { useCallback, useLayoutEffect } from "react";
import { StyleSheet, View, Text, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useNavigation } from "expo-router";

import { useTheme } from "@/core/theme";
import { StudentsList, useStudents, type Student } from "@/features/students";

export default function OutboundStudentsScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const { countryGroups, totalCount } = useStudents("outbound");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={styles.headerTitleContainer}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Klas van 25-26</Text>
          <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>
            {totalCount} studenten · {countryGroups.length} landen
          </Text>
        </View>
      ),
    });
  }, [navigation, colors, totalCount, countryGroups.length]);

  const handleStudentPress = useCallback((student: Student) => {
    router.push({
      pathname: "/students/outbound/long-term/student-detail",
      params: { studentId: student.id },
    });
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
