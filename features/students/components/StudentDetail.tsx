/**
 * Student detail component for displaying full student information
 */

import { useCallback } from "react";
import { ScrollView, View, Text, Pressable, StyleSheet, Platform } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/core/theme";
import { spacing } from "@/core/theme/spacing";
import { NetworkImage } from "@/shared/components/media/NetworkImage";
import { useHaptics } from "@/shared/hooks";
import { makePhoneCall, sendEmail, openURL } from "@/shared/utils/communications";
import { getFlagAsset, getCountryName } from "@/shared/utils/flags";
import type { Student } from "../types";

interface StudentDetailProps {
  student: Student;
}

const shadowStyle = {
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.08,
  shadowRadius: 20,
  elevation: 4,
};

const SOCIAL_PLATFORMS = [
  {
    key: "instagram",
    icon: "logo-instagram",
    color: "#E4405F",
    label: "Instagram",
  },
  {
    key: "facebook",
    icon: "logo-facebook",
    color: "#1877F2",
    label: "Facebook",
  },
  {
    key: "snapchat",
    icon: "logo-snapchat",
    color: "#FFFC00",
    label: "Snapchat",
  },
  {
    key: "linkedin",
    icon: "logo-linkedin",
    color: "#0A66C2",
    label: "LinkedIn",
  },
  { key: "website", icon: "globe-outline", color: "#6366F1", label: "Website" },
] as const;

