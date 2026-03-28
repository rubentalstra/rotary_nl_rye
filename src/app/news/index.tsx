import { useCallback } from "react";
import { View, Pressable, RefreshControl, Platform, FlatList } from "react-native";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { Text } from "@/components/ui/text";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useNews } from "@/lib/hooks/use-news";
import type { NewsItem } from "@/lib/types";

function NewsRow({ item, onPress }: { item: NewsItem; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} className="px-5 py-4 active:opacity-70">
      {/* Image */}
      {item.imageUrl && (
        <Image
          source={{ uri: item.imageUrl }}
          style={{ width: "100%", height: 200, borderRadius: 16 }}
          contentFit="cover"
        />
      )}

      {/* Content */}
      <View className={item.imageUrl ? "mt-3" : ""}>
        {item.isPdf && (
          <View className="flex-row items-center mb-1.5">
            <Ionicons name="document-text" size={14} className="text-destructive mr-1" />
            <Text className="text-xs font-semibold text-destructive">PDF Document</Text>
          </View>
        )}
        <Text className="text-lg font-semibold text-foreground" numberOfLines={2}>
          {item.title}
        </Text>
        <Text className="text-sm text-muted-foreground mt-1" numberOfLines={2}>
          {item.description}
        </Text>
      </View>
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
      <View className="flex-1 bg-background p-5 gap-5">
        {[1, 2, 3, 4].map((i) => (
          <View key={i} className="flex-row">
            <Skeleton className="w-[100px] h-[75px] rounded-xl mr-4" />
            <View className="flex-1 justify-center gap-2">
              <Skeleton className="w-3/4 h-4 rounded" />
              <Skeleton className="w-full h-3 rounded" />
              <Skeleton className="w-2/3 h-3 rounded" />
            </View>
          </View>
        ))}
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 bg-background items-center justify-center p-6">
        <Ionicons name="alert-circle" size={48} className="text-destructive mb-4" />
        <Text className="text-xl font-bold text-foreground mb-2">Kan nieuws niet laden</Text>
        <Button onPress={() => refetch()}>
          <Text>{t("common.retry")}</Text>
        </Button>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }} className="bg-background">
      <FlatList
        data={items ?? []}
        renderItem={({ item }) => (
          <NewsRow item={item} onPress={() => handleItemPress(item)} />
        )}
        keyExtractor={(item) => String(item.id)}
        ItemSeparatorComponent={() => (
          <View className="mx-5">
            <Separator />
          </View>
        )}
        refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}
        contentContainerStyle={{
          paddingBottom: Platform.OS === "android" ? 100 : 40,
          flexGrow: 1,
        }}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center py-16">
            <Ionicons name="newspaper-outline" size={48} className="text-muted-foreground mb-4" />
            <Text className="text-base text-muted-foreground">{t("common.empty")}</Text>
          </View>
        }
      />
    </View>
  );
}
