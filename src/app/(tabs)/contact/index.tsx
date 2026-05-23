import { useCallback, useState } from "react";
import { FlatList, Platform, StyleSheet, Text, View } from "react-native";

import { ContactCard } from "@/components/contacts/contact-card";
import { ContactModal } from "@/components/contacts/contact-modal";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { contactSections } from "@/features/contacts/data";
import type { Contact } from "@/features/contacts/types";
import { useTheme } from "@/lib/theme/use-theme";

export default function ContactScreen() {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const currentSection = contactSections[activeTab];
  const tabValues = contactSections.map((section) => section.title);
  const contacts = currentSection?.contacts ?? [];

  const handleContactPress = useCallback((contact: Contact) => {
    setSelectedContact(contact);
    setModalVisible(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalVisible(false);
    setSelectedContact(null);
  }, []);

  const renderEmpty = useCallback(
    () => (
      <View style={styles.emptyState}>
        <Text style={[styles.emptyStateTitle, { color: theme.primary }]}>
          Geen contacten beschikbaar
        </Text>
        <Text style={[styles.emptyStateMessage, { color: theme.textSecondary }]}>
          Er zijn momenteel geen contacten in deze sectie.
        </Text>
      </View>
    ),
    [theme.primary, theme.textSecondary],
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.segmentedControlContainer}>
        <SegmentedControl
          values={tabValues}
          selectedIndex={activeTab}
          onChange={setActiveTab}
          style={styles.segmentedControl}
        />
      </View>

      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ContactCard contact={item} onPress={() => handleContactPress(item)} />
        )}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
        ListEmptyComponent={renderEmpty}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        style={styles.list}
      />

      <ContactModal contact={selectedContact} visible={modalVisible} onClose={handleCloseModal} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  segmentedControlContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  segmentedControl: {
    height: Platform.OS === "ios" ? 32 : 40,
  },
  list: { flex: 1 },
  contentContainer: {
    paddingTop: 12,
    paddingBottom: Platform.OS === "android" ? 100 : 40,
    paddingHorizontal: 16,
    flexGrow: 1,
  },
  itemSeparator: { height: 12 },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
    paddingHorizontal: 32,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
  },
  emptyStateMessage: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 22,
  },
});
