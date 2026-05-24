import { useCallback, useEffect, useState } from "react";

import { fetchNewsItemById, fetchNewsItems, refreshNews } from "@/features/news/fetch-news";
import type { NewsItem } from "@/features/news/types";

interface UseNewsResult {
  items: NewsItem[];
  count: number;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

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
    // React 19's react-hooks/set-state-in-effect rule flags loadNews here
    // because it calls setState. For async data fetching this is the standard
    // pattern; a Suspense `use()` migration would be the canonical fix but is
    // out of scope for this 1:1 v12 port.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadNews();
  }, [loadNews]);

  return { items, count: items.length, loading, error, refresh };
}

interface UseNewsItemResult {
  item: NewsItem | undefined;
  loading: boolean;
  error: string | null;
}

export function useNewsItem(id: number): UseNewsItemResult {
  const [item, setItem] = useState<NewsItem | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchNewsItemById(id);
        if (!cancelled) {
          setItem(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError("Kon nieuwsitem niet laden");
          console.error("Failed to load news item:", err);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  return { item, loading, error };
}
