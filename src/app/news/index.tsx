import { useCallback } from "react";
import { View, Pressable, RefreshControl, Platform } from "react-native";
import { Image } from "expo-image";
import { router } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNews } from "@/lib/hooks/use-news";
import type { NewsItem } from "@/lib/types";

function NewsCard({ item, onPress }: { item: NewsItem; onPress: () => void }) {
  return (
    <Pressable onPress={onPress}>
      <Card className="mb-3 mx-4 overflow-hidden">
        {item.imageUrl ? (
          <Image
            source={{ uri: item.imageUrl }}
            style={{ width: "100%", height: 180 }}
            contentFit="cover"
          />
        ) : null}
        <CardContent className="p-3">
          <View className="flex-row items-center gap-2 mb-1">
            {item.isPdf && (
              <Badge variant="secondary">
                <Text className="text-xs">PDF</Text>
              </Badge>
            )}
            <Text className="text-lg font-semibold flex-1" numberOfLines={2}>
              {item.title}
            </Text>
          </View>
          <Text className="text-sm text-muted-foreground" numberOfLines={3}>
            {item.description}
          </Text>
        </CardContent>
      </Card>
    </Pressable>
  );
}

export default function NewsScreen() {
  const { t } = useTranslation();
  const { data: items, isLoading, error, refetch, isFetching } = useNews();

  const handleItemPress = useCallback((item: NewsItem) => {
    if (item.isPdf && item.pdfUrl) {
      router.push({
        pathname: "/pdf-viewer",
        params: { url: item.pdfUrl, title: item.title },
      });
    } else {
      router.push({
        pathname: "/news/[id]" as const,
        params: { id: String(item.id) },
      } as never);
    }
  }, []);

  if (isLoading) {
    return (
      <View className="flex-1 bg-background p-4 gap-3">
        <Skeleton className="w-full h-[250px] rounded-xl" />
        <Skeleton className="w-full h-[250px] rounded-xl" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 bg-background items-center justify-center p-6">
        <Text className="text-xl font-bold mb-2">Kan nieuws niet laden</Text>
        <Button onPress={() => refetch()}>
          <Text>{t("common.retry")}</Text>
        </Button>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      <FlashList
        data={items ?? []}
        renderItem={({ item }) => <NewsCard item={item} onPress={() => handleItemPress(item)} />}
        keyExtractor={(item) => String(item.id)}
        refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}
        contentContainerStyle={{
          paddingTop: 12,
          paddingBottom: Platform.OS === "android" ? 100 : 40,
        }}
        ListEmptyComponent={
          <View className="items-center py-16 px-8">
            <Text className="text-base text-muted-foreground">{t("common.empty")}</Text>
          </View>
        }
      />
    </View>
  );
}
