/**
 * Rebound students by country screen
 * Shows list of students who went to a specific country
 */

import { useCallback, useMemo, useLayoutEffect } from "react";
import { StyleSheet, View, Text, Pressable, FlatList, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useNavigation, router } from "expo-router";
import * as Haptics from "expo-haptics";
import { useTheme } from "@/core/theme";
import { spacing } from "@/core/theme/spacing";
import { useStudentsByCountry, type Student } from "@/features/students";
import { NetworkImage } from "@/shared/components/media/NetworkImage";
import { EmptyState } from "@/shared/components/feedback/EmptyState";

const shadowStyle = {
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.08,
  shadowRadius: 20,
  elevation: 4,
};

interface StudentCardProps {
  student: Student;
  onPress: () => void;
}

function StudentCard({ student, onPress }: StudentCardProps) {
  const { colors } = useTheme();

  return (
    <Pressable
      style={({ pressed }) => [
        styles.studentCard,
        { backgroundColor: colors.card, borderColor: colors.border },
        pressed && styles.studentCardPressed,
      ]}
      onPress={onPress}
      android_ripple={{ color: "rgba(0, 122, 255, 0.2)", borderless: false }}
    >
      <View style={styles.studentCardContent}>
        <NetworkImage
          imageUrl={student.imageUrl}
          name={student.name}
          size={56}
          style={styles.avatar}
        />
        <View style={styles.studentInfo}>
          <Text style={[styles.studentName, { color: colors.text }]} numberOfLines={1}>
            {student.name}
          </Text>
          {student.year && (
            <Text style={[styles.studentYear, { color: colors.textSecondary }]}>
              Class of {student.year}
            </Text>
          )}
          {student.description && (
            <Text style={[styles.studentBio, { color: colors.textTertiary }]} numberOfLines={1}>
              {student.description}
            </Text>
          )}
        </View>
        <Ionicons name="chevron-forward" size={20} color={colors.textTertiary} />
      </View>
    </Pressable>
  );
}

export default function ReboundStudentsScreen() {
  const { colors } = useTheme();
  const { country, countryName } = useLocalSearchParams<{
    country: string;
    countryName: string;
  }>();
  const navigation = useNavigation();

  const students = useStudentsByCountry(country || "", "rebound");

  useLayoutEffect(() => {
    if (countryName) {
      navigation.setOptions({ title: countryName });
    }
  }, [navigation, countryName]);

  const handleStudentPress = useCallback(async (student: Student) => {
    try {
      if (Platform.OS === "ios") {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
      router.push({
        pathname: "/students/rebound/student-detail",
        params: { studentId: student.id },
      });
    } catch {
      router.push({
        pathname: "/students/rebound/student-detail",
        params: { studentId: student.id },
      });
    }
  }, []);

  const sortedStudents = useMemo(() => {
    return [...students].sort((a, b) => {
      // Sort by year descending, then by name
      if (a.year && b.year) {
        const yearCompare = b.year.localeCompare(a.year);
        if (yearCompare !== 0) return yearCompare;
      }
      return a.name.localeCompare(b.name);
    });
  }, [students]);

  const renderStudent = useCallback(
    ({ item }: { item: Student }) => (
      <StudentCard student={item} onPress={() => handleStudentPress(item)} />
    ),
    [handleStudentPress],
  );

  if (students.length === 0) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={[]}>
        <EmptyState
          icon="school-outline"
          title="No students found"
          message={`No rebound students found for ${countryName || "this country"}.`}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={[]}>
      <FlatList
        data={sortedStudents}
        renderItem={renderStudent}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.contentContainer}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={[styles.headerCount, { color: colors.textSecondary }]}>
              {students.length} student{students.length !== 1 ? "s" : ""}
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: spacing.xl,
  },
  header: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  headerCount: {
    fontSize: 14,
    fontWeight: "500",
  },
  studentCard: {
    borderRadius: 12,
    marginHorizontal: spacing.md,
    ...shadowStyle,
  },
  studentCardPressed: {
    opacity: Platform.OS === "ios" ? 0.8 : 1,
    transform: Platform.OS === "ios" ? [{ scale: 0.98 }] : [],
  },
  studentCardContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.md,
    minHeight: 80,
  },
  avatar: {
    marginRight: spacing.md,
  },
  studentInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: 17,
    fontWeight: "600",
    marginBottom: 2,
  },
  studentYear: {
    fontSize: 14,
    marginBottom: 2,
  },
  studentBio: {
    fontSize: 13,
  },
  separator: {
    height: spacing.sm,
  },
});
