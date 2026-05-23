/**
 * News feature - Public API
 *
 * This module provides components and hooks for displaying news items,
 * including both PDF documents and text-based articles.
 * News is fetched from a remote API with caching.
 */

// Components
export { NewsCard, NewsDetail, NewsList } from "./components";

// Hooks
export { useNews, useNewsItem, useSearchNews, useNewsFilteredByType } from "./hooks";

// API
export { fetchNewsItems, fetchNewsItemById, refreshNews } from "./api";

// Data utilities
export { getNewsItemById, getPdfNewsItems, getTextNewsItems } from "./data";

// Types
export type { NewsItem, NewsTextBlock, RawNewsItem } from "./types";
export { convertRawNewsItem } from "./types";
