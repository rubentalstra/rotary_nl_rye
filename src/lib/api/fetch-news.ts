/**
 * News API — pure fetch function. Caching handled by TanStack Query.
 */

import type { NewsItem, RawNewsItem } from "@/lib/types";
import { convertRawNewsItem } from "@/lib/types";

const NEWS_URL =
  "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/news/news.json";

interface NewsApiResponse {
  news: RawNewsItem[];
}

export async function fetchNewsItems(): Promise<NewsItem[]> {
  const response = await fetch(NEWS_URL);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data: NewsApiResponse = await response.json();
  return data.news.map(convertRawNewsItem);
}
