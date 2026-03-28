/**
 * Programs hooks for accessing program data
 */

import { useMemo } from "react";
import { programSections, allPrograms, getProgramById, introText } from "../data";
import type { ProgramItem, ProgramSection } from "../types";

/**
 * Get all program sections
 */
export function useProgramSections(): {
  sections: ProgramSection[];
  introText: string;
} {
  return useMemo(
    () => ({
      sections: programSections,
      introText,
    }),
    [],
  );
}

/**
 * Get a single program by ID
 */
export function useProgram(id: string): ProgramItem | undefined {
  return useMemo(() => getProgramById(id), [id]);
}

/**
 * Get all programs as flat list
 */
export function useAllPrograms(): ProgramItem[] {
  return allPrograms;
}
