/**
 * Shared utilities exports
 */

// Date utilities
export {
  parseDateDDMMYYYY,
  formatToDDMMYYYY,
  formatDateDisplay,
  formatDateTime,
  isPastDate,
  isToday,
  compareDatesDDMMYYYY,
  sortByDateDDMMYYYY,
  isSameDay,
  isMultiDayEvent,
  getRelativeTime,
} from "./date";

// Flag utilities
export {
  getFlagAsset,
  hasFlagAsset,
  getAvailableFlags,
  getCountryName,
  countryNames,
} from "./flags";

// Communication utilities
export {
  makePhoneCall,
  sendEmail,
  openWhatsApp,
  openURL,
  openInstagram,
  openFacebook,
  openLinkedIn,
  openSnapchat,
  formatPhoneNumber,
  isValidEmail,
  getInitials,
} from "./communications";
