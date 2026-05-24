/**
 * ImageModal component
 * Full-screen image preview with platform-native close button
 */

import { Modal, View, StyleSheet, Pressable, Dimensions, Platform, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { useTheme } from "@/core/theme";
import { getInitials } from "@/shared/utils";
import { IconButton } from "@/shared/components/ui";

const { width: screenWidth } = Dimensions.get("window");

interface ImageModalProps {
  /** Whether the modal is visible */
  visible: boolean;
  /** Callback when closing the modal */
  onClose: () => void;
  /** Image source (URL string or require) */
  source: string | number | undefined;
  /** Name for initials fallback */
  name?: string;
}

export function ImageModal({ visible, onClose, source, name }: ImageModalProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const shouldShowImage =
    source &&
    (typeof source === "string" ? !source.includes("Profile_avatar_placeholder_large.png") : true);
  const initials = name ? getInitials(name) : "";

  return (
    <Modal
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
      presentationStyle="fullScreen"
      statusBarTranslucent
    >
      <View style={styles.modalContainer}>
        {/* Image content */}
        <Pressable style={styles.modalPressable} onPress={onClose}>
          {shouldShowImage ? (
            <Image
              source={typeof source === "string" ? { uri: source } : source}
              style={styles.fullImage}
              contentFit="contain"
            />
          ) : (
            <View style={styles.placeholderContainer}>
              <View
                style={[styles.expandedPlaceholder, { backgroundColor: `${colors.primary}20` }]}
              >
                <Text style={[styles.expandedInitials, { color: colors.primary }]}>{initials}</Text>
              </View>
            </View>
          )}
        </Pressable>

        {/* Close button */}
        <View style={[styles.header, { paddingTop: insets.top + 8 }]} pointerEvents="box-none">
          <IconButton icon="close" onPress={onClose} size="medium" variant="default" />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "black",
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 16,
  },
  modalPressable: {
    flex: 1,
  },
  fullImage: {
    flex: 1,
    width: "100%",
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  expandedPlaceholder: {
    width: screenWidth * 0.6,
    height: screenWidth * 0.6,
    borderRadius: (screenWidth * 0.6) / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  expandedInitials: {
    fontSize: screenWidth * 0.15,
    fontWeight: Platform.OS === "ios" ? "700" : "800",
    textAlign: "center",
  },
});
