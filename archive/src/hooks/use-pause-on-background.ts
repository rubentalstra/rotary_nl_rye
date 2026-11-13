import { useEffect } from "react";
import { AppState } from "react-native";

type Pausable = { pause: () => void };

export function usePauseOnBackground(player: Pausable) {
  useEffect(() => {
    const sub = AppState.addEventListener("change", (state) => {
      if (state !== "active") {
        try {
          player.pause();
        } catch {
          // Player may already be released — safe to ignore.
        }
      }
    });
    return () => sub.remove();
  }, [player]);
}
