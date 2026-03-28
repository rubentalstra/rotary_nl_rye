import { useState, useEffect, useRef, useCallback } from "react";
import { View, Animated, Dimensions, type LayoutChangeEvent } from "react-native";
import { Image } from "expo-image";
import { cn } from "@/lib/utils";

type ImageSource = number | { uri: string };

interface ImageCarouselProps {
  images: ImageSource[];
  autoPlayInterval?: number;
}

const { width: screenWidth } = Dimensions.get("window");

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
            setTimeout(() => resetToFirstSlide(), 500);
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

  if (images.length === 0) return null;

  return (
    <View
      className="relative mx-4 mb-4 h-[200px] overflow-hidden rounded-xl shadow-sm"
      onLayout={handleLayoutChange}
    >
      {images.length === 1 ? (
        <Image source={images[0]} style={{ width: "100%", height: "100%" }} contentFit="cover" />
      ) : (
        <>
          <Animated.View
            style={{
              flexDirection: "row",
              height: "100%",
              width: (images.length + 1) * containerWidth,
              transform: [{ translateX: slideAnim }],
            }}
          >
            {images.map((image, idx) => (
              <View
                key={typeof image === "number" ? `slide-${image}` : `slide-${image.uri}-${idx}`}
                style={{ width: containerWidth, height: "100%" }}
              >
                <Image
                  source={image}
                  style={{ width: "100%", height: "100%" }}
                  contentFit="cover"
                />
              </View>
            ))}
            <View key="duplicate" style={{ width: containerWidth, height: "100%" }}>
              <Image
                source={images[0]}
                style={{ width: "100%", height: "100%" }}
                contentFit="cover"
              />
            </View>
          </Animated.View>

          <View className="absolute bottom-3 left-0 right-0 flex-row items-center justify-center">
            {images.map((image, idx) => (
              <View
                key={typeof image === "number" ? `dot-${image}` : `dot-${image.uri}-${idx}`}
                className={cn(
                  "mx-1 rounded-full",
                  idx === currentImageIndex || (currentImageIndex === images.length && idx === 0)
                    ? "h-2.5 w-2.5 bg-white/90"
                    : "h-2 w-2 bg-white/50",
                )}
              />
            ))}
          </View>
        </>
      )}
    </View>
  );
}
