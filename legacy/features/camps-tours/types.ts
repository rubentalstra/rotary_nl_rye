/**
 * Camps & Tours feature types
 */

/**
 * Camp/Tour data from XLSX
 */
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

/**
 * Country with code for filter display
 */
export interface CountryWithCode {
  country: string;
  code: string;
}

/**
 * Filter state for camps list
 */
export interface FilterState {
  availability: AvailabilityFilter;
  timing: TimingFilter;
  country: string;
}

/**
 * Availability filter options
 */
export type AvailabilityFilter = "alle" | "niet-vol" | "vol";

/**
 * Timing filter options
 */
export type TimingFilter = "alle" | "toekomstig" | "afgelopen";

/**
 * Filter chip configuration
 */
export interface FilterChipConfig {
  id: string;
  icon: string;
  label: string;
  isActive: boolean;
  onPress: () => void;
}

/**
 * Camps query result
 */
export interface CampsQueryResult {
  camps: Camp[];
  countries: CountryWithCode[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Camps filter result
 */
export interface CampsFilterResult {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  filteredCamps: Camp[];
  hasActiveFilters: boolean;
  clearFilters: () => void;
}
