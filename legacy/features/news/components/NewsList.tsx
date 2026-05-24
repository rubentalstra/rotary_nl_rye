/**
 * News list component for displaying all news items
 */

import { useCallback, useMemo } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { useTheme } from "@/core/theme";
import { spacing } from "@/core/theme/spacing";
import { EmptyState } from "@/shared/components/feedback/EmptyState";
import { NewsCard } from "./NewsCard";
import type { NewsItem } from "../types";

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
  const { colors } = useTheme();

  // Memoized key extractor
  const keyExtractor = useCallback((item: NewsItem) => String(item.id), []);

  // Memoized render item
  const renderItem = useCallback(
    ({ item }: { item: NewsItem }) => <NewsCard item={item} onPress={() => onItemPress(item)} />,
    [onItemPress],
  );

  // Memoized footer component
  const ListFooterComponent = useMemo(() => <View style={{ height: spacing.lg }} />, []);

  // Memoized container style
  const containerStyle = useMemo(
    () => ({ backgroundColor: colors.background }),
    [colors.background],
  );

  if (items.length === 0) {
    return (
      <EmptyState
        icon="newspaper-outline"
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
      // Performance optimizations
      removeClippedSubviews={true}
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
