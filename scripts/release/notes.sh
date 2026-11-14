#!/usr/bin/env bash
# scripts/release/notes.sh vX.Y.Z | vX.Y.Z-beta.N [ios | android]
#
# Prints the release notes of a version, without blank lines at the start
# and end: for a final version its section of CHANGELOG.md, for a test
# version the section the fragments in changelog.d/ would become (without
# its heading). Taken from Pullwatch.
#
# The changelog is one for both apps: an entry about the Android app starts
# with "Android: ". With a platform, only that app's entries are printed:
# for ios every entry but those, for android only those, without the
# prefix. A heading whose entries are all left out goes too.
set -euo pipefail
tag="${1:?usage: notes.sh vX.Y.Z | vX.Y.Z-beta.N [ios | android]}"
platform="${2:-}"
case "$platform" in "" | ios | android) ;; *)
  echo "platform '$platform' is not ios or android" >&2
  exit 1
  ;;
esac
version="${tag#v}"
here="$(cd "$(dirname "$0")" && pwd)"

section() {
  if [[ "$version" == *-beta.* ]]; then
    bash "$here/changelog.sh" --preview "${version%%-beta.*}" | tail -n +2
    return
  fi
  # The section runs to the next version heading or the link references below.
  awk -v v="$version" '
    index($0, "## [" v "]") == 1 { on = 1; next }
    on && (/^## \[/ || /^\[[^]]+\]: /) { exit }
    on { print }
  ' "$here/../../CHANGELOG.md"
}

for_platform() {
  if [ -z "$platform" ]; then
    cat
    return
  fi
  awk -v p="$platform" '
    function flush_item(   keep, rest) {
      if (item == "") return
      keep = (p == "android") ? (item ~ /^- Android: /) : (item !~ /^- Android: /)
      if (keep) {
        if (p == "android") {
          rest = substr(item, 12)
          item = "- " toupper(substr(rest, 1, 1)) substr(rest, 2)
        }
        body = body item "\n"
      }
      item = ""
    }
    function flush_section() {
      flush_item()
      if (body != "") out = out (out == "" ? "" : "\n") head body
      head = ""; body = ""
    }
    /^### / { flush_section(); head = $0 "\n\n"; next }
    /^- / { flush_item(); item = $0; next }
    /^[[:space:]]+[^[:space:]]/ && item != "" { item = item "\n" $0; next }
    /^[[:space:]]*$/ { flush_item(); next }
    { flush_item(); body = body $0 "\n" }
    END { flush_section(); printf "%s", out }
  '
}

# Without blank lines at the start and end.
section | for_platform | sed -e '/./,$!d' -e :a -e '/^\n*$/{$d;N;ba' -e '}'
