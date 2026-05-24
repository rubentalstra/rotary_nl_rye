import { router, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { LoadingState } from "@/components/feedback/loading-state";
import { NewsDetail } from "@/components/news/news-detail";
import { Icon } from "@/components/ui/icon";
import { useNewsItem } from "@/features/news/use-news";
import { useTheme } from "@/lib/theme/use-theme";

export default function NewsDetailScreen() {
  const theme = useTheme();
  const { id } = useLocalSearchParams<{ id: string }>();

  const newsId = id ? parseInt(id, 10) : 0;
  const { item: newsItem, loading, error } = useNewsItem(newsId);

  const handleOpenPdf = () => {
    if (newsItem?.pdfUrl) {
      router.push({
        pathname: "/pdf-viewer",
        params: { url: newsItem.pdfUrl, title: newsItem.title },
      } as never);
    }
  };

  if (loading) {
    return <LoadingState message="Artikel laden..." />;
  }

  if (error || !newsItem) {
    return (
      <View style={[styles.centered, { backgroundColor: theme.background }]}>
        <Icon name="alert" size={64} tintColor={theme.error} />
        <Text style={[styles.errorText, { color: theme.error }]}>
          {error ?? "Nieuwsbericht niet gevonden"}
        </Text>
      </View>
    );
  }

  return <NewsDetail item={newsItem} onOpenPdf={handleOpenPdf} />;
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
