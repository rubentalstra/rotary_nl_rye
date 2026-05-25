import { useCallback, useMemo, useState } from "react";
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useAudioPlayer, useAudioPlayerStatus, type AudioStatus } from "expo-audio";
import * as Haptics from "expo-haptics";

import { usePauseOnBackground } from "@/hooks/use-pause-on-background";
import { useTheme } from "@/lib/theme/use-theme";
import type { ThemeColors } from "@/lib/theme/colors";

type Podcast = { title: string; description: string; url: string };

const podcasts: Podcast[] = [
  {
    title: "Episode 1: Sharon en Michel Teunissen",
    description:
      "Hoe is het nou om een paar maanden ouders te zijn van een exchange student? Sharon en Michel vertellen over hun ervaringen als gastouders.",
    url: "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/podcast/rotary-sharon-en-michel-teunissen.mp3",
  },
  {
    title: "Episode 2: Ellen en Steven Stolp",
    description:
      "Ellen en Steven delen hun verhaal als gastouders en geven tips voor andere families die overwegen om een exchange student op te nemen.",
    url: "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/podcast/rotary-ellen-en-steven-stolp.mp3",
  },
];

function formatTime(seconds: number): string {
  if (!seconds || seconds <= 0) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const remainder = Math.floor(seconds % 60);
  return `${minutes}:${remainder.toString().padStart(2, "0")}`;
}

export default function PodcastPromo() {
  const theme = useTheme();
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  const activeUrl = playingIndex !== null ? podcasts[playingIndex].url : null;
  const player = useAudioPlayer(activeUrl);
  const status = useAudioPlayerStatus(player);

  usePauseOnBackground(player);

  const handlePodcastPress = useCallback(
    async (index: number) => {
      try {
        await Haptics.selectionAsync();
      } catch {
        // Haptics may fail on simulator — non-fatal.
      }

      if (playingIndex === index) {
        if (status.playing) {
          player.pause();
        } else {
          if (status.didJustFinish) {
            try {
              await player.seekTo(0);
            } catch {
              // Best-effort rewind.
            }
          }
          player.play();
        }
        return;
      }

      setPlayingIndex(index);
      // Source change triggers useAudioPlayer to reload; play after a microtask
      // so the new source is in flight before play() is invoked.
      queueMicrotask(() => {
        try {
          player.play();
        } catch {
          // Player may not yet have the new source attached — ignored.
        }
      });
    },
    [playingIndex, status.playing, status.didJustFinish, player],
  );

  const handleRetry = useCallback(() => {
    if (playingIndex === null) return;
    try {
      player.replace(podcasts[playingIndex].url);
      player.play();
    } catch {
      // Best-effort retry.
    }
  }, [playingIndex, player]);

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.background }]}
      edges={["bottom"]}
    >
      <ScrollView
        contentContainerStyle={[styles.container, { backgroundColor: theme.background }]}
      >
        <View style={[styles.headerSection, { backgroundColor: theme.card }]}>
          <View style={[styles.headerIcon, { backgroundColor: `${theme.primary}15` }]}>
            <Ionicons name="headset-outline" size={32} color={theme.primary} />
          </View>
          <Text style={[styles.headerTitle, { color: theme.text }]}>Promo Podcast</Text>
          <Text style={[styles.headerSubtitle, { color: theme.textSecondary }]}>
            Hoe is het nou om een paar maanden ouders te zijn van een exchange student? Luister naar
            de ervaringen van gastouders.
          </Text>
        </View>

        {podcasts.map((podcast, index) => (
          <PodcastRow
            key={podcast.url}
            podcast={podcast}
            index={index}
            isActive={playingIndex === index}
            status={status}
            theme={theme}
            onPress={handlePodcastPress}
            onRetry={handleRetry}
          />
        ))}

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

interface PodcastRowProps {
  podcast: Podcast;
  index: number;
  isActive: boolean;
  status: AudioStatus;
  theme: ThemeColors;
  onPress: (index: number) => Promise<void>;
  onRetry: () => void;
}

