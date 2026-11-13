#!/usr/bin/env bash
# SPDX-FileCopyrightText: Rotary YEP NL contributors
# SPDX-License-Identifier: Apache-2.0
# scripts/checks/changelog-guard.sh: the pull-request half of the changelog
# fragments (copied from FerroEHR). A change to the app records its effect as
# a fragment under changelog.d/ (changelog.d/README.md), and no change writes
# under [Unreleased] in CHANGELOG.md, since those lines are what every open
# pull request used to conflict on.
#
# Usage:
#   changelog-guard.sh [--waived] <base-ref> [head-ref]
#       Fails when the change adds a line under [Unreleased], always, and
#       when it touches ios/RotaryYEP/, ios/RotaryKit/Sources/ or android/app/src/main/ without adding a
#       fragment. --waived is the form for a pull request with the
#       `no-changelog` label: no fragment is asked, an [Unreleased] line is
#       still refused. An edit of CHANGELOG.md outside [Unreleased] (the
#       release cut) counts as the change's record.
#   changelog-guard.sh --self-test
#       Runs the guard over a stub repository.
#
# The change is what the head added since it forked from the base (the diff
# against their merge base), so a fragment that reached the base later is
# never counted as the change's own. Exit 0 when the change passes, 1 when it
# fails, 2 on a usage error.

set -euo pipefail

readonly CODE='^(ios/RotaryYEP/|ios/RotaryKit/Sources/|android/app/src/main/)'

self_test() {
  # Global, so the EXIT trap still sees it after the function returns.
  work="$(mktemp -d)"
  trap 'chmod -R u+w "$work" && rm -r -- "$work"' EXIT
  mkdir -p "$work/scripts/checks" "$work/changelog.d" "$work/ios/RotaryYEP" "$work/ios/RotaryKit/Sources" "$work/ios/RotaryKit/Tests" "$work/docs"
  cp "$SELF" "$work/scripts/checks/changelog-guard.sh"
  stub_git() {
    git -C "$work" -c user.name=self-test -c user.email=self-test@example.org \
      -c commit.gpgsign=false -c core.hooksPath=/dev/null "$@"
  }
  commit() {
    stub_git add -A
    stub_git commit -q -m "$1"
  }
  branch() {
    stub_git checkout -q main
    stub_git checkout -q -b "$1"
  }
  unreleased() {
    printf '# Changelog\n\n## [Unreleased]\n%s\n## [1.0.0] - 2026-10-01\n\n### Added\n\n- The first release.\n\n[Unreleased]: https://example.org/r/compare/v1.0.0...HEAD\n' \
      "$1" > "$work/CHANGELOG.md"
  }
  # expect NAME WANT BRANCH [FLAG]: the guard over BRANCH against main exits WANT.
  expect() {
    local name=$1 want=$2 branch=$3 flag=${4:-} status=0
    (cd "$work" && bash scripts/checks/changelog-guard.sh ${flag:+"$flag"} main "$branch") > "$work/out" 2>&1 || status=$?
    if [[ "$status" -ne "$want" ]]; then
      echo "changelog-guard: self-test failed: $name exited $status, wanted $want." >&2
      cat "$work/out" >&2
      exit 1
    fi
  }

  stub_git init -q -b main
  unreleased ''
  printf 'The format.\n' > "$work/changelog.d/README.md"
  printf -- '- Already there.\n' > "$work/changelog.d/1-old.added.md"
  echo code > "$work/ios/RotaryYEP/App.swift"
  echo code > "$work/ios/RotaryKit/Sources/Core.swift"
  echo test > "$work/ios/RotaryKit/Tests/CoreTests.swift"
  echo page > "$work/docs/page.md"
  commit "the fork point"

  branch fragment
  echo more >> "$work/ios/RotaryYEP/App.swift"
  printf -- '- An entry.\n' > "$work/changelog.d/2-new.added.md"
  commit "app code with a fragment"
  branch kit-none
  echo more >> "$work/ios/RotaryKit/Sources/Core.swift"
  commit "kit code without a fragment"
  branch tests
  echo more >> "$work/ios/RotaryKit/Tests/CoreTests.swift"
  echo more >> "$work/docs/page.md"
  commit "tests and docs only"
  branch unreleased
  echo more >> "$work/ios/RotaryYEP/App.swift"
  printf -- '- An entry.\n' > "$work/changelog.d/2-new.added.md"
  unreleased $'\n### Added\n\n- Written by hand.\n'
  commit "a fragment and a line under [Unreleased]"
  branch readme
  echo more >> "$work/ios/RotaryYEP/App.swift"
  echo more >> "$work/changelog.d/README.md"
  commit "app code with a README edit only"
  branch reworded
  echo more >> "$work/ios/RotaryYEP/App.swift"
  printf -- '- Reworded.\n' > "$work/changelog.d/1-old.added.md"
  commit "app code with a fragment it did not add"
  branch cut
  echo more >> "$work/ios/RotaryYEP/App.swift"
  stub_git rm -q -- changelog.d/1-old.added.md
  printf '# Changelog\n\n## [Unreleased]\n\n## [1.1.0] - 2026-10-02\n\n### Added\n\n- Already there (#1).\n\n## [1.0.0] - 2026-10-01\n\n### Added\n\n- The first release.\n\n[Unreleased]: https://example.org/r/compare/v1.1.0...HEAD\n[1.1.0]: https://example.org/r/compare/v1.0.0...v1.1.0\n' > "$work/CHANGELOG.md"
  commit "the release cut"

  stub_git checkout -q main
  printf -- '- From main.\n' > "$work/changelog.d/3-main.fixed.md"
  commit "main gains a fragment after the branches forked"

  expect "app code with a fragment" 0 fragment
  expect "kit code without a fragment" 1 kit-none
  grep -q "no changelog fragment" "$work/out" || { echo "changelog-guard: self-test failed: the refusal does not say why." >&2; exit 1; }
  expect "kit code without a fragment, waived" 0 kit-none --waived
  expect "tests and docs only" 0 tests
  expect "a line under [Unreleased]" 1 unreleased
  grep -q 'under \[Unreleased\]' "$work/out" || { echo "changelog-guard: self-test failed: the [Unreleased] refusal does not say why." >&2; exit 1; }
  expect "a line under [Unreleased], waived" 1 unreleased --waived
  expect "a README edit only" 1 readme
  expect "a fragment it did not add" 1 reworded
  expect "the release cut" 0 cut
  echo "changelog-guard: self-test passed."
}