export function StudentDetail({ student }: StudentDetailProps) {
  const { colors } = useTheme();
  const { lightImpact } = useHaptics();

  const fromFlagAsset = getFlagAsset(student.homeCountryCode);
  const toFlagAsset = getFlagAsset(student.hostCountryCode);

  const handleCall = useCallback(() => {
    if (student.phone) {
      lightImpact();
      makePhoneCall(student.phone, student.name);
    }
  }, [student, lightImpact]);

  const handleEmail = useCallback(() => {
    if (student.email) {
      lightImpact();
      sendEmail(student.email, student.name);
    }
  }, [student, lightImpact]);

  const handleSocialPress = useCallback(
    (url: string) => {
      lightImpact();
      openURL(url);
    },
    [lightImpact],
  );

  const hasContact = Boolean(student.email || student.phone);
  const hasSocialMedia =
    student.socialMedia && Object.values(student.socialMedia).some((v) => v?.trim());

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
      contentInsetAdjustmentBehavior="automatic"
    >
      <View style={styles.content}>
        {/* Profile Section */}
        <View
          style={[
            styles.profileSection,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
              shadowColor: colors.shadow,
            },
          ]}
        >
          <NetworkImage
            imageUrl={student.imageUrl}
            name={student.name}
            size={120}
            style={styles.avatar}
          />

          <Text style={[styles.name, { color: colors.primary }]}>{student.name}</Text>

          {student.year && (
            <Text style={[styles.year, { color: colors.textSecondary }]}>
              Class of {student.year}
            </Text>
          )}

          {/* Exchange Route */}
          <View style={styles.exchangeRoute}>
            <View style={styles.countryInfo}>
              {fromFlagAsset ? (
                <Image source={fromFlagAsset} style={styles.flag} contentFit="contain" />
              ) : (
                <View
                  style={[styles.flagPlaceholder, { backgroundColor: colors.backgroundElevated }]}
                >
                  <Text style={[styles.flagText, { color: colors.textTertiary }]}>
                    {student.homeCountryCode.toUpperCase()}
                  </Text>
                </View>
              )}
              <Text style={[styles.countryName, { color: colors.text }]}>
                {getCountryName(student.homeCountryCode)}
              </Text>
            </View>

            <View style={[styles.arrow, { backgroundColor: colors.primary + "15" }]}>
              <Ionicons name="airplane" size={20} color={colors.primary} />
            </View>

            <View style={styles.countryInfo}>
              {toFlagAsset ? (
                <Image source={toFlagAsset} style={styles.flag} contentFit="contain" />
              ) : (
                <View
                  style={[styles.flagPlaceholder, { backgroundColor: colors.backgroundElevated }]}
                >
                  <Text style={[styles.flagText, { color: colors.textTertiary }]}>
                    {student.hostCountryCode.toUpperCase()}
                  </Text>
                </View>
              )}
              <Text style={[styles.countryName, { color: colors.text }]}>
                {getCountryName(student.hostCountryCode)}
              </Text>
            </View>
          </View>
        </View>

        {/* Biography Section */}
        {student.bio && (
          <View
            style={[
              styles.section,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
                shadowColor: colors.shadow,
              },
            ]}
          >
            <View style={[styles.sectionHeader, { borderBottomColor: colors.border }]}>
              <Ionicons name="person-outline" size={20} color={colors.primary} />
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Biography</Text>
            </View>
            <View style={styles.sectionContent}>
              <Text style={[styles.bioText, { color: colors.text }]}>{student.bio}</Text>
            </View>
          </View>
        )}

        {/* Contact Section */}
        {hasContact && (
          <View
            style={[
              styles.section,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
                shadowColor: colors.shadow,
              },
            ]}
          >
            <View style={[styles.sectionHeader, { borderBottomColor: colors.border }]}>
              <Ionicons name="call-outline" size={20} color={colors.primary} />
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Contact</Text>
            </View>
            <View style={styles.sectionContent}>
              {student.email && (
                <Pressable
                  style={({ pressed }) => [
                    styles.contactRow,
                    { backgroundColor: colors.backgroundElevated },
                    pressed && styles.contactRowPressed,
                  ]}
                  onPress={handleEmail}
                >
                  <View style={[styles.contactIcon, { backgroundColor: `${colors.primary}15` }]}>
                    <Ionicons name="mail" size={20} color={colors.primary} />
                  </View>
                  <View style={styles.contactInfo}>
                    <Text style={[styles.contactLabel, { color: colors.textSecondary }]}>
                      Email
                    </Text>
                    <Text style={[styles.contactValue, { color: colors.text }]}>
                      {student.email}
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward" size={16} color={colors.textTertiary} />
                </Pressable>
              )}
              {student.phone && (
                <Pressable
                  style={({ pressed }) => [
                    styles.contactRow,
                    { backgroundColor: colors.backgroundElevated },
                    pressed && styles.contactRowPressed,
                  ]}
                  onPress={handleCall}
                >
                  <View style={[styles.contactIcon, { backgroundColor: `${colors.primary}15` }]}>
                    <Ionicons name="call" size={20} color={colors.primary} />
                  </View>
                  <View style={styles.contactInfo}>
                    <Text style={[styles.contactLabel, { color: colors.textSecondary }]}>
                      Phone
                    </Text>
                    <Text style={[styles.contactValue, { color: colors.text }]}>
                      {student.phone}
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward" size={16} color={colors.textTertiary} />
                </Pressable>
              )}
            </View>
          </View>
        )}

        {/* Social Media Section */}
        {hasSocialMedia && (
          <View
            style={[
              styles.section,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
                shadowColor: colors.shadow,
              },
            ]}
          >
            <View style={[styles.sectionHeader, { borderBottomColor: colors.border }]}>
              <Ionicons name="share-social-outline" size={20} color={colors.primary} />
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Social Media</Text>
            </View>
            <View style={styles.sectionContent}>
              {SOCIAL_PLATFORMS.map((platform) => {
                const url = student.socialMedia?.[platform.key as keyof typeof student.socialMedia];
                if (!url?.trim()) return null;

                return (
                  <Pressable
                    key={platform.key}
                    style={({ pressed }) => [
                      styles.contactRow,
                      { backgroundColor: colors.backgroundElevated },
                      pressed && styles.contactRowPressed,
                    ]}
                    onPress={() => handleSocialPress(url)}
                  >
                    <View style={[styles.contactIcon, { backgroundColor: `${platform.color}15` }]}>
                      <Ionicons name={platform.icon} size={20} color={platform.color} />
                    </View>
                    <View style={styles.contactInfo}>
                      <Text style={[styles.contactLabel, { color: colors.textSecondary }]}>
                        Follow on
                      </Text>
                      <Text style={[styles.contactValue, { color: colors.text }]}>
                        {platform.label}
                      </Text>
                    </View>
                    <Ionicons name="open-outline" size={16} color={colors.textTertiary} />
                  </Pressable>
                );
              })}
            </View>
          </View>
        )}

        {/* Bottom spacing */}
        <View style={{ height: spacing.xl }} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: spacing.md,
  },
  profileSection: {
    alignItems: "center",
    padding: spacing.lg,
    borderRadius: spacing.radiusLg,
    marginBottom: spacing.md,
    ...(Platform.OS === "ios"
      ? shadowStyle
      : { elevation: 3, borderWidth: StyleSheet.hairlineWidth }),
  },
  avatar: {
    marginBottom: spacing.md,
  },
  name: {
    fontSize: Platform.OS === "ios" ? 28 : 24,
    fontWeight: Platform.OS === "ios" ? "700" : "600",
    textAlign: "center",
    marginBottom: spacing.xs,
  },
  year: {
    fontSize: 16,
    marginBottom: spacing.md,
  },
  exchangeRoute: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: spacing.sm,
  },
  countryInfo: {
    alignItems: "center",
    flex: 1,
  },
  flag: {
    width: 40,
    height: 28,
    borderRadius: 4,
    marginBottom: spacing.xs,
  },
  flagPlaceholder: {
    width: 40,
    height: 28,
    borderRadius: 4,
    marginBottom: spacing.xs,
    justifyContent: "center",
    alignItems: "center",
  },
  flagText: {
    fontSize: 10,
    fontWeight: "600",
  },
  countryName: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
  arrow: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: spacing.sm,
  },
  section: {
    borderRadius: spacing.radiusMd,
    marginBottom: spacing.md,
    overflow: "hidden",
    ...(Platform.OS === "ios"
      ? shadowStyle
      : { elevation: 2, borderWidth: StyleSheet.hairlineWidth }),
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: spacing.sm,
  },
  sectionContent: {
    padding: spacing.md,
  },
  bioText: {
    fontSize: 16,
    lineHeight: 24,
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: spacing.radiusMd,
    marginBottom: spacing.sm,
  },
  contactRowPressed: {
    opacity: 0.7,
    transform: Platform.OS === "ios" ? [{ scale: 0.98 }] : [],
  },
  contactIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.sm,
  },
  contactInfo: {
    flex: 1,
  },
  contactLabel: {
    fontSize: 12,
    fontWeight: "500",
    marginBottom: 2,
  },
  contactValue: {
    fontSize: 16,
    fontWeight: "500",
  },
});
