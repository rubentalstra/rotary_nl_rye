#!/usr/bin/env bash
# scripts/release/check-version.sh vX.Y.Z | vX.Y.Z-beta.N
#
# The release plan (taken from Pullwatch): the tag names the app's version
# (MARKETING_VERSION in ios/App.xcconfig). A final version needs its own
# "## [X.Y.Z] - YYYY-MM-DD" section in CHANGELOG.md, with text in it, and no
# fragments left in changelog.d/ (changelog.sh --assemble wrote them in). A
# test version (vX.Y.Z-beta.N, TestFlight only) comes before that cut: its
# notes are the fragments still waiting. Everything must hold before
# anything is built. The build number is not checked here: the release lane
# takes the next one from App Store Connect.

set -euo pipefail

tag="${1:?usage: check-version.sh vX.Y.Z | vX.Y.Z-beta.N}"
if ! [[ "$tag" =~ ^v([0-9]+\.[0-9]+\.[0-9]+)(-beta\.[0-9]+)?$ ]]; then
  echo "tag '$tag' is not vX.Y.Z or vX.Y.Z-beta.N" >&2
  exit 1
fi
version="${BASH_REMATCH[1]}"
beta="${BASH_REMATCH[2]}"

here="$(cd "$(dirname "$0")" && pwd)"
cd "$here/../.."

app="$(sed -n 's/^MARKETING_VERSION *= *\(.*\)$/\1/p' ios/App.xcconfig | head -n 1)"
if [ "$app" != "$version" ]; then
  echo "tag $tag but ios/App.xcconfig says MARKETING_VERSION = $app" >&2
  exit 1
fi

if [ -n "$beta" ]; then
  if grep -qF "## [$version]" CHANGELOG.md; then
    echo "CHANGELOG.md already has a [$version] section; a test version comes before the release cut" >&2
    exit 1
  fi
  if [ -z "$(bash "$here/notes.sh" "$tag")" ]; then
    echo "no fragment in changelog.d/ for $tag; its notes would be empty" >&2
    exit 1
  fi
else
  if ! grep -qE "^## \[${version//./\\.}\] - [0-9]{4}-[0-9]{2}-[0-9]{2}$" CHANGELOG.md; then
    echo "CHANGELOG.md has no '## [$version] - YYYY-MM-DD' section" >&2
    exit 1
  fi
  if [ -z "$(bash "$here/notes.sh" "$tag")" ]; then
    echo "the CHANGELOG.md section for $version is empty; it becomes the release notes" >&2
    exit 1
  fi
  left="$(find changelog.d -maxdepth 1 -type f -name '*.md' ! -name README.md | sort)"
  if [ -n "$left" ]; then
    echo "changelog.d/ still holds fragments; run scripts/release/changelog.sh --assemble $version YYYY-MM-DD on a release branch first:" >&2
    echo "$left" >&2
    exit 1
  fi
fi

echo "ok: $tag matches ios/App.xcconfig ($app) and its notes are there"
