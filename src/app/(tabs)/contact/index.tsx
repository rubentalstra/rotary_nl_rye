/**
 * Contact screen route
 * Thin wrapper using the contacts feature module
 */

import { useState, useCallback } from "react";
import { Platform, StyleSheet, View, Text, FlatList } from "react-native";
import { useTheme } from "@/core/theme";
import { SegmentedControl } from "@/shared/components/ui";
import { ContactCard, ContactModal, contactSections, type Contact } from "@/features/contacts";

export default function ContactScreen() {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { colors } = useTheme();

  const currentSection = contactSections[activeTab];
  const tabValues = contactSections.map((section) => section.title);
  const contacts = currentSection?.contacts || [];

  const handleContactPress = useCallback((contact: Contact) => {
    setSelectedContact(contact);
    setModalVisible(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalVisible(false);
    setSelectedContact(null);
  }, []);

  const handleSegmentChange = useCallback((index: number) => {
    setActiveTab(index);
  }, []);

  const renderEmptyState = useCallback(
    () => (
      <View style={styles.emptyState}>
        <Text style={[styles.emptyStateTitle, { color: colors.primary }]}>
          Geen contacten beschikbaar
        </Text>
        <Text style={[styles.emptyStateMessage, { color: colors.textSecondary }]}>
          Er zijn momenteel geen contacten in deze sectie.
        </Text>
      </View>
    ),
    [colors],
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.segmentedControlContainer]}>
        <SegmentedControl
          values={tabValues}
          selectedIndex={activeTab}
          onChange={handleSegmentChange}
          style={styles.segmentedControl}
        />
      </View>

      <FlatList
        data={contacts}
        renderItem={({ item }) => (
          <ContactCard contact={item} onPress={() => handleContactPress(item)} />
        )}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
        ListEmptyComponent={renderEmptyState}
        contentContainerStyle={styles.contentContainer}
        style={styles.list}
      />

      <ContactModal contact={selectedContact} visible={modalVisible} onClose={handleCloseModal} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  segmentedControlContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  segmentedControl: {
    height: Platform.OS === "ios" ? 32 : 40,
  },
  list: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 12,
    paddingBottom: Platform.OS === "android" ? 100 : 40,
    paddingHorizontal: 16,
    flexGrow: 1,
  },
  itemSeparator: {
    height: 12,
  },
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
