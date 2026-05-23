/**
 * Rotary Clubs section page route
 * Thin wrapper using the rotary-clubs feature module
 */

import { useLayoutEffect, useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useNavigation, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/core/theme";
import { SectionPageView, useClubSection, useSectionContent } from "@/features/rotary-clubs";

export default function RotaryClubsSectionScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const { section } = useLocalSearchParams<{ section: string }>();

  const sectionNav = useClubSection(section || "");
  const content = useSectionContent(section || "");

  // Set header title based on section
  useLayoutEffect(() => {
    if (sectionNav) {
      navigation.setOptions({
        title: sectionNav.title,
      });
    }
  }, [navigation, sectionNav]);

  const handleDocumentPress = useCallback((pdfUrl: string, title: string) => {
    router.push({
      pathname: "/pdf-viewer",
      params: { url: pdfUrl, title },
    });
  }, []);

  if (!content) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={["bottom"]}>
        <View style={styles.centered}>
          <Ionicons name="alert-circle" size={64} color={colors.error} />
          <Text style={[styles.errorText, { color: colors.error }]}>Sectie niet gevonden</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={["bottom"]}>
      <SectionPageView content={content} onDocumentPress={handleDocumentPress} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  errorText: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
});
