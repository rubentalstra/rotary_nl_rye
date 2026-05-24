import { Stack } from "expo-router";
import { Platform } from "react-native";

export default function EmergencyLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#d32f2f",
        },
        headerTitleStyle: {
          fontWeight: "600",
          fontSize: Platform.OS === "ios" ? 20 : 22,
          color: "#ffffff",
        },
        headerShadowVisible: Platform.OS === "ios",
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Emergency",
        }}
      />
    </Stack>
  );
}
