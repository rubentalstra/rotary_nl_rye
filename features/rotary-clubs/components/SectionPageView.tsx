/**
 * Section page view component that renders info sections or document lists
 */

import { ScrollView, View, Text, StyleSheet } from "react-native";
import { useTheme } from "@/core/theme";
import { spacing } from "@/core/theme/spacing";
import { InfoSectionCard } from "./InfoSectionCard";
import { DocumentCard } from "./DocumentCard";
import type { SectionPageContent } from "../types";

interface SectionPageViewProps {
  content: SectionPageContent;
  onDocumentPress?: (pdfUrl: string, title: string) => void;
}

export function SectionPageView({ content, onDocumentPress }: SectionPageViewProps) {
  const { colors } = useTheme();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
      contentInsetAdjustmentBehavior="automatic"
    >
      {/* Description */}
      {content.description && (
        <Text style={[styles.description, { color: colors.textSecondary }]}>
          {content.description}
        </Text>
      )}

      {/* Info Sections */}
      {content.type === "info" &&
        content.infoSections?.map((section) => (
          <InfoSectionCard key={section.id} section={section} />
        ))}

      {/* Document List */}
      {content.type === "documents" &&
        content.documents?.map((document) => (
          <DocumentCard
            key={document.id}
            document={document}
            onPress={() => onDocumentPress?.(document.pdfUrl, document.title)}
          />
        ))}

      {/* Bottom spacing */}
      <View style={{ height: spacing.xl }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.md,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: spacing.md,
    textAlign: "center",
    paddingHorizontal: spacing.md,
  },
});
