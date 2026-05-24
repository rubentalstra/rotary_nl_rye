import React, { memo, useState, useEffect } from "react";
import { StyleSheet, View, Text, Pressable, Modal, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useVideoPlayer, VideoView, type VideoThumbnail } from "expo-video";
import { useEvent } from "expo";
import { useTheme } from "@/core/theme";
import { IconButton } from "@/shared/components/ui";

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

/**
 * VideoPlayer - An embedded video player with thumbnail preview
 *
 * Generates a thumbnail from the video and displays it as a preview.
 * Opens a full-screen modal for video playback.
 */
export const VideoPlayer = memo(function VideoPlayer({
  videoUrl,
  title,
  description,
  thumbnailTime = 15000,
}: VideoPlayerProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const [isVideoModalVisible, setIsVideoModalVisible] = useState(false);
  const [thumbnailUri, setThumbnailUri] = useState<VideoThumbnail | null>(null);
  const [thumbnailLoading, setThumbnailLoading] = useState(true);

  const player = useVideoPlayer(videoUrl, (p) => {
    p.loop = false;
  });

  const { status } = useEvent(player, "statusChange", {
    status: player.status,
  });

  // Generate video thumbnail
  useEffect(() => {
    const generateThumbnail = async () => {
      try {
        setThumbnailLoading(true);
        const thumbnails = await player.generateThumbnailsAsync([thumbnailTime / 1000]);
        if (thumbnails.length > 0) {
          setThumbnailUri(thumbnails[0]);
        }
      } catch (error) {
        console.warn("Error generating video thumbnail:", error);
      } finally {
        setThumbnailLoading(false);
      }
    };

    generateThumbnail();
  }, [videoUrl, thumbnailTime, player]);

  const handleCloseVideo = () => {
    player.pause();
    setIsVideoModalVisible(false);
  };

  return (
    <>
      <Pressable
        style={[
          styles.videoCard,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
            shadowColor: colors.shadow,
          },
        ]}
        onPress={() => setIsVideoModalVisible(true)}
      >
        <View style={styles.videoPreview}>
          {thumbnailLoading ? (
            <View style={styles.thumbnailLoading}>
              <Ionicons name="image-outline" size={48} color={colors.textTertiary} />
              <Text style={[styles.loadingThumbnailText, { color: colors.textTertiary }]}>
                Loading thumbnail...
              </Text>
            </View>
          ) : thumbnailUri ? (
            <Image
              source={thumbnailUri}
              style={styles.thumbnail}
              contentFit="cover"
              transition={300}
            />
          ) : (
            <View style={[styles.thumbnailFallback, { backgroundColor: colors.primary }]}>
              <Ionicons name="play-circle-outline" size={48} color={colors.card} />
              <Text style={[styles.fallbackText, { color: colors.card }]}>{title}</Text>
            </View>
          )}
          <View style={styles.playButtonOverlay}>
            <View style={[styles.playButton, { backgroundColor: `${colors.primary}F0` }]}>
              <Ionicons name="play" size={32} color={colors.card} />
            </View>
          </View>
        </View>
        <View style={styles.videoInfo}>
          <Text style={[styles.videoTitle, { color: colors.text }]}>{title}</Text>
          <Text style={[styles.videoDescription, { color: colors.textSecondary }]}>
            {description}
          </Text>
        </View>
      </Pressable>

      {/* Video Modal */}
      <Modal
        visible={isVideoModalVisible}
        animationType="slide"
        presentationStyle="fullScreen"
        onRequestClose={handleCloseVideo}
      >
        <View style={[styles.videoModalContainer, { backgroundColor: "#000" }]}>
          <View style={[styles.videoModalHeader, { top: insets.top + 16 }]}>
            <IconButton
              icon="close"
              onPress={handleCloseVideo}
              size="medium"
              variant="default"
              color="#FFF"
            />
          </View>

          <View style={styles.videoContainer}>
            {status === "loading" && (
              <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Loading video...</Text>
              </View>
            )}
            <VideoView
              style={styles.video}
              player={player}
              fullscreenOptions={{ enable: true }}
              allowsPictureInPicture
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
    </>
  );
});

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
  thumbnail: {
    width: "100%",
    height: "100%",
  },
  thumbnailLoading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingThumbnailText: {
    marginTop: 8,
    fontSize: 14,
  },
  thumbnailFallback: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
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

  // Video Modal
  videoModalContainer: {
    flex: 1,
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
  loadingContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  loadingText: {
    fontSize: 16,
    color: "#FFF",
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
