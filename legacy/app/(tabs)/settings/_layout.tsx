import { Stack } from "expo-router";
import { Platform, Pressable, Share, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/core/theme";

export default function SettingsLayout() {
  const { colors: theme } = useTheme();

  const handleShare = async () => {
    try {
      await Share.share({
        message:
          "Check out the Rotary Youth Exchange Netherlands app! 📱✈️\n\nConnect with young global citizens worldwide!",
        title: "Rotary Youth Exchange Netherlands",
        url: Platform.OS === "ios" ? "https://apps.apple.com/app/rotary-yep-nl" : undefined,
      });
    } catch (error) {
      console.error("Error sharing:", error);
      Alert.alert("Share Error", "Unable to share at this time. Please try again later.");
    }
  };

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.card,
        },
        headerTitleStyle: {
          color: theme.text,
          fontWeight: "600",
          fontSize: Platform.OS === "ios" ? 20 : 22,
        },
        headerTintColor: theme.primary,
        headerShadowVisible: Platform.OS === "ios",
        headerBackTitle: Platform.OS === "ios" ? "Terug" : "",
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Settings",
          headerRight: () => (
            <Pressable
              style={{
                padding: 8,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={handleShare}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons
                name={Platform.OS === "ios" ? "share-outline" : "share-social-outline"}
                size={24}
                color={theme.primary}
              />
            </Pressable>
          ),
        }}
      />
    </Stack>
  );
}
