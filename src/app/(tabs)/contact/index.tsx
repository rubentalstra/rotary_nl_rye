import { useState, useCallback } from "react";
import { View, Platform, Pressable, FlatList, Modal, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import * as Haptics from "expo-haptics";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Text } from "@/components/ui/text";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { contactSections } from "@/lib/data/contacts";
import { makePhoneCall, sendEmail, openWhatsApp, openURL } from "@/lib/utils/communications";
import type { Contact } from "@/lib/types";

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
}

const SOCIAL_PLATFORMS = [
  { key: "instagram", icon: "logo-instagram", color: "#E4405F", label: "Instagram" },
  { key: "facebook", icon: "logo-facebook", color: "#1877F2", label: "Facebook" },
  { key: "snapchat", icon: "logo-snapchat", color: "#FFFC00", label: "Snapchat" },
  { key: "linkedin", icon: "logo-linkedin", color: "#0A66C2", label: "LinkedIn" },
  { key: "website", icon: "globe-outline", color: "#6366F1", label: "Website" },
] as const;

function ContactCard({ contact, onPress }: { contact: Contact; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} className="flex-row items-center px-4 py-3 active:opacity-70">
      <Avatar alt={contact.name} className="h-14 w-14 mr-3">
        {contact.imageUrl ? <AvatarImage source={{ uri: contact.imageUrl }} /> : null}
        <AvatarFallback>
          <Text className="text-base font-medium">{getInitials(contact.name)}</Text>
        </AvatarFallback>
      </Avatar>
      <View className="flex-1 mr-2">
        <Text className="text-base font-semibold text-foreground" numberOfLines={1}>
          {contact.name}
        </Text>
        <Text className="text-sm text-muted-foreground" numberOfLines={1}>
          {contact.role}
        </Text>
        {contact.club && (
          <Text className="text-xs text-muted-foreground" numberOfLines={1}>
            {contact.club}
          </Text>
        )}
      </View>
      <View className="flex-row gap-1 mr-2">
        {contact.phone && (
          <View className="w-7 h-7 rounded-full bg-primary/10 items-center justify-center">
            <Ionicons name="call" size={14} className="text-primary" />
          </View>
        )}
        {contact.email && (
          <View className="w-7 h-7 rounded-full bg-primary/10 items-center justify-center">
            <Ionicons name="mail" size={14} className="text-primary" />
          </View>
        )}
      </View>
      <Ionicons name="chevron-forward" size={20} className="text-muted-foreground" />
    </Pressable>
  );
}

