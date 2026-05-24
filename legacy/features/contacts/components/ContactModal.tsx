/**
 * Contact detail modal component
 */

import { useCallback } from "react";
import { Modal, View, Text, ScrollView, Pressable, Platform, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useTheme } from "@/core/theme";
import { spacing } from "@/core/theme/spacing";
import { NetworkImage } from "@/shared/components/media/NetworkImage";
import { IconButton } from "@/shared/components/ui";
import { useHaptics } from "@/shared/hooks";
import { makePhoneCall, sendEmail, openURL } from "@/shared/utils/communications";
import type { Contact } from "../types";

interface ContactModalProps {
  contact: Contact | null;
  visible: boolean;
  onClose: () => void;
}

const SOCIAL_PLATFORMS = [
  { key: "instagram", icon: "logo-instagram", color: "#E4405F" },
  { key: "facebook", icon: "logo-facebook", color: "#1877F2" },
  { key: "snapchat", icon: "logo-snapchat", color: "#FFFC00" },
  { key: "linkedin", icon: "logo-linkedin", color: "#0A66C2" },
  { key: "website", icon: "globe-outline", color: "#6366F1" },
] as const;

export function ContactModal({ contact, visible, onClose }: ContactModalProps) {
  const { colors } = useTheme();
  const { lightImpact } = useHaptics();

  const handleCall = useCallback(() => {
    if (contact?.phone) {
      lightImpact();
      makePhoneCall(contact.phone, contact.name);
    }
  }, [contact, lightImpact]);

  const handleEmail = useCallback(() => {
    if (contact?.email) {
      lightImpact();
      sendEmail(contact.email, contact.name);
    }
  }, [contact, lightImpact]);

  const handleSocialMedia = useCallback(
    (url: string) => {
      lightImpact();
      openURL(url);
    },
    [lightImpact],
  );

  if (!contact) return null;

  const isRotex = contact.category === "rotex";
  const hasOrgInfo = Boolean(contact.club || contact.district);
  const hasContact = Boolean(contact.email || contact.phone);
  const hasBio = Boolean(contact.bio?.trim());
  const hasSocialMedia =
    contact.socialMedia && Object.values(contact.socialMedia).some((v) => v?.trim());

  const validSocialPlatforms = hasSocialMedia
    ? SOCIAL_PLATFORMS.filter((p) =>
        contact.socialMedia?.[p.key as keyof typeof contact.socialMedia]?.trim(),
      )
    : [];

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle={Platform.OS === "ios" ? "pageSheet" : "fullScreen"}
      onRequestClose={onClose}
    >
      <SafeAreaView
        style={[styles.container, { backgroundColor: colors.background }]}
        edges={["top"]}
      >
        {/* Modal Handle Bar (iOS style) */}
        {Platform.OS === "ios" && (
          <View style={styles.handleContainer}>
            <View style={[styles.handleBar, { backgroundColor: colors.textTertiary }]} />
          </View>
        )}

        {/* Header */}
        <View style={[styles.header, { borderBottomColor: colors.border }]}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Contact Details</Text>
          <IconButton icon="close" onPress={onClose} size="medium" variant="tinted" />
        </View>

        <ScrollView
          style={styles.body}
          showsVerticalScrollIndicator={false}
          contentInsetAdjustmentBehavior="automatic"
        >
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
            <View style={styles.profileImageContainer}>
              <NetworkImage imageUrl={contact.imageUrl} name={contact.name} size={100} />
              {isRotex && (
                <View
                  style={[
                    styles.logoContainer,
                    {
                      backgroundColor: colors.card,
                      shadowColor: colors.shadow,
                    },
                  ]}
                >
                  <Image
                    source={require("@/assets/logo/rotex_logo_light.svg")}
                    style={styles.organizationLogo}
                    contentFit="contain"
                  />
                </View>
              )}
              {!isRotex && contact.club && (
                <View
                  style={[
                    styles.logoContainer,
                    {
                      backgroundColor: colors.card,
                      shadowColor: colors.shadow,
                    },
                  ]}
                >
                  <Image
                    source={require("@/assets/logo/rotary-logo-icon.svg")}
                    style={styles.organizationLogo}
                    contentFit="contain"
                    tintColor={colors.secondary}
                  />
                </View>
              )}
            </View>

            <Text style={[styles.profileName, { color: colors.primary }]}>{contact.name}</Text>

            {contact.functions && contact.functions.length > 0 && (
              <View style={styles.functionsContainer}>
                {contact.functions
                  .filter((func) => func?.trim())
                  .map((func) => (
                    <View
                      key={func}
                      style={[styles.functionChip, { backgroundColor: colors.primary }]}
                    >
                      <Text style={[styles.functionText, { color: colors.card }]}>{func}</Text>
                    </View>
                  ))}
              </View>
            )}
          </View>

          {/* Organization Section */}
          {hasOrgInfo && (
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
                <Ionicons name="business-outline" size={20} color={colors.primary} />
                <Text style={[styles.sectionTitle, { color: colors.text }]}>Organization</Text>
              </View>
              <View style={styles.sectionContent}>
                {contact.club && (
                  <View style={[styles.infoRow, { backgroundColor: colors.backgroundElevated }]}>
                    <View
                      style={[
                        styles.infoIconContainer,
                        { backgroundColor: `${colors.secondary}15` },
                      ]}
                    >
                      <Image
                        source={require("@/assets/logo/rotary-logo-icon.svg")}
                        style={styles.infoIcon}
                        contentFit="contain"
                        tintColor={colors.secondary}
                      />
                    </View>
                    <View style={styles.infoTextContainer}>
                      <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>
                        Rotary Club
                      </Text>
                      <Text style={[styles.infoText, { color: colors.text }]}>{contact.club}</Text>
                    </View>
                  </View>
                )}
                {contact.district && (
                  <View style={[styles.infoRow, { backgroundColor: colors.backgroundElevated }]}>
                    <View
                      style={[styles.infoIconContainer, { backgroundColor: `${colors.accent}15` }]}
                    >
                      <Ionicons name="globe-outline" size={20} color={colors.accent} />
                    </View>
                    <View style={styles.infoTextContainer}>
                      <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>
                        District
                      </Text>
                      <Text style={[styles.infoText, { color: colors.text }]}>
                        {contact.district}
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            </View>
          )}

          {/* Contact Information Section */}
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
                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                  Contact Information
                </Text>
              </View>
              <View style={styles.sectionContent}>
                {contact.email && (
                  <Pressable
                    style={({ pressed }) => [
                      styles.actionRow,
                      { backgroundColor: colors.backgroundElevated },
                      pressed && styles.actionRowPressed,
                    ]}
                    onPress={handleEmail}
                  >
                    <View
                      style={[styles.infoIconContainer, { backgroundColor: `${colors.primary}15` }]}
                    >
                      <Ionicons name="mail" size={20} color={colors.primary} />
                    </View>
                    <View style={styles.infoTextContainer}>
                      <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Email</Text>
                      <Text style={[styles.infoText, { color: colors.text }]}>{contact.email}</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={16} color={colors.textTertiary} />
                  </Pressable>
                )}
                {contact.phone && (
                  <Pressable
                    style={({ pressed }) => [
                      styles.actionRow,
                      { backgroundColor: colors.backgroundElevated },
                      pressed && styles.actionRowPressed,
                    ]}
                    onPress={handleCall}
                  >
                    <View
                      style={[styles.infoIconContainer, { backgroundColor: `${colors.primary}15` }]}
                    >
                      <Ionicons name="call" size={20} color={colors.primary} />
                    </View>
                    <View style={styles.infoTextContainer}>
                      <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Phone</Text>
                      <Text style={[styles.infoText, { color: colors.text }]}>{contact.phone}</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={16} color={colors.textTertiary} />
                  </Pressable>
                )}
              </View>
            </View>
          )}

          {/* Biography Section */}
          {hasBio && (
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
                <Text style={[styles.bioText, { color: colors.text }]}>{contact.bio}</Text>
              </View>
            </View>
          )}

          {/* Social Media Section */}
          {validSocialPlatforms.length > 0 && (
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
                {validSocialPlatforms.map((platform) => {
                  const url =
                    contact.socialMedia?.[platform.key as keyof typeof contact.socialMedia];
                  if (!url) return null;

                  return (
                    <Pressable
                      key={platform.key}
                      style={({ pressed }) => [
                        styles.actionRow,
                        { backgroundColor: colors.backgroundElevated },
                        pressed && styles.actionRowPressed,
                      ]}
                      onPress={() => handleSocialMedia(url)}
                    >
                      <View
                        style={[
                          styles.infoIconContainer,
                          { backgroundColor: `${platform.color}15` },
                        ]}
                      >
                        <Ionicons name={platform.icon as any} size={20} color={platform.color} />
                      </View>
                      <View style={styles.infoTextContainer}>
                        <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>
                          Follow on
                        </Text>
                        <Text style={[styles.infoText, { color: colors.text }]}>
                          {platform.key.charAt(0).toUpperCase() + platform.key.slice(1)}
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
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

const shadowStyle = {
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.08,
  shadowRadius: 20,
  elevation: 4,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  handleContainer: {
    alignItems: "center",
    paddingVertical: 12,
  },
  handleBar: {
    width: 36,
    height: 4,
    borderRadius: 2,
    opacity: 0.4,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    paddingTop: Platform.OS === "ios" ? spacing.sm : spacing.lg,
    paddingBottom: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    flex: 1,
    marginRight: spacing.md,
  },
  body: {
    padding: spacing.lg,
  },
  profileSection: {
    alignItems: "center",
    marginBottom: spacing.lg,
    padding: spacing.lg,
    borderRadius: spacing.radiusLg,
    ...(Platform.OS === "ios"
      ? shadowStyle
      : { elevation: 3, borderWidth: StyleSheet.hairlineWidth }),
  },
  profileImageContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.md,
  },
  logoContainer: {
    position: "absolute",
    bottom: -8,
    right: -8,
    borderRadius: 20,
    padding: 6,
    ...(Platform.OS === "ios"
      ? {
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.15,
          shadowRadius: 4,
        }
      : { elevation: 4 }),
  },
  organizationLogo: {
    width: 24,
    height: 24,
  },
  profileName: {
    fontSize: Platform.OS === "ios" ? 28 : 24,
    fontWeight: Platform.OS === "ios" ? "700" : "600",
    textAlign: "center",
    marginBottom: spacing.sm,
  },
  functionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: spacing.sm,
    gap: spacing.sm,
  },
  functionChip: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: spacing.radiusFull,
  },
  functionText: {
    fontSize: 12,
    fontWeight: "500",
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
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: spacing.radiusMd,
    marginBottom: spacing.sm,
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: spacing.radiusMd,
    marginBottom: spacing.sm,
  },
  actionRowPressed: {
    opacity: 0.7,
    transform: Platform.OS === "ios" ? [{ scale: 0.98 }] : [],
  },
  infoIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.sm,
  },
  infoIcon: {
    width: 20,
    height: 20,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    fontWeight: "500",
    marginBottom: 2,
  },
  infoText: {
    fontSize: 16,
    fontWeight: "500",
  },
  bioText: {
    fontSize: 16,
    lineHeight: 24,
  },
});
