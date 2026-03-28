import { Stack } from "expo-router";

export default function EmergencyLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#d32f2f" },
        headerTitleStyle: { fontWeight: "600", color: "#ffffff" },
        headerTintColor: "#ffffff",
      }}
    >
      <Stack.Screen name="index" options={{ title: "Emergency" }} />
    </Stack>
  );
}
