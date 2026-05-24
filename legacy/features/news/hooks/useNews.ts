/**
 * News hooks for accessing and filtering news items
 * Fetches data from remote API with caching
 */

import { useState, useEffect, useCallback, useMemo } from "react";
import { fetchNewsItems, fetchNewsItemById, refreshNews } from "../api";
import type { NewsItem } from "../types";

interface UseNewsResult {
  items: NewsItem[];
  count: number;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

/**
 * Get all news items from remote API
 */
export function useNews(): UseNewsResult {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadNews = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchNewsItems();
      setItems(data);
    } catch (err) {
      setError("Kon nieuws niet laden");
      console.error("Failed to load news:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await refreshNews();
      setItems(data);
    } catch (err) {
      setError("Kon nieuws niet verversen");
      console.error("Failed to refresh news:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadNews();
  }, [loadNews]);

  return {
    items,
    count: items.length,
    loading,
    error,
    refresh,
  };
}

interface UseNewsItemResult {
  item: NewsItem | undefined;
  loading: boolean;
  error: string | null;
}

/**
 * Get a single news item by ID
 */
export function useNewsItem(id: number): UseNewsItemResult {
  const [item, setItem] = useState<NewsItem | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadItem = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchNewsItemById(id);
        setItem(data);
      } catch (err) {
        setError("Kon nieuwsitem niet laden");
        console.error("Failed to load news item:", err);
      } finally {
        setLoading(false);
      }
    };

    loadItem();
  }, [id]);

  return { item, loading, error };
}

/**
 * Search news items by title or description
 */
export function useSearchNews(items: NewsItem[], query: string): NewsItem[] {
  return useMemo(() => {
    if (!query.trim()) return items;

    const lowerQuery = query.toLowerCase();
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(lowerQuery) ||
        item.description.toLowerCase().includes(lowerQuery),
    );
  }, [items, query]);
}

/**
 * Get news items filtered by type (PDF or text)
 */
export function useNewsFilteredByType(items: NewsItem[], type: "all" | "pdf" | "text"): NewsItem[] {
  return useMemo(() => {
    switch (type) {
      case "pdf":
        return items.filter((item) => item.isPdf);
      case "text":
        return items.filter((item) => !item.isPdf);
      default:
        return items;
    }
  }, [items, type]);
}
