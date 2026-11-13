import { useCallback, useMemo } from "react";
import { FlatList, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@react-native-vector-icons/ionicons";
import FontAwesome5 from "@react-native-vector-icons/fontawesome5";
import { router } from "expo-router";
import * as Haptics from "expo-haptics";

import { useTheme } from "@/lib/theme/use-theme";
import { inboundArchiveStudents, inboundArchiveYears } from "@/features/students";

interface ClassYear {
  year: string;
  title: string;
  studentCount: number;
  countryCount: number;
}

export default function PreviousClassesScreen() {
  const themeColors = useTheme();

  const classYears = useMemo<ClassYear[]>(
    () =>
      inboundArchiveYears.map((year) => {
        const students = inboundArchiveStudents.filter((s) => s.year === year);
        return {
          year,
          title: `Class of ${year.slice(0, 5)}${year.slice(7)}`,
          studentCount: students.length,
          countryCount: new Set(students.map((s) => s.homeCountryCode)).size,
        };
      }),
    [],
  );

  const handlePress = useCallback((year: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    router.push(`/students/inbound/long-term/archive?year=${year}` as never);
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: ClassYear }) => (
      <Pressable
        style={({ pressed }) => [
          styles.menuItem,
          {
            backgroundColor: themeColors.card,
            borderColor: themeColors.border,
            shadowColor: themeColors.shadow,
          },
          pressed && { opacity: 0.7, transform: [{ scale: 0.98 }] },
        ]}
        onPress={() => handlePress(item.year)}
        android_ripple={{ color: "rgba(0, 122, 255, 0.2)", borderless: false }}
        accessibilityRole="button"
        accessibilityLabel={item.title}
      >
        <View style={styles.menuContent}>
          <View style={[styles.iconContainer, { backgroundColor: themeColors.primary + "15" }]}>
            <FontAwesome5 iconStyle="solid" name="history" size={22} color={themeColors.primary} />
          </View>
          <View style={styles.textContainer}>
            <Text style={[styles.menuTitle, { color: themeColors.text }]}>{item.title}</Text>
            <Text style={[styles.menuSubtitle, { color: themeColors.textSecondary }]}>
              {item.studentCount} students · {item.countryCount} countries
            </Text>
          </View>
          <Ionicons
            name={Platform.OS === "ios" ? "chevron-forward" : "arrow-forward"}
            size={20}
            color={themeColors.textTertiary}
          />
        </View>
      </Pressable>
    ),
    [handlePress, themeColors],
  );

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: themeColors.background }]}
      edges={["bottom"]}
    >
      <FlatList
        data={classYears}
        renderItem={renderItem}
        keyExtractor={(item) => item.year}
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  listContainer: {
    padding: 16,
    paddingBottom: 34,
  },
  menuItem: {
    borderRadius: 12,
    marginBottom: 12,
    overflow: "hidden",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  menuContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    minHeight: 72,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
    marginRight: 8,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    lineHeight: 22,
  },
  menuSubtitle: {
    fontSize: 13,
    fontWeight: "400",
  },
});
