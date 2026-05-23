import { StyleSheet, View, Text, ScrollView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { NetworkImage } from "@/shared/components/media/NetworkImage";
import { useTheme } from "@/core/theme";
const shadowStyle = {
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.08,
  shadowRadius: 20,
  elevation: 4,
};

interface Contributor {
  id: string;
  name: string;
  role: string;
  location: string;
  imageUrl?: string;
}

const contributors: Contributor[] = [
  {
    id: "1",
    name: "Ruben Talstra",
    role: "Lead Developer",
    location: "Netherlands",
    imageUrl: undefined,
  },
  {
    id: "2",
    name: "_Bnkn_",
    role: "Developer",
    location: "Germany",
    imageUrl: undefined,
  },
  {
    id: "3",
    name: "Believer",
    role: "Developer",
    location: "India",
    imageUrl: undefined,
  },
  {
    id: "4",
    name: "Frosted Fox",
    role: "UI Developer",
    location: "Netherlands",
    imageUrl: undefined,
  },
];

const ContributorCard = ({
  contributor,
  themeColors,
}: {
  contributor: Contributor;
  themeColors: any;
}) => (
  <View style={[styles.contributorCard, { borderBottomColor: themeColors.border }]}>
    <NetworkImage
      imageUrl={contributor.imageUrl}
      name={contributor.name}
      size={60}
      expandable={false}
    />
    <View style={styles.contributorInfo}>
      <Text style={[styles.contributorName, { color: themeColors.text }]}>{contributor.name}</Text>
      <Text style={[styles.contributorRole, { color: themeColors.accent }]}>
        {contributor.role}
      </Text>
      <View style={styles.locationContainer}>
        <Ionicons name="location-outline" size={14} color={themeColors.textSecondary} />
        <Text style={[styles.contributorLocation, { color: themeColors.textSecondary }]}>
          {contributor.location}
        </Text>
      </View>
    </View>
  </View>
);

export default function ContributorsScreen() {
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
          <View style={styles.headerSection}>
            <View style={[styles.headerIcon, { backgroundColor: `${themeColors.primary}15` }]}>
              <Ionicons name="people-outline" size={32} color={themeColors.primary} />
            </View>
            <Text style={[styles.pageTitle, { color: themeColors.text }]}>Contributors</Text>
            <Text style={[styles.pageSubtitle, { color: themeColors.textSecondary }]}>
              Thanks to everyone who made this app possible!
            </Text>
          </View>

          {/* Contributors List */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Development Team</Text>
            <View
              style={[
                styles.contributorsContainer,
                {
                  backgroundColor: themeColors.card,
                  shadowColor: themeColors.shadow,
                },
              ]}
            >
              {contributors.map((contributor) => (
                <ContributorCard
                  key={contributor.id}
                  contributor={contributor}
                  themeColors={themeColors}
                />
              ))}
            </View>
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
    padding: 16,
    paddingBottom: 34,
  },

  // Header Section
  headerSection: {
    alignItems: "center",
    paddingVertical: 24,
    marginBottom: 32,
  },
  headerIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  pageTitle: {
    fontSize: Platform.OS === "ios" ? 28 : 24,
    fontWeight: Platform.OS === "ios" ? "700" : "600",
    textAlign: "center",
    marginBottom: 8,
  },
  pageSubtitle: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 20,
  },

  // Section
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },

  // Contributors
  contributorsContainer: {
    borderRadius: 16,
    overflow: "hidden",
    ...shadowStyle,
  },
  contributorCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  contributorInfo: {
    flex: 1,
    marginLeft: 16,
  },
  contributorName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  contributorRole: {
    fontSize: 14,
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  contributorLocation: {
    fontSize: 12,
    marginLeft: 4,
  },
});
