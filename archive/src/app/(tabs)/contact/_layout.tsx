import { Stack } from "expo-router";

export default function ContactLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "Contacts", headerLargeTitleEnabled: true }}
      />
    </Stack>
  );
}
