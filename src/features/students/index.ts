/**
 * Students feature - Public API
 *
 * This module provides components and hooks for displaying exchange students
 * (inbound, outbound, and rebound).
 */

// Components
export {
  StudentCard,
  StudentDetail,
  StudentsList,
  CountrySection,
  CountryNavCard,
} from "./components";

// Hooks
export {
  useStudents,
  useStudent,
  useFindStudent,
  useSearchStudents,
  useStudentsByCountry,
} from "./hooks";

// Data
export {
  inboundStudents,
  outboundStudents,
  reboundStudents,
  getAvailableYears,
  getDestinationCountries,
  getStudentsByCountry,
  getStudentsByYear,
} from "./data";

// Types
export type { Student, StudentType, CountryGroup, YearGroup } from "./types";

// Utilities
export { groupByHomeCountry, groupByHostCountry, groupByYear, convertRawStudent } from "./types";
