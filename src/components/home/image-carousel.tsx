import { useEffect, useRef, useState } from "react";
import { StyleSheet, View, type ImageSourcePropType } from "react-native";
import { Image } from "expo-image";
import {
  PagerView,
  type PagerViewOnPageSelectedEvent,
  type PageScrollStateChangedEvent,
  type PagerViewRef,
} from "@expo/ui/community/pager-view";

import { borderRadius, spacing } from "@/lib/theme/spacing";
import { useTheme } from "@/lib/theme/use-theme";

interface ImageCarouselProps {
  images: ImageSourcePropType[];
  /** Auto-advance interval in ms. Set to 0 to disable. */
  autoAdvanceMs?: number;
  height?: number;
}

/**
 * Swipeable image pager with an auto-advance timer and a page-dot indicator.
 * Uses the native pager from `@expo/ui/pager-view` (UIPageViewController on
 * iOS, ViewPager2 on Android) so swipe physics feel platform-native.
 */
export function ImageCarousel({ images, autoAdvanceMs = 4500, height = 220 }: ImageCarouselProps) {
  const theme = useTheme();
  const ref = useRef<PagerViewRef>(null);
  const [page, setPage] = useState(0);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    if (!autoAdvanceMs || images.length < 2 || dragging) return;
    const timeoutId = setTimeout(() => {
      const next = (page + 1) % images.length;
      // `setPageWithoutAnimation` writes the SwiftUI scrollPosition binding
      // straight from the JS thread. The animated `setPage` variant routes
      // through `withAnimation(... 'worklet' ...)` inside @expo/ui, but the
      // babel-preset-expo worklets plugin doesn't transform 'worklet'
      // directives nested in node_modules/@expo/ui/src — calling it crashes
      // with `NotSerializableException`. The native scrollPosition transition
      // still animates the page change on its own.
      ref.current?.setPageWithoutAnimation(next);
    }, autoAdvanceMs);
    return () => clearTimeout(timeoutId);
  }, [page, dragging, autoAdvanceMs, images.length]);

  return (
    <View style={[styles.wrap, { height }]}>
      <PagerView
        ref={ref}
        style={styles.pager}
        initialPage={0}
        onPageSelected={(event: PagerViewOnPageSelectedEvent) =>
          setPage(event.nativeEvent.position)
        }
        onPageScrollStateChanged={(event: PageScrollStateChangedEvent) =>
          setDragging(event.nativeEvent.pageScrollState !== "idle")
        }
      >
        {images.map((source, index) => (
          <View key={index} style={styles.page}>
            <Image source={source} style={StyleSheet.absoluteFill} contentFit="cover" />
          </View>
        ))}
      </PagerView>

      {images.length > 1 ? (
        <View style={styles.dots} pointerEvents="none">
          {images.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                {
                  backgroundColor:
                    index === page ? theme.onPrimary : "rgba(255,255,255,0.5)",
                },
              ]}
            />
          ))}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginHorizontal: spacing.lg,
    borderRadius: borderRadius.lg,
    overflow: "hidden",
  },
  pager: { flex: 1 },
  page: { flex: 1 },
  dots: {
    position: "absolute",
    bottom: spacing.md,
    alignSelf: "center",
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    gap: spacing.xs,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
});
