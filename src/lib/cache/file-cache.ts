/**
 * File-based TTL cache backed by `expo-file-system`. Each key is stored as a
 * JSON file under <cacheDir>/data/. Lookups verify the embedded `expiresAt`
 * timestamp and self-evict expired entries.
 *
 * SDK 56 note: `File.copy()` and `File.move()` are now async; we don't use them
 * here. `write()` / `text()` / `delete()` remain synchronous.
 */

import { Directory, File, Paths } from "expo-file-system";

const CACHE_DIR = new Directory(Paths.cache, "data");

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
}

function ensureCacheDir(): void {
  try {
    if (!CACHE_DIR.exists) {
      CACHE_DIR.create();
    }
  } catch {
    // Directory may already exist from a concurrent writer.
  }
}

export async function getCached<T>(key: string): Promise<T | null> {
  try {
    const file = new File(CACHE_DIR, `${key}.json`);
    if (!file.exists) {
      return null;
    }

    const content = await file.text();
    const entry: CacheEntry<T> = JSON.parse(content);

    if (Date.now() > entry.expiresAt) {
      file.delete();
      return null;
    }

    return entry.data;
  } catch {
    return null;
  }
}

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

export async function clearCache(key?: string): Promise<void> {
  try {
    if (key) {
      const file = new File(CACHE_DIR, `${key}.json`);
      if (file.exists) {
        file.delete();
      }
    } else if (CACHE_DIR.exists) {
      CACHE_DIR.delete();
    }
  } catch {
    // Ignore — best-effort eviction.
  }
}

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
