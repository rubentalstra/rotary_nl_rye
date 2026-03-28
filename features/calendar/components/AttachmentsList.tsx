/**
 * List of event attachments with file type icons
 */

import { Linking, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/core/theme";
import type { EventAttachment } from "../types";

interface AttachmentsListProps {
  attachments: EventAttachment[];
}

/**
 * Get icon name for file type
 */
function getFileIcon(fileType: EventAttachment["fileType"]): keyof typeof Ionicons.glyphMap {
  switch (fileType) {
    case "document":
      return "document-text";
    case "spreadsheet":
      return "grid";
    case "presentation":
      return "easel";
    case "pdf":
      return "document";
    case "image":
      return "image";
    case "video":
      return "videocam";
    case "audio":
      return "musical-notes";
    default:
      return "attach";
  }
}

/**
 * Get color for file type
 */
function getFileColor(fileType: EventAttachment["fileType"]): string {
  switch (fileType) {
    case "document":
      return "#4285F4"; // Google Docs blue
    case "spreadsheet":
      return "#0F9D58"; // Google Sheets green
    case "presentation":
      return "#F4B400"; // Google Slides yellow
    case "pdf":
      return "#DB4437"; // PDF red
    case "image":
      return "#9C27B0"; // Purple
    case "video":
      return "#FF5722"; // Orange
    case "audio":
      return "#00BCD4"; // Cyan
    default:
      return "#757575"; // Grey
  }
}

/**
 * Displays a list of event attachments
 */
export function AttachmentsList({ attachments }: AttachmentsListProps) {
  const { colors } = useTheme();

  if (!attachments || attachments.length === 0) {
    return null;
  }

  const handleOpenAttachment = async (url: string) => {
    try {
      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        await Linking.openURL(url);
      }
    } catch (error) {
      console.error("Failed to open attachment:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Bijlagen</Text>
      {attachments.map((attachment) => (
        <Pressable
          key={attachment.id}
          onPress={() => handleOpenAttachment(attachment.url)}
          style={({ pressed }) => [
            styles.attachmentRow,
            { backgroundColor: colors.card, opacity: pressed ? 0.7 : 1 },
          ]}
        >
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: getFileColor(attachment.fileType) + "20" },
            ]}
          >
            <Ionicons
              name={getFileIcon(attachment.fileType)}
              size={20}
              color={getFileColor(attachment.fileType)}
            />
          </View>
          <View style={styles.attachmentContent}>
            <Text style={[styles.attachmentTitle, { color: colors.text }]} numberOfLines={1}>
              {attachment.title}
            </Text>
            <Text style={[styles.attachmentType, { color: colors.textSecondary }]}>
              {getFileTypeLabel(attachment.fileType)}
            </Text>
          </View>
          <Ionicons name="open-outline" size={18} color={colors.textSecondary} />
        </Pressable>
      ))}
    </View>
  );
}

/**
 * Get human-readable label for file type
 */
function getFileTypeLabel(fileType: EventAttachment["fileType"]): string {
  switch (fileType) {
    case "document":
      return "Document";
    case "spreadsheet":
      return "Spreadsheet";
    case "presentation":
      return "Presentatie";
    case "pdf":
      return "PDF";
    case "image":
      return "Afbeelding";
    case "video":
      return "Video";
    case "audio":
      return "Audio";
    default:
      return "Bestand";
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  attachmentRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  attachmentContent: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },
  attachmentTitle: {
    fontSize: 15,
    fontWeight: "500",
  },
  attachmentType: {
    fontSize: 12,
    marginTop: 2,
  },
});
