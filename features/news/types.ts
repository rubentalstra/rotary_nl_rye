/**
 * News feature types
 */

/**
 * Text content block for news articles
 */
export interface NewsTextBlock {
  heading?: string;
  body?: {
    paragraph?: string[];
    imageUrl?: string;
    videoUrl?: string;
  }[];
}

/**
 * News item interface
 */
export interface NewsItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  isPdf: boolean;
  pdfUrl?: string;
  textContent?: NewsTextBlock[];
}

/**
 * Raw news data from JSON
 */
export interface RawNewsItem {
  id: number;
  title: string;
  description: string;
  images: string;
  isPdf: "yes" | "no";
  pdf: string | null;
  text?: NewsTextBlock[];
}

/**
 * Convert raw news item to normalized format
 */
export function convertRawNewsItem(raw: RawNewsItem): NewsItem {
  return {
    id: raw.id,
    title: raw.title,
    description: raw.description,
    imageUrl: raw.images,
    isPdf: raw.isPdf === "yes",
    pdfUrl: raw.pdf || undefined,
    textContent: raw.text,
  };
}
