import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { fetchNewsItems } from "@/lib/api/fetch-news";
export function useNews() {
  return useQuery({
    queryKey: ["news"],
    queryFn: fetchNewsItems,
    staleTime: 30 * 60_000,
  });
}

export function useNewsItem(id: number) {
  const { data: items, ...rest } = useNews();
  const item = useMemo(() => items?.find((i) => i.id === id), [items, id]);
  return { data: item, ...rest };
}

export function useSearchNews(query: string) {
  const { data: items } = useNews();
  return useMemo(() => {
    if (!items || !query.trim()) return items ?? [];
    const lower = query.toLowerCase();
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(lower) ||
        item.description.toLowerCase().includes(lower),
    );
  }, [items, query]);
}

export function useNewsFilteredByType(type: "pdf" | "text") {
  const { data: items } = useNews();
  return useMemo(() => {
    if (!items) return [];
    return type === "pdf"
      ? items.filter((i) => i.isPdf)
      : items.filter((i) => !i.isPdf && i.textContent);
  }, [items, type]);
}
