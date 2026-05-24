import { StyleSheet, View, Text, ScrollView, Platform, Pressable, Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/core/theme";
const shadowStyle = {
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.08,
  shadowRadius: 20,
  elevation: 4,
};

export default function FamilyToFamilyScreen() {
  const { colors: themeColors } = useTheme();

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
              <Ionicons name="home-outline" size={32} color={themeColors.primary} />
            </View>
            <Text style={[styles.headerTitle, { color: themeColors.text }]}>Family To Family</Text>
            <Text style={[styles.headerSubtitle, { color: themeColors.textSecondary }]}>
              Short Term Exchange Program (STEP) voor 2x3 of 2x4 weken
            </Text>
          </View>

          {/* What is it Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="help-circle-outline" size={24} color={themeColors.primary} />
              <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Wat is het?</Text>
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
                De naam zegt het al, Short Term Exchange Program (STEP). Het is een uitwisseling met
                een leeftijdgenoot in het buitenland voor de korte duur van ongeveer 2x3 weken of
                2x4 weken tijdens de zomervakantie. Maar het is ook FAMILY TO FAMILY, wat betekent
                dat je bij een gezin in het buitenland woont, samen met jouw maatje, en dat jouw
                maatje samen met jou in Nederland komt wonen.
              </Text>
            </View>
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
                <Text style={[styles.ageTitle, { color: themeColors.accent }]}>15 - 19 jaar</Text>
                <Text style={[styles.ageSubtitle, { color: themeColors.text }]}>Voor wie?</Text>
                <Text style={[styles.ageNote, { color: themeColors.textSecondary }]}>
                  Open minded jongeren die willen leren van anderen
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

          {/* Requirements Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="checkmark-circle-outline" size={24} color={themeColors.primary} />
              <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
                Geschikt voor dit programma?
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
              <Text style={[styles.infoText, { color: themeColors.text }]}>
                Je bent geschikt als je:
              </Text>
              <View style={styles.bulletContainer}>
                <View style={styles.bulletItem}>
                  <View style={[styles.bulletDot, { backgroundColor: themeColors.primary }]} />
                  <Text style={[styles.bulletText, { color: themeColors.textSecondary }]}>
                    Open staat voor anderen
                  </Text>
                </View>
                <View style={styles.bulletItem}>
                  <View style={[styles.bulletDot, { backgroundColor: themeColors.primary }]} />
                  <Text style={[styles.bulletText, { color: themeColors.textSecondary }]}>
                    Van anderen wilt leren
                  </Text>
                </View>
                <View style={styles.bulletItem}>
                  <View style={[styles.bulletDot, { backgroundColor: themeColors.primary }]} />
                  <Text style={[styles.bulletText, { color: themeColors.textSecondary }]}>
                    Ervaringen wilt uitwisselen
                  </Text>
                </View>
                <View style={styles.bulletItem}>
                  <View style={[styles.bulletDot, { backgroundColor: themeColors.primary }]} />
                  <Text style={[styles.bulletText, { color: themeColors.textSecondary }]}>
                    Uit je vertrouwde omgeving wilt stappen
                  </Text>
                </View>
                <View style={styles.bulletItem}>
                  <View style={[styles.bulletDot, { backgroundColor: themeColors.primary }]} />
                  <Text style={[styles.bulletText, { color: themeColors.textSecondary }]}>
                    Anderen zonder vooroordelen wilt ontmoeten
                  </Text>
                </View>
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
                  backgroundColor: `${themeColors.accent}15`,
                  shadowColor: themeColors.shadow,
                  borderLeftColor: themeColors.accent,
                },
              ]}
            >
              <Text style={[styles.costTitle, { color: themeColors.accent }]}>
                €181,50 incl. BTW
              </Text>
              <Text style={[styles.costSubtitle, { color: themeColors.textSecondary }]}>
                Exclusief verzekering, ticket, zakgeld en ziektekosten
              </Text>
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
                De aanmelding voor Short Term Exchange loopt via email.
              </Text>
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
        </View>
      </ScrollView>
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
  },

  // Age Card Styles
  ageCard: {
    borderRadius: Platform.OS === "ios" ? 16 : 12,
    padding: 20,
    marginBottom: 16,
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

  // Cost Card
  costCard: {
    borderRadius: Platform.OS === "ios" ? 12 : 8,
    padding: 16,
    marginBottom: 16,
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
    marginTop: 8,
    marginRight: 12,
  },
  bulletText: {
    fontSize: 16,
    lineHeight: 22,
    flex: 1,
  },
});
