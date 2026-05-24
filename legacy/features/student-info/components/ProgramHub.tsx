import React, { memo } from "react";
import { StyleSheet, View, Text, ScrollView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/core/theme";
import { MenuList } from "./MenuList";
import type { HubPageContent, IconName } from "../types";

interface ProgramHubProps {
  /** Hub page content configuration */
  content: HubPageContent;
}

/**
 * ProgramHub - A hub page with program selection
 *
 * Displays an intro section and menu sections for navigating to programs.
 */
export const ProgramHub = memo(function ProgramHub({ content }: ProgramHubProps) {
  const { colors } = useTheme();

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.background }]}
      edges={["bottom"]}
    >
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
      >
        <View style={styles.content}>
          {/* Header Section */}
          {content.header && (
            <View style={styles.headerSection}>
              <View style={[styles.headerIcon, { backgroundColor: `${colors.primary}15` }]}>
                <Ionicons name={content.header.icon as IconName} size={32} color={colors.primary} />
              </View>
              <Text style={[styles.headerTitle, { color: colors.text }]}>
                {content.header.title}
              </Text>
              {content.header.subtitle && (
                <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>
                  {content.header.subtitle}
                </Text>
              )}
            </View>
          )}

          {/* Intro Text */}
          {content.introText && (
            <Text style={[styles.introText, { color: colors.textSecondary }]}>
              {content.introText}
            </Text>
          )}

          {/* Menu Sections */}
          {content.menuSections.map((section) => (
            <View key={section.id} style={styles.menuSection}>
              <MenuList items={section.items} title={section.title} />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 34,
  },
  headerSection: {
    alignItems: "center",
    paddingVertical: 24,
    marginBottom: 24,
  },
  headerIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: Platform.OS === "ios" ? 28 : 24,
    fontWeight: Platform.OS === "ios" ? "700" : "600",
    textAlign: "center",
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 20,
  },
  introText: {
    fontSize: 15,
    lineHeight: 22,
    textAlign: "left",
    marginBottom: 24,
  },
  menuSection: {
    marginBottom: 16,
  },
});
