/**
 * Image carousel component for home screen
 */

import { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
  Platform,
  type LayoutChangeEvent,
} from "react-native";
import { Image } from "expo-image";

type ImageSource = number | { uri: string };

interface ImageCarouselProps {
  images: ImageSource[];
  autoPlayInterval?: number;
}

const { width: screenWidth } = Dimensions.get("window");

const shadowStyle = Platform.select({
  ios: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
  },
  android: {
    elevation: 4,
  },
  default: {},
});

export function ImageCarousel({ images, autoPlayInterval = 3000 }: ImageCarouselProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(screenWidth - 32);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const animateToIndex = useCallback(
    (index: number, duration: number = 500) => {
      Animated.timing(slideAnim, {
        toValue: -index * containerWidth,
        duration,
        useNativeDriver: true,
      }).start();
    },
    [containerWidth, slideAnim],
  );

  const resetToFirstSlide = useCallback(() => {
    slideAnim.setValue(0);
    setCurrentImageIndex(0);
  }, [slideAnim]);

  const handleLayoutChange = useCallback(
    (event: LayoutChangeEvent) => {
      const { width } = event.nativeEvent.layout;
      if (width !== containerWidth) {
        setContainerWidth(width);
      }
    },
    [containerWidth],
  );

  useEffect(() => {
    if (images.length > 1 && containerWidth > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentImageIndex((prevIndex) => {
          const nextIndex = prevIndex + 1;

          if (nextIndex >= images.length) {
            animateToIndex(images.length, 500);
            setTimeout(() => {
              resetToFirstSlide();
            }, 500);
            return images.length;
          }

          return nextIndex;
        });
      }, autoPlayInterval);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [images.length, containerWidth, animateToIndex, resetToFirstSlide, autoPlayInterval]);

  useEffect(() => {
    if (containerWidth > 0 && currentImageIndex < images.length) {
      animateToIndex(currentImageIndex);
    }
  }, [currentImageIndex, containerWidth, animateToIndex, images.length]);

  if (images.length === 0) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={handleLayoutChange}>
      {images.length === 1 ? (
        <Image source={images[0]} style={styles.image} contentFit="cover" />
      ) : (
        <>
          <Animated.View
            style={[
              styles.slideContainer,
              {
                width: (images.length + 1) * containerWidth,
                transform: [{ translateX: slideAnim }],
              },
            ]}
          >
            {images.map((image, idx) => (
              <View
                key={typeof image === "number" ? `slide-${image}` : `slide-${image.uri}-${idx}`}
                style={[styles.slideItem, { width: containerWidth }]}
              >
                <Image source={image} style={styles.image} contentFit="cover" />
              </View>
            ))}
            <View key="duplicate" style={[styles.slideItem, { width: containerWidth }]}>
              <Image source={images[0]} style={styles.image} contentFit="cover" />
            </View>
          </Animated.View>

          {images.length > 1 && (
            <View style={styles.dotIndicators}>
              {images.map((image, idx) => (
                <View
                  key={typeof image === "number" ? `dot-${image}` : `dot-${image.uri}-${idx}`}
                  style={[
                    styles.dot,
                    (idx === currentImageIndex ||
                      (currentImageIndex === images.length && idx === 0)) &&
                      styles.activeDot,
                  ]}
                />
              ))}
            </View>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 200,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    overflow: "hidden",
    position: "relative",
    ...shadowStyle,
  },
  slideContainer: {
    flexDirection: "row",
    height: "100%",
  },
  slideItem: {
    height: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  dotIndicators: {
    position: "absolute",
    bottom: 12,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});
