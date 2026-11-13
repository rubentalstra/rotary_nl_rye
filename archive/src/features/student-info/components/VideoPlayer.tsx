import { memo, useState } from "react";
import { Modal, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useVideoPlayer, VideoView } from "expo-video";
import { useEvent } from "expo";

import { IconButton } from "@/components/ui/icon-button";
import { VideoThumbnail } from "@/components/media/video-thumbnail";
import { usePauseOnBackground } from "@/hooks/use-pause-on-background";
import { useTheme } from "@/lib/theme/use-theme";

interface VideoPlayerProps {
  /** URL to the video file */
  videoUrl: string;
  /** Video title */
  title: string;
  /** Video description */
  description: string;
  /** Time in ms to capture thumbnail (default: 15000) */
  thumbnailTime?: number;
}

export const VideoPlayer = memo(function VideoPlayer({
  videoUrl,
  title,
  description,
  thumbnailTime = 15000,
}: VideoPlayerProps) {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Pressable
        style={[
          styles.videoCard,
          {
            backgroundColor: theme.card,
            borderColor: theme.border,
            shadowColor: theme.shadow,
          },
        ]}
        onPress={() => setIsOpen(true)}
        accessibilityRole="button"
        accessibilityLabel={`Play ${title}`}
      >
        <View style={styles.videoPreview}>
          <VideoThumbnail url={videoUrl} timeSeconds={thumbnailTime / 1000} />
          <View style={styles.playButtonOverlay}>
            <View style={[styles.playButton, { backgroundColor: `${theme.primary}F0` }]}>
              <Ionicons name="play" size={32} color={theme.onPrimary} />
            </View>
          </View>
        </View>
        <View style={styles.videoInfo}>
          <Text style={[styles.videoTitle, { color: theme.text }]}>{title}</Text>
          <Text style={[styles.videoDescription, { color: theme.textSecondary }]}>
            {description}
          </Text>
        </View>
      </Pressable>

      {isOpen ? (
        <VideoModal
          videoUrl={videoUrl}
          title={title}
          onClose={() => setIsOpen(false)}
        />
      ) : null}
    </>
  );
});

interface VideoModalProps {
  videoUrl: string;
  title: string;
  onClose: () => void;
}

function VideoModal({ videoUrl, title, onClose }: VideoModalProps) {
  const insets = useSafeAreaInsets();

  const player = useVideoPlayer(videoUrl, (p) => {
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
      player.replace(videoUrl);
      player.play();
    } catch {
      // Best-effort retry.
    }
  };

  return (
    <Modal visible animationType="slide" presentationStyle="fullScreen" onRequestClose={handleClose}>
      <View style={styles.videoModalContainer}>
        <View style={[styles.videoModalHeader, { top: insets.top + 16 }]}>
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
              {error?.message ? (
                <Text style={styles.overlayDetail}>{error.message}</Text>
              ) : null}
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

        <View style={styles.videoInfoModal}>
          <Text style={styles.videoTitleModal}>{title}</Text>
          <Text style={styles.videoSubtitleModal}>Rotary Youth Exchange</Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  videoCard: {
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 16,
    borderWidth: Platform.OS === "android" ? StyleSheet.hairlineWidth : 0,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 4,
  },
  videoPreview: {
    height: 200,
    position: "relative",
    overflow: "hidden",
  },
  playButtonOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  playButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  videoInfo: {
    padding: 20,
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
    position: "absolute",
    right: 20,
    zIndex: 10,
  },
  videoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  video: {
    width: "100%",
    height: "70%",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    zIndex: 5,
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
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  videoTitleModal: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 4,
    color: "#FFF",
  },
  videoSubtitleModal: {
    fontSize: 14,
    color: "#CCCCCC",
  },
});
