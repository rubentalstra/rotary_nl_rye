/**
 * Enhanced event detail modal component
 * Features: meeting section, recurrence info, attachments, better UX
 */

import {
  Linking,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useTheme } from "@/core/theme";
import { IconButton } from "@/shared/components/ui";
import { useEventDetails } from "../hooks/useEventDetails";
import { MeetingSection } from "./MeetingSection";
import { AttachmentsList } from "./AttachmentsList";
import { RecurrenceBadge } from "./RecurrenceBadge";
import { EventTypeBadge } from "./EventTypeBadge";
import { extractLinksFromDescription } from "../utils/dateUtils";
import type { CalendarEvent } from "../types";

interface EventModalProps {
  event: CalendarEvent | null;
  visible: boolean;
  onClose: () => void;
}

export function EventModal({ event, visible, onClose }: EventModalProps) {
  const { colors } = useTheme();
  const details = useEventDetails(event);

  if (!event) return null;

  const links = event.description ? extractLinksFromDescription(event.description) : [];

  const handleOpenLocation = async () => {
    if (event.location) {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      const url = `https://maps.apple.com/?q=${encodeURIComponent(event.location)}`;
      await Linking.openURL(url);
    }
  };

  const handleOpenLink = async (url: string) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    await Linking.openURL(url);
  };

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
        {/* Header */}
        <View style={[styles.header, { borderBottomColor: colors.border }]}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Evenement</Text>
          <View style={styles.closeButtonContainer}>
            <IconButton icon="close" onPress={onClose} size="medium" variant="tinted" />
          </View>
        </View>

        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Color accent bar at top */}
          <View style={[styles.colorAccent, { backgroundColor: details.accentColor }]} />

          {/* Badges row */}
          {(details.isRecurring || details.showEventTypeBadge) && (
            <View style={styles.badgesRow}>
              {details.isRecurring && (
                <RecurrenceBadge recurrence={event.recurrence} size="medium" />
              )}
              {details.showEventTypeBadge && (
                <EventTypeBadge eventType={event.eventType} size="medium" />
              )}
            </View>
          )}

          {/* Title */}
          <Text style={[styles.title, { color: colors.text }]}>{event.summary}</Text>

          {/* Date & Time */}
          <View style={styles.infoRow}>
            <View style={[styles.iconContainer, { backgroundColor: colors.primary }]}>
              <Ionicons name="calendar" size={18} color="#FFFFFF" />
            </View>
            <View style={styles.infoContent}>
              {details.isMultiDay ? (
                <>
                  <Text style={[styles.infoText, { color: colors.text }]}>{details.dateRange}</Text>
                  <Text style={[styles.infoSubtext, { color: colors.textSecondary }]}>
                    Meerdaags evenement
                  </Text>
                </>
              ) : (
                <>
                  <Text style={[styles.infoText, { color: colors.text }]}>
                    {details.relativeDateDisplay || details.dateDisplay}
                  </Text>
                  <Text style={[styles.infoSubtext, { color: colors.textSecondary }]}>
                    {details.timeDisplay}
                  </Text>
                </>
              )}
            </View>
          </View>

          {/* Recurrence info */}
          {details.isRecurring && details.recurrenceText && (
            <View style={styles.infoRow}>
              <View style={[styles.iconContainer, { backgroundColor: colors.primary + "80" }]}>
                <Ionicons name="repeat" size={18} color={colors.primary} />
              </View>
              <View style={styles.infoContent}>
                <Text style={[styles.infoText, { color: colors.text }]}>
                  {details.recurrenceText}
                </Text>
                <Text style={[styles.infoSubtext, { color: colors.textSecondary }]}>
                  Herhalend evenement
                </Text>
              </View>
            </View>
          )}

          {/* Location */}
          {event.location && (
            <Pressable
              onPress={handleOpenLocation}
              style={({ pressed }) => [styles.infoRow, { opacity: pressed ? 0.7 : 1 }]}
            >
              <View style={[styles.iconContainer, { backgroundColor: colors.accent }]}>
                <Ionicons name="location" size={18} color="#FFFFFF" />
              </View>
              <View style={styles.infoContent}>
                <Text style={[styles.infoText, { color: colors.text }]}>{event.location}</Text>
                <Text style={[styles.infoSubtext, { color: colors.primary }]}>Open in Kaarten</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
            </Pressable>
          )}

          {/* Meeting Section */}
          {event.conference && <MeetingSection conference={event.conference} />}

          {/* Description */}
          {event.description && (
            <View style={styles.descriptionContainer}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Beschrijving</Text>
              <Text style={[styles.description, { color: colors.textSecondary }]}>
                {event.description.replace(/<[^>]*>/g, "")}
              </Text>
            </View>
          )}

          {/* Links extracted from description */}
          {links.length > 0 && (
            <View style={styles.linksContainer}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Links</Text>
              {links.map((link, index) => (
                <Pressable
                  key={index}
                  onPress={() => handleOpenLink(link)}
                  style={({ pressed }) => [
                    styles.linkRow,
                    {
                      backgroundColor: colors.card,
                      opacity: pressed ? 0.7 : 1,
                    },
                  ]}
                >
                  <Ionicons name="link" size={18} color={colors.primary} />
                  <Text style={[styles.linkText, { color: colors.primary }]} numberOfLines={1}>
                    {link}
                  </Text>
                  <Ionicons name="open-outline" size={16} color={colors.textSecondary} />
                </Pressable>
              ))}
            </View>
          )}

          {/* Attachments */}
          {event.attachments && event.attachments.length > 0 && (
            <AttachmentsList attachments={event.attachments} />
          )}

          {/* Bottom padding */}
          <View style={styles.bottomPadding} />
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "600",
  },
  closeButtonContainer: {
    position: "absolute",
    right: 16,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  colorAccent: {
    height: 4,
    borderRadius: 2,
    marginBottom: 16,
  },
  badgesRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  infoContent: {
    flex: 1,
    marginLeft: 12,
  },
  infoText: {
    fontSize: 16,
    fontWeight: "500",
  },
  infoSubtext: {
    fontSize: 14,
    marginTop: 2,
  },
  descriptionContainer: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
  },
  linksContainer: {
    marginTop: 24,
  },
  linkRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
  },
  linkText: {
    flex: 1,
    fontSize: 14,
    marginLeft: 8,
    marginRight: 8,
  },
  bottomPadding: {
    height: 40,
  },
});