SELF="$(cd "$(dirname "$0")" && pwd)/$(basename "$0")"
if [[ "${1:-}" == --self-test && $# -eq 1 ]]; then
  self_test
  exit 0
fi
cd "$(dirname "$SELF")/../.."

waived=0
if [[ "${1:-}" == --waived ]]; then
  waived=1
  shift
fi
if [[ $# -lt 1 || $# -gt 2 || "${1:-}" == -* ]]; then
  echo "usage: changelog-guard.sh [--waived] <base-ref> [head-ref] | --self-test" >&2
  exit 2
fi
base="$1"
head="${2:-HEAD}"
if ! fork="$(git merge-base "$base" "$head")"; then
  echo "changelog-guard: $base and $head have no merge base; check out the full history (fetch-depth: 0)." >&2
  exit 2
fi

# The non-blank lines the change adds between the [Unreleased] heading of the
# head's CHANGELOG.md and the next version heading or link reference.
written=""
if git cat-file -e "$head:CHANGELOG.md" 2> /dev/null; then
  read -r first last < <(git show "$head:CHANGELOG.md" | awk '
    !start && /^## \[Unreleased\][[:space:]]*$/ { start = NR; next }
    start && (/^## \[/ || /^\[[^]]+\]: /) { print start + 1, NR - 1; found = 1; exit }
    END { if (!found) print (start ? start + 1 : 0), (start ? NR : -1) }
  ')
  written="$(git diff --no-renames -U0 "$fork" "$head" -- CHANGELOG.md | awk -v first="$first" -v last="$last" '
    /^@@ / { split($3, range, ","); line = substr(range[1], 2) + 0; next }
    /^\+\+\+ / { next }
    /^\+/ {
      if (line >= first && line <= last && $0 ~ /[^[:space:]]/) print "  CHANGELOG.md:" line ": " substr($0, 2)
      line++
    }
  ')"
fi
if [[ -n "$written" ]]; then
  echo "::error::the change writes under [Unreleased] in CHANGELOG.md; move each entry into a fragment, changelog.d/<issue>-<kebab-slug>.<section>.md (changelog.d/README.md):" >&2
  echo "$written" >&2
  exit 1
fi
if [[ "$waived" -eq 1 ]]; then
  echo "changelog-guard: no-changelog label set; the change writes nothing under [Unreleased]."
  exit 0
fi

if ! git diff --no-renames --name-only "$fork" "$head" | grep -qE "$CODE"; then
  echo "changelog-guard: the change touches no code under ios/RotaryYEP/, ios/RotaryKit/Sources/ or android/app/src/main/; no fragment is needed."
  exit 0
fi
# A rename reads as a removal and an addition, so a fragment renamed into
# place counts as added.
added="$(git diff --no-renames --name-only --diff-filter=A "$fork" "$head" -- 'changelog.d/*' ':!changelog.d/README.md')"
if [[ -n "$added" ]]; then
  echo "changelog-guard: the change adds:"
  while IFS= read -r path; do echo "  $path"; done <<<"$added"
  exit 0
fi
if [[ -n "$(git diff --name-only "$fork" "$head" -- CHANGELOG.md)" ]]; then
  echo "changelog-guard: the change edits CHANGELOG.md outside [Unreleased] (a release cut)."
  exit 0
fi
echo "::error::no changelog fragment: the change touches ios/RotaryYEP/, ios/RotaryKit/Sources/ or android/app/src/main/. Add changelog.d/<issue>-<kebab-slug>.<section>.md (changelog.d/README.md), or set the no-changelog label when nothing changes for a person using the app or reading the release notes." >&2
exit 1
