import { memo, useEffect, useState, type ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { useVideoPlayer, type VideoThumbnail as VideoThumbnailFrame } from "expo-video";
import Ionicons from "@react-native-vector-icons/ionicons";

import { useTheme } from "@/lib/theme/use-theme";

interface VideoThumbnailProps {
  url: string;
  timeSeconds?: number;
  fallback?: ReactNode;
}

export const VideoThumbnail = memo(function VideoThumbnail({
  url,
  timeSeconds = 2,
  fallback,
}: VideoThumbnailProps) {
  const theme = useTheme();
  const [frame, setFrame] = useState<VideoThumbnailFrame | null>(null);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");

  const player = useVideoPlayer(url, (p) => {
    p.muted = true;
  });

  useEffect(() => {
    let cancelled = false;
    setState("loading");
    setFrame(null);

    (async () => {
      try {
        const frames = await player.generateThumbnailsAsync([timeSeconds]);
        if (cancelled) return;
        if (frames.length > 0) {
          setFrame(frames[0]);
          setState("ready");
        } else {
          setState("error");
        }
      } catch {
        if (!cancelled) setState("error");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [url, timeSeconds, player]);

  if (state === "ready" && frame) {
    return <Image source={frame} style={styles.image} contentFit="cover" transition={200} />;
  }

  if (state === "loading") {
    return (
      <View style={[styles.placeholder, { backgroundColor: theme.backgroundElevated }]}>
        <Ionicons name="image-outline" size={40} color={theme.textTertiary} />
      </View>
    );
  }

  return (
    <View style={[styles.placeholder, { backgroundColor: theme.backgroundElevated }]}>
      {fallback ?? (
        <Ionicons name="videocam-off-outline" size={40} color={theme.textTertiary} />
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
  },
  placeholder: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
