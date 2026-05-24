/**
 * NetworkImage component
 * Displays a network image with loading state and fallback to initials
 */

import { useState, useMemo, useCallback, memo } from "react";
import {
  Image,
  type ImageProps,
  ActivityIndicator,
  View,
  StyleSheet,
  Pressable,
  Platform,
  Text,
} from "react-native";
import { useTheme } from "@/core/theme";
import { getInitials } from "@/shared/utils";
import { useHaptics } from "@/shared/hooks";
import { ImageModal } from "./ImageModal";

interface NetworkImageProps extends Omit<ImageProps, "source"> {
  /** URL of the image */
  imageUrl?: string;
  /** Name for initials fallback */
  name: string;
  /** Size of the image */
  size?: number;
  /** Whether to show initials when no image */
  showInitials?: boolean;
  /** Whether the image can be expanded */
  expandable?: boolean;
}

function isValidImageUrl(url?: string): boolean {
  return !!(url && !url.includes("Profile_avatar_placeholder_large.png"));
}

export const NetworkImage = memo(function NetworkImage({
  imageUrl,
  name,
  size = 60,
  showInitials = true,
  expandable = true,
  style,
}: NetworkImageProps) {
  const { colors } = useTheme();
  const { lightImpact } = useHaptics();
  const [imageState, setImageState] = useState<"loading" | "loaded" | "error" | "placeholder">(
    isValidImageUrl(imageUrl) ? "loading" : "placeholder",
  );
  const [showExpandedImage, setShowExpandedImage] = useState(false);

  const imageSize = useMemo(
    () => ({
      width: size,
      height: size,
      borderRadius: size / 2,
    }),
    [size],
  );

  const initials = getInitials(name);
  const shouldShowImage = isValidImageUrl(imageUrl);

  const handleImagePress = useCallback(() => {
    if (expandable && imageState === "loaded") {
      lightImpact();
      setShowExpandedImage(true);
    }
  }, [expandable, imageState, lightImpact]);

  const handleImageLoad = useCallback(() => {
    setImageState("loaded");
  }, []);

  const handleImageError = useCallback(() => {
    setImageState("error");
  }, []);

  const closeModal = useCallback(() => {
    lightImpact();
    setShowExpandedImage(false);
  }, [lightImpact]);

  const renderPlaceholder = useCallback(() => {
    const placeholder = (
      <View
        style={[styles.placeholder, imageSize, { backgroundColor: `${colors.primary}20` }, style]}
      >
        {showInitials && (
          <Text
            style={[
              styles.initials,
              {
                fontSize: Math.min(size * 0.26, 26),
                color: colors.primary,
              },
            ]}
          >
            {initials}
          </Text>
        )}
      </View>
    );

    return expandable ? (
      <Pressable
        style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
        onPress={handleImagePress}
      >
        {placeholder}
      </Pressable>
    ) : (
      placeholder
    );
  }, [
    imageSize,
    style,
    showInitials,
    size,
    initials,
    expandable,
    handleImagePress,
    colors.primary,
  ]);

  const renderImage = useCallback(() => {
    if (!shouldShowImage || imageState === "error" || imageState === "placeholder") {
      return renderPlaceholder();
    }

    const imageContent = (
      <View style={[imageSize, style]}>
        <Image
          source={{ uri: imageUrl }}
          style={[imageSize, { position: "absolute" }]}
          onLoad={handleImageLoad}
          onError={handleImageError}
          resizeMode="cover"
        />
        {imageState === "loading" && (
          <View style={[styles.loadingContainer, imageSize]}>
            <ActivityIndicator size="small" color={colors.primary} />
          </View>
        )}
      </View>
    );

    return expandable ? (
      <Pressable
        style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
        onPress={handleImagePress}
      >
        {imageContent}
      </Pressable>
    ) : (
      imageContent
    );
  }, [
    shouldShowImage,
    imageState,
    renderPlaceholder,
    imageSize,
    style,
    imageUrl,
    handleImageLoad,
    handleImageError,
    expandable,
    handleImagePress,
    colors.primary,
  ]);

  return (
    <>
      {renderImage()}
      <ImageModal visible={showExpandedImage} onClose={closeModal} source={imageUrl} name={name} />
    </>
  );
});

const styles = StyleSheet.create({
  placeholder: {
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },
  initials: {
    fontWeight: Platform.OS === "ios" ? "600" : "700",
    textAlign: "center",
  },
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },
});
