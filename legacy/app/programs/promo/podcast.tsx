import { useState, useCallback, useMemo } from "react";
import { StyleSheet, View, Text, ScrollView, Pressable, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import type { AudioStatus } from "expo-audio";
import * as Haptics from "expo-haptics";
import { useTheme } from "@/core/theme";
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

// Helper function to format time in seconds to MM:SS
const formatTime = (timeInSeconds: number): string => {
  if (!timeInSeconds || timeInSeconds === 0) return "0:00";
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

interface PodcastRowProps {
  index: number;
  podcast: Podcast;
  isActive: boolean;
  onPress: (index: number) => Promise<void>;
  status: AudioStatus;
  styles: any;
  themeColors: any;
}

function PodcastRow({
  index,
  podcast,
  isActive,
  onPress,
  status,
  styles,
  themeColors,
}: PodcastRowProps) {
  const handlePress = useCallback(async () => {
    try {
      await Haptics.selectionAsync();
      await onPress(index);
    } catch (error) {
      console.warn("Playback toggle error:", error);
    }
  }, [index, onPress]);

  // Compute derived state using useMemo for better performance
  const playbackState = useMemo(() => {
    if (!isActive) {
      return {
        isPlaying: false,
        isBuffering: false,
        isLoaded: false,
        currentTime: 0,
        duration: 0,
        progress: 0,
        buttonIcon: "play" as const,
        showProgress: false,
        statusMessage: "",
      };
    }

    const { playing, isBuffering, isLoaded, currentTime, duration } = status;
    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

    let buttonIcon: "play" | "pause" | "reload-outline" = "play";
    let statusMessage = "";

    if (isBuffering) {
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
      currentTime: currentTime || 0,
      duration: duration || 0,
      progress,
      buttonIcon,
      showProgress: isLoaded && duration > 0,
      statusMessage,
    };
  }, [isActive, status]);

  return (
    <Pressable
      style={({ pressed }) => [
        styles.podcastCard,
        {
          backgroundColor: themeColors.card,
          borderColor: themeColors.border,
          shadowColor: themeColors.shadow,
        },
        isActive && !playbackState.isLoaded && styles.podcastCardLoading,
        pressed && styles.podcastCardPressed,
      ]}
      onPress={handlePress}
      disabled={isActive && !playbackState.isLoaded}
      accessibilityRole="button"
      accessibilityLabel={`Play ${podcast.title}`}
    >
      <View style={styles.podcastContent}>
        <View
          style={[
            styles.playButton,
            { backgroundColor: `${themeColors.primary}15` },
            playbackState.isBuffering && styles.playButtonBuffering,
          ]}
        >
          <Ionicons
            name={playbackState.buttonIcon}
            size={24}
            color={
              isActive && !playbackState.isLoaded ? themeColors.textTertiary : themeColors.primary
            }
          />
        </View>

        <View style={styles.podcastInfo}>
          <Text style={[styles.podcastTitle, { color: themeColors.text }]} numberOfLines={2}>
            {podcast.title}
          </Text>
          <Text
            style={[styles.podcastDescription, { color: themeColors.textSecondary }]}
            numberOfLines={3}
          >
            {podcast.description}
          </Text>

          {isActive && (
            <>
              {/* Status indicator */}
              {playbackState.statusMessage && (
                <Text style={[styles.statusText, { color: themeColors.primary }]}>
                  {playbackState.statusMessage}
                </Text>
              )}

              {/* Progress bar */}
              {playbackState.showProgress && (
                <>
                  <View style={[styles.progressBar, { backgroundColor: themeColors.border }]}>
                    <View
                      style={[
                        styles.progressFill,
                        {
                          backgroundColor: themeColors.primary,
                          width: `${playbackState.progress}%`,
                        },
                      ]}
                    />
                  </View>
                  <View style={styles.timeInfo}>
                    <Text style={[styles.timeText, { color: themeColors.textSecondary }]}>
                      {formatTime(playbackState.currentTime)}
                    </Text>
                    <Text style={[styles.timeText, { color: themeColors.textSecondary }]}>
                      {formatTime(playbackState.duration)}
                    </Text>
                  </View>
                </>
              )}
            </>
          )}
        </View>
      </View>
    </Pressable>
  );
}

export default function PodcastPromo() {
  const { colors: themeColors } = useTheme();

  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  // Use default configuration to avoid simulator audio issues
  const player = useAudioPlayer(null);
  const status = useAudioPlayerStatus(player);

  // No audio configuration - let expo-audio use defaults to avoid simulator issues

  // Remove app state handling that may interfere with simulator audio
  // Let the system handle audio lifecycle naturally

  const handlePodcastPress = useCallback(
    async (index: number) => {
      if (playingIndex === index) {
        // Toggle play/pause for current podcast
        if (status.playing) {
          player.pause();
        } else {
          // Handle replay from end
          if (status.didJustFinish) {
            await player.seekTo(0);
          }
          player.play();
        }
      } else {
        // Switch to new podcast
        const podcast = podcasts[index];
        setPlayingIndex(index);

        // Basic replace and play as per Expo Audio documentation
        player.replace(podcast.url);
        player.play();
      }
    },
    [playingIndex, status.playing, status.didJustFinish, player],
  );

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: themeColors.background }]}
      edges={["bottom"]}
    >
      <ScrollView
        contentContainerStyle={[styles.container, { backgroundColor: themeColors.background }]}
      >
        {/* Header */}
        <View style={[styles.headerSection, { backgroundColor: themeColors.card }]}>
          <View style={[styles.headerIcon, { backgroundColor: `${themeColors.primary}15` }]}>
            <Ionicons name="headset-outline" size={32} color={themeColors.primary} />
          </View>
          <Text style={[styles.headerTitle, { color: themeColors.text }]}>Promo Podcast</Text>
          <Text style={[styles.headerSubtitle, { color: themeColors.textSecondary }]}>
            Hoe is het nou om een paar maanden ouders te zijn van een exchange student? Luister naar
            de ervaringen van gastouders.
          </Text>
        </View>

        {/* Podcast List */}
        {podcasts.map((podcast, index) => (
          <PodcastRow
            key={podcast.url}
            index={index}
            podcast={podcast}
            isActive={playingIndex === index}
            onPress={handlePodcastPress}
            status={status}
            styles={styles}
            themeColors={themeColors}
          />
        ))}

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
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
  // Header Styles
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
  // Podcast Card Styles
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
});
