#!/usr/bin/env bash
# scripts/release/notes.sh vX.Y.Z | vX.Y.Z-beta.N
#
# Prints the release notes of a version, without blank lines at the start
# and end: for a final version its section of CHANGELOG.md, for a test
# version the section the fragments in changelog.d/ would become (without
# its heading). Taken from Pullwatch.

set -euo pipefail

tag="${1:?usage: notes.sh vX.Y.Z | vX.Y.Z-beta.N}"
version="${tag#v}"
here="$(cd "$(dirname "$0")" && pwd)"

if [[ "$version" == *-beta.* ]]; then
  bash "$here/changelog.sh" --preview "${version%%-beta.*}" | tail -n +2 | sed -e '/./,$!d' -e :a -e '/^\n*$/{$d;N;ba' -e '}'
  exit 0
fi

# The section runs to the next version heading or the link references below.
awk -v v="$version" '
  index($0, "## [" v "]") == 1 { on = 1; next }
  on && (/^## \[/ || /^\[[^]]+\]: /) { exit }
  on && !started && /^[[:space:]]*$/ { next }
  on { started = 1; print }
' "$here/../../CHANGELOG.md" | sed -e :a -e '/^\n*$/{$d;N;ba' -e '}'
