import { Stack } from "expo-router";
import { Platform } from "react-native";

export default function EmergencyLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#d32f2f" },
        headerTitleStyle: {
          fontWeight: "600",
          fontSize: Platform.OS === "ios" ? 20 : 22,
          color: "#ffffff",
        },
        headerTintColor: "#ffffff",
        headerShadowVisible: Platform.OS === "ios",
      }}
    >
      {/* Emergency uses an intentional red brand header; large title disabled
          because explicit headerStyle overrides break the iOS large-title text
          color cascade. */}
      <Stack.Screen
        name="index"
        options={{ title: "Emergency", headerLargeTitleEnabled: false }}
      />
    </Stack>
  );
}
