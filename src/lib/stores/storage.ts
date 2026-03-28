import { MMKV } from "react-native-mmkv";
import type { StateStorage } from "zustand/middleware";

/** Shared MMKV instance for all persisted stores */
export const mmkv = new MMKV({ id: "rotary-yep-nl" });

/** Zustand-compatible storage adapter for MMKV */
export const mmkvStorage: StateStorage = {
  getItem: (name) => mmkv.getString(name) ?? null,
  setItem: (name, value) => mmkv.set(name, value),
  removeItem: (name) => mmkv.delete(name),
};
