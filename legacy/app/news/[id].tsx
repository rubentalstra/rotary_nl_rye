/**
 * News detail screen route
 * Thin wrapper using the news feature module
 */

import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/core/theme";
import { LoadingState } from "@/shared/components/feedback";
import { NewsDetail, useNewsItem } from "@/features/news";

export default function NewsDetailScreen() {
  const { colors } = useTheme();
  const { id } = useLocalSearchParams<{ id: string }>();

  const newsId = id ? parseInt(id, 10) : 0;
  const { item: newsItem, loading, error } = useNewsItem(newsId);

  const handleOpenPdf = () => {
    if (newsItem?.pdfUrl) {
      router.push({
        pathname: "/pdf-viewer",
        params: { url: newsItem.pdfUrl, title: newsItem.title },
      });
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={["bottom"]}>
        <LoadingState message="Artikel laden..." />
      </SafeAreaView>
    );
  }

  if (error || !newsItem) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={["bottom"]}>
        <View style={styles.centered}>
          <Ionicons name="alert-circle" size={64} color={colors.error} />
          <Text style={[styles.errorText, { color: colors.error }]}>
            {error || "Nieuwsbericht niet gevonden"}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={["bottom"]}>
      <NewsDetail item={newsItem} onOpenPdf={handleOpenPdf} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  errorText: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
});
