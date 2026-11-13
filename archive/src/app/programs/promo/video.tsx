import { useCallback, useState } from "react";
import { Modal, Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useVideoPlayer, VideoView } from "expo-video";
import { useEvent } from "expo";
import * as Haptics from "expo-haptics";

import { IconButton } from "@/components/ui/icon-button";
import { VideoThumbnail } from "@/components/media/video-thumbnail";
import { usePauseOnBackground } from "@/hooks/use-pause-on-background";
import { useTheme } from "@/lib/theme/use-theme";
import type { ThemeColors } from "@/lib/theme/colors";

type PromoVideo = { title: string; description: string; url: string };

const videos: PromoVideo[] = [
  {
    title: "Waarom op exchange",
    description: "Van Rotex - ontdek waarom een exchange ervaring zo waardevol is.",
    url: "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/videos/promo/Rotary_Promo_Short.mp4",
  },
  {
    title: "5th Avenue Jeugd",
    description:
      "Een inspirerende video over het Rotary Youth Exchange programma en de ervaringen van jongeren.",
    url: "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/videos/promo/5th-avenue-jeugd.mp4",
  },
];

export default function VideoPromo() {
  const theme = useTheme();
  const [selectedVideo, setSelectedVideo] = useState<PromoVideo | null>(null);

  const handlePlay = useCallback((video: PromoVideo) => {
    setSelectedVideo(video);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedVideo(null);
  }, []);

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.background }]}
      edges={["bottom"]}
    >
      <ScrollView
        contentContainerStyle={[styles.container, { backgroundColor: theme.background }]}
      >
        <View style={[styles.headerSection, { backgroundColor: theme.card }]}>
          <View style={[styles.headerIcon, { backgroundColor: theme.primary + "15" }]}>
            <Ionicons name="videocam-outline" size={32} color={theme.primary} />
          </View>
          <Text style={[styles.headerTitle, { color: theme.text }]}>Promo Video&apos;s</Text>
          <Text style={[styles.headerSubtitle, { color: theme.textSecondary }]}>
            Ontdek inspirerende verhalen en ervaringen van Youth Exchange studenten
          </Text>
        </View>

        {videos.map((video) => (
          <VideoRow key={video.url} video={video} theme={theme} onPlay={handlePlay} />
        ))}

        <View style={{ height: 40 }} />
      </ScrollView>

      {selectedVideo ? <VideoModal video={selectedVideo} onClose={handleClose} /> : null}
    </SafeAreaView>
  );
}

interface VideoRowProps {
  video: PromoVideo;
  theme: ThemeColors;
  onPlay: (video: PromoVideo) => void;
}

function VideoRow({ video, theme, onPlay }: VideoRowProps) {
  const handlePress = async () => {
    if (Platform.OS === "ios") {
      try {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      } catch {
        // Haptics may fail on simulators — non-fatal.
      }
    }
    onPlay(video);
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.videoCard,
        {
          backgroundColor: theme.card,
          borderColor: theme.border,
          shadowColor: theme.shadow,
        },
        pressed && styles.videoCardPressed,
      ]}
      onPress={handlePress}
      accessibilityRole="button"
      accessibilityLabel={`Play ${video.title}`}
    >
      <View style={styles.videoPreview}>
        <VideoThumbnail url={video.url} timeSeconds={2} />
        <View style={styles.playButtonOverlay}>
          <View style={styles.playButton}>
            <Ionicons name="play" size={28} color={theme.onPrimary} />
          </View>
        </View>
      </View>
      <View style={[styles.videoInfo, { backgroundColor: theme.card }]}>
        <Text style={[styles.videoTitle, { color: theme.text }]}>{video.title}</Text>
        <Text style={[styles.videoDescription, { color: theme.textSecondary }]}>
          {video.description}
        </Text>
      </View>
    </Pressable>
  );
}

