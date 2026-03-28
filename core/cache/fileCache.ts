/**
 * File-based caching utility using expo-file-system
 * Provides persistent caching with TTL support
 */

import { File, Directory, Paths } from "expo-file-system";

// Cache directory using the new API
const CACHE_DIR = new Directory(Paths.cache, "data");

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
}

/**
 * Ensure cache directory exists
 */
function ensureCacheDir(): void {
  try {
    if (!CACHE_DIR.exists) {
      CACHE_DIR.create();
    }
  } catch {
    // Directory might already exist
  }
}

/**
 * Get cached data by key
 * Returns null if not found or expired
 */
export async function getCached<T>(key: string): Promise<T | null> {
  try {
    const file = new File(CACHE_DIR, `${key}.json`);

    if (!file.exists) {
      return null;
    }

    const content = await file.text();
    const entry: CacheEntry<T> = JSON.parse(content);

    // Check if expired
    if (Date.now() > entry.expiresAt) {
      file.delete();
      return null;
    }

    return entry.data;
  } catch {
    return null;
  }
}

/**
 * Set cache data with TTL
 * @param key - Cache key
 * @param data - Data to cache
 * @param ttlMinutes - Time to live in minutes (default: 10)
 */
export async function setCache<T>(key: string, data: T, ttlMinutes: number = 10): Promise<void> {
  try {
    ensureCacheDir();

    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      expiresAt: Date.now() + ttlMinutes * 60 * 1000,
    };

    const file = new File(CACHE_DIR, `${key}.json`);
    file.write(JSON.stringify(entry));
  } catch (error) {
    console.warn("Cache write failed:", error);
  }
}

/**
 * Clear cache by key or all cache
 * @param key - Optional key to clear specific cache
 */
export async function clearCache(key?: string): Promise<void> {
  try {
    if (key) {
      const file = new File(CACHE_DIR, `${key}.json`);
      if (file.exists) {
        file.delete();
      }
    } else {
      if (CACHE_DIR.exists) {
        CACHE_DIR.delete();
      }
    }
  } catch {
    // Ignore errors
  }
}

/**
 * Check if cache exists and is valid
 */
export async function isCacheValid(key: string): Promise<boolean> {
  try {
    const file = new File(CACHE_DIR, `${key}.json`);

    if (!file.exists) {
      return false;
    }

    const content = await file.text();
    const entry: CacheEntry<unknown> = JSON.parse(content);

    return Date.now() <= entry.expiresAt;
  } catch {
    return false;
  }
}

/**
 * Get cache age in milliseconds
 * Returns null if cache doesn't exist
 */
export async function getCacheAge(key: string): Promise<number | null> {
  try {
    const file = new File(CACHE_DIR, `${key}.json`);

    if (!file.exists) {
      return null;
    }

    const content = await file.text();
    const entry: CacheEntry<unknown> = JSON.parse(content);

    return Date.now() - entry.timestamp;
  } catch {
    return null;
  }
}
