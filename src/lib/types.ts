/**
 * Shared types for the Rotary YEP NL app.
 * Merged from all feature type files.
 */

import type { Ionicons, Fontisto, MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";

// ============================================================================
// Common Base Types
// ============================================================================

export interface SocialMedia {
  instagram?: string;
  facebook?: string;
  snapchat?: string;
  linkedin?: string;
  website?: string;
}

export interface Country {
  code: string;
  name: string;
  flag: string;
}

// ============================================================================
// Emergency
// ============================================================================

export interface EmergencyContact {
  id: string;
  name: string;
  role: string;
  phone: string;
  email?: string;
}

export interface EmergencySection {
  id: string;
  title: string;
  description?: string;
  icon: string;
  contacts: EmergencyContact[];
}

// ============================================================================
// Contacts
// ============================================================================

export type ContactCategory = "mdjc" | "rotex" | "longterm" | "shortterm";

export interface Contact {
  id: string;
  name: string;
  role: string;
  functions: string[];
  bio?: string;
  imageUrl?: string;
  email?: string;
  phone?: string;
  whatsapp?: string;
  socialMedia?: SocialMedia;
  club?: string;
  district?: string;
  category: ContactCategory;
}

export interface ContactSection {
  id: ContactCategory;
  title: string;
  description?: string;
  contacts: Contact[];
}

// ============================================================================
// About
// ============================================================================

export interface AboutSection {
  id: string;
  icon: string;
  title: string;
  subtitle?: string;
  content?: string;
  listItems?: string[];
  quote?: string;
}

// ============================================================================
// Home
// ============================================================================

export interface HomeCardProps {
  icon?: keyof typeof Ionicons.glyphMap;
  fontistoIcon?: keyof typeof Fontisto.glyphMap;
  materialIcon?: keyof typeof MaterialCommunityIcons.glyphMap;
  title: string;
  variant?: "default" | "single";
  useSvg?: boolean;
  svgSource?: number | { uri: string };
  onPress?: () => void;
}

export interface CarouselImage {
  id: string;
  source: number | { uri: string };
}

// ============================================================================
// News
// ============================================================================

export interface NewsTextBlock {
  heading?: string;
  body?: {
    paragraph?: string[];
    imageUrl?: string;
    videoUrl?: string;
  }[];
}

export interface NewsItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  isPdf: boolean;
  pdfUrl?: string;
  textContent?: NewsTextBlock[];
}

export interface RawNewsItem {
  id: number;
  title: string;
  description: string;
  images: string;
  isPdf: "yes" | "no";
  pdf: string | null;
  text?: NewsTextBlock[];
}

export function convertRawNewsItem(raw: RawNewsItem): NewsItem {
  return {
    id: raw.id,
    title: raw.title,
    description: raw.description,
    imageUrl: raw.images,
    isPdf: raw.isPdf === "yes",
    pdfUrl: raw.pdf || undefined,
    textContent: raw.text,
  };
}

// ============================================================================
// Calendar (Google Calendar API v3)
// ============================================================================

export interface GoogleCalendarDateTime {
  dateTime?: string;
  date?: string;
  timeZone?: string;
}

export interface GoogleConferenceEntryPoint {
  entryPointType: "video" | "phone" | "sip" | "more";
  uri?: string;
  label?: string;
  pin?: string;
  accessCode?: string;
  meetingCode?: string;
  passcode?: string;
  password?: string;
  regionCode?: string;
}

export interface GoogleConferenceSolutionKey {
  type: "eventHangout" | "eventNamedHangout" | "hangoutsMeet" | "addOn";
}

export interface GoogleConferenceSolution {
  key: GoogleConferenceSolutionKey;
  name: string;
  iconUri?: string;
}

export interface GoogleConferenceData {
  createRequest?: {
    requestId: string;
    conferenceSolutionKey: GoogleConferenceSolutionKey;
    status: { statusCode: "pending" | "success" | "failure" };
  };
  entryPoints?: GoogleConferenceEntryPoint[];
  conferenceSolution?: GoogleConferenceSolution;
  conferenceId?: string;
  signature?: string;
  notes?: string;
}

export interface GoogleEventAttachment {
  fileUrl: string;
  title: string;
  mimeType: string;
  iconLink?: string;
  fileId?: string;
}

export interface GoogleEventPerson {
  id?: string;
  email: string;
  displayName?: string;
  self?: boolean;
}

