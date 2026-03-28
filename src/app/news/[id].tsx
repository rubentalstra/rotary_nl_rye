import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useNewsItem } from "@/lib/hooks/use-news";

export default function NewsDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const newsId = id ? parseInt(id, 10) : 0;
  const { data: newsItem, isLoading, error } = useNewsItem(newsId);

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-background p-4" edges={["bottom"]}>
        <Skeleton className="w-full h-[200px] rounded-xl mb-4" />
        <Skeleton className="w-3/4 h-6 rounded mb-2" />
        <Skeleton className="w-full h-4 rounded mb-1" />
        <Skeleton className="w-full h-4 rounded mb-1" />
        <Skeleton className="w-2/3 h-4 rounded" />
      </SafeAreaView>
    );
  }

  if (error || !newsItem) {
    return (
      <SafeAreaView className="flex-1 bg-background items-center justify-center p-10" edges={["bottom"]}>
        <Ionicons name="alert-circle" size={64} className="text-destructive" />
        <Text className="mt-4 text-lg font-semibold text-center text-destructive">
          Nieuwsbericht niet gevonden
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["bottom"]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {newsItem.imageUrl && (
          <Image
            source={{ uri: newsItem.imageUrl }}
            style={{ width: "100%", height: 220 }}
            contentFit="cover"
          />
        )}
        <View className="p-4">
          <Text className="text-2xl font-bold mb-2">{newsItem.title}</Text>
          <Text className="text-base leading-6 text-muted-foreground mb-4">
            {newsItem.description}
          </Text>

          {/* Text content blocks */}
          {newsItem.textContent?.map((block, idx) => (
            <View key={idx} className="mb-4">
              {block.heading && (
                <Text className="text-lg font-semibold mb-2">{block.heading}</Text>
              )}
              {block.body?.map((bodyItem, bodyIdx) => (
                <View key={bodyIdx}>
                  {bodyItem.paragraph?.map((para, paraIdx) => (
                    <Text
                      key={paraIdx}
                      className="text-base leading-6 text-muted-foreground mb-2"
                    >
                      {para}
                    </Text>
                  ))}
                  {bodyItem.imageUrl && (
                    <Image
                      source={{ uri: bodyItem.imageUrl }}
                      style={{ width: "100%", height: 200, borderRadius: 12, marginBottom: 12 }}
                      contentFit="cover"
                    />
                  )}
                </View>
              ))}
            </View>
          ))}

          {/* PDF button */}
          {newsItem.isPdf && newsItem.pdfUrl && (
            <Button
              className="mt-4"
              onPress={() =>
                router.push({
                  pathname: "/pdf-viewer",
                  params: { url: newsItem.pdfUrl!, title: newsItem.title },
                })
              }
            >
              <Text>Open PDF</Text>
            </Button>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
