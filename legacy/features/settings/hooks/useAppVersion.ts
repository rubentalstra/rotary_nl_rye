/**
 * Use app version hook
 */

import { useState, useEffect } from "react";
import * as Application from "expo-application";

export function useAppVersion() {
  const [version, setVersion] = useState<string>("Loading...");
  const [buildNumber, setBuildNumber] = useState<string>("");

  useEffect(() => {
    const versionString = Application.nativeApplicationVersion || "Unknown";
    const build = Application.nativeBuildVersion || "";

    setVersion(versionString);
    setBuildNumber(build);
  }, []);

  const formattedVersion = buildNumber ? `${version} (${buildNumber})` : version;

  return {
    version,
    buildNumber,
    formattedVersion,
  };
}
