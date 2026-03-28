/**
 * PDF header title component with page indicator
 */

import { View, Text, StyleSheet, Platform } from "react-native";
import { useTheme } from "@/core/theme";

interface PdfHeaderTitleProps {
  title: string;
  currentPage: number;
  totalPages: number;
}

export function PdfHeaderTitle({ title, currentPage, totalPages }: PdfHeaderTitleProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>
        {title || "PDF Document"}
      </Text>
      {totalPages > 0 && (
        <Text style={[styles.pageInfo, { color: colors.textSecondary }]}>
          Page {currentPage + 1} of {totalPages}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  title: {
    fontSize: Platform.OS === "ios" ? 18 : 20,
    fontWeight: "600",
    textAlign: "center",
  },
  pageInfo: {
    fontSize: 13,
    fontWeight: "400",
    marginTop: 2,
  },
});
