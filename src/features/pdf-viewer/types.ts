/**
 * PDF Viewer feature types
 */

/**
 * PDF download state
 */
export interface PdfDownloadState {
  loading: boolean;
  error: string | null;
  localFilePath: string | null;
  currentPage: number;
  totalPages: number;
}

/**
 * PDF viewer params (from navigation)
 */
export interface PdfViewerParams {
  url: string;
  title: string;
}