function PodcastRow({
  podcast,
  index,
  isActive,
  status,
  theme,
  onPress,
  onRetry,
}: PodcastRowProps) {
  const handlePress = useCallback(() => {
    onPress(index).catch((error) => {
      console.warn("[podcast] playback toggle failed", error);
    });
  }, [index, onPress]);

  const playback = useMemo(() => {
    if (!isActive) {
      return {
        isPlaying: false,
        isBuffering: false,
        isLoaded: false,
        hasError: false,
        currentTime: 0,
        duration: 0,
        progress: 0,
        buttonIcon: "play" as const,
        showProgress: false,
        statusMessage: "",
      };
    }

    const { playing, isBuffering, isLoaded, currentTime, duration, reasonForWaitingToPlay } =
      status;
    const safeDuration = duration ?? 0;
    const safeCurrent = currentTime ?? 0;
    const progress = safeDuration > 0 ? (safeCurrent / safeDuration) * 100 : 0;
    const hasError =
      reasonForWaitingToPlay === "noItemToPlay" ||
      reasonForWaitingToPlay === "evaluatingBufferingRate";

    let buttonIcon: "play" | "pause" | "reload-outline" | "alert-circle-outline" = "play";
    let statusMessage = "";

    if (hasError && !isLoaded) {
      buttonIcon = "alert-circle-outline";
      statusMessage = "Podcast kon niet worden geladen";
    } else if (isBuffering) {
      buttonIcon = "reload-outline";
      statusMessage = "Buffering...";
    } else if (!isLoaded) {
      statusMessage = "Loading...";
    } else if (playing) {
      buttonIcon = "pause";
    }

    return {
      isPlaying: playing,
      isBuffering,
      isLoaded,
      hasError,
      currentTime: safeCurrent,
      duration: safeDuration,
      progress,
      buttonIcon,
      showProgress: isLoaded && safeDuration > 0,
      statusMessage,
    };
  }, [isActive, status]);

  return (
    <Pressable
      style={({ pressed }) => [
        styles.podcastCard,
        {
          backgroundColor: theme.card,
          borderColor: theme.border,
          shadowColor: theme.shadow,
        },
        isActive && !playback.isLoaded && !playback.hasError && styles.podcastCardLoading,
        pressed && styles.podcastCardPressed,
      ]}
      onPress={handlePress}
      disabled={isActive && !playback.isLoaded && !playback.hasError}
      accessibilityRole="button"
      accessibilityLabel={`Play ${podcast.title}`}
    >
      <View style={styles.podcastContent}>
        <View
          style={[
            styles.playButton,
            { backgroundColor: `${theme.primary}15` },
            playback.isBuffering && styles.playButtonBuffering,
          ]}
        >
          <Ionicons
            name={playback.buttonIcon}
            size={24}
            color={
              playback.hasError
                ? theme.error
                : isActive && !playback.isLoaded
                  ? theme.textTertiary
                  : theme.primary
            }
          />
        </View>

        <View style={styles.podcastInfo}>
          <Text style={[styles.podcastTitle, { color: theme.text }]} numberOfLines={2}>
            {podcast.title}
          </Text>
          <Text
            style={[styles.podcastDescription, { color: theme.textSecondary }]}
            numberOfLines={3}
          >
            {podcast.description}
          </Text>

          {isActive ? (
            <>
              {playback.statusMessage ? (
                <Text
                  style={[
                    styles.statusText,
                    { color: playback.hasError ? theme.error : theme.primary },
                  ]}
                >
                  {playback.statusMessage}
                </Text>
              ) : null}

              {playback.hasError ? (
                <Pressable
                  style={[styles.retryButton, { borderColor: theme.error }]}
                  onPress={onRetry}
                  accessibilityRole="button"
                  accessibilityLabel="Opnieuw proberen"
                >
                  <Text style={[styles.retryText, { color: theme.error }]}>Opnieuw proberen</Text>
                </Pressable>
              ) : null}

              {playback.showProgress ? (
                <>
                  <View style={[styles.progressBar, { backgroundColor: theme.border }]}>
                    <View
                      style={[
                        styles.progressFill,
                        {
                          backgroundColor: theme.primary,
                          width: `${playback.progress}%`,
                        },
                      ]}
                    />
                  </View>
                  <View style={styles.timeInfo}>
                    <Text style={[styles.timeText, { color: theme.textSecondary }]}>
                      {formatTime(playback.currentTime)}
                    </Text>
                    <Text style={[styles.timeText, { color: theme.textSecondary }]}>
                      {formatTime(playback.duration)}
                    </Text>
                  </View>
                </>
              ) : null}
            </>
          ) : null}
        </View>
      </View>
    </Pressable>
  );
}

const shadowStyle = {
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.08,
  shadowRadius: 20,
  elevation: 4,
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    padding: 16,
    paddingBottom: 40,
  },
  headerSection: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    alignItems: "center",
    ...shadowStyle,
    ...(Platform.OS === "android" && {
      borderWidth: StyleSheet.hairlineWidth,
    }),
  },
  headerIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 8,
    textAlign: "center",
  },
  headerSubtitle: {
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
    paddingHorizontal: 10,
  },
  podcastCard: {
    borderRadius: 16,
    marginBottom: 12,
    overflow: "hidden",
    ...shadowStyle,
    ...(Platform.OS === "android" && {
      borderWidth: StyleSheet.hairlineWidth,
    }),
  },
  podcastCardPressed: {
    opacity: Platform.OS === "ios" ? 0.8 : 0.6,
    transform: Platform.OS === "ios" ? [{ scale: 0.98 }] : [],
  },
  podcastCardLoading: {
    opacity: 0.7,
  },
  podcastContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  playButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  playButtonBuffering: {
    opacity: 0.7,
  },
  podcastInfo: {
    flex: 1,
  },
  podcastTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  podcastDescription: {
    fontSize: 14,
    lineHeight: 18,
    marginBottom: 8,
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
    marginBottom: 8,
  },
  progressFill: {
    height: "100%",
    borderRadius: 2,
  },
  timeInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  timeText: {
    fontSize: 12,
    fontWeight: "500",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
    marginBottom: 8,
    fontStyle: "italic",
  },
  retryButton: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    marginBottom: 8,
  },
  retryText: {
    fontSize: 13,
    fontWeight: "600",
  },
});
