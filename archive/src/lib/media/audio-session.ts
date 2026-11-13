import { setAudioModeAsync, type AudioMode } from "expo-audio";

const FOREGROUND_MODE: Partial<AudioMode> = {
  playsInSilentMode: true,
  shouldPlayInBackground: false,
  interruptionMode: "doNotMix",
  allowsRecording: false,
};

let configured = false;

export async function ensureAudioSession(): Promise<void> {
  if (configured) return;
  await setAudioModeAsync(FOREGROUND_MODE);
  configured = true;
}
