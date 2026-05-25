import { Image } from "expo-image";
import { useVideoPlayer, VideoView } from "expo-video";
import { useEvent } from "expo";
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { Icon } from "@/components/ui/icon";
import type { NewsItem, NewsTextBlock } from "@/features/news/types";
import { useHaptics } from "@/hooks/use-haptics";
import { usePauseOnBackground } from "@/hooks/use-pause-on-background";
import type { ThemeColors } from "@/lib/theme/colors";
import { spacing } from "@/lib/theme/spacing";
import { useTheme } from "@/lib/theme/use-theme";

interface NewsDetailProps {
  item: NewsItem;
  onOpenPdf?: () => void;
}

export function NewsDetail({ item, onOpenPdf }: NewsDetailProps) {
  const theme = useTheme();
  const { lightImpact } = useHaptics();

  const handleOpenPdf = () => {
    lightImpact();
    onOpenPdf?.();
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      showsVerticalScrollIndicator={false}
      contentInsetAdjustmentBehavior="automatic"
    >
      <View style={styles.heroContainer}>
        <Image
          source={{ uri: item.imageUrl }}
          style={styles.heroImage}
          contentFit="cover"
          transition={300}
        />
      </View>

      <View
        style={[
          styles.contentCard,
          { backgroundColor: theme.card, borderColor: theme.border },
          Platform.OS === "ios" && {
            shadowColor: theme.shadow,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
          },
        ]}
      >
        <Text style={[styles.title, { color: theme.text }]}>{item.title}</Text>
        <Text style={[styles.description, { color: theme.textSecondary }]}>
          {item.description}
        </Text>

        {item.isPdf && item.pdfUrl ? (
          <Pressable
            style={({ pressed }) => [
              styles.pdfButton,
              { backgroundColor: theme.primary },
              pressed && styles.pdfButtonPressed,
            ]}
            onPress={handleOpenPdf}
          >
            <Icon name="document" size={24} tintColor={theme.onPrimary} />
            <View style={styles.pdfButtonContent}>
              <Text style={[styles.pdfButtonTitle, { color: theme.onPrimary }]}>Open PDF</Text>
              <Text style={[styles.pdfButtonSubtitle, { color: theme.onPrimary, opacity: 0.8 }]}>
                Bekijk het volledige document
              </Text>
            </View>
            <Icon name="external" size={20} tintColor={theme.onPrimary} />
          </Pressable>
        ) : null}

        {item.textContent && item.textContent.length > 0 ? (
          <View style={styles.textContent}>
            {item.textContent.map((block, blockIndex) => (
              <TextBlockView key={blockIndex} block={block} theme={theme} />
            ))}
          </View>
        ) : null}
      </View>

      <View style={{ height: spacing.xl }} />
    </ScrollView>
  );
}

interface TextBlockViewProps {
  block: NewsTextBlock;
  theme: ThemeColors;
}

function VideoBlock({ videoUrl, theme }: { videoUrl: string; theme: ThemeColors }) {
  const player = useVideoPlayer(videoUrl, (p) => {
    p.loop = false;
  });

  usePauseOnBackground(player);

  const { status } = useEvent(player, "statusChange", {
    status: player.status,
  });

  if (!videoUrl) return null;

  if (status === "error") {
    return (
      <View style={[styles.videoContainer, styles.videoErrorContainer]}>
        <Text style={[styles.videoErrorText, { color: theme.textSecondary }]}>
          Video niet beschikbaar
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.videoContainer}>
      <VideoView player={player} style={styles.video} contentFit="contain" nativeControls />
    </View>
  );
}

function TextBlockView({ block, theme }: TextBlockViewProps) {
  return (
    <View style={styles.textBlock}>
      {block.heading ? (
        <Text style={[styles.heading, { color: theme.primary }]}>{block.heading}</Text>
      ) : null}

      {block.body?.map((bodyItem, bodyIndex) => (
        <View key={`body-${bodyIndex}`}>
          {bodyItem.paragraph?.map((para, paraIndex) => (
            <Text key={`para-${paraIndex}`} style={[styles.paragraph, { color: theme.text }]}>
              {para}
            </Text>
          ))}

          {bodyItem.imageUrl ? (
            <View style={styles.inlineImageContainer}>
              <Image
                source={{ uri: bodyItem.imageUrl }}
                style={styles.inlineImage}
                contentFit="cover"
              />
            </View>
          ) : null}

          {bodyItem.videoUrl ? <VideoBlock videoUrl={bodyItem.videoUrl} theme={theme} /> : null}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  heroContainer: { width: "100%", height: 220 },
  heroImage: { width: "100%", height: "100%" },
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
  pdfButtonContent: { flex: 1 },
  pdfButtonTitle: { fontSize: 16, fontWeight: "600" },
  pdfButtonSubtitle: { fontSize: 13 },
  textContent: { marginTop: spacing.sm },
  textBlock: { marginBottom: spacing.md },
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
  inlineImage: { width: "100%", height: 200 },
  videoContainer: {
    marginVertical: spacing.md,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#000",
  },
  video: { width: "100%", aspectRatio: 16 / 9 },
  videoErrorContainer: {
    aspectRatio: 16 / 9,
    alignItems: "center",
    justifyContent: "center",
  },
  videoErrorText: {
    fontSize: 14,
  },
});
