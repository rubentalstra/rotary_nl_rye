/**
 * News data utilities
 *
 * Note: News is fetched from remote API, not local files.
 * See features/news/api/fetchNews.ts for the API implementation.
 *
 * Remote URL: https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/news/news.json
 */

import type { NewsItem } from "../types";

/**
 * Get PDF news items from a list
 */
export function getPdfNewsItems(items: NewsItem[]): NewsItem[] {
  return items.filter((item) => item.isPdf);
}

/**
 * Get text news items from a list
 */
export function getTextNewsItems(items: NewsItem[]): NewsItem[] {
  return items.filter((item) => !item.isPdf && item.textContent);
}

/**
 * Get a single news item by ID from a list
 */
export function getNewsItemById(items: NewsItem[], id: number): NewsItem | undefined {
  return items.find((item) => item.id === id);
}
