/**
 * Communication utility functions
 * Phone, email, WhatsApp, and URL handling
 */

import { Alert, Linking } from "react-native";

/**
 * Make a phone call with confirmation
 * @param phoneNumber - Phone number to call
 * @param contactName - Optional contact name for the dialog
 */
export function makePhoneCall(phoneNumber: string, contactName?: string): void {
  const title = contactName ? `Bel ${contactName}` : "Bellen";
  const message = `Wil je ${phoneNumber} bellen?`;

  Alert.alert(title, message, [
    { text: "Annuleren", style: "cancel" },
    {
      text: "Bellen",
      onPress: () => Linking.openURL(`tel:${phoneNumber}`),
    },
  ]);
}

/**
 * Send an email with confirmation
 * @param email - Email address
 * @param contactName - Optional contact name for the dialog
 * @param subject - Optional email subject
 */
export function sendEmail(email: string, contactName?: string, subject?: string): void {
  const title = contactName ? `Email ${contactName}` : "Email versturen";
  const message = `Wil je een email sturen naar ${email}?`;

  Alert.alert(title, message, [
    { text: "Annuleren", style: "cancel" },
    {
      text: "Email",
      onPress: () => {
        const mailtoUrl = subject
          ? `mailto:${email}?subject=${encodeURIComponent(subject)}`
          : `mailto:${email}`;
        Linking.openURL(mailtoUrl);
      },
    },
  ]);
}

/**
 * Open WhatsApp with a contact
 * @param phoneNumber - Phone number (with country code)
 * @param message - Optional pre-filled message
 */
export function openWhatsApp(phoneNumber: string, message?: string): void {
  // Remove any non-numeric characters except +
  const cleanNumber = phoneNumber.replace(/[^\d+]/g, "");
  let whatsappUrl = `whatsapp://send?phone=${cleanNumber}`;

  if (message) {
    whatsappUrl += `&text=${encodeURIComponent(message)}`;
  }

  Linking.canOpenURL(whatsappUrl).then((supported) => {
    if (supported) {
      Linking.openURL(whatsappUrl);
    } else {
      Alert.alert("WhatsApp niet gevonden", "Installeer WhatsApp om deze functie te gebruiken");
    }
  });
}

/**
 * Open URL in browser
 * @param url - URL to open
 */
export function openURL(url: string): void {
  Linking.canOpenURL(url).then((supported) => {
    if (supported) {
      Linking.openURL(url);
    } else {
      Alert.alert("Kan URL niet openen", "Kan de gevraagde link niet openen");
    }
  });
}

/**
 * Open Instagram profile
 * @param username - Instagram username
 */
export function openInstagram(username: string): void {
  const cleanUsername = username.replace("@", "");
  openURL(`https://instagram.com/${cleanUsername}`);
}

/**
 * Open Facebook profile
 * @param profileId - Facebook profile ID or username
 */
export function openFacebook(profileId: string): void {
  openURL(`https://facebook.com/${profileId}`);
}

/**
 * Open LinkedIn profile
 * @param profileId - LinkedIn profile ID
 */
export function openLinkedIn(profileId: string): void {
  openURL(`https://linkedin.com/in/${profileId}`);
}

/**
 * Open Snapchat profile
 * @param username - Snapchat username
 */
export function openSnapchat(username: string): void {
  openURL(`https://snapchat.com/add/${username}`);
}

/**
 * Format phone number for display
 * @param phoneNumber - Phone number to format
 * @returns Formatted phone number
 */
export function formatPhoneNumber(phoneNumber: string): string {
  const cleaned = phoneNumber.replace(/\D/g, "");

  if (cleaned.startsWith("31")) {
    // International format +31
    return `+${cleaned.substring(0, 2)} ${cleaned.substring(2, 3)} ${cleaned.substring(3, 7)} ${cleaned.substring(7)}`;
  } else if (cleaned.startsWith("06")) {
    // Dutch mobile
    return `${cleaned.substring(0, 2)} ${cleaned.substring(2, 6)} ${cleaned.substring(6)}`;
  }

  return phoneNumber;
}

/**
 * Validate email format
 * @param email - Email to validate
 * @returns true if valid email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Get initials from a name
 * @param name - Full name
 * @returns Initials (max 2 characters)
 */
export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .join("")
    .substring(0, 2);
}
