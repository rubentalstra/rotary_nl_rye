import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import PdfRendererView from "react-native-pdf-renderer";
import { Text } from "@/components/ui/text";

export default function PdfViewerScreen() {
  const { url } = useLocalSearchParams<{ url: string; title: string }>();

  if (!url) {
    return (
      <SafeAreaView className="flex-1 bg-background items-center justify-center" edges={["bottom"]}>
        <Text className="text-xl font-semibold text-destructive">Geen PDF URL opgegeven</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["bottom"]}>
      <PdfRendererView source={url} style={{ flex: 1 }} />
    </SafeAreaView>
  );
}
