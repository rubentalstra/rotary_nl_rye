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

export default function LongTermExchangeScreen() {
  const { colors: themeColors } = useTheme();
  const [selectedImage, setSelectedImage] = useState<any>(null);

  const exchangeImages = [
    { id: 1, source: require("@/assets/pictures/outbound.jpeg") },
    { id: 2, source: require("@/assets/pictures/outbound-arrive.jpeg") },
    { id: 3, source: require("@/assets/pictures/outbound-nilla.jpeg") },
    { id: 4, source: require("@/assets/pictures/outbound-simon.jpeg") },
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
            <View style={[styles.headerIcon, { backgroundColor: `${themeColors.primary}15` }]}>
              <Ionicons name="school-outline" size={32} color={themeColors.primary} />
            </View>
            <Text style={[styles.headerTitle, { color: themeColors.text }]}>
              Long Term Exchange
            </Text>
            <Text style={[styles.headerSubtitle, { color: themeColors.textSecondary }]}>
              Een jaar High School in het buitenland via Rotary International
            </Text>
          </View>

          {/* What is it Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="help-circle-outline" size={24} color={themeColors.primary} />
              <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
                Wat houdt dat in?
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
                Dit programma van Rotary International is bestemd voor alle hierin geïnteresseerde
                scholieren uit het Voortgezet Onderwijs. Het is de bedoeling dat je in het
                buitenland een jaar High School volgt.
              </Text>
            </View>
          </View>

          {/* Age Section */}
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
                <Text style={[styles.ageTitle, { color: themeColors.accent }]}>
                  15,5 - 18,5 jaar
                </Text>
                <Text style={[styles.ageSubtitle, { color: themeColors.text }]}>
                  Indicatieve leeftijdsgrenzen
                </Text>
                <Text style={[styles.ageNote, { color: themeColors.textSecondary }]}>
                  Selectiedag in oktober + selectieweekend in november
                </Text>
              </View>
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
                styles.countryCard,
                {
                  backgroundColor: themeColors.card,
                  shadowColor: themeColors.shadow,
                  borderColor: themeColors.border,
                },
              ]}
            >
              <View style={styles.hemisphereSection}>
                <View style={styles.hemisphereHeader}>
                  <Text style={[styles.hemisphereTitle, { color: themeColors.text }]}>
                    Noordelijk halfrond
                  </Text>
                </View>
                <Text style={[styles.countryText, { color: themeColors.textSecondary }]}>
                  USA, Canada, Mexico, India, Indonesië, Japan, Thailand, Taiwan en diverse Europese
                  landen
                </Text>
              </View>

              <View style={styles.hemisphereSection}>
                <View style={styles.hemisphereHeader}>
                  <Text style={[styles.hemisphereTitle, { color: themeColors.text }]}>
                    Zuidelijk halfrond
                  </Text>
                </View>
                <Text style={[styles.countryText, { color: themeColors.textSecondary }]}>
                  Brazilië, Chili, Argentinië, Ecuador, Peru
                </Text>
              </View>
            </View>
          </View>

          {/* Gallery Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="images-outline" size={24} color={themeColors.primary} />
              <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
                Exchange Pictures
              </Text>
            </View>

            <View style={styles.galleryContainer}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.galleryScroll}
              >
                {exchangeImages.map((image) => (
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
                  backgroundColor: `${themeColors.secondary}15`,
                  shadowColor: themeColors.shadow,
                  borderLeftColor: themeColors.secondary,
                },
              ]}
            >
              <Text style={[styles.costTitle, { color: themeColors.secondary }]}>Vanaf €2.400</Text>
              <Text style={[styles.costSubtitle, { color: themeColors.textSecondary }]}>
                Exclusief BTW, verzekering, ticket kosten etc.
              </Text>
            </View>
          </View>

          {/* Registration Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="person-outline" size={24} color={themeColors.primary} />
              <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Aanmelden</Text>
            </View>

            <Pressable
              style={({ pressed }) => [
                styles.emailButton,
                { backgroundColor: themeColors.primary },
                pressed && styles.emailButtonPressed,
              ]}
              onPress={() => Linking.openURL("mailto:interesse@rotaryyep.nl")}
              accessibilityRole="button"
              accessibilityLabel="Send email to interesse@rotaryyep.nl"
            >
              <Ionicons name="mail-outline" size={24} color={themeColors.onPrimary} />
              <Text style={[styles.emailButtonText, { color: themeColors.onPrimary }]}>
                interesse@rotaryyep.nl
              </Text>
            </Pressable>
          </View>

          {/* Why Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="heart-outline" size={24} color={themeColors.primary} />
              <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
                Waarom Rotary Youth Exchange?
              </Text>
            </View>

            {/* Internationale ervaring */}
            <View
              style={[
                styles.whyCard,
                {
                  backgroundColor: themeColors.card,
                  shadowColor: themeColors.shadow,
                  borderColor: themeColors.border,
                  borderLeftColor: themeColors.primary,
                },
              ]}
            >
              <View style={styles.whyHeader}>
                <View style={[styles.whyNumber, { backgroundColor: themeColors.primary }]}>
                  <Text style={[styles.whyNumberText, { color: themeColors.onPrimary }]}>1</Text>
                </View>
                <Text style={[styles.whyTitle, { color: themeColors.text }]}>
                  Internationale ervaring
                </Text>
              </View>
              <View style={styles.whyBullets}>
                <View style={styles.bulletItem}>
                  <View style={[styles.bulletDot, { backgroundColor: themeColors.primary }]} />
                  <Text style={[styles.bulletText, { color: themeColors.textSecondary }]}>
                    Jongeren leren een nieuwe cultuur, taal en manier van leven kennen
                  </Text>
                </View>
                <View style={styles.bulletItem}>
                  <View style={[styles.bulletDot, { backgroundColor: themeColors.primary }]} />
                  <Text style={[styles.bulletText, { color: themeColors.textSecondary }]}>
                    Het vergroot hun wereldbeeld en respect voor diversiteit
                  </Text>
                </View>
              </View>
            </View>

            {/* Persoonlijke ontwikkeling */}
            <View
              style={[
                styles.whyCard,
                {
                  backgroundColor: themeColors.card,
                  shadowColor: themeColors.shadow,
                  borderColor: themeColors.border,
                  borderLeftColor: themeColors.primary,
                },
              ]}
            >
              <View style={styles.whyHeader}>
                <View style={[styles.whyNumber, { backgroundColor: themeColors.primary }]}>
                  <Text style={[styles.whyNumberText, { color: themeColors.onPrimary }]}>2</Text>
                </View>
                <Text style={[styles.whyTitle, { color: themeColors.text }]}>
                  Persoonlijke ontwikkeling
                </Text>
              </View>
              <View style={styles.whyBullets}>
                <View style={styles.bulletItem}>
                  <View style={[styles.bulletDot, { backgroundColor: themeColors.primary }]} />
                  <Text style={[styles.bulletText, { color: themeColors.textSecondary }]}>
                    Zelfstandigheid, zelfvertrouwen en verantwoordelijkheid nemen
                  </Text>
                </View>
                <View style={styles.bulletItem}>
                  <View style={[styles.bulletDot, { backgroundColor: themeColors.primary }]} />
                  <Text style={[styles.bulletText, { color: themeColors.textSecondary }]}>
                    Aanpassen aan nieuwe situaties en omgaan met uitdagingen
                  </Text>
                </View>
              </View>
            </View>

            {/* Taalontwikkeling */}
            <View
              style={[
                styles.whyCard,
                {
                  backgroundColor: themeColors.card,
                  shadowColor: themeColors.shadow,
                  borderColor: themeColors.border,
                  borderLeftColor: themeColors.primary,
                },
              ]}
            >
              <View style={styles.whyHeader}>
                <View style={[styles.whyNumber, { backgroundColor: themeColors.primary }]}>
                  <Text style={[styles.whyNumberText, { color: themeColors.onPrimary }]}>3</Text>
                </View>
                <Text style={[styles.whyTitle, { color: themeColors.text }]}>Taalontwikkeling</Text>
              </View>
              <View style={styles.whyBullets}>
                <View style={styles.bulletItem}>
                  <View style={[styles.bulletDot, { backgroundColor: themeColors.primary }]} />
                  <Text style={[styles.bulletText, { color: themeColors.textSecondary }]}>
                    Door dagelijks contact met de taal van het gastland, leren jongeren snel en
                    effectief communiceren
                  </Text>
                </View>
              </View>
            </View>

            {/* Onderwijs en culturele verrijking */}
            <View
              style={[
                styles.whyCard,
                {
                  backgroundColor: themeColors.card,
                  shadowColor: themeColors.shadow,
                  borderColor: themeColors.border,
                  borderLeftColor: themeColors.primary,
                },
              ]}
            >
              <View style={styles.whyHeader}>
                <View style={[styles.whyNumber, { backgroundColor: themeColors.primary }]}>
                  <Text style={[styles.whyNumberText, { color: themeColors.onPrimary }]}>4</Text>
                </View>
                <Text style={[styles.whyTitle, { color: themeColors.text }]}>
                  Onderwijs en culturele verrijking
                </Text>
              </View>
              <View style={styles.whyBullets}>
                <View style={styles.bulletItem}>
                  <View style={[styles.bulletDot, { backgroundColor: themeColors.primary }]} />
                  <Text style={[styles.bulletText, { color: themeColors.textSecondary }]}>
                    Scholing in het gastland én vaak ook het geven van presentaties over de eigen
                    cultuur
                  </Text>
                </View>
                <View style={styles.bulletItem}>
                  <View style={[styles.bulletDot, { backgroundColor: themeColors.primary }]} />
                  <Text style={[styles.bulletText, { color: themeColors.textSecondary }]}>
                    Wederzijdse uitwisseling van kennis en gebruiken
                  </Text>
                </View>
              </View>
            </View>

            {/* Rotary netwerk */}
            <View
              style={[
                styles.whyCard,
                {
                  backgroundColor: themeColors.card,
                  shadowColor: themeColors.shadow,
                  borderColor: themeColors.border,
                  borderLeftColor: themeColors.primary,
                },
              ]}
            >
              <View style={styles.whyHeader}>
                <View style={[styles.whyNumber, { backgroundColor: themeColors.primary }]}>
                  <Text style={[styles.whyNumberText, { color: themeColors.onPrimary }]}>5</Text>
                </View>
                <Text style={[styles.whyTitle, { color: themeColors.text }]}>Rotary netwerk</Text>
              </View>
              <View style={styles.whyBullets}>
                <View style={styles.bulletItem}>
                  <View style={[styles.bulletDot, { backgroundColor: themeColors.primary }]} />
                  <Text style={[styles.bulletText, { color: themeColors.textSecondary }]}>
                    Betrouwbare begeleiding: jongeren verblijven bij gastgezinnen die door Rotary
                    zorgvuldig zijn geselecteerd
                  </Text>
                </View>
                <View style={styles.bulletItem}>
                  <View style={[styles.bulletDot, { backgroundColor: themeColors.primary }]} />
                  <Text style={[styles.bulletText, { color: themeColors.textSecondary }]}>
                    Ondersteuning van lokale Rotaryclubs en toegang tot een wereldwijd netwerk van
                    contacten
                  </Text>
                </View>
              </View>
            </View>

            {/* Vriendschappen voor het leven */}
            <View
              style={[
                styles.whyCard,
                {
                  marginBottom: 0,
                  backgroundColor: themeColors.card,
                  shadowColor: themeColors.shadow,
                  borderColor: themeColors.border,
                  borderLeftColor: themeColors.primary,
                },
              ]}
            >
              <View style={styles.whyHeader}>
                <View style={[styles.whyNumber, { backgroundColor: themeColors.primary }]}>
                  <Text style={[styles.whyNumberText, { color: themeColors.onPrimary }]}>6</Text>
                </View>
                <Text style={[styles.whyTitle, { color: themeColors.text }]}>
                  Vriendschappen voor het leven
                </Text>
              </View>
              <View style={styles.whyBullets}>
                <View style={styles.bulletItem}>
                  <View style={[styles.bulletDot, { backgroundColor: themeColors.primary }]} />
                  <Text style={[styles.bulletText, { color: themeColors.textSecondary }]}>
                    Contacten met mensen uit het gastland én met andere uitwisselingsstudenten van
                    over de hele wereld
                  </Text>
                </View>
                <View style={styles.bulletItem}>
                  <View style={[styles.bulletDot, { backgroundColor: themeColors.primary }]} />
                  <Text style={[styles.bulletText, { color: themeColors.textSecondary }]}>
                    Kortom: Rotary Youth Exchange draait om vrede, begrip en vriendschap tussen
                    culturen, en geeft jongeren een kans om zich persoonlijk én internationaal te
                    ontwikkelen
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
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    paddingHorizontal: 4,
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
  },

  // Age Card Styles
  ageCard: {
    borderRadius: Platform.OS === "ios" ? 16 : 12,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    borderLeftWidth: 4,
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

  // Country Card
  countryCard: {
    borderRadius: Platform.OS === "ios" ? 16 : 12,
    padding: 20,
    ...(Platform.OS === "ios"
      ? shadowStyle
      : {
          elevation: 2,
          borderWidth: StyleSheet.hairlineWidth,
        }),
  },
  hemisphereSection: {
    marginBottom: 16,
  },
  hemisphereHeader: {
    marginBottom: 8,
  },
  hemisphereTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  countryText: {
    fontSize: 14,
    lineHeight: 20,
  },

  // Cost Card
  costCard: {
    borderRadius: Platform.OS === "ios" ? 16 : 12,
    padding: 20,
    alignItems: "center",
    borderLeftWidth: 4,
    ...(Platform.OS === "ios"
      ? shadowStyle
      : {
          elevation: 2,
          borderWidth: StyleSheet.hairlineWidth,
        }),
  },
  costTitle: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 4,
  },
  costSubtitle: {
    fontSize: 14,
    textAlign: "center",
  },

  // Button Container
  buttonContainer: {
    borderRadius: Platform.OS === "ios" ? 16 : 12,
    padding: 20,
    ...(Platform.OS === "ios"
      ? shadowStyle
      : {
          elevation: 2,
          borderWidth: StyleSheet.hairlineWidth,
        }),
  },

  // Email Button
  emailButton: {
    borderRadius: Platform.OS === "ios" ? 12 : 8,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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

  // Why Section Styles
  whyCard: {
    borderRadius: Platform.OS === "ios" ? 16 : 12,
    padding: 20,
    marginBottom: 12,
    borderLeftWidth: 4,
    ...(Platform.OS === "ios"
      ? shadowStyle
      : {
          elevation: 2,
          borderWidth: StyleSheet.hairlineWidth,
        }),
  },
  whyHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  whyNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  whyNumberText: {
    fontSize: 16,
    fontWeight: "700",
  },
  whyTitle: {
    fontSize: 18,
    fontWeight: "600",
    flex: 1,
  },
  whyBullets: {
    marginLeft: 0,
    paddingLeft: 44,
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
    marginTop: 8,
    marginRight: 12,
  },
  bulletText: {
    fontSize: 16,
    lineHeight: 22,
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