function ContactDetailModal({
  contact,
  visible,
  onClose,
}: {
  contact: Contact | null;
  visible: boolean;
  onClose: () => void;
}) {
  if (!contact) return null;

  const hasSocialMedia =
    contact.socialMedia && Object.values(contact.socialMedia).some((v) => v?.trim());

  const validSocials = hasSocialMedia
    ? SOCIAL_PLATFORMS.filter((p) =>
        contact.socialMedia?.[p.key as keyof typeof contact.socialMedia]?.trim(),
      )
    : [];

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle={Platform.OS === "ios" ? "pageSheet" : "fullScreen"}
      onRequestClose={onClose}
    >
      <View style={{ flex: 1, backgroundColor: "white" }}>
        {/* Handle bar */}
        {Platform.OS === "ios" && (
          <View className="items-center py-3">
            <View className="w-9 h-1 rounded-full bg-muted-foreground/30" />
          </View>
        )}

        {/* Header */}
        <View className="flex-row justify-between items-center px-5 pb-3 border-b border-border">
          <Text className="text-lg font-semibold text-foreground">Contact Details</Text>
          <Pressable
            onPress={onClose}
            className="w-8 h-8 rounded-full bg-muted items-center justify-center"
          >
            <Ionicons name="close" size={18} className="text-foreground" />
          </Pressable>
        </View>

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {/* Profile Section */}
          <View className="items-center px-5 py-6">
            <Avatar alt={contact.name} className="h-24 w-24 mb-4">
              {contact.imageUrl ? <AvatarImage source={{ uri: contact.imageUrl }} /> : null}
              <AvatarFallback>
                <Text className="text-3xl font-bold">{getInitials(contact.name)}</Text>
              </AvatarFallback>
            </Avatar>
            <Text className="text-2xl font-bold text-primary text-center">{contact.name}</Text>

            {contact.functions.length > 0 && (
              <View className="flex-row flex-wrap justify-center gap-2 mt-3">
                {contact.functions
                  .filter((f) => f?.trim())
                  .map((fn) => (
                    <Badge key={fn}>
                      <Text className="text-xs">{fn}</Text>
                    </Badge>
                  ))}
              </View>
            )}
          </View>

          {/* Organization */}
          {(contact.club || contact.district) && (
            <View className="mx-5 mb-4">
              <View className="flex-row items-center mb-3">
                <Ionicons name="business-outline" size={18} className="text-primary mr-2" />
                <Text className="text-base font-semibold text-foreground">Organization</Text>
              </View>
              {contact.club && (
                <View className="flex-row items-center bg-muted rounded-xl p-3 mb-2">
                  <View className="w-10 h-10 rounded-full items-center justify-center mr-3" style={{ backgroundColor: "rgba(247, 168, 27, 0.15)" }}>
                    <Image
                      source={require("../../../../assets/logo/rotary-logo-icon.svg")}
                      style={{ width: 22, height: 22 }}
                      contentFit="contain"
                      tintColor="#f7a81b"
                    />
                  </View>
                  <View>
                    <Text className="text-xs text-muted-foreground">Rotary Club</Text>
                    <Text className="text-base font-medium text-foreground">{contact.club}</Text>
                  </View>
                </View>
              )}
              {contact.district && (
                <View className="flex-row items-center bg-muted rounded-xl p-3">
                  <View className="w-10 h-10 rounded-full items-center justify-center mr-3" style={{ backgroundColor: "rgba(23, 69, 143, 0.15)" }}>
                    <Image
                      source={require("../../../../assets/logo/rotary-logo-icon.svg")}
                      style={{ width: 22, height: 22 }}
                      contentFit="contain"
                      tintColor="#17458f"
                    />
                  </View>
                  <View>
                    <Text className="text-xs text-muted-foreground">District</Text>
                    <Text className="text-base font-medium text-foreground">
                      {contact.district}
                    </Text>
                  </View>
                </View>
              )}
            </View>
          )}

          {/* Contact Info */}
          {(contact.email || contact.phone) && (
            <View className="mx-5 mb-4">
              <View className="flex-row items-center mb-3">
                <Ionicons name="call-outline" size={18} className="text-primary mr-2" />
                <Text className="text-base font-semibold text-foreground">Contact</Text>
              </View>
              {contact.email && (
                <Pressable
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    sendEmail(contact.email!, contact.name);
                  }}
                  className="flex-row items-center bg-muted rounded-xl p-3 mb-2 active:opacity-70"
                >
                  <View className="w-10 h-10 rounded-full bg-primary/10 items-center justify-center mr-3">
                    <Ionicons name="mail" size={20} className="text-primary" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-xs text-muted-foreground">Email</Text>
                    <Text className="text-base font-medium text-foreground">{contact.email}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={16} className="text-muted-foreground" />
                </Pressable>
              )}
              {contact.phone && (
                <Pressable
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    makePhoneCall(contact.phone!, contact.name);
                  }}
                  className="flex-row items-center bg-muted rounded-xl p-3 mb-2 active:opacity-70"
                >
                  <View className="w-10 h-10 rounded-full bg-primary/10 items-center justify-center mr-3">
                    <Ionicons name="call" size={20} className="text-primary" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-xs text-muted-foreground">Phone</Text>
                    <Text className="text-base font-medium text-foreground">{contact.phone}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={16} className="text-muted-foreground" />
                </Pressable>
              )}
              {contact.whatsapp && (
                <Pressable
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    openWhatsApp(contact.whatsapp!);
                  }}
                  className="flex-row items-center bg-muted rounded-xl p-3 active:opacity-70"
                >
                  <View className="w-10 h-10 rounded-full bg-[#25D366]/10 items-center justify-center mr-3">
                    <Ionicons name="logo-whatsapp" size={20} color="#25D366" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-xs text-muted-foreground">WhatsApp</Text>
                    <Text className="text-base font-medium text-foreground">
                      {contact.whatsapp}
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward" size={16} className="text-muted-foreground" />
                </Pressable>
              )}
            </View>
          )}

          {/* Bio */}
          {contact.bio?.trim() && (
            <View className="mx-5 mb-4">
              <View className="flex-row items-center mb-3">
                <Ionicons name="person-outline" size={18} className="text-primary mr-2" />
                <Text className="text-base font-semibold text-foreground">Biography</Text>
              </View>
              <Text className="text-base leading-6 text-foreground">{contact.bio}</Text>
            </View>
          )}

          {/* Social Media */}
          {validSocials.length > 0 && (
            <View className="mx-5 mb-4">
              <View className="flex-row items-center mb-3">
                <Ionicons name="share-social-outline" size={18} className="text-primary mr-2" />
                <Text className="text-base font-semibold text-foreground">Social Media</Text>
              </View>
              {validSocials.map((platform) => {
                const url = contact.socialMedia?.[platform.key as keyof typeof contact.socialMedia];
                if (!url) return null;
                return (
                  <Pressable
                    key={platform.key}
                    onPress={() => {
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                      openURL(url);
                    }}
                    className="flex-row items-center bg-muted rounded-xl p-3 mb-2 active:opacity-70"
                  >
                    <View
                      className="w-10 h-10 rounded-full items-center justify-center mr-3"
                      style={{ backgroundColor: `${platform.color}15` }}
                    >
                      <Ionicons name={platform.icon as any} size={20} color={platform.color} />
                    </View>
                    <View className="flex-1">
                      <Text className="text-xs text-muted-foreground">Follow on</Text>
                      <Text className="text-base font-medium text-foreground">
                        {platform.label}
                      </Text>
                    </View>
                    <Ionicons name="open-outline" size={16} className="text-muted-foreground" />
                  </Pressable>
                );
              })}
            </View>
          )}

          <View style={{ height: 40 }} />
        </ScrollView>
      </View>
    </Modal>
  );
}

