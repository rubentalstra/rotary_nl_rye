/**
 * Phone, email, WhatsApp, and URL handling helpers (Dutch UI strings).
 */

import { Alert, Linking } from "react-native";

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

export function openWhatsApp(phoneNumber: string, message?: string): void {
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

export function openURL(url: string): void {
  Linking.canOpenURL(url).then((supported) => {
    if (supported) {
      Linking.openURL(url);
    } else {
      Alert.alert("Kan URL niet openen", "Kan de gevraagde link niet openen");
    }
  });
}

export function openInstagram(username: string): void {
  const cleanUsername = username.replace("@", "");
  openURL(`https://instagram.com/${cleanUsername}`);
}

export function openFacebook(profileId: string): void {
  openURL(`https://facebook.com/${profileId}`);
}

export function openLinkedIn(profileId: string): void {
  openURL(`https://linkedin.com/in/${profileId}`);
}

export function openSnapchat(username: string): void {
  openURL(`https://snapchat.com/add/${username}`);
}

export function formatPhoneNumber(phoneNumber: string): string {
  const cleaned = phoneNumber.replace(/\D/g, "");

  if (cleaned.startsWith("31")) {
    return `+${cleaned.substring(0, 2)} ${cleaned.substring(2, 3)} ${cleaned.substring(3, 7)} ${cleaned.substring(7)}`;
  } else if (cleaned.startsWith("06")) {
    return `${cleaned.substring(0, 2)} ${cleaned.substring(2, 6)} ${cleaned.substring(6)}`;
  }

  return phoneNumber;
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .join("")
    .substring(0, 2);
}