export interface GoogleCalendarEvent {
  id: string;
  status: "confirmed" | "tentative" | "cancelled";
  htmlLink: string;
  created: string;
  updated: string;
  summary: string;
  description?: string;
  location?: string;
  colorId?: string;
  creator?: GoogleEventPerson;
  organizer?: GoogleEventPerson;
  start: GoogleCalendarDateTime;
  end: GoogleCalendarDateTime;
  recurrence?: string[];
  recurringEventId?: string;
  originalStartTime?: GoogleCalendarDateTime;
  conferenceData?: GoogleConferenceData;
  hangoutLink?: string;
  eventType?: "default" | "outOfOffice" | "focusTime" | "workingLocation" | "fromGmail";
  transparency?: "opaque" | "transparent";
  visibility?: "default" | "public" | "private" | "confidential";
  attachments?: GoogleEventAttachment[];
  extendedProperties?: {
    private?: Record<string, string>;
    shared?: Record<string, string>;
  };
}

export interface GoogleCalendarResponse {
  kind: string;
  etag: string;
  summary: string;
  updated: string;
  timeZone: string;
  accessRole: string;
  nextPageToken?: string;
  nextSyncToken?: string;
  items?: GoogleCalendarEvent[];
}

export interface ConferenceEntryPoint {
  type: "video" | "phone" | "sip" | "more";
  uri: string;
  label: string;
  pin?: string;
  accessCode?: string;
  meetingCode?: string;
  passcode?: string;
  regionCode?: string;
}

export interface ConferenceData {
  type: "googleMeet" | "hangout" | "other";
  name: string;
  iconUri?: string;
  conferenceId?: string;
  notes?: string;
  videoEntryPoint?: ConferenceEntryPoint;
  phoneEntryPoints: ConferenceEntryPoint[];
  sipEntryPoint?: ConferenceEntryPoint;
  meetingLink?: string;
  meetingId?: string;
  dialInNumbers: { number: string; region?: string; pin?: string }[];
}

export interface RecurrencePattern {
  frequency: "daily" | "weekly" | "monthly" | "yearly";
  interval: number;
  byDay?: string[];
  byMonthDay?: number[];
  byMonth?: number[];
  bySetPos?: number[];
  count?: number;
  until?: Date;
  weekStart?: string;
}

export interface RecurrenceInfo {
  isRecurring: boolean;
  isInstance: boolean;
  parentEventId?: string;
  pattern?: RecurrencePattern;
  humanReadable: string;
  humanReadableShort: string;
  nextOccurrence?: Date;
}

export interface EventColor {
  id: string;
  background: string;
  foreground: string;
  name: string;
}

export interface EventTypeBadge {
  type: "default" | "focusTime" | "outOfOffice" | "workingLocation";
  label: string;
  icon: string;
  color: string;
}

export interface EventAttachment {
  id: string;
  title: string;
  url: string;
  mimeType: string;
  iconUrl?: string;
  fileType:
    | "document"
    | "spreadsheet"
    | "presentation"
    | "pdf"
    | "image"
    | "video"
    | "audio"
    | "other";
}

export interface EventTime {
  dateTime: Date;
  timeZone?: string;
  isAllDay: boolean;
}

export interface CalendarEvent {
  id: string;
  status: "confirmed" | "tentative" | "cancelled";
  htmlLink: string;
  created: Date;
  updated: Date;
  summary: string;
  description: string;
  location: string;
  creator: { email: string; displayName?: string };
  organizer: { email: string; displayName?: string };
  start: EventTime;
  end: EventTime;
  isAllDay: boolean;
  isMultiDay: boolean;
  recurrence: RecurrenceInfo;
  conference?: ConferenceData;
  hasVideoMeeting: boolean;
  color?: EventColor;
  eventType: EventTypeBadge;
  transparency: "busy" | "free";
  attachments: EventAttachment[];
  _original: GoogleCalendarEvent;
}

export interface EventsData {
  [date: string]: CalendarEvent[];
}

export interface DotMarking {
  key: string;
  color: string;
}

export interface MarkedDates {
  [date: string]: {
    marked?: boolean;
    dots?: DotMarking[];
    selected?: boolean;
    selectedColor?: string;
    selectedTextColor?: string;
  };
}

export const GOOGLE_CALENDAR_COLORS: Record<string, EventColor> = {
  "1": { id: "1", background: "#a4bdfc", foreground: "#1d1d1d", name: "Lavender" },
  "2": { id: "2", background: "#7ae7bf", foreground: "#1d1d1d", name: "Sage" },
  "3": { id: "3", background: "#dbadff", foreground: "#1d1d1d", name: "Grape" },
  "4": { id: "4", background: "#ff887c", foreground: "#1d1d1d", name: "Flamingo" },
  "5": { id: "5", background: "#fbd75b", foreground: "#1d1d1d", name: "Banana" },
  "6": { id: "6", background: "#ffb878", foreground: "#1d1d1d", name: "Tangerine" },
  "7": { id: "7", background: "#46d6db", foreground: "#1d1d1d", name: "Peacock" },
  "8": { id: "8", background: "#e1e1e1", foreground: "#1d1d1d", name: "Graphite" },
  "9": { id: "9", background: "#5484ed", foreground: "#ffffff", name: "Blueberry" },
  "10": { id: "10", background: "#51b749", foreground: "#1d1d1d", name: "Basil" },
  "11": { id: "11", background: "#dc2127", foreground: "#ffffff", name: "Tomato" },
};

