import { useState } from "react";
import { StyleSheet, View, Text, ScrollView, Platform, Pressable, Linking } from "react-native";
import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/core/theme";
import { ImageModal } from "@/shared/components/media/ImageModal";
const shadowStyle = {
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.08,
  shadowRadius: 20,
  elevation: 4,
};

export default function CampsToursScreen() {
  const { colors: themeColors } = useTheme();
  const [selectedImage, setSelectedImage] = useState<any>(null);

  const campImages = [
    {
      id: 1,
      source: require("@/assets/pictures/zomerkamp-amazon-tour.jpeg"),
    },
    {
      id: 2,
      source: require("@/assets/pictures/zomerkamp-amazon-tour-2.jpeg"),
    },
  ];

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: themeColors.background }]}
      edges={["bottom"]}
    >
      <ScrollView
        style={[styles.scrollView, { backgroundColor: themeColors.background }]}
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
      >
        <View style={styles.content}>
          {/* Header Section */}
          <View
            style={[
              styles.headerSection,
              {
                backgroundColor: themeColors.card,
                shadowColor: themeColors.shadow,
              },
            ]}
          >
            <View style={[styles.headerIcon, { backgroundColor: themeColors.primary + "15" }]}>
              <Ionicons name="sunny-outline" size={32} color={themeColors.primary} />
            </View>
            <Text style={[styles.headerTitle, { color: themeColors.text }]}>Zomerkampen</Text>
            <Text style={[styles.headerSubtitle, { color: themeColors.textSecondary }]}>
              Zomerkampen en speciale kampen in Europa, Canada, VS en Taiwan
            </Text>
          </View>

          {/* Intro */}
          <View
            style={[
              styles.infoCard,
              {
                backgroundColor: themeColors.card,
                shadowColor: themeColors.shadow,
                borderColor: themeColors.border,
              },
            ]}
          >
            <Text style={[styles.infoText, { color: themeColors.textSecondary }]}>
              In veel landen organiseren Rotary clubs in de periode van juni tot en met september
              zomerkampen. Dit zijn kampen met een thema: cultureel, sportief, water, bergen,
              fietsen etc. De kosten worden vaak laag gehouden om het voor een ieder mogelijk te
              maken. Dit geldt niet voor alle kampen. Deze kampen zijn internationaal, voertaal is
              Engels en vaak is er alleen plaats voor 1 meisje en of 1 jongen uit een land.
            </Text>
          </View>

          {/* Age Card */}
          <View style={styles.section}>
            <View
              style={[
                styles.ageCard,
                {
                  backgroundColor: themeColors.card,
                  shadowColor: themeColors.shadow,
                  borderColor: themeColors.border,
                  borderLeftColor: themeColors.accent,
                },
              ]}
            >
              <View
                style={[styles.ageIconContainer, { backgroundColor: `${themeColors.accent}15` }]}
              >
                <Ionicons name="calendar" size={28} color={themeColors.accent} />
              </View>
              <View style={styles.ageContent}>
                <Text style={[styles.ageTitle, { color: themeColors.accent }]}>15 - 21 jaar</Text>
                <Text style={[styles.ageSubtitle, { color: themeColors.text }]}>Voor wie?</Text>
                <Text style={[styles.ageNote, { color: themeColors.textSecondary }]}>
                  Deelname mogelijk voor jongeren van Rotarians en niet-Rotarians
                </Text>
              </View>
            </View>
          </View>

          {/* Mission Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="flag-outline" size={24} color={themeColors.primary} />
              <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
                Waarom doen we dit?
              </Text>
            </View>

            <View
              style={[
                styles.missionCard,
                {
                  backgroundColor: `${themeColors.secondary}15`,
                  shadowColor: themeColors.shadow,
                  borderLeftColor: themeColors.secondary,
                },
              ]}
            >
              <View style={styles.missionHeader}>
                <Ionicons name="star" size={20} color={themeColors.secondary} />
                <Text style={[styles.missionTitle, { color: themeColors.secondary }]}>
                  Onze Missie
                </Text>
              </View>
              <Text style={[styles.missionText, { color: themeColors.text }]}>
                &ldquo;Jeugd in staat stellen om persoonlijk leiderschap te ontwikkelen&rdquo;
              </Text>
              <Text style={[styles.missionSubtext, { color: themeColors.textSecondary }]}>
                Wij geloven dat leiderschap begint met leiding geven aan jezelf om uiteindelijk
                anderen in staat te stellen zichzelf te ontwikkelen.
              </Text>
            </View>
          </View>

          {/* Countries Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="earth-outline" size={24} color={themeColors.primary} />
              <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
                Met welke landen?
              </Text>
            </View>

            <View
              style={[
                styles.infoCard,
                {
                  backgroundColor: themeColors.card,
                  shadowColor: themeColors.shadow,
                  borderColor: themeColors.border,
                },
              ]}
            >
              <Text style={[styles.infoText, { color: themeColors.textSecondary }]}>
                Europese landen, maar ook Canada, VS en Taiwan.
              </Text>
            </View>
          </View>

          {/* Gallery Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="images-outline" size={24} color={themeColors.primary} />
              <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Camp Pictures</Text>
            </View>

            <View style={styles.galleryContainer}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.galleryScroll}
              >
                {campImages.map((image) => (
                  <Pressable key={image.id} onPress={() => setSelectedImage(image.source)}>
                    <Image source={image.source} style={styles.galleryImage} contentFit="cover" />
                  </Pressable>
                ))}
              </ScrollView>
              <View style={[styles.scrollIndicator, { backgroundColor: themeColors.background }]}>
                <Ionicons name="chevron-forward" size={20} color={themeColors.textTertiary} />
              </View>
            </View>
          </View>

          {/* Registration Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="mail-outline" size={24} color={themeColors.primary} />
              <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Aanmelden</Text>
            </View>

            <View
              style={[
                styles.infoCard,
                {
                  backgroundColor: themeColors.card,
                  shadowColor: themeColors.shadow,
                  borderColor: themeColors.border,
                },
              ]}
            >
              <Text style={[styles.infoText, { color: themeColors.textSecondary }]}>
                Rond december-januari zullen de camps in de app worden gezet. Als je interesse hebt
                stuur dan een mail naar onderstaand emailadres.
              </Text>
            </View>

            <Pressable
              style={({ pressed }) => [
                styles.emailButton,
                { backgroundColor: themeColors.primary },
                pressed && styles.emailButtonPressed,
              ]}
              onPress={() => Linking.openURL("mailto:zomerkamp@rotaryyep.nl")}
              accessibilityRole="button"
              accessibilityLabel="Send email to zomerkamp@rotaryyep.nl"
            >
              <Ionicons name="mail-outline" size={24} color={themeColors.onPrimary} />
              <Text style={[styles.emailButtonText, { color: themeColors.onPrimary }]}>
                zomerkamp@rotaryyep.nl
              </Text>
            </Pressable>
          </View>

          {/* Costs Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="card-outline" size={24} color={themeColors.primary} />
              <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Kosten</Text>
            </View>

            <View
              style={[
                styles.costCard,
                {
                  backgroundColor: themeColors.backgroundElevated,
                  borderLeftColor: themeColors.link,
                },
              ]}
            >
              <Text style={[styles.costTitle, { color: themeColors.link }]}>€121 incl. BTW</Text>
              <Text style={[styles.costSubtitle, { color: themeColors.textSecondary }]}>
                Aanmeldingskosten
              </Text>
            </View>

            <View
              style={[
                styles.infoCard,
                {
                  backgroundColor: themeColors.card,
                  shadowColor: themeColors.shadow,
                  borderColor: themeColors.border,
                },
              ]}
            >
              <Text style={[styles.infoText, { color: themeColors.textSecondary }]}>
                Daarnaast moet je rekening houden met:
              </Text>
              <View style={styles.bulletContainer}>
                <View style={styles.bulletItem}>
                  <View style={[styles.bulletDot, { backgroundColor: themeColors.primary }]} />
                  <Text style={[styles.bulletText, { color: themeColors.textSecondary }]}>
                    Reiskosten naar de kamplocatie
                  </Text>
                </View>
                <View style={styles.bulletItem}>
                  <View style={[styles.bulletDot, { backgroundColor: themeColors.primary }]} />
                  <Text style={[styles.bulletText, { color: themeColors.textSecondary }]}>
                    Zakgeld ter plaatse
                  </Text>
                </View>
                <View style={styles.bulletItem}>
                  <View style={[styles.bulletDot, { backgroundColor: themeColors.primary }]} />
                  <Text style={[styles.bulletText, { color: themeColors.textSecondary }]}>
                    Eventueel klein deelnamebedrag
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <ImageModal
        visible={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        source={selectedImage}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: Platform.OS === "ios" ? 16 : 12,
    paddingBottom: 30,
  },
  // Header Section
  headerSection: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    alignItems: "center",
    ...shadowStyle,
    ...(Platform.OS === "android" && {
      borderWidth: StyleSheet.hairlineWidth,
    }),
  },
  headerIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: Platform.OS === "ios" ? 28 : 24,
    fontWeight: Platform.OS === "ios" ? "700" : "600",
    textAlign: "center",
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 20,
  },

  // Section Styles
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: Platform.OS === "ios" ? 20 : 18,
    fontWeight: Platform.OS === "ios" ? "700" : "600",
    marginLeft: 12,
  },

  // Info Card
  infoCard: {
    borderRadius: Platform.OS === "ios" ? 16 : 12,
    padding: 20,
    marginBottom: 16,
    ...(Platform.OS === "ios"
      ? shadowStyle
      : {
          elevation: 2,
          borderWidth: StyleSheet.hairlineWidth,
        }),
  },
  infoText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
  },

  // Age Card Styles
  ageCard: {
    borderRadius: Platform.OS === "ios" ? 16 : 12,
    padding: 20,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    borderLeftWidth: 4,
    borderLeftColor: "#4CAF50",
    ...(Platform.OS === "ios"
      ? shadowStyle
      : {
          elevation: 2,
          borderWidth: StyleSheet.hairlineWidth,
        }),
  },
  ageIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#E8F5E8",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  ageContent: {
    flex: 1,
  },
  ageTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#4CAF50",
    marginBottom: 2,
  },
  ageSubtitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  ageNote: {
    fontSize: 12,
    fontStyle: "italic",
  },

  // Cost Card
  costCard: {
    backgroundColor: "#E3F2FD",
    borderRadius: Platform.OS === "ios" ? 12 : 8,
    padding: 16,
    marginBottom: 16,
    alignItems: "center",
    borderLeftWidth: 4,
    borderLeftColor: "#2196F3",
  },
  costTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1976D2",
    marginBottom: 4,
  },
  costSubtitle: {
    fontSize: 14,
  },

  // Mission Card
  missionCard: {
    borderRadius: Platform.OS === "ios" ? 16 : 12,
    padding: 20,
    borderLeftWidth: 4,
    ...(Platform.OS === "ios"
      ? {
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        }
      : {
          elevation: 1,
        }),
  },
  missionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  missionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#F57C00",
    marginLeft: 8,
  },
  missionText: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    fontStyle: "italic",
  },
  missionSubtext: {
    fontSize: 14,
    lineHeight: 20,
  },

  // Email Button
  emailButton: {
    borderRadius: Platform.OS === "ios" ? 25 : 8,
    paddingVertical: Platform.OS === "ios" ? 16 : 14,
    paddingHorizontal: 32,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    ...(Platform.OS === "ios"
      ? {
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
        }
      : {
          elevation: 3,
        }),
  },
  emailButtonPressed: {
    opacity: Platform.OS === "ios" ? 0.8 : 0.6,
    transform: Platform.OS === "ios" ? [{ scale: 0.98 }] : [],
  },
  emailButtonText: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },

  // Bullet Styles
  bulletContainer: {
    marginTop: 12,
  },
  bulletItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  bulletDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#FF6B35",
    marginTop: 8,
    marginRight: 12,
  },
  bulletText: {
    fontSize: 16,
    lineHeight: 22,
    color: "#333",
    flex: 1,
  },
  // Gallery Styles
  galleryContainer: {
    position: "relative",
    marginTop: 10,
  },
  galleryScroll: {
    paddingRight: 40,
  },
  galleryImage: {
    width: 200,
    height: 150,
    marginRight: 12,
    borderRadius: 8,
  },
  scrollIndicator: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.8,
  },
});
