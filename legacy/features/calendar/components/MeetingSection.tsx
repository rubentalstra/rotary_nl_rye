/**
 * Meeting details section for EventModal
 * Shows join button, meeting ID, dial-in numbers, etc.
 */

import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/core/theme";
import type { ConferenceData } from "../types";
import { useMeetingActions } from "../hooks";
import {
  formatMeetingId,
  getDialInDetails,
  getMeetingProviderName,
  hasDialInOptions,
} from "../utils/meetingUtils";

interface MeetingSectionProps {
  conference: ConferenceData;
}

/**
 * Displays meeting/conference details with actionable buttons
 */
export function MeetingSection({ conference }: MeetingSectionProps) {
  const { colors } = useTheme();
  const { joinMeeting, copyMeetingInfo, copyText, copied } = useMeetingActions();

  const providerName = getMeetingProviderName(conference);
  const hasDialIn = hasDialInOptions(conference);
  const dialInDetails = getDialInDetails(conference);
  const formattedMeetingId = formatMeetingId(conference.meetingId);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons
          name={conference.type === "googleMeet" ? "videocam" : "call"}
          size={20}
          color={colors.primary}
        />
        <Text style={[styles.headerText, { color: colors.text }]}>{providerName}</Text>
      </View>

      {/* Join Button */}
      {conference.meetingLink && (
        <Pressable
          onPress={() => joinMeeting(conference)}
          style={({ pressed }) => [
            styles.joinButton,
            { backgroundColor: "#00897B", opacity: pressed ? 0.8 : 1 },
          ]}
        >
          <Ionicons name="videocam" size={20} color="#FFFFFF" />
          <Text style={styles.joinButtonText}>Deelnemen</Text>
        </Pressable>
      )}

      {/* Meeting ID */}
      {formattedMeetingId && (
        <Pressable
          onPress={() => copyText(conference.meetingId || "")}
          style={({ pressed }) => [
            styles.infoRow,
            { backgroundColor: colors.card, opacity: pressed ? 0.7 : 1 },
          ]}
        >
          <View style={styles.infoContent}>
            <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Meeting ID</Text>
            <Text style={[styles.infoValue, { color: colors.text }]}>{formattedMeetingId}</Text>
          </View>
          <Ionicons
            name={copied ? "checkmark" : "copy-outline"}
            size={20}
            color={copied ? "#00897B" : colors.textSecondary}
          />
        </Pressable>
      )}

      {/* Dial-in Numbers */}
      {hasDialIn && (
        <View style={styles.dialInSection}>
          <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>Inbelnummers</Text>
          {dialInDetails.map((dialIn, index) => (
            <Pressable
              key={index}
              onPress={() =>
                dialIn.number && dialIn.pin ? dialInDetails[index] && dialIn.pin : null
              }
              style={({ pressed }) => [
                styles.dialInRow,
                { backgroundColor: colors.card, opacity: pressed ? 0.7 : 1 },
              ]}
            >
              <Ionicons
                name="call-outline"
                size={18}
                color={colors.primary}
                style={styles.dialInIcon}
              />
              <View style={styles.dialInContent}>
                <Text style={[styles.dialInNumber, { color: colors.text }]}>
                  {dialIn.formattedNumber}
                </Text>
                {dialIn.region && (
                  <Text style={[styles.dialInRegion, { color: colors.textSecondary }]}>
                    {dialIn.region}
                  </Text>
                )}
                {dialIn.pin && (
                  <Text style={[styles.dialInPin, { color: colors.textSecondary }]}>
                    PIN: {dialIn.pin}
                  </Text>
                )}
              </View>
            </Pressable>
          ))}
        </View>
      )}

      {/* Copy All Button */}
      <Pressable
        onPress={() => copyMeetingInfo(conference)}
        style={({ pressed }) => [
          styles.copyAllButton,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
            opacity: pressed ? 0.7 : 1,
          },
        ]}
      >
        <Ionicons
          name={copied ? "checkmark-circle" : "copy-outline"}
          size={18}
          color={copied ? "#00897B" : colors.primary}
        />
        <Text style={[styles.copyAllText, { color: copied ? "#00897B" : colors.primary }]}>
          {copied ? "Gekopieerd!" : "Kopieer alle details"}
        </Text>
      </Pressable>

      {/* Notes */}
      {conference.notes && (
        <View style={styles.notesContainer}>
          <Text style={[styles.notes, { color: colors.textSecondary }]}>{conference.notes}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  joinButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
  },
  joinButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    marginLeft: 8,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 15,
    fontWeight: "500",
  },
  dialInSection: {
    marginTop: 8,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  dialInRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
  },
  dialInIcon: {
    marginTop: 2,
    marginRight: 10,
  },
  dialInContent: {
    flex: 1,
  },
  dialInNumber: {
    fontSize: 15,
    fontWeight: "500",
  },
  dialInRegion: {
    fontSize: 13,
    marginTop: 2,
  },
  dialInPin: {
    fontSize: 13,
    marginTop: 2,
  },
  copyAllButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 4,
  },
  copyAllText: {
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 8,
  },
  notesContainer: {
    marginTop: 12,
    padding: 12,
    borderRadius: 8,
  },
  notes: {
    fontSize: 13,
    lineHeight: 18,
  },
});
