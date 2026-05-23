import { router } from "expo-router";
import { useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { ErrorState } from "@/components/feedback/error-state";
import { LoadingState } from "@/components/feedback/loading-state";
import { NewsList } from "@/components/news/news-list";
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

  if (loading && items.length === 0) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }} edges={[]}>
        <LoadingState message="Nieuws laden..." />
      </SafeAreaView>
    );
  }

  if (error && items.length === 0) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }} edges={[]}>
        <ErrorState message={error} onRetry={refresh} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }} edges={[]}>
      <NewsList
        items={items}
        onItemPress={handleItemPress}
        refreshing={loading}
        onRefresh={refresh}
      />
    </SafeAreaView>
  );
}
