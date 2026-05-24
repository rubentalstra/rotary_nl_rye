import { router } from "expo-router";
import { useCallback, useMemo } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import { EmptyState } from "@/components/feedback/empty-state";
import { ErrorState } from "@/components/feedback/error-state";
import { LoadingState } from "@/components/feedback/loading-state";
import { NewsCard } from "@/components/news/news-card";
import { useNews } from "@/features/news/use-news";
import type { NewsItem } from "@/features/news/types";
import { useTheme } from "@/lib/theme/use-theme";

export default function NewsScreen() {
  const theme = useTheme();
  const { items, loading, error, refresh } = useNews();

  const handleItemPress = useCallback((item: NewsItem) => {
    // Casts below: typed-routes generator regenerates on the next Metro reload —
    // tsc reads stale `.expo/types/router.d.ts` until then. Safe because both
    // routes exist (`/news/[id]`, `/pdf-viewer`).
    if (item.isPdf && item.pdfUrl) {
      router.push({
        pathname: "/pdf-viewer",
        params: { url: item.pdfUrl, title: item.title },
      } as never);
    } else {
      router.push({
        pathname: "/news/[id]",
        params: { id: String(item.id) },
      } as never);
    }
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: NewsItem }) => (
      <NewsCard item={item} onPress={() => handleItemPress(item)} />
    ),
    [handleItemPress],
  );

  const renderSeparator = useCallback(() => <View style={styles.separator} />, []);

  const renderEmpty = useCallback(() => {
    if (loading) return <LoadingState message="Nieuws laden..." />;
    if (error) return <ErrorState message={error} onRetry={refresh} />;
    return (
      <EmptyState
        icon="news"
        title="Geen nieuws"
        message="Er zijn op dit moment geen nieuwsberichten."
      />
    );
  }, [loading, error, refresh]);

  const listStyle = useMemo(
    () => ({ backgroundColor: theme.background }),
    [theme.background],
  );

  return (
    <FlatList
      data={items}
      keyExtractor={(item) => String(item.id)}
      renderItem={renderItem}
      style={listStyle}
      contentContainerStyle={styles.contentContainer}
      ItemSeparatorComponent={renderSeparator}
      ListEmptyComponent={renderEmpty}
      showsVerticalScrollIndicator={false}
      contentInsetAdjustmentBehavior="automatic"
      refreshing={loading}
      onRefresh={refresh}
      removeClippedSubviews
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      windowSize={10}
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexGrow: 1,
  },
  separator: {
    height: 12,
  },
});
