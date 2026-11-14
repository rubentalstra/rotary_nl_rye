#!/usr/bin/env bash
# scripts/release/release.sh: archives the app and uploads it to App Store
# Connect, signed by Apple's cloud signing. One App Store Connect API key
# (Admin role) does it all: xcodebuild uses it to get the distribution
# certificate and profile and to upload; nothing is kept in a keychain. The
# release lane runs it; the maintainer can run it on his Mac the same way.
#
# Environment:
#   BUILD_NUMBER   CFBundleVersion of this upload; higher than every build
#                  App Store Connect has (app-store-connect.swift next-build-number)
#   ASC_KEY_FILE   path to the API key (.p8)
#   ASC_KEY_ID     the key's ID
#   ASC_ISSUER_ID  the issuer ID of the team's keys
#
# Leaves build/release/RotaryYEP.xcarchive (with the dSYMs) behind.

set -euo pipefail

: "${BUILD_NUMBER:?BUILD_NUMBER is not set}"
: "${ASC_KEY_FILE:?ASC_KEY_FILE is not set}"
: "${ASC_KEY_ID:?ASC_KEY_ID is not set}"
: "${ASC_ISSUER_ID:?ASC_ISSUER_ID is not set}"
[[ "$BUILD_NUMBER" =~ ^[0-9]+$ ]] || { echo "BUILD_NUMBER '$BUILD_NUMBER' is not a whole number" >&2; exit 1; }

here="$(cd "$(dirname "$0")" && pwd)"
cd "$here/../.."

out=build/release
archive="$out/RotaryYEP.xcarchive"
auth=(
  -allowProvisioningUpdates
  -authenticationKeyPath "$ASC_KEY_FILE"
  -authenticationKeyID "$ASC_KEY_ID"
  -authenticationKeyIssuerID "$ASC_ISSUER_ID"
)

mkdir -p "$out"
xcodebuild archive \
  -project ios/RotaryYEP.xcodeproj \
  -scheme RotaryYEP \
  -configuration Release \
  -destination 'generic/platform=iOS' \
  -archivePath "$archive" \
  -derivedDataPath build/DerivedData-release \
  CURRENT_PROJECT_VERSION="$BUILD_NUMBER" \
  "${auth[@]}"

# destination "upload" in the export options sends the signed app straight
# to App Store Connect; nothing is written to disk but the log.
xcodebuild -exportArchive \
  -archivePath "$archive" \
  -exportOptionsPlist "$here/ExportOptions.plist" \
  -exportPath "$out/export" \
  "${auth[@]}"

echo "uploaded build $BUILD_NUMBER to App Store Connect"
