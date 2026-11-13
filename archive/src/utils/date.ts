/**
 * Date utilities — supports DD/MM/YYYY (European) format.
 */

export function parseDateDDMMYYYY(dateStr: string): Date | null {
  if (!dateStr) return null;

  const parts = dateStr.split("/");
  if (parts.length !== 3) return null;

  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const year = parseInt(parts[2], 10);

  if (isNaN(day) || isNaN(month) || isNaN(year)) return null;

  return new Date(year, month, day);
}

export function formatToDDMMYYYY(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

/** Dutch-locale display: "15 januari 2024" */
export function formatDateDisplay(date: Date | string): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj.toLocaleDateString("nl-NL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatDateTime(date: Date | string): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj.toLocaleDateString("nl-NL", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function isPastDate(dateStr: string): boolean {
  const date = parseDateDDMMYYYY(dateStr);
  if (!date) return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
}

export function isToday(date: Date | string): boolean {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  const today = new Date();
  return (
    dateObj.getDate() === today.getDate() &&
    dateObj.getMonth() === today.getMonth() &&
    dateObj.getFullYear() === today.getFullYear()
  );
}

export function compareDatesDDMMYYYY(a: string, b: string): number {
  const dateA = parseDateDDMMYYYY(a);
  const dateB = parseDateDDMMYYYY(b);

  if (!dateA && !dateB) return 0;
  if (!dateA) return 1;
  if (!dateB) return -1;

  return dateA.getTime() - dateB.getTime();
}

export function sortByDateDDMMYYYY<T>(
  items: T[],
  getDate: (item: T) => string,
  ascending = true,
): T[] {
  return [...items].sort((a, b) => {
    const comparison = compareDatesDDMMYYYY(getDate(a), getDate(b));
    return ascending ? comparison : -comparison;
  });
}

export function isSameDay(date1: Date | string, date2: Date | string): boolean {
  const d1 = typeof date1 === "string" ? new Date(date1) : date1;
  const d2 = typeof date2 === "string" ? new Date(date2) : date2;

  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

export function isMultiDayEvent(startDate: Date | string, endDate: Date | string): boolean {
  return !isSameDay(startDate, endDate);
}

/** Dutch relative time, e.g. "Over 3 dagen", "Gisteren" */
export function getRelativeTime(date: Date | string): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const diffMs = dateObj.getTime() - now.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHours === 0) {
      return "Nu";
    }
    return diffHours > 0 ? `Over ${diffHours} uur` : `${Math.abs(diffHours)} uur geleden`;
  }

  if (diffDays > 0) {
    return diffDays === 1 ? "Morgen" : `Over ${diffDays} dagen`;
  }

  return diffDays === -1 ? "Gisteren" : `${Math.abs(diffDays)} dagen geleden`;
}
