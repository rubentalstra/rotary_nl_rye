import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useVideoPlayer, VideoView } from "expo-video";
import { Card, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/text";

const VIDEO_URL =
  "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/videos/rotary-yep-promo.mp4";

export default function VideoScreen() {
  const player = useVideoPlayer(VIDEO_URL, (p) => {
    p.loop = false;
  });

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["bottom"]}>
      <View className="p-4">
        <Card className="mb-4">
          <CardContent className="p-4">
            <Text className="text-xl font-bold mb-2">Promo Video</Text>
            <Text className="text-base text-muted-foreground leading-6">
              Bekijk onze promotievideo over Rotary Youth Exchange Nederland.
            </Text>
          </CardContent>
        </Card>

        <View className="rounded-xl overflow-hidden">
          <VideoView player={player} style={{ width: "100%", aspectRatio: 16 / 9 }} />
        </View>
      </View>
    </SafeAreaView>
  );
}
