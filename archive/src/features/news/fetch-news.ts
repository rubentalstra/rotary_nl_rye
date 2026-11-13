import { getCached, setCache } from "@/lib/cache/file-cache";
import { convertRawNewsItem, type NewsItem, type RawNewsItem } from "./types";

const NEWS_URL =
  "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/news/news.json";

const CACHE_KEY = "news-items";
const CACHE_TTL_MINUTES = 30;

interface NewsApiResponse {
  news: RawNewsItem[];
}

export async function fetchNewsItems(): Promise<NewsItem[]> {
  const cached = await getCached<NewsItem[]>(CACHE_KEY);
  if (cached) {
    return cached;
  }

  const response = await fetch(NEWS_URL);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data: NewsApiResponse = await response.json();
  const newsItems = data.news.map(convertRawNewsItem);
  await setCache(CACHE_KEY, newsItems, CACHE_TTL_MINUTES);
  return newsItems;
}

export async function fetchNewsItemById(id: number): Promise<NewsItem | undefined> {
  const items = await fetchNewsItems();
  return items.find((item) => item.id === id);
}

export async function refreshNews(): Promise<NewsItem[]> {
  const response = await fetch(NEWS_URL);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data: NewsApiResponse = await response.json();
  const newsItems = data.news.map(convertRawNewsItem);
  await setCache(CACHE_KEY, newsItems, CACHE_TTL_MINUTES);
  return newsItems;
}
