import { Image } from "expo-image";
import {
  Dimensions,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { IconButton } from "@/components/ui/icon-button";
import { useTheme } from "@/lib/theme/use-theme";
import { getInitials } from "@/utils/communications";

const { width: screenWidth } = Dimensions.get("window");

interface ImageModalProps {
  visible: boolean;
  onClose: () => void;
  source: string | number | undefined;
  name?: string;
}

/**
 * Full-screen image preview. Tap anywhere on the image to dismiss; a glass
 * IconButton in the top-right is the explicit close affordance.
 */
export function ImageModal({ visible, onClose, source, name }: ImageModalProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const shouldShowImage =
    source &&
    (typeof source === "string"
      ? !source.includes("Profile_avatar_placeholder_large.png")
      : true);
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
                style={[styles.expandedPlaceholder, { backgroundColor: `${theme.primary}20` }]}
              >
                <Text style={[styles.expandedInitials, { color: theme.primary }]}>{initials}</Text>
              </View>
            </View>
          )}
        </Pressable>

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
  modalPressable: { flex: 1 },
  fullImage: { flex: 1, width: "100%" },
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
