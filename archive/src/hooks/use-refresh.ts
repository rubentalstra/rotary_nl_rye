/**
 * Pull-to-refresh state with a minimum-duration floor for smoother UX.
 */

import { useCallback, useState } from "react";

interface UseRefreshOptions {
  onRefresh: () => Promise<void>;
  /** Minimum duration the spinner stays visible, ms */
  minDuration?: number;
}

interface UseRefreshReturn {
  refreshing: boolean;
  handleRefresh: () => void;
}

export function useRefresh({ onRefresh, minDuration = 500 }: UseRefreshOptions): UseRefreshReturn {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    const startTime = Date.now();

    try {
      await onRefresh();
    } finally {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, minDuration - elapsed);
      setTimeout(() => setRefreshing(false), remaining);
    }
  }, [onRefresh, minDuration]);

  return { refreshing, handleRefresh };
}
