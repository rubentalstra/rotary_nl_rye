import { View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import PdfRendererView from "react-native-pdf-renderer";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { usePdfDownload } from "@/lib/hooks/use-pdf-download";

export default function PdfViewerScreen() {
  const { url, title } = useLocalSearchParams<{ url: string; title: string }>();
  const { localFilePath, loading, error, download } = usePdfDownload({
    url,
    autoDownload: true,
  });

  if (!url) {
    return (
      <View className="flex-1 bg-background items-center justify-center p-6">
        <Ionicons name="document-text-outline" size={48} className="text-muted-foreground mb-4" />
        <Text className="text-xl font-semibold text-foreground">Geen PDF opgegeven</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View className="flex-1 bg-background items-center justify-center p-6">
        <View className="w-16 h-16 rounded-2xl bg-muted items-center justify-center mb-4">
          <Ionicons name="document-text-outline" size={32} className="text-primary" />
        </View>
        <Text className="text-lg font-semibold text-foreground mb-1">PDF laden</Text>
        <Text className="text-sm text-muted-foreground">Even geduld...</Text>
      </View>
    );
  }

  if (error || !localFilePath) {
    return (
      <View className="flex-1 bg-background items-center justify-center p-6">
        <Ionicons name="alert-circle" size={48} className="text-destructive mb-4" />
        <Text className="text-xl font-semibold text-foreground mb-2">
          Kan PDF niet laden
        </Text>
        <Text className="text-sm text-muted-foreground text-center mb-4">
          {error || "Er is een onbekende fout opgetreden."}
        </Text>
        <Button onPress={download}>
          <Text>Opnieuw proberen</Text>
        </Button>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }} className="bg-background">
      <PdfRendererView source={localFilePath} style={{ flex: 1 }} />
    </View>
  );
}
