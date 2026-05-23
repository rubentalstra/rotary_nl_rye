import { Image } from "expo-image";
import { useCallback } from "react";
import { Modal, Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { NetworkImage } from "@/components/media/network-image";
import { Icon } from "@/components/ui/icon";
import { IconButton } from "@/components/ui/icon-button";
import type { Contact, SocialMedia } from "@/features/contacts/types";
import { useHaptics } from "@/hooks/use-haptics";
import { borderRadius, spacing } from "@/lib/theme/spacing";
import { useTheme } from "@/lib/theme/use-theme";
import { makePhoneCall, openURL, sendEmail } from "@/utils/communications";

interface ContactModalProps {
  contact: Contact | null;
  visible: boolean;
  onClose: () => void;
}

interface SocialPlatform {
  key: keyof SocialMedia;
  label: string;
  color: string;
}

const SOCIAL_PLATFORMS: SocialPlatform[] = [
  { key: "instagram", label: "Instagram", color: "#E4405F" },
  { key: "facebook", label: "Facebook", color: "#1877F2" },
  { key: "snapchat", label: "Snapchat", color: "#FFD60A" },
  { key: "linkedin", label: "LinkedIn", color: "#0A66C2" },
  { key: "website", label: "Website", color: "#6366F1" },
];

const shadowStyle = {
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.08,
  shadowRadius: 20,
  elevation: 4,
};

export function ContactModal({ contact, visible, onClose }: ContactModalProps) {
  const theme = useTheme();
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
  const validSocialPlatforms = SOCIAL_PLATFORMS.filter((p) =>
    contact.socialMedia?.[p.key]?.trim(),
  );
  const hasSocialMedia = validSocialPlatforms.length > 0;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle={Platform.OS === "ios" ? "pageSheet" : "fullScreen"}
      onRequestClose={onClose}
    >
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.background }]}
        edges={["top"]}
      >
        {Platform.OS === "ios" ? (
          <View style={styles.handleContainer}>
            <View style={[styles.handleBar, { backgroundColor: theme.textTertiary }]} />
          </View>
        ) : null}

        <View style={[styles.header, { borderBottomColor: theme.border }]}>
          <Text style={[styles.headerTitle, { color: theme.text }]}>Contact Details</Text>
          <IconButton icon="close" onPress={onClose} size="medium" variant="tinted" />
        </View>

        <ScrollView
          style={styles.body}
          showsVerticalScrollIndicator={false}
          contentInsetAdjustmentBehavior="automatic"
        >
          <View
            style={[
              styles.profileSection,
              {
                backgroundColor: theme.card,
                borderColor: theme.border,
                shadowColor: theme.shadow,
              },
            ]}
          >
            <View style={styles.profileImageContainer}>
              <NetworkImage imageUrl={contact.imageUrl} name={contact.name} size={100} />
              {isRotex ? (
                <View
                  style={[
                    styles.logoContainer,
                    { backgroundColor: theme.card, shadowColor: theme.shadow },
                  ]}
                >
                  <Image
                    source={require("@/assets/logo/rotex_logo_light.svg")}
                    style={styles.organizationLogo}
                    contentFit="contain"
                  />
                </View>
              ) : contact.club ? (
                <View
                  style={[
                    styles.logoContainer,
                    { backgroundColor: theme.card, shadowColor: theme.shadow },
                  ]}
                >
                  <Image
                    source={require("@/assets/logo/rotary-logo-icon.svg")}
                    style={styles.organizationLogo}
                    contentFit="contain"
                    tintColor={theme.secondary}
                  />
                </View>
              ) : null}
            </View>

            <Text style={[styles.profileName, { color: theme.primary }]}>{contact.name}</Text>

            {contact.functions && contact.functions.length > 0 ? (
              <View style={styles.functionsContainer}>
                {contact.functions
                  .filter((func) => func?.trim())
                  .map((func) => (
                    <View
                      key={func}
                      style={[styles.functionChip, { backgroundColor: theme.primary }]}
                    >
                      <Text style={[styles.functionText, { color: theme.card }]}>{func}</Text>
                    </View>
                  ))}
              </View>
            ) : null}
          </View>

          {hasOrgInfo ? (
            <View
              style={[
                styles.section,
                {
                  backgroundColor: theme.card,
                  borderColor: theme.border,
                  shadowColor: theme.shadow,
                },
              ]}
            >
              <View style={[styles.sectionHeader, { borderBottomColor: theme.border }]}>
                <Icon name="clubs" size={20} tintColor={theme.primary} />
                <Text style={[styles.sectionTitle, { color: theme.text }]}>Organization</Text>
              </View>
              <View style={styles.sectionContent}>
                {contact.club ? (
                  <View
                    style={[styles.infoRow, { backgroundColor: theme.backgroundElevated }]}
                  >
                    <View
                      style={[styles.infoIconContainer, { backgroundColor: `${theme.secondary}15` }]}
                    >
                      <Image
                        source={require("@/assets/logo/rotary-logo-icon.svg")}
                        style={styles.infoIcon}
                        contentFit="contain"
                        tintColor={theme.secondary}
                      />
                    </View>
                    <View style={styles.infoTextContainer}>
                      <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>
                        Rotary Club
                      </Text>
                      <Text style={[styles.infoText, { color: theme.text }]}>{contact.club}</Text>
                    </View>
                  </View>
                ) : null}
                {contact.district ? (
                  <View
                    style={[styles.infoRow, { backgroundColor: theme.backgroundElevated }]}
                  >
                    <View
                      style={[styles.infoIconContainer, { backgroundColor: `${theme.accent}15` }]}
                    >
                      <Icon name="globe" size={20} tintColor={theme.accent} />
                    </View>
                    <View style={styles.infoTextContainer}>
                      <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>
                        District
                      </Text>
                      <Text style={[styles.infoText, { color: theme.text }]}>
                        {contact.district}
                      </Text>
                    </View>
                  </View>
                ) : null}
              </View>
            </View>
          ) : null}

          {hasContact ? (
            <View
              style={[
                styles.section,
                {
                  backgroundColor: theme.card,
                  borderColor: theme.border,
                  shadowColor: theme.shadow,
                },
              ]}
            >
              <View style={[styles.sectionHeader, { borderBottomColor: theme.border }]}>
                <Icon name="phone" size={20} tintColor={theme.primary} />
                <Text style={[styles.sectionTitle, { color: theme.text }]}>
                  Contact Information
                </Text>
              </View>
              <View style={styles.sectionContent}>
                {contact.email ? (
                  <Pressable
                    onPress={handleEmail}
                    style={({ pressed }) => [
                      styles.actionRow,
                      { backgroundColor: theme.backgroundElevated },
                      pressed && styles.actionRowPressed,
                    ]}
                  >
                    <View
                      style={[styles.infoIconContainer, { backgroundColor: `${theme.primary}15` }]}
                    >
                      <Icon name="mail" size={20} tintColor={theme.primary} />
                    </View>
                    <View style={styles.infoTextContainer}>
                      <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>Email</Text>
                      <Text style={[styles.infoText, { color: theme.text }]}>{contact.email}</Text>
                    </View>
                    <Icon name="forward" size={16} tintColor={theme.textTertiary} />
                  </Pressable>
                ) : null}
                {contact.phone ? (
                  <Pressable
                    onPress={handleCall}
                    style={({ pressed }) => [
                      styles.actionRow,
                      { backgroundColor: theme.backgroundElevated },
                      pressed && styles.actionRowPressed,
                    ]}
                  >
                    <View
                      style={[styles.infoIconContainer, { backgroundColor: `${theme.primary}15` }]}
                    >
                      <Icon name="phone" size={20} tintColor={theme.primary} />
                    </View>
                    <View style={styles.infoTextContainer}>
                      <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>Phone</Text>
                      <Text style={[styles.infoText, { color: theme.text }]}>{contact.phone}</Text>
                    </View>
                    <Icon name="forward" size={16} tintColor={theme.textTertiary} />
                  </Pressable>
                ) : null}
              </View>
            </View>
          ) : null}

          {hasBio ? (
            <View
              style={[
                styles.section,
                {
                  backgroundColor: theme.card,
                  borderColor: theme.border,
                  shadowColor: theme.shadow,
                },
              ]}
            >
              <View style={[styles.sectionHeader, { borderBottomColor: theme.border }]}>
                <Icon name="person" size={20} tintColor={theme.primary} />
                <Text style={[styles.sectionTitle, { color: theme.text }]}>Biography</Text>
              </View>
              <View style={styles.sectionContent}>
                <Text style={[styles.bioText, { color: theme.text }]}>{contact.bio}</Text>
              </View>
            </View>
          ) : null}

          {hasSocialMedia ? (
            <View
              style={[
                styles.section,
                {
                  backgroundColor: theme.card,
                  borderColor: theme.border,
                  shadowColor: theme.shadow,
                },
              ]}
            >
              <View style={[styles.sectionHeader, { borderBottomColor: theme.border }]}>
                <Icon name="share" size={20} tintColor={theme.primary} />
                <Text style={[styles.sectionTitle, { color: theme.text }]}>Social Media</Text>
              </View>
              <View style={styles.sectionContent}>
                {validSocialPlatforms.map((platform) => {
                  const url = contact.socialMedia?.[platform.key];
                  if (!url) return null;
                  return (
                    <Pressable
                      key={platform.key}
                      onPress={() => handleSocialMedia(url)}
                      style={({ pressed }) => [
                        styles.actionRow,
                        { backgroundColor: theme.backgroundElevated },
                        pressed && styles.actionRowPressed,
                      ]}
                    >
                      <View
                        style={[styles.infoIconContainer, { backgroundColor: `${platform.color}15` }]}
                      >
                        <Icon name="external" size={20} tintColor={platform.color} />
                      </View>
                      <View style={styles.infoTextContainer}>
                        <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>
                          Follow on
                        </Text>
                        <Text style={[styles.infoText, { color: theme.text }]}>
                          {platform.label}
                        </Text>
                      </View>
                      <Icon name="external" size={16} tintColor={theme.textTertiary} />
                    </Pressable>
                  );
                })}
              </View>
            </View>
          ) : null}

          <View style={{ height: spacing.xl }} />
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
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
  body: { padding: spacing.lg },
  profileSection: {
    alignItems: "center",
    marginBottom: spacing.lg,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
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
      ? { shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.15, shadowRadius: 4 }
      : { elevation: 4 }),
  },
  organizationLogo: { width: 24, height: 24 },
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
    borderRadius: borderRadius.full,
  },
  functionText: {
    fontSize: 12,
    fontWeight: "500",
  },
  section: {
    borderRadius: borderRadius.md,
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
    gap: spacing.sm,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  sectionContent: { padding: spacing.md },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
    gap: spacing.sm,
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
    gap: spacing.sm,
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
  },
  infoIcon: { width: 20, height: 20 },
  infoTextContainer: { flex: 1 },
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
