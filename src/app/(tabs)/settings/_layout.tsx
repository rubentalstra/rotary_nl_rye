import { Stack } from "expo-router";
import { Platform, Pressable, Share, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function SettingsLayout() {
  const handleShare = async () => {
    try {
      await Share.share({
        message:
          "Check out the Rotary Youth Exchange Netherlands app!\n\nConnect with young global citizens worldwide!",
        title: "Rotary Youth Exchange Netherlands",
        url: Platform.OS === "ios" ? "https://apps.apple.com/app/rotary-yep-nl" : undefined,
      });
    } catch {
      Alert.alert("Share Error", "Unable to share at this time.");
    }
  };

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Settings",
          headerRight: () => (
            <Pressable onPress={handleShare} hitSlop={10} className="p-2">
              <Ionicons
                name={Platform.OS === "ios" ? "share-outline" : "share-social-outline"}
                size={24}
                className="text-primary"
              />
            </Pressable>
          ),
        }}
      />
    </Stack>
  );
}
