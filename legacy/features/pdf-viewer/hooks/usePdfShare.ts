/**
 * PDF share hook
 */

import { useCallback } from "react";
import { Share, Alert } from "react-native";

interface UsePdfShareOptions {
  filePath: string | null;
  title?: string;
}

export function usePdfShare({ filePath, title }: UsePdfShareOptions) {
  const share = useCallback(async () => {
    if (!filePath) return;

    try {
      await Share.share(
        {
          url: filePath,
          title: title || "PDF Document",
        },
        {
          dialogTitle: `Share ${title || "PDF Document"}`,
        },
      );
    } catch {
      Alert.alert("Share Error", "Failed to share the PDF file.");
    }
  }, [filePath, title]);

  return {
    share,
    canShare: Boolean(filePath),
  };
}
