import { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, Text, ScrollView, Pressable, Modal, Platform } from "react-native";
import { Image } from "expo-image";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useVideoPlayer, VideoView, type VideoThumbnail } from "expo-video";
import { useEvent } from "expo";
import * as Haptics from "expo-haptics";
import { useTheme } from "@/core/theme";
import { IconButton } from "@/shared/components/ui";
type Video = { title: string; description: string; url: string };

function VideoRow({
  video,
  index: _index,
  onPlayRequest,
  themeColors,
}: {
  video: Video;
  index: number;
  onPlayRequest: (video: Video) => void;
  themeColors: any;
}) {
  const [thumbnailUri, setThumbnailUri] = useState<VideoThumbnail | null>(null);
  const [thumbnailLoading, setThumbnailLoading] = useState(true);

  const thumbnailPlayer = useVideoPlayer(video.url);

  // Generate video thumbnail
  useEffect(() => {
    const generateThumbnail = async () => {
      try {
        setThumbnailLoading(true);
        const thumbnails = await thumbnailPlayer.generateThumbnailsAsync([2]);
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
  }, [video.url, thumbnailPlayer]);

  const onPress = async () => {
    try {
      if (Platform.OS === "ios") await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      onPlayRequest(video);
    } catch {
      onPlayRequest(video);
    }
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.videoCard,
        {
          backgroundColor: themeColors.card,
          borderColor: themeColors.border,
          shadowColor: themeColors.shadow,
        },
        pressed && styles.videoCardPressed,
      ]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Play ${video.title}`}
    >
      <View style={styles.videoPreview}>
        {thumbnailLoading ? (
          <View
            style={[styles.thumbnailLoading, { backgroundColor: themeColors.backgroundElevated }]}
          >
            <Ionicons name="image-outline" size={48} color={themeColors.textTertiary} />
            <Text style={[styles.loadingThumbnailText, { color: themeColors.textSecondary }]}>
              Thumbnail laden...
            </Text>
          </View>
        ) : thumbnailUri ? (
          <Image source={thumbnailUri} style={styles.thumbnail} contentFit="cover" />
        ) : (
          <View style={[styles.thumbnailFallback, { backgroundColor: themeColors.primary }]}>
            <Ionicons name="videocam-outline" size={48} color={themeColors.onPrimary} />
          </View>
        )}
        <View style={styles.playButtonOverlay}>
          <View style={styles.playButton}>
            <Ionicons name="play" size={28} color={themeColors.onPrimary} />
          </View>
        </View>
      </View>
      <View style={[styles.videoInfo, { backgroundColor: themeColors.card }]}>
        <Text style={[styles.videoTitle, { color: themeColors.text }]}>{video.title}</Text>
        <Text style={[styles.videoDescription, { color: themeColors.textSecondary }]}>
          {video.description}
        </Text>
      </View>
    </Pressable>
  );
}

const videos: Video[] = [
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
  const { colors: themeColors } = useTheme();
  const insets = useSafeAreaInsets();

  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isVideoModalVisible, setIsVideoModalVisible] = useState(false);

  const player = useVideoPlayer(selectedVideo?.url || "", (player) => {
    player.loop = false;
  });

  const { status } = useEvent(player, "statusChange", {
    status: player.status,
  });

  const onPlayRequest = useCallback((video: Video) => {
    setSelectedVideo(video);
    setIsVideoModalVisible(true);
  }, []);

  const handleCloseVideo = useCallback(() => {
    player.pause();
    setIsVideoModalVisible(false);
  }, [player]);

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: themeColors.background }]}
      edges={["bottom"]}
    >
      <ScrollView
        contentContainerStyle={[styles.container, { backgroundColor: themeColors.background }]}
      >
        {/* Header Section */}
        <View style={[styles.headerSection, { backgroundColor: themeColors.card }]}>
          <View style={[styles.headerIcon, { backgroundColor: themeColors.primary + "15" }]}>
            <Ionicons name="videocam-outline" size={32} color={themeColors.primary} />
          </View>
          <Text style={[styles.headerTitle, { color: themeColors.text }]}>Promo Video&apos;s</Text>
          <Text style={[styles.headerSubtitle, { color: themeColors.textSecondary }]}>
            Ontdek inspirerende verhalen en ervaringen van Youth Exchange studenten
          </Text>
        </View>

        {/* Video List */}
        {videos.map((video, index) => (
          <VideoRow
            key={video.url}
            index={index}
            video={video}
            onPlayRequest={onPlayRequest}
            themeColors={themeColors}
          />
        ))}

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Video Modal */}
      <Modal
        visible={isVideoModalVisible}
        animationType="slide"
        presentationStyle="fullScreen"
        onRequestClose={handleCloseVideo}
      >
        <View style={styles.videoModalContainer}>
          <View style={[styles.videoModalHeader, { paddingTop: insets.top + 16 }]}>
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
                <Text style={[styles.loadingText, { color: "white" }]}>Video laden...</Text>
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

          <View style={[styles.videoInfoModal, { paddingBottom: insets.bottom + 20 }]}>
            <Text style={[styles.videoTitleModal, { color: "white" }]}>{selectedVideo?.title}</Text>
            <Text style={styles.videoSubtitleModal}>{selectedVideo?.description}</Text>
          </View>
        </View>
      </Modal>
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
  // Video Card Styles
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
  thumbnail: {
    width: "100%",
    height: "100%",
  },
  thumbnailLoading: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingThumbnailText: {
    fontSize: 13,
    marginTop: 8,
  },
  thumbnailFallback: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
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
  // Video Modal Styles
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
  loadingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  loadingText: {
    fontSize: 16,
  },
  videoInfoModal: {
    padding: 20,
  },
  videoTitleModal: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
  },
  videoSubtitleModal: {
    fontSize: 15,
    lineHeight: 22,
    color: "rgba(255, 255, 255, 0.8)",
  },
});
