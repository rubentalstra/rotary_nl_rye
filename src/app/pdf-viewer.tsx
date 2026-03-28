/**
 * PDF Viewer screen route
 * Thin wrapper using the pdf-viewer feature module
 */

import { useCallback, useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useNavigation } from "expo-router";
import PdfRendererView from "react-native-pdf-renderer";
import { useTheme } from "@/core/theme";
import { ErrorState, LoadingState } from "@/shared/components/feedback";
import { PdfHeaderTitle, PdfShareButton, usePdfDownload, usePdfShare } from "@/features/pdf-viewer";

export default function PDFViewerScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const { url, title } = useLocalSearchParams<{ url: string; title: string }>();

  const {
    localFilePath,
    loading,
    error,
    download,
    setPageInfo,
    setError,
    currentPage,
    totalPages,
  } = usePdfDownload({
    url,
    autoDownload: true,
  });
  const { share, canShare } = usePdfShare({ filePath: localFilePath, title });

  const handlePageChange = useCallback(
    (current: number, total: number) => {
      setPageInfo(current, total);
    },
    [setPageInfo],
  );

  const handleError = useCallback(
    (err?: string) => {
      console.error("PDF rendering error:", err);
      setError(err || "Failed to render PDF");
    },
    [setError],
  );

  // Configure navigation header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <PdfHeaderTitle
          title={title || "PDF Document"}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      ),
      headerRight: () => (canShare && !loading ? <PdfShareButton onPress={share} /> : null),
    });
  }, [navigation, title, canShare, loading, currentPage, totalPages, share]);

  if (error) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: colors.background }]}
        edges={["bottom"]}
      >
        <ErrorState message={error} onRetry={download} />
      </SafeAreaView>
    );
  }

  if (loading || !localFilePath) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: colors.background }]}
        edges={["bottom"]}
      >
        <LoadingState message="PDF laden..." />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
      edges={["bottom"]}
    >
      <View style={styles.pdfContainer}>
        <PdfRendererView
          source={localFilePath}
          style={styles.pdf}
          distanceBetweenPages={16}
          maxZoom={20}
          maxPageResolution={2048}
          onPageChange={handlePageChange}
          onError={handleError}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pdfContainer: {
    flex: 1,
  },
  pdf: {
    flex: 1,
  },
});
