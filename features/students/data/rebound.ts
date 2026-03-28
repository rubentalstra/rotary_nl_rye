/**
 * Rebound students data (past exchange students)
 * Loaded from the existing JSON file
 */

import type { Student, RawStudent } from "../types";
import { convertRawStudent } from "../types";
import { getCountryName } from "@/shared/utils/flags";

// TODO: convert the json file to typescript!!

// Import the existing JSON data
import studentsData from "@/assets/students/list.json";

interface StudentsDataFormat {
  list: {
    [year: string]: RawStudent[];
  };
}

const data = studentsData as StudentsDataFormat;

/**
 * Convert all rebound students from JSON to new format
 */
function loadReboundStudents(): Student[] {
  const students: Student[] = [];

  for (const [year, yearStudents] of Object.entries(data.list)) {
    for (const raw of yearStudents) {
      students.push(convertRawStudent(raw, "rebound", year));
    }
  }

  // Sort by year (newest first), then by name
  return students.sort((a, b) => {
    if (a.year !== b.year) {
      return (b.year || "").localeCompare(a.year || "");
    }
    return a.name.localeCompare(b.name);
  });
}

/**
 * All rebound students
 */
export const reboundStudents: Student[] = loadReboundStudents();

/**
 * Get available years for rebound students
 */
export function getAvailableYears(): string[] {
  return Object.keys(data.list).sort((a, b) => b.localeCompare(a));
}

/**
 * Get unique countries that students went to
 */
export function getDestinationCountries(): {
  code: string;
  name: string;
  count: number;
}[] {
  const countryMap = new Map<string, { code: string; name: string; count: number }>();

  for (const student of reboundStudents) {
    const key = student.hostCountryCode;
    const existing = countryMap.get(key);

    if (existing) {
      existing.count++;
    } else {
      countryMap.set(key, {
        code: student.hostCountryCode,
        name: getCountryName(student.hostCountryCode),
        count: 1,
      });
    }
  }

  return Array.from(countryMap.values()).sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Get students by destination country
 */
export function getStudentsByCountry(countryCode: string): Student[] {
  return reboundStudents.filter((student) => student.hostCountryCode === countryCode);
}

/**
 * Get students by year
 */
export function getStudentsByYear(year: string): Student[] {
  return reboundStudents.filter((student) => student.year === year);
}
