/**
 * Student Info Feature - Public API
 *
 * This module provides components and content for displaying
 * information pages for inbound and outbound exchange students.
 */

// Components
export {
  InfoPage,
  ContentSection,
  ContentCard,
  HighlightGrid,
  TipCard,
  TimelineCard,
  VideoPlayer,
  MenuList,
  ProgramHub,
} from "./components";

// Content - Inbound
export {
  welcomeContent,
  flightArrivalContent,
  languageContent,
  insuranceContent,
  travelContent,
} from "./content/inbound/long-term";

// Content - Outbound Long-Term
export {
  howToSignUpContent,
  selectionDayContent,
  selectionWeekendContent,
  top3CountriesContent,
  complyWithContent,
} from "./content/outbound/long-term";

// Content - Outbound Short-Term Camps & Tours
export {
  campsOverviewContent,
  campsHowToSignUpContent,
  campsComplyWithContent,
  campsWhichCountriesContent,
} from "./content/outbound/short-term/camps-and-tours";

// Content - Outbound Short-Term Family to Family
export {
  familyOverviewContent,
  familyHowToSignUpContent,
  familyComplyWithContent,
  familyCountriesPreferenceContent,
} from "./content/outbound/short-term/family-to-family";

// Types
export type {
  IconName,
  AccentColor,
  PageHeader,
  TextBlock,
  CardBlock,
  HighlightItem,
  HighlightBlock,
  TimelineItem,
  TimelineBlock,
  GridItem,
  GridBlock,
  TipItem,
  TipBlock,
  VideoBlock,
  CTABlock,
  ContentBlock,
  Section,
  InfoPageContent,
  MenuItem,
  MenuSection,
  HubPageContent,
  StudentInfoType,
  ProgramType,
} from "./types";
