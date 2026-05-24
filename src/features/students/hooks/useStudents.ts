/**
 * Hook for accessing students data
 */

import { useMemo } from "react";
import { inboundStudents, outboundStudents, reboundStudents } from "../data";
import {
  groupByHomeCountry,
  groupByHostCountry,
  groupByYear,
  type Student,
  type StudentType,
  type CountryGroup,
  type YearGroup,
} from "../types";

/**
 * Get students by type
 */
export function useStudents(type: StudentType) {
  const students = useMemo(() => {
    switch (type) {
      case "inbound":
        return inboundStudents;
      case "outbound":
        return outboundStudents;
      case "rebound":
        return reboundStudents;
      default:
        return [];
    }
  }, [type]);

  const countryGroups = useMemo<CountryGroup[]>(() => {
    if (type === "inbound") {
      // Group by home country (where they come from)
      return groupByHomeCountry(students);
    } else {
      // Group by host country (where they go to)
      return groupByHostCountry(students);
    }
  }, [students, type]);

  const yearGroups = useMemo<YearGroup[]>(() => {
    return groupByYear(students);
  }, [students]);

  return {
    students,
    countryGroups,
    yearGroups,
    totalCount: students.length,
    countryCount: countryGroups.length,
  };
}

/**
 * Get a single student by ID
 */
export function useStudent(id: string): Student | undefined {
  return useMemo(() => {
    // Search in all student lists
    const allStudents = [...inboundStudents, ...outboundStudents, ...reboundStudents];
    return allStudents.find((s) => s.id === id);
  }, [id]);
}

/**
 * Find a student by name and type
 */
export function useFindStudent(
  name: string,
  type: StudentType,
  year?: string,
): Student | undefined {
  return useMemo(() => {
    let students: Student[];
    switch (type) {
      case "inbound":
        students = inboundStudents;
        break;
      case "outbound":
        students = outboundStudents;
        break;
      case "rebound":
        students = reboundStudents;
        break;
      default:
        return undefined;
    }

    return students.find((s) => {
      const nameMatch = s.name === name;
      const yearMatch = year ? s.year === year : true;
      return nameMatch && yearMatch;
    });
  }, [name, type, year]);
}

/**
 * Search students by name
 */
export function useSearchStudents(query: string, type?: StudentType): Student[] {
  return useMemo(() => {
    if (!query.trim()) return [];

    const lowerQuery = query.toLowerCase();
    let students: Student[];

    if (type) {
      switch (type) {
        case "inbound":
          students = inboundStudents;
          break;
        case "outbound":
          students = outboundStudents;
          break;
        case "rebound":
          students = reboundStudents;
          break;
        default:
          students = [];
      }
    } else {
      students = [...inboundStudents, ...outboundStudents, ...reboundStudents];
    }

    return students.filter((student) => student.name.toLowerCase().includes(lowerQuery));
  }, [query, type]);
}

/**
 * Get students by country
 */
export function useStudentsByCountry(countryCode: string, type: StudentType): Student[] {
  return useMemo(() => {
    let students: Student[];
    switch (type) {
      case "inbound":
        students = inboundStudents;
        break;
      case "outbound":
        students = outboundStudents;
        break;
      case "rebound":
        students = reboundStudents;
        break;
      default:
        return [];
    }

    if (type === "inbound") {
      return students.filter((s) => s.homeCountryCode === countryCode);
    } else {
      return students.filter((s) => s.hostCountryCode === countryCode);
    }
  }, [countryCode, type]);
}
