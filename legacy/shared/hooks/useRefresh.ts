/**
 * Pull-to-refresh hook
 * Provides state and handlers for pull-to-refresh functionality
 */

import { useState, useCallback } from "react";

interface UseRefreshOptions {
  /** Callback function to execute on refresh */
  onRefresh: () => Promise<void>;
  /** Minimum duration to show refresh indicator (ms) */
  minDuration?: number;
}

interface UseRefreshReturn {
  /** Whether currently refreshing */
  refreshing: boolean;
  /** Handler to trigger refresh */
  handleRefresh: () => void;
}

/**
 * Hook for pull-to-refresh functionality
 * Handles refresh state and ensures minimum duration for UX
 */
export function useRefresh({ onRefresh, minDuration = 500 }: UseRefreshOptions): UseRefreshReturn {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);

    const startTime = Date.now();

    try {
      await onRefresh();
    } finally {
      // Ensure minimum duration for better UX
      const elapsed = Date.now() - startTime;
      const remainingTime = Math.max(0, minDuration - elapsed);

      setTimeout(() => {
        setRefreshing(false);
      }, remainingTime);
    }
  }, [onRefresh, minDuration]);

  return {
    refreshing,
    handleRefresh,
  };
}
