/**
 * News detail component for displaying full news content
 */

import { ScrollView, View, Text, Pressable, StyleSheet, Platform } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { useVideoPlayer, VideoView } from "expo-video";
import { useTheme } from "@/core/theme";
import { spacing } from "@/core/theme/spacing";
import { useHaptics } from "@/shared/hooks";
import type { NewsItem, NewsTextBlock } from "../types";

interface NewsDetailProps {
  item: NewsItem;
  onOpenPdf?: () => void;
}

export function NewsDetail({ item, onOpenPdf }: NewsDetailProps) {
  const { colors } = useTheme();
  const { lightImpact } = useHaptics();

  const handleOpenPdf = async () => {
    lightImpact();
    onOpenPdf?.();
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
      contentInsetAdjustmentBehavior="automatic"
    >
      {/* Hero Image */}
      <View style={styles.heroContainer}>
        <Image
          source={{ uri: item.imageUrl }}
          style={styles.heroImage}
          contentFit="cover"
          transition={300}
        />
      </View>

      {/* Main Content Card */}
      <View
        style={[
          styles.contentCard,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
          },
          Platform.OS === "ios" && {
            shadowColor: colors.shadow,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
          },
        ]}
      >
        {/* Title & Description */}
        <Text style={[styles.title, { color: colors.text }]}>{item.title}</Text>
        <Text style={[styles.description, { color: colors.textSecondary }]}>
          {item.description}
        </Text>

        {/* PDF Button - kept for backwards compatibility (deep links) */}
        {item.isPdf && item.pdfUrl && (
          <Pressable
            style={({ pressed }) => [
              styles.pdfButton,
              { backgroundColor: colors.primary },
              pressed && styles.pdfButtonPressed,
            ]}
            onPress={handleOpenPdf}
          >
            <Ionicons name="document-text" size={24} color={colors.onPrimary} />
            <View style={styles.pdfButtonContent}>
              <Text style={[styles.pdfButtonTitle, { color: colors.onPrimary }]}>Open PDF</Text>
              <Text style={[styles.pdfButtonSubtitle, { color: colors.onPrimary, opacity: 0.8 }]}>
                Bekijk het volledige document
              </Text>
            </View>
            <Ionicons name="open-outline" size={20} color={colors.onPrimary} />
          </Pressable>
        )}

        {/* Text Content - all in one flowing section */}
        {item.textContent && item.textContent.length > 0 && (
          <View style={styles.textContent}>
            {item.textContent.map((block, blockIndex) => (
              <TextBlockView key={blockIndex} block={block} colors={colors} />
            ))}
          </View>
        )}
      </View>

      {/* Bottom spacing */}
      <View style={{ height: spacing.xl }} />
    </ScrollView>
  );
}

interface TextBlockViewProps {
  block: NewsTextBlock;
  colors: ReturnType<typeof useTheme>["colors"];
}

interface VideoBlockProps {
  videoUrl: string;
}

function VideoBlock({ videoUrl }: VideoBlockProps) {
  const player = useVideoPlayer(videoUrl, (p) => {
    p.loop = false;
  });

  return (
    <View style={styles.videoContainer}>
      <VideoView player={player} style={styles.video} contentFit="contain" nativeControls />
    </View>
  );
}

function TextBlockView({ block, colors }: TextBlockViewProps) {
  return (
    <View style={styles.textBlock}>
      {/* Section Heading */}
      {block.heading && (
        <Text style={[styles.heading, { color: colors.primary }]}>{block.heading}</Text>
      )}

      {/* Body Content */}
      {block.body &&
        block.body.map((bodyItem, bodyIndex) => (
          <View key={`body-${bodyIndex}`}>
            {/* Paragraphs */}
            {bodyItem.paragraph &&
              bodyItem.paragraph.map((para, paraIndex) => (
                <Text key={`para-${paraIndex}`} style={[styles.paragraph, { color: colors.text }]}>
                  {para}
                </Text>
              ))}

            {/* Inline Image */}
            {bodyItem.imageUrl && (
              <View style={styles.inlineImageContainer}>
                <Image
                  source={{ uri: bodyItem.imageUrl }}
                  style={styles.inlineImage}
                  contentFit="cover"
                />
              </View>
            )}

            {/* Video */}
            {bodyItem.videoUrl && <VideoBlock videoUrl={bodyItem.videoUrl} />}
          </View>
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heroContainer: {
    width: "100%",
    height: 220,
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  contentCard: {
    marginHorizontal: spacing.md,
    marginTop: -spacing.lg,
    borderRadius: 12,
    padding: spacing.lg,
    ...(Platform.OS === "android" && {
      elevation: 3,
      borderWidth: StyleSheet.hairlineWidth,
    }),
  },
  title: {
    fontSize: Platform.OS === "ios" ? 24 : 22,
    fontWeight: Platform.OS === "ios" ? "700" : "600",
    marginBottom: spacing.sm,
    lineHeight: 32,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: spacing.md,
  },
  pdfButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.md,
    borderRadius: 12,
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  pdfButtonPressed: {
    opacity: 0.9,
    transform: Platform.OS === "ios" ? [{ scale: 0.98 }] : [],
  },
  pdfButtonContent: {
    flex: 1,
  },
  pdfButtonTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  pdfButtonSubtitle: {
    fontSize: 13,
  },
  textContent: {
    marginTop: spacing.sm,
  },
  textBlock: {
    marginBottom: spacing.md,
  },
  heading: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: spacing.sm,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 26,
    marginBottom: spacing.md,
  },
  inlineImageContainer: {
    marginVertical: spacing.md,
    borderRadius: 8,
    overflow: "hidden",
  },
  inlineImage: {
    width: "100%",
    height: 200,
  },
  videoContainer: {
    marginVertical: spacing.md,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#000",
  },
  video: {
    width: "100%",
    aspectRatio: 16 / 9,
  },
});
