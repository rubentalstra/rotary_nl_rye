/**
 * API for fetching camps and tours data from XLSX
 */

import * as XLSX from "xlsx";
import { env } from "@/core/config/env";
import { getCountryName } from "@/shared/utils/flags";
import type { Camp, CountryWithCode } from "../types";

interface FetchCampsResult {
  camps: Camp[];
  countries: CountryWithCode[];
}

/**
 * Parse date from string (DD/MM/YYYY or DD-MM-YYYY) or Excel serial number
 */
function parseDateParts(dateValue: string | number): Date | null {
  // Handle Excel serial date number
  if (typeof dateValue === "number") {
    // Excel serial date: days since 1899-12-30
    const excelEpoch = new Date(1899, 11, 30);
    const msPerDay = 24 * 60 * 60 * 1000;
    return new Date(excelEpoch.getTime() + dateValue * msPerDay);
  }

  // Handle string date format
  const dateStr = String(dateValue);
  const parts = dateStr.split(/[/\-]/);
  if (parts.length !== 3) return null;

  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed
  const year = parseInt(parts[2], 10);

  return new Date(year, month, day);
}

/**
 * Normalize date to DD/MM/YYYY string format
 */
function normalizeDateString(dateValue: string | number): string {
  if (dateValue === "" || dateValue === null || dateValue === undefined) {
    return "";
  }

  const date = parseDateParts(dateValue);
  if (!date || isNaN(date.getTime())) {
    return typeof dateValue === "string" ? dateValue : "";
  }

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

/**
 * Sort camps chronologically by start date
 */
function sortCampsByDate(camps: Camp[]): Camp[] {
  return [...camps].sort((a, b) => {
    const dateA = parseDateParts(a.startDate);
    const dateB = parseDateParts(b.startDate);

    if (!dateA || !dateB) return 0;
    return dateA.getTime() - dateB.getTime();
  });
}

/**
 * Extract unique countries with their codes from camps data
 * Uses getCountryName to resolve country names from codes
 */
function extractCountries(camps: Camp[]): CountryWithCode[] {
  const countriesMap = new Map<string, string>();

  camps.forEach((camp) => {
    // Country codes can be space or comma separated
    const codes = camp.hostCountryCode
      .split(/[\s,]+/)
      .map((c) => c.trim().toLowerCase())
      .filter(Boolean);

    codes.forEach((code) => {
      if (!countriesMap.has(code)) {
        countriesMap.set(code, getCountryName(code));
      }
    });
  });

  return Array.from(countriesMap.entries())
    .map(([code, country]) => ({ code, country }))
    .sort((a, b) => a.country.localeCompare(b.country));
}

/**
 * Get cell value as string, handling undefined/null
 */
function getCellString(value: unknown): string {
  if (value === null || value === undefined) return "";
  return String(value).trim();
}

/**
 * Fetch and parse camps data from XLSX
 *
 * XLSX column mapping (0-indexed):
 * [0] startdatum_dd_mm_jjjj -> startDate
 * [1] einddatum_dd_mm_jjjj -> endDate
 * [2] kamp_titel -> title
 * [3] landcode_iso3166_1_alpha2 -> hostCountryCode
 * [4] gastdistrict -> hostDistrict
 * [5] leeftijd_min -> ageMin
 * [6] leeftijd_max -> ageMax
 * [7] valuta_iso4217 -> currency
 * [8] Kosten -> contribution
 * [9] volgeboekt -> isFull (marked with 'x')
 * [10] link_pdf_of_website -> invitation
 */
export async function fetchCamps(): Promise<FetchCampsResult> {
  const response = await fetch(env.campsXlsxUrl, {
    headers: {
      "Cache-Control": "no-cache",
    },
  });

  if (!response.ok) {
    throw new Error("Kan XLSX-gegevens niet laden");
  }

  // Fetch as ArrayBuffer for binary XLSX data
  const arrayBuffer = await response.arrayBuffer();

  // Parse the XLSX workbook
  const workbook = XLSX.read(arrayBuffer, { type: "array" });

  // Get the first sheet
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];

  // Convert sheet to array of arrays (each row is an array)
  const rows: unknown[][] = XLSX.utils.sheet_to_json(worksheet, {
    header: 1, // Return array of arrays instead of objects
    defval: "", // Default value for empty cells
  });

  // Skip header row (index 0) and convert to Camp objects
  const camps: Camp[] = rows
    .slice(1)
    .filter((row) => row.length > 0 && row[2]) // Skip empty rows, require title
    .map((row, index) => ({
      id: `camp-${index}-${getCellString(row[2]) || "unknown"}`,
      startDate: normalizeDateString(row[0] as string | number),
      endDate: normalizeDateString(row[1] as string | number),
      title: getCellString(row[2]),
      hostCountryCode: getCellString(row[3]).toLowerCase(),
      hostDistrict: getCellString(row[4]),
      ageMin: getCellString(row[5]),
      ageMax: getCellString(row[6]),
      currency: getCellString(row[7]).toUpperCase() || "EUR",
      contribution: getCellString(row[8]),
      invitation: getCellString(row[10]),
      isFull: getCellString(row[9]).toLowerCase() === "x",
    }));

  // Sort camps chronologically
  const sortedCamps = sortCampsByDate(camps);

  // Extract unique countries
  const countries = extractCountries(camps);

  return {
    camps: sortedCamps,
    countries,
  };
}

/**
 * Check if a camp is in the past
 */
export function isCampPast(camp: Camp): boolean {
  const endDate = parseDateParts(camp.endDate);
  if (!endDate) return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return endDate < today;
}
