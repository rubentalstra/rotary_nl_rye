import * as Application from "expo-application";

/**
 * Native app version + build number, formatted for display.
 *
 * Returns synchronously since `expo-application` reads the values from
 * `Info.plist` / `AndroidManifest.xml` at startup — no async work needed.
 */
export function useAppVersion() {
  const version = Application.nativeApplicationVersion ?? "Unknown";
  const buildNumber = Application.nativeBuildVersion ?? "";
  const formattedVersion = buildNumber ? `${version} (${buildNumber})` : version;
  return { version, buildNumber, formattedVersion };
}
