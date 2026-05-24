/**
 * News API - Fetches news from remote server
 */

import { getCached, setCache } from "@/core/cache";
import type { NewsItem, RawNewsItem } from "../types";
import { convertRawNewsItem } from "../types";

const NEWS_URL =
  "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/news/news.json";

const CACHE_KEY = "news-items";
const CACHE_TTL_MINUTES = 30; // Cache for 30 minutes

interface NewsApiResponse {
  news: RawNewsItem[];
}

/**
 * Fetch news items from the remote API
 * Uses caching to minimize network requests
 */
export async function fetchNewsItems(): Promise<NewsItem[]> {
  // Try to get from cache first
  const cached = await getCached<NewsItem[]>(CACHE_KEY);
  if (cached) {
    return cached;
  }

  // Fetch from remote
  try {
    const response = await fetch(NEWS_URL);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: NewsApiResponse = await response.json();

    // Convert raw items to normalized format
    const newsItems = data.news.map(convertRawNewsItem);

    // Cache the result
    await setCache(CACHE_KEY, newsItems, CACHE_TTL_MINUTES);

    return newsItems;
  } catch (error) {
    console.error("Failed to fetch news:", error);
    throw error;
  }
}

/**
 * Fetch a single news item by ID
 */
export async function fetchNewsItemById(id: number): Promise<NewsItem | undefined> {
  const items = await fetchNewsItems();
  return items.find((item) => item.id === id);
}

/**
 * Force refresh news from the API (bypass cache)
 */
export async function refreshNews(): Promise<NewsItem[]> {
  try {
    const response = await fetch(NEWS_URL);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: NewsApiResponse = await response.json();
    const newsItems = data.news.map(convertRawNewsItem);

    // Update cache
    await setCache(CACHE_KEY, newsItems, CACHE_TTL_MINUTES);

    return newsItems;
  } catch (error) {
    console.error("Failed to refresh news:", error);
    throw error;
  }
}