export const EVENT_TYPE_CONFIG: Record<string, EventTypeBadge> = {
  default: { type: "default", label: "", icon: "", color: "transparent" },
  focusTime: { type: "focusTime", label: "Focus Time", icon: "headset", color: "#9C27B0" },
  outOfOffice: { type: "outOfOffice", label: "Afwezig", icon: "airplane", color: "#FF5722" },
  workingLocation: {
    type: "workingLocation",
    label: "Werklocatie",
    icon: "briefcase",
    color: "#2196F3",
  },
};

// ============================================================================
// Camps & Tours
// ============================================================================

export interface Camp {
  id: string;
  startDate: string;
  endDate: string;
  title: string;
  hostCountryCode: string;
  hostDistrict: string;
  ageMin: string;
  ageMax: string;
  currency: string;
  contribution: string;
  invitation: string;
  isFull: boolean;
}

export interface CountryWithCode {
  country: string;
  code: string;
}

export interface FilterState {
  availability: AvailabilityFilter;
  timing: TimingFilter;
  country: string;
}

export type AvailabilityFilter = "alle" | "niet-vol" | "vol";
export type TimingFilter = "alle" | "toekomstig" | "afgelopen";

// ============================================================================
// Programs
// ============================================================================

export interface ProgramItem {
  id: string;
  title: string;
  subtitle?: string;
  icon: keyof typeof FontAwesome5.glyphMap;
  route: string;
}

export interface ProgramSection {
  id: string;
  title: string;
  items: ProgramItem[];
}

// ============================================================================
// Rotary Clubs
// ============================================================================

export interface ClubSectionNavItem {
  id: string;
  title: string;
  icon: keyof typeof FontAwesome5.glyphMap;
  route: string;
}

export interface InfoSection {
  id: string;
  title: string;
  content: string;
}

export interface DocumentItem {
  id: string;
  title: string;
  icon: keyof typeof FontAwesome5.glyphMap;
  pdfUrl: string;
}

export interface SectionPageContent {
  id: string;
  title: string;
  description?: string;
  type: "info" | "documents";
  infoSections?: InfoSection[];
  documents?: DocumentItem[];
}

// ============================================================================
// PDF Viewer
// ============================================================================

export interface PdfDownloadState {
  loading: boolean;
  error: string | null;
  localFilePath: string | null;
  currentPage: number;
  totalPages: number;
}

export interface PdfViewerParams {
  url: string;
  title: string;
}

// ============================================================================
// Settings
// ============================================================================

export interface SettingsSectionData {
  id: string;
  title: string;
  items: SettingsItemData[];
}

export interface SettingsItemData {
  id: string;
  title: string;
  subtitle?: string;
  action?: SettingsAction;
  showChevron?: boolean;
}

export type SettingsAction =
  | { type: "navigate"; route: string }
  | { type: "url"; url: string }
  | { type: "review" }
  | { type: "appVersion" };

// ============================================================================
// Students
// ============================================================================

export type StudentType = "inbound" | "outbound" | "rebound";

export interface Student {
  id: string;
  name: string;
  bio: string;
  description?: string;
  imageUrl?: string;
  videoUrl?: string;
  email?: string;
  phone?: string;
  socialMedia?: SocialMedia;
  homeCountryCode: string;
  hostCountryCode: string;
  year?: string;
  type: StudentType;
}

export interface CountryGroup {
  countryCode: string;
  students: Student[];
}

export interface YearGroup {
  year: string;
  students: Student[];
}

export interface RawStudent {
  name: string;
  bio: string;
  description?: string;
  imageUrl?: string;
  videoUrl?: string | null;
  email?: string | null;
  phoneNumber?: string | null;
  snapchatUrl?: string | null;
  facebookUrl?: string | null;
  instagramUrl?: string | null;
  websiteUrl?: string | null;
  linkedinUrl?: string | null;
  from: string;
  fromFlag: string;
  to: string;
  toFlag: string;
}

export function generateStudentId(name: string, type: StudentType): string {
  return `${type}-${name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")}`;
}