export default function ContactScreen() {
  const [activeTab, setActiveTab] = useState<string>("mdjc");
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const currentSection = contactSections.find((s) => s.id === activeTab);
  const contacts = currentSection?.contacts ?? [];

  const handleContactPress = useCallback((contact: Contact) => {
    setSelectedContact(contact);
    setModalVisible(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalVisible(false);
    setSelectedContact(null);
  }, []);

  return (
    <View className="flex-1 bg-background">
      {/* Fixed Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <View className="px-4 pt-3 pb-2">
          <TabsList className="flex-row w-full">
            {contactSections.map((section) => (
              <TabsTrigger key={section.id} value={section.id} className="flex-1">
                <Text>{section.title}</Text>
              </TabsTrigger>
            ))}
          </TabsList>
        </View>
      </Tabs>

      {/* Contact List */}
      <FlatList
        data={contacts}
        renderItem={({ item }) => (
          <ContactCard contact={item} onPress={() => handleContactPress(item)} />
        )}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => (
          <View className="ml-[76px] mr-4">
            <Separator />
          </View>
        )}
        contentContainerStyle={{
          paddingTop: 8,
          paddingBottom: Platform.OS === "android" ? 100 : 40,
          flexGrow: 1,
        }}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center py-16 px-8">
            <Text className="text-xl font-semibold text-primary mb-2">
              Geen contacten beschikbaar
            </Text>
            <Text className="text-base text-center text-muted-foreground leading-[22px]">
              Er zijn momenteel geen contacten in deze sectie.
            </Text>
          </View>
        }
      />

      {/* Contact Detail Modal */}
      <ContactDetailModal
        contact={selectedContact}
        visible={modalVisible}
        onClose={handleCloseModal}
      />
    </View>
  );
}
