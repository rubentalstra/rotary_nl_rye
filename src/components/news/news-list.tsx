import { useCallback, useMemo } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import { EmptyState } from "@/components/feedback/empty-state";
import { NewsCard } from "@/components/news/news-card";
import type { NewsItem } from "@/features/news/types";
import { spacing } from "@/lib/theme/spacing";
import { useTheme } from "@/lib/theme/use-theme";

interface NewsListProps {
  items: NewsItem[];
  onItemPress: (item: NewsItem) => void;
  ListHeaderComponent?: React.ComponentType | React.ReactElement | null;
  refreshing?: boolean;
  onRefresh?: () => void;
}

export function NewsList({
  items,
  onItemPress,
  ListHeaderComponent,
  refreshing,
  onRefresh,
}: NewsListProps) {
  const theme = useTheme();

  const keyExtractor = useCallback((item: NewsItem) => String(item.id), []);

  const renderItem = useCallback(
    ({ item }: { item: NewsItem }) => <NewsCard item={item} onPress={() => onItemPress(item)} />,
    [onItemPress],
  );

  const ListFooterComponent = useMemo(() => <View style={{ height: spacing.lg }} />, []);

  const containerStyle = useMemo(
    () => ({ backgroundColor: theme.background }),
    [theme.background],
  );

  if (items.length === 0) {
    return (
      <EmptyState
        icon="news"
        title="No News"
        message="There are no news items to display at this time."
      />
    );
  }

  return (
    <FlatList
      data={items}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={ListHeaderComponent}
      ListFooterComponent={ListFooterComponent}
      refreshing={refreshing}
      onRefresh={onRefresh}
      style={containerStyle}
      removeClippedSubviews
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      windowSize={10}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingVertical: spacing.sm,
  },
});
