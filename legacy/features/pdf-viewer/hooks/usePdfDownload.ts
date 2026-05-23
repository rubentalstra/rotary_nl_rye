/**
 * PDF download hook
 * Handles downloading and caching PDFs using expo-file-system
 */

import { useState, useEffect, useCallback } from "react";
import { File, Paths } from "expo-file-system";
import type { PdfDownloadState } from "../types";

interface UsePdfDownloadOptions {
  url: string | undefined;
  autoDownload?: boolean;
}

interface UsePdfDownloadResult extends PdfDownloadState {
  download: () => Promise<void>;
  setPageInfo: (current: number, total: number) => void;
  setError: (error: string) => void;
}

export function usePdfDownload({
  url,
  autoDownload = true,
}: UsePdfDownloadOptions): UsePdfDownloadResult {
  const [state, setState] = useState<PdfDownloadState>({
    loading: true,
    error: null,
    localFilePath: null,
    currentPage: 0,
    totalPages: 0,
  });

  const download = useCallback(async () => {
    if (!url) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: "No PDF URL provided",
      }));
      return;
    }

    try {
      setState((prev) => ({
        ...prev,
        loading: true,
        error: null,
      }));

      // Generate filename from URL or use default
      const filename = url.split("/").pop()?.split("?")[0] || "document.pdf";
      // Use Documents directory for sharing compatibility
      const file = new File(Paths.document, "pdfs", filename);

      // Check if file already exists
      if (file.exists) {
        setState((prev) => ({
          ...prev,
          loading: false,
          localFilePath: file.uri,
        }));
        return;
      }

      // Safely create directory if it doesn't exist
      try {
        if (!file.parentDirectory.exists) {
          file.parentDirectory.create();
        }
      } catch {
        // Directory might already exist or be created by another process
      }

      // Download the PDF
      const downloadedFile = await File.downloadFileAsync(url, file.parentDirectory);

      setState((prev) => ({
        ...prev,
        loading: false,
        localFilePath: downloadedFile.uri,
      }));
    } catch (error) {
      console.error("PDF download error:", error);
      setState((prev) => ({
        ...prev,
        loading: false,
        error: "Failed to load PDF",
      }));
    }
  }, [url]);

  const setPageInfo = useCallback((current: number, total: number) => {
    setState((prev) => ({
      ...prev,
      currentPage: current,
      totalPages: total,
      loading: prev.loading && total > 0 ? false : prev.loading,
    }));
  }, []);

  const setError = useCallback((error: string) => {
    setState((prev) => ({
      ...prev,
      loading: false,
      error,
    }));
  }, []);

  // Auto download on mount if enabled
  useEffect(() => {
    if (autoDownload) {
      download();
    }
  }, [download, autoDownload]);

  return {
    ...state,
    download,
    setPageInfo,
    setError,
  };
}
