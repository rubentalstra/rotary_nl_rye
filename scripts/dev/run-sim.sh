#!/usr/bin/env bash
# scripts/dev/run-sim.sh [device name]
#
# Builds the iOS app, installs it on the simulator (the iPhone 18 Pro Max by
# default) and launches it, with DeviceHub (Xcode 27's simulator window) in front. Run it after a
# change to see it live; a running copy is replaced. Xcode's Cmd-R does the
# same; this is for working outside Xcode.

set -euo pipefail
root="$(git rev-parse --show-toplevel)"
export DEVELOPER_DIR="${DEVELOPER_DIR:-/Applications/Xcode.app/Contents/Developer}"
device="${1:-iPhone 18 Pro Max}"
bundle_id="com.caelitechnologies.rotary-nl-rye"
derived="$root/build/DerivedData"

xcrun simctl boot "$device" 2>/dev/null || true
# Xcode 27 shows simulators in DeviceHub (it replaced the Simulator app).
open -b com.apple.dt.Devices
xcrun simctl bootstatus "$device" -b >/dev/null

xcodebuild build -quiet -project "$root/ios/RotaryYEP.xcodeproj" -scheme RotaryYEP \
  -destination "platform=iOS Simulator,name=$device" -derivedDataPath "$derived" \
  CODE_SIGNING_ALLOWED=NO

xcrun simctl install "$device" "$derived/Build/Products/Debug-iphonesimulator/RotaryYEP.app"
xcrun simctl terminate "$device" "$bundle_id" 2>/dev/null || true
xcrun simctl launch "$device" "$bundle_id" >/dev/null
echo "run-sim: RotaryYEP is running on $device."
