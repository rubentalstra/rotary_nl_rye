import {
  SegmentedControl,
  type NativeSegmentedControlChangeEvent,
} from "@expo/ui/community/segmented-control";
import { Stack } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { FlatList, Platform, StyleSheet, Text, View } from "react-native";

import { ContactCard } from "@/components/contacts/contact-card";
import { ContactModal } from "@/components/contacts/contact-modal";
import { contactSections } from "@/features/contacts/data";
import type { Contact } from "@/features/contacts/types";
import { useTheme } from "@/lib/theme/use-theme";

const TAB_VALUES = contactSections.map((section) => section.title);

function matchesQuery(contact: Contact, q: string): boolean {
  if (contact.name.toLowerCase().includes(q)) return true;
  if (contact.role.toLowerCase().includes(q)) return true;
  if (contact.functions.some((f) => f.toLowerCase().includes(q))) return true;
  if (contact.club?.toLowerCase().includes(q)) return true;
  if (contact.district?.toLowerCase().includes(q)) return true;
  if (contact.email?.toLowerCase().includes(q)) return true;
  return false;
}

export default function ContactScreen() {
  const theme = useTheme();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [query, setQuery] = useState("");
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const filteredContacts = useMemo(() => {
    const contacts = contactSections[selectedIndex]?.contacts ?? [];
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return contacts;
    return contacts.filter((c) => matchesQuery(c, trimmed));
  }, [selectedIndex, query]);

  const handleContactPress = useCallback((contact: Contact) => {
    setSelectedContact(contact);
    setModalVisible(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalVisible(false);
    setSelectedContact(null);
  }, []);

  const renderHeader = useCallback(
    () => (
      <View style={styles.segmentedContainer}>
        <SegmentedControl
          values={TAB_VALUES}
          selectedIndex={selectedIndex}
          onChange={(event: NativeSegmentedControlChangeEvent) =>
            setSelectedIndex(event.nativeEvent.selectedSegmentIndex)
          }
          style={styles.segmentedControl}
        />
      </View>
    ),
    [selectedIndex],
  );

  const renderEmpty = useCallback(() => {
    const trimmed = query.trim();
    const hasQuery = trimmed.length > 0;
    return (
      <View style={styles.emptyState}>
        <Text style={[styles.emptyTitle, { color: theme.primary }]}>
          {hasQuery ? "Geen resultaten" : "Geen contacten beschikbaar"}
        </Text>
        <Text style={[styles.emptyMessage, { color: theme.textSecondary }]}>
          {hasQuery
            ? `Geen contacten gevonden voor "${trimmed}".`
            : "Er zijn momenteel geen contacten in deze sectie."}
        </Text>
      </View>
    );
  }, [query, theme.primary, theme.textSecondary]);

  return (
    <>
      <Stack.Screen
        options={{
          headerSearchBarOptions: {
            placeholder: "Zoek contacten",
            autoCapitalize: "none",
            inputType: "text",
            onChangeText: (e) => setQuery(e.nativeEvent.text),
            onClose: () => setQuery(""),
          },
        }}
      />

      <FlatList
        style={{ backgroundColor: theme.background }}
        contentContainerStyle={styles.contentContainer}
        data={filteredContacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ContactCard contact={item} onPress={() => handleContactPress(item)} />
        )}
        ListHeaderComponent={renderHeader}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={renderEmpty}
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        keyboardDismissMode="on-drag"
      />

      <ContactModal
        contact={selectedContact}
        visible={modalVisible}
        onClose={handleCloseModal}
      />
    </>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: Platform.OS === "android" ? 100 : 40,
    flexGrow: 1,
  },
  segmentedContainer: {
    paddingVertical: 12,
  },
  segmentedControl: {
    height: Platform.OS === "ios" ? 32 : 40,
  },
  separator: { height: 12 },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
  },
  emptyMessage: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 22,
  },
});