interface VideoModalProps {
  video: PromoVideo;
  onClose: () => void;
}

function VideoModal({ video, onClose }: VideoModalProps) {
  const insets = useSafeAreaInsets();

  const player = useVideoPlayer(video.url, (p) => {
    p.loop = false;
    p.play();
  });

  usePauseOnBackground(player);

  const { status, error } = useEvent(player, "statusChange", {
    status: player.status,
    error: undefined,
  });

  const handleClose = () => {
    try {
      player.pause();
    } catch {
      // Player may already be released — safe to ignore.
    }
    onClose();
  };

  const handleRetry = () => {
    try {
      player.replace(video.url);
      player.play();
    } catch {
      // Best-effort retry.
    }
  };

  return (
    <Modal visible animationType="slide" presentationStyle="fullScreen" onRequestClose={handleClose}>
      <View style={styles.videoModalContainer}>
        <View style={[styles.videoModalHeader, { paddingTop: insets.top + 16 }]}>
          <IconButton
            icon="close"
            onPress={handleClose}
            size="medium"
            variant="default"
            color="#FFF"
          />
        </View>

        <View style={styles.videoContainer}>
          {status === "loading" ? (
            <View style={styles.overlay}>
              <Text style={styles.overlayText}>Video laden...</Text>
            </View>
          ) : null}

          {status === "error" ? (
            <View style={styles.overlay}>
              <Ionicons name="alert-circle-outline" size={48} color="#FFF" />
              <Text style={styles.overlayText}>Video kon niet worden geladen</Text>
              {error?.message ? <Text style={styles.overlayDetail}>{error.message}</Text> : null}
              <Pressable style={styles.retryButton} onPress={handleRetry}>
                <Text style={styles.retryText}>Opnieuw proberen</Text>
              </Pressable>
            </View>
          ) : null}

          <VideoView
            style={styles.video}
            player={player}
            fullscreenOptions={{ enable: true }}
            nativeControls
            contentFit="contain"
          />
        </View>

        <View style={[styles.videoInfoModal, { paddingBottom: insets.bottom + 20 }]}>
          <Text style={styles.videoTitleModal}>{video.title}</Text>
          <Text style={styles.videoSubtitleModal}>{video.description}</Text>
        </View>
      </View>
    </Modal>
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
  videoCard: {
    borderRadius: 16,
    marginBottom: 16,
    overflow: "hidden",
    ...shadowStyle,
    ...(Platform.OS === "android" && {
      borderWidth: StyleSheet.hairlineWidth,
    }),
  },
  videoCardPressed: {
    opacity: Platform.OS === "ios" ? 0.8 : 0.6,
    transform: Platform.OS === "ios" ? [{ scale: 0.98 }] : [],
  },
  videoPreview: {
    position: "relative",
    aspectRatio: 16 / 9,
    backgroundColor: "#000",
  },
  playButtonOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  playButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    alignItems: "center",
    justifyContent: "center",
  },
  videoInfo: {
    padding: 16,
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  videoDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  videoModalContainer: {
    flex: 1,
    backgroundColor: "#000",
  },
  videoModalHeader: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 16,
  },
  videoContainer: {
    flex: 1,
    justifyContent: "center",
  },
  video: {
    width: "100%",
    aspectRatio: 16 / 9,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    zIndex: 1,
  },
  overlayText: {
    fontSize: 16,
    color: "#FFF",
    marginTop: 8,
    textAlign: "center",
  },
  overlayDetail: {
    fontSize: 13,
    color: "#CCC",
    marginTop: 4,
    textAlign: "center",
  },
  retryButton: {
    marginTop: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  retryText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "600",
  },
  videoInfoModal: {
    padding: 20,
  },
  videoTitleModal: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
    color: "#FFF",
  },
  videoSubtitleModal: {
    fontSize: 15,
    lineHeight: 22,
    color: "rgba(255, 255, 255, 0.8)",
  },
});