export function convertRawStudent(raw: RawStudent, type: StudentType, year?: string): Student {
  const socialMedia: SocialMedia | undefined =
    raw.instagramUrl || raw.facebookUrl || raw.snapchatUrl || raw.linkedinUrl || raw.websiteUrl
      ? {
          instagram: raw.instagramUrl || undefined,
          facebook: raw.facebookUrl || undefined,
          snapchat: raw.snapchatUrl || undefined,
          linkedin: raw.linkedinUrl || undefined,
          website: raw.websiteUrl || undefined,
        }
      : undefined;

  return {
    id: generateStudentId(raw.name, type),
    name: raw.name,
    bio: raw.bio,
    description: raw.description,
    imageUrl: raw.imageUrl,
    videoUrl: raw.videoUrl || undefined,
    email: raw.email || undefined,
    phone: raw.phoneNumber || undefined,
    socialMedia,
    homeCountryCode: raw.fromFlag,
    hostCountryCode: raw.toFlag,
    year,
    type,
  };
}

/**
 * Group students by home country code, sorted by country name.
 */
export function groupByHomeCountry(students: Student[]): CountryGroup[] {
  const map = new Map<string, Student[]>();
  for (const s of students) {
    const list = map.get(s.homeCountryCode) ?? [];
    list.push(s);
    map.set(s.homeCountryCode, list);
  }
  return Array.from(map, ([countryCode, students]) => ({ countryCode, students })).sort((a, b) =>
    a.countryCode.localeCompare(b.countryCode),
  );
}

/**
 * Group students by host country code, sorted by country name.
 */
export function groupByHostCountry(students: Student[]): CountryGroup[] {
  const map = new Map<string, Student[]>();
  for (const s of students) {
    const list = map.get(s.hostCountryCode) ?? [];
    list.push(s);
    map.set(s.hostCountryCode, list);
  }
  return Array.from(map, ([countryCode, students]) => ({ countryCode, students })).sort((a, b) =>
    a.countryCode.localeCompare(b.countryCode),
  );
}

/**
 * Group students by year, newest first.
 */
export function groupByYear(students: Student[]): YearGroup[] {
  const map = new Map<string, Student[]>();
  for (const s of students) {
    const year = s.year ?? "Unknown";
    const list = map.get(year) ?? [];
    list.push(s);
    map.set(year, list);
  }
  return Array.from(map, ([year, students]) => ({ year, students })).sort((a, b) =>
    b.year.localeCompare(a.year),
  );
}

// ============================================================================
// Student Info (Content Pages)
// ============================================================================

export type IconName = keyof typeof Ionicons.glyphMap;
export type AccentColor = "primary" | "secondary" | "success" | "warning" | "info" | "accent";

export interface PageHeader {
  icon: IconName;
  title: string;
  subtitle?: string;
}

interface BaseBlock {
  id: string;
}

export interface TextBlock extends BaseBlock {
  type: "text";
  content: string;
}

export interface CardBlock extends BaseBlock {
  type: "card";
  icon?: IconName;
  iconColor?: AccentColor;
  title?: string;
  content: string;
  accentColor?: AccentColor;
}

export interface HighlightItem {
  icon: IconName;
  title: string;
  value: string;
}

export interface HighlightBlock extends BaseBlock {
  type: "highlight";
  items: HighlightItem[];
}

export interface TimelineItem {
  icon: IconName;
  iconColor: AccentColor;
  title: string;
  description: string;
}

export interface TimelineBlock extends BaseBlock {
  type: "timeline";
  items: TimelineItem[];
}

export interface GridItem {
  icon?: IconName;
  text: string;
}

export interface GridBlock extends BaseBlock {
  type: "grid";
  title?: string;
  items: GridItem[];
  columns?: 2 | 3;
}

export interface TipItem {
  number: number;
  title?: string;
  content: string;
}

export interface TipBlock extends BaseBlock {
  type: "tips";
  items: TipItem[];
}

export interface VideoBlock extends BaseBlock {
  type: "video";
  videoUrl: string;
  title: string;
  description: string;
  thumbnailTime?: number;
}

export interface CTABlock extends BaseBlock {
  type: "cta";
  action: "email" | "link" | "route";
  target: string;
  label: string;
  subject?: string;
  description?: string;
}

export type ContentBlock =
  | TextBlock
  | CardBlock
  | HighlightBlock
  | TimelineBlock
  | GridBlock
  | TipBlock
  | VideoBlock
  | CTABlock;

export interface ContentSection {
  id: string;
  icon?: IconName;
  title?: string;
  blocks: ContentBlock[];
}

export interface InfoPageContent {
  pageKey: string;
  header: PageHeader;
  sections: ContentSection[];
}

export interface MenuItem {
  id: string;
  title: string;
  subtitle?: string;
  icon: string;
  route: string;
  enabled?: boolean;
}

export interface MenuSection {
  id: string;
  title: string;
  items: MenuItem[];
}

export interface HubPageContent {
  pageKey: string;
  header?: PageHeader;
  introText?: string;
  menuSections: MenuSection[];
}

export type StudentInfoType = "inbound" | "outbound";
export type ProgramType = "long-term" | "short-term";

// ============================================================================
// Utility Functions
// ============================================================================

export function generateId(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
