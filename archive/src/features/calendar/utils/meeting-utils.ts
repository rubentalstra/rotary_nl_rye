/**
 * Meeting/Conference utility functions
 * Extract and format meeting details for display
 */

import { Linking } from "react-native";
import * as Clipboard from "expo-clipboard";
import * as Haptics from "expo-haptics";
import type { ConferenceData } from "../types";

/**
 * Open meeting link in external app
 */
export async function openMeetingLink(conference: ConferenceData): Promise<boolean> {
  const link = conference.meetingLink;
  if (!link) return false;

  try {
    const canOpen = await Linking.canOpenURL(link);
    if (canOpen) {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      await Linking.openURL(link);
      return true;
    }
  } catch (error) {
    console.error("Failed to open meeting link:", error);
  }

  return false;
}

/**
 * Copy text to clipboard with haptic feedback
 */
export async function copyToClipboard(text: string): Promise<void> {
  try {
    await Clipboard.setStringAsync(text);
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  } catch (error) {
    console.error("Failed to copy to clipboard:", error);
  }
}

/**
 * Format meeting ID for display (add dashes for readability)
 */
export function formatMeetingId(id?: string): string {
  if (!id) return "";

  // Remove any existing formatting
  const clean = id.replace(/[^a-zA-Z0-9]/g, "");

  // Google Meet IDs are typically xxx-xxxx-xxx format
  if (clean.length === 10) {
    return `${clean.slice(0, 3)}-${clean.slice(3, 7)}-${clean.slice(7)}`;
  }

  // Zoom-style IDs are typically xxx xxx xxxx format
  if (clean.length === 10 && /^\d+$/.test(clean)) {
    return `${clean.slice(0, 3)} ${clean.slice(3, 6)} ${clean.slice(6)}`;
  }

  return id;
}

/**
 * Format phone number for display
 */
export function formatPhoneNumber(number: string): string {
  // Remove tel: prefix if present
  const clean = number.replace(/^tel:/, "").replace(/\s+/g, "");

  // Basic formatting for international numbers
  if (clean.startsWith("+")) {
    // Format as +XX XXX XXX XXXX
    if (clean.length > 6) {
      const parts = [];
      parts.push(clean.slice(0, 3)); // Country code
      let remaining = clean.slice(3);
      while (remaining.length > 4) {
        parts.push(remaining.slice(0, 3));
        remaining = remaining.slice(3);
      }
      parts.push(remaining);
      return parts.join(" ");
    }
  }

  return number;
}

/**
 * Dial phone number
 */
export async function dialPhoneNumber(number: string, pin?: string): Promise<boolean> {
  const cleanNumber = number.replace(/[^+\d]/g, "");

  // Add pin as DTMF tones if provided (not all phones support this)
  const phoneUrl = pin ? `tel:${cleanNumber},${pin}` : `tel:${cleanNumber}`;

  try {
    const canOpen = await Linking.canOpenURL(phoneUrl);
    if (canOpen) {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      await Linking.openURL(phoneUrl);
      return true;
    }
  } catch (error) {
    console.error("Failed to dial phone number:", error);
  }

  return false;
}

/**
 * Get meeting type icon name (Ionicons)
 */
export function getMeetingTypeIcon(conference: ConferenceData): string {
  switch (conference.type) {
    case "googleMeet":
      return "videocam";
    case "hangout":
      return "videocam-outline";
    default:
      return "call";
  }
}

/**
 * Get meeting provider display name
 */
export function getMeetingProviderName(conference: ConferenceData): string {
  return conference.name || (conference.type === "googleMeet" ? "Google Meet" : "Video Meeting");
}

/**
 * Check if conference has dial-in options
 */
export function hasDialInOptions(conference: ConferenceData): boolean {
  return conference.dialInNumbers.length > 0 || conference.phoneEntryPoints.length > 0;
}

/**
 * Get all dial-in details formatted for display
 */
export function getDialInDetails(conference: ConferenceData): {
  number: string;
  formattedNumber: string;
  region?: string;
  pin?: string;
}[] {
  return conference.dialInNumbers.map((dialIn) => ({
    number: dialIn.number,
    formattedNumber: formatPhoneNumber(dialIn.number),
    region: dialIn.region,
    pin: dialIn.pin,
  }));
}

/**
 * Build dial-in info text for copying
 */
export function buildDialInInfoText(conference: ConferenceData): string {
  const lines: string[] = [];

  if (conference.meetingLink) {
    lines.push(`Meeting: ${conference.meetingLink}`);
  }

  if (conference.meetingId) {
    lines.push(`Meeting ID: ${formatMeetingId(conference.meetingId)}`);
  }

  const dialIns = getDialInDetails(conference);
  if (dialIns.length > 0) {
    lines.push("");
    lines.push("Inbelnummers:");
    dialIns.forEach((dialIn) => {
      let line = dialIn.formattedNumber;
      if (dialIn.region) line += ` (${dialIn.region})`;
      if (dialIn.pin) line += ` PIN: ${dialIn.pin}`;
      lines.push(line);
    });
  }

  return lines.join("\n");
}
