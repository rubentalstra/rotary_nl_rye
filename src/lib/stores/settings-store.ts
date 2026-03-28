import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { mmkvStorage } from "./storage";

interface SettingsState {
  hasRequestedReview: boolean;
  appOpenCount: number;
  incrementAppOpen: () => void;
  setReviewRequested: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      hasRequestedReview: false,
      appOpenCount: 0,
      incrementAppOpen: () =>
        set((state) => ({ appOpenCount: state.appOpenCount + 1 })),
      setReviewRequested: () => set({ hasRequestedReview: true }),
    }),
    {
      name: "settings",
      storage: createJSONStorage(() => mmkvStorage),
    },
  ),
);
