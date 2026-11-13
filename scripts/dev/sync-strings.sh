#!/usr/bin/env bash
# scripts/dev/sync-strings.sh
#
# Builds the app and writes every string the compiler extracted into the
# String Catalogs: the app's and each kit module's Localizable.xcstrings.
# Xcode does this on every build in the IDE; xcodebuild only extracts, so
# run this after changing user-facing text outside Xcode, then add the
# English for each new entry (the keys are Dutch) and
# build again. LocalizationTests fails while any entry misses a language.

set -euo pipefail
root="$(git rev-parse --show-toplevel)"
here="$(cd "$(dirname "$0")" && pwd)"
export DEVELOPER_DIR="${DEVELOPER_DIR:-/Applications/Xcode.app/Contents/Developer}"
# Fixed: catalog-tidy.py finds the extracted text here by itself.
derived="$root/build/DerivedData"

build=(-project "$root/ios/RotaryYEP.xcodeproj" -scheme RotaryYEP -configuration Debug
  -destination 'platform=iOS Simulator,name=iPhone 18 Pro Max' -derivedDataPath "$derived"
  CODE_SIGNING_ALLOWED=NO)
if [ -n "${SPM:-}" ]; then build+=(-clonedSourcePackagesDirPath "$SPM"); fi
xcodebuild build -quiet "${build[@]}"

intermediates="$derived/Build/Intermediates.noindex"
# Only this Mac's architecture, the one built above: files from an earlier
# build for another architecture would keep text alive that left the code.
arch="$(uname -m)"
sync() {
  local catalog="$1" built="$2"
  local data=()
  while IFS= read -r f; do data+=("$f"); done < <(find "$intermediates/$built" -path "*/Objects-normal/$arch/*" -name '*.stringsdata')
  if ((${#data[@]})); then
    xcrun xcstringstool sync "$catalog" --stringsdata "${data[@]}"
  fi
}
sync "$root/ios/RotaryYEP/Localizable.xcstrings" "RotaryYEP.build/Debug-iphonesimulator/RotaryYEP.build"
# Every RotaryKit module with a catalog of its own; Xcode builds the module in
# RotaryKit.build/Debug-iphonesimulator/<Module>-t.build.
shopt -s nullglob
for catalog in "$root"/ios/RotaryKit/Sources/*/Localizable.xcstrings; do
  module="$(basename "$(dirname "$catalog")")"
  if [ ! -d "$intermediates/RotaryKit.build/Debug-iphonesimulator/$module-t.build" ]; then
    echo "sync-strings: no build output for $module; is it linked by the app?" >&2
    exit 1
  fi
  sync "$catalog" "RotaryKit.build/Debug-iphonesimulator/$module-t.build"
done
# Then: drop from every catalog each entry the compiler no longer extracts
# (stale or never marked), and write `"key": value` with sorted keys as the
# catalogs here are (xcstringstool writes `"key" : value`), so a diff shows
# only real changes. An entry with "shouldTranslate": false stays.
python3 -I "$here/catalog-tidy.py"
