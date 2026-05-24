import { Stack } from "expo-router";
import { Platform } from "react-native";
import { useTheme } from "@/core/theme";

export default function ContactLayout() {
  const { colors: theme } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.card,
        },
        headerTitleStyle: {
          color: theme.text,
          fontWeight: "600",
          fontSize: Platform.OS === "ios" ? 17 : 20,
        },
        headerTintColor: theme.primary,
        headerShadowVisible: Platform.OS === "ios",
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Contacts",
        }}
      />
    </Stack>
  );
}
