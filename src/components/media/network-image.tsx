import { memo, useCallback, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import { ImageModal } from "@/components/media/image-modal";
import { useHaptics } from "@/hooks/use-haptics";
import { useTheme } from "@/lib/theme/use-theme";
import { getInitials } from "@/utils/communications";

interface NetworkImageProps {
  /** Remote image URL. Falsy / placeholder URLs fall through to initials. */
  imageUrl?: string;
  /** Used both for initials fallback and the expanded modal's alt text. */
  name: string;
  /** Avatar diameter in points. */
  size?: number;
  showInitials?: boolean;
  /** When true, tapping opens a full-screen ImageModal. */
  expandable?: boolean;
  style?: StyleProp<ViewStyle>;
}

function isValidImageUrl(url?: string): boolean {
  return !!(url && !url.includes("Profile_avatar_placeholder_large.png"));
}

type ImageState = "loading" | "loaded" | "error" | "placeholder";

export const NetworkImage = memo(function NetworkImage({
  imageUrl,
  name,
  size = 60,
  showInitials = true,
  expandable = true,
  style,
}: NetworkImageProps) {
  const theme = useTheme();
  const { lightImpact } = useHaptics();
  const [imageState, setImageState] = useState<ImageState>(
    isValidImageUrl(imageUrl) ? "loading" : "placeholder",
  );
  const [showExpandedImage, setShowExpandedImage] = useState(false);

  const imageSize = useMemo(
    () => ({ width: size, height: size, borderRadius: size / 2 }),
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

  const closeModal = useCallback(() => {
    lightImpact();
    setShowExpandedImage(false);
  }, [lightImpact]);

  const handleImageLoad = useCallback(() => setImageState("loaded"), []);
  const handleImageError = useCallback(() => setImageState("error"), []);

  const renderPlaceholder = () => {
    const placeholder = (
      <View
        style={[styles.placeholder, imageSize, { backgroundColor: `${theme.primary}20` }, style]}
      >
        {showInitials ? (
          <Text
            style={[
              styles.initials,
              { fontSize: Math.min(size * 0.26, 26), color: theme.primary },
            ]}
          >
            {initials}
          </Text>
        ) : null}
      </View>
    );
    return expandable ? (
      <Pressable
        style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}
        onPress={handleImagePress}
      >
        {placeholder}
      </Pressable>
    ) : (
      placeholder
    );
  };

  const renderImage = () => {
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
        {imageState === "loading" ? (
          <View style={[styles.loadingContainer, imageSize]}>
            <ActivityIndicator size="small" color={theme.primary} />
          </View>
        ) : null}
      </View>
    );
    return expandable ? (
      <Pressable
        style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}
        onPress={handleImagePress}
      >
        {imageContent}
      </Pressable>
    ) : (
      imageContent
    );
  };

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
