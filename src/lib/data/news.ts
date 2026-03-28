import type { NewsItem } from "@/lib/types";

export function getPdfNewsItems(items: NewsItem[]): NewsItem[] {
  return items.filter((item) => item.isPdf);
}

export function getTextNewsItems(items: NewsItem[]): NewsItem[] {
  return items.filter((item) => !item.isPdf && item.textContent);
}

export function getNewsItemById(items: NewsItem[], id: number): NewsItem | undefined {
  return items.find((item) => item.id === id);
}
