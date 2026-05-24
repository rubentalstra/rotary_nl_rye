import { View, StyleSheet } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";

import { useTheme } from "@/core/theme";
import { StudentDetail, useStudent } from "@/features/students";
import { useLayoutEffect } from "react";
import { ErrorState } from "@/shared/components";

export default function InboundStudentDetailScreen() {
  const { colors } = useTheme();
  const { studentId } = useLocalSearchParams<{ studentId: string }>();
  const navigation = useNavigation();
  const student = useStudent(studentId || "");

  useLayoutEffect(() => {
    if (student) {
      navigation.setOptions({ title: student.name });
    }
  }, [navigation, student]);

  if (!studentId) {
    return <ErrorState message="No student ID provided" onRetry={() => navigation.goBack()} />;
  }

  if (!student) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ErrorState message="Student not found" onRetry={() => navigation.goBack()} />
      </View>
    );
  }

  return <StudentDetail student={student} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
