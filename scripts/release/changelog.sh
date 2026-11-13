#!/usr/bin/env bash
# SPDX-FileCopyrightText: Rotary YEP NL contributors
# SPDX-License-Identifier: Apache-2.0
# scripts/release/changelog.sh: the changelog fragments (copied from
# FerroEHR). A pull request with a user-visible effect adds one file under
# changelog.d/ instead of a line under [Unreleased] in CHANGELOG.md, so no two
# pull requests edit the same lines; the release cut writes the fragments into
# CHANGELOG.md (Keep a Changelog 1.1.0). changelog.d/README.md has the format:
# changelog.d/<issue>-<kebab-slug>.<section>.md, holding one or more list items
# exactly as they read in CHANGELOG.md.
#
# Usage:
#   changelog.sh --check
#       Checks the name and content of every fragment.
#   changelog.sh --preview X.Y.Z [YYYY-MM-DD]
#       Prints the "## [X.Y.Z] - date" section the cut would write (date:
#       today), and writes nothing.
#   changelog.sh --assemble X.Y.Z YYYY-MM-DD
#       The release cut: writes that section under a fresh, empty
#       [Unreleased], from what [Unreleased] already holds followed by the
#       fragments, section by section in Keep a Changelog order; moves the
#       [Unreleased] link reference on and adds the version's, when
#       CHANGELOG.md has them; then `git rm`s the fragments.
#   changelog.sh --self-test
#       Proves every mode over a stub repository.
#
# Within a section the fragments go by issue number, then by name, and the
# cut ends the first paragraph of each entry with "(#<issue>)" unless the entry
# already names that issue. Exit 1 on a defect, with nothing written; 2 on a
# usage error.

set -euo pipefail
export LC_ALL=C

readonly SECTIONS=(added changed deprecated removed fixed security)
readonly DIR=changelog.d
readonly NAME_RE='^[0-9]+-[a-z0-9]+(-[a-z0-9]+)*\.(added|changed|deprecated|removed|fixed|security)\.md$'

die() {
  echo "changelog: $*" >&2
  exit 1
}

usage() {
  echo "usage: changelog.sh --check | --preview X.Y.Z [YYYY-MM-DD] | --assemble X.Y.Z YYYY-MM-DD | --self-test" >&2
  exit 2
}

# fragments: every fragment path, one per line, README.md left out.
fragments() {
  local path
  for path in "$DIR"/*; do
    [[ -e "$path" && "$path" != "$DIR/README.md" ]] || continue
    echo "$path"
  done
}

# defect FILE: prints why FILE is no list item, or nothing when it is one.
defect() {
  awk '
    { lines[NR] = $0 }
    END {
      last = NR
      while (last > 0 && lines[last] ~ /^[[:space:]]*$/) last--
      if (last == 0) { print "it is empty"; exit }
      if (lines[1] !~ /^- [^[:space:]]/) { print "line 1 does not open a list item with \"- \""; exit }
      for (i = 2; i <= last; i++) {
        if (lines[i] ~ /^- [^[:space:]]/ || lines[i] ~ /^  +[^[:space:]]/) continue
        if (lines[i] ~ /^[[:space:]]*$/) print "line " i " is blank inside the entry"
        else print "line " i " neither opens a list item nor continues one indented by two spaces"
        exit
      }
    }
  ' "$1"
}

check() {
  local fail=0 count=0 path name why
  [[ -d "$DIR" ]] || die "$DIR/ is missing"
  while IFS= read -r path; do
    [[ -n "$path" ]] || continue
    name="${path#"$DIR"/}"
    if [[ ! -f "$path" || ! "$name" =~ $NAME_RE ]]; then
      echo "changelog: $path is not named <issue>-<kebab-slug>.<section>.md with <section> one of ${SECTIONS[*]}." >&2
      fail=1
      continue
    fi
    why="$(defect "$path")"
    if [[ -n "$why" ]]; then
      echo "changelog: $path is not a Markdown list item: $why." >&2
      fail=1
      continue
    fi
    count=$((count + 1))
  done < <(fragments)
  [[ "$fail" -eq 0 ]] || exit 1
  echo "changelog: $count fragment(s) under $DIR/, every one well formed."
}

# trim FILE: FILE without its leading and trailing blank lines.
trim() {
  awk '
    { lines[NR] = $0 }
    END {
      first = 1
      while (first <= NR && lines[first] ~ /^[[:space:]]*$/) first++
      last = NR
      while (last >= first && lines[last] ~ /^[[:space:]]*$/) last--
      for (i = first; i <= last; i++) print lines[i]
    }
  ' "$1"
}

# name_issue FILE: FILE's entries, each ending its first paragraph with
# "(#<issue>)" unless it already names the issue; a full stop stays last.
name_issue() {
  local issue
  issue="$(basename "$1")"
  issue="${issue%%-*}"
  trim "$1" | awk -v issue="$issue" '
    function flush(   i) {
      if (count == 0) return
      if (!named) {
        if (lines[last] ~ /\.$/) lines[last] = substr(lines[last], 1, length(lines[last]) - 1) " (#" issue ")."
        else lines[last] = lines[last] " (#" issue ")"
      }
      for (i = 1; i <= count; i++) print lines[i]
      count = 0
      named = 0
    }
    /^- / { flush(); paragraph = 1; last = 1 }
    {
      lines[++count] = $0
      if ($0 ~ ("#" issue "([^0-9]|$)")) named = 1
      if (count > 1) {
        if ($0 ~ /^[[:space:]]+[-*] /) paragraph = 0
        else if (paragraph) last = count
      }
    }
    END { flush() }
  '
}

# The [Unreleased] body runs from the line after its heading to the line
# before the next version heading or the link references.
bounds() {
  start="$(grep -n -m1 -E '^## \[Unreleased\][[:space:]]*$' CHANGELOG.md | cut -d: -f1 || true)"
  [[ -n "$start" ]] || die "CHANGELOG.md has no '## [Unreleased]' heading"
  total="$(wc -l < CHANGELOG.md | tr -d ' ')"
  end="$(awk -v s="$start" 'NR > s && (/^## \[/ || /^\[[^]]+\]: /) { print NR - 1; exit }' CHANGELOG.md)"
  [[ -n "$end" ]] || end="$total"
}

# section_body: the new release's sections, written to stdout. The entries
# under [Unreleased] come first in each section, then the fragments. Text
# outside a known section heading is refused, never dropped.
section_body() {
  local work section file
  work="$(mktemp -d)"
  sed -n "$((start + 1)),${end}p" CHANGELOG.md | awk -v dir="$work" '
    /^### / {
      section = tolower(substr($0, 5))
      sub(/[[:space:]]+$/, "", section)
      if (section !~ /^(added|changed|deprecated|removed|fixed|security)$/) {
        print "changelog: [Unreleased] has a section \"" substr($0, 5) "\", which Keep a Changelog 1.1.0 does not define." > "/dev/stderr"
        exit 1
      }
      next
    }
    section == "" && /[^[:space:]]/ {
      print "changelog: [Unreleased] holds text outside a section heading: " $0 > "/dev/stderr"
      exit 1
    }
    section != "" && /[^[:space:]]/ { print > (dir "/" section) }
  ' || { rm -r -- "$work"; exit 1; }
  for section in "${SECTIONS[@]}"; do
    {
      [[ ! -f "$work/$section" ]] || cat "$work/$section"
      while IFS= read -r file; do
        [[ -n "$file" ]] || continue
        name_issue "$file"
      done < <(fragments | grep -F ".$section.md" | sort -t/ -k2,2n -k2,2)
    } > "$work/$section.new"
    [[ -s "$work/$section.new" ]] || continue
    printf '\n### %s\n\n' "$(tr '[:lower:]' '[:upper:]' <<<"${section:0:1}")${section:1}"
    cat "$work/$section.new"
  done
  rm -r -- "$work"
}

# release_section VERSION DATE MODE: MODE preview prints the section, assemble writes it.
release_section() {
  local version="$1" date="$2" mode="$3" body base prev file
  [[ "$version" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]] || die "'$version' is not a version X.Y.Z"
  [[ "$date" =~ ^[0-9]{4}-[0-9]{2}-[0-9]{2}$ ]] || die "'$date' is not a date YYYY-MM-DD"
  [[ -f CHANGELOG.md ]] || die "CHANGELOG.md is missing"
  check > /dev/null
  if grep -qF "## [$version]" CHANGELOG.md; then
    die "CHANGELOG.md already has a [$version] section"
  fi
  bounds
  body="$(section_body)"
  [[ -n "$body" ]] || die "[$version] would be empty: no fragment under $DIR/ and nothing under [Unreleased]"
  if [[ "$mode" == preview ]]; then
    printf '## [%s] - %s\n%s\n' "$version" "$date" "$body"
    return 0
  fi

  while IFS= read -r file; do
    [[ -n "$file" ]] || continue
    git ls-files --error-unmatch -- "$file" > /dev/null 2>&1 || die "$file is not tracked by git; commit it before the cut"
  done < <(fragments)

  base="$(sed -nE 's|^\[Unreleased\]: (.*)/compare/([^/]+)\.\.\.HEAD$|\1|p' CHANGELOG.md)"
  prev="$(sed -nE 's|^\[Unreleased\]: (.*)/compare/([^/]+)\.\.\.HEAD$|\2|p' CHANGELOG.md)"
  {
    sed -n "1,${start}p" CHANGELOG.md
    printf '\n## [%s] - %s\n%s\n\n' "$version" "$date" "$body"
    if [[ "$end" -lt "$total" ]]; then
      sed -n "$((end + 1)),${total}p" CHANGELOG.md | awk -v ver="$version" -v base="$base" -v prev="$prev" '
        base != "" && /^\[Unreleased\]: / {
          print "[Unreleased]: " base "/compare/v" ver "...HEAD"
          print "[" ver "]: " base "/compare/" prev "...v" ver
          next
        }
        { print }
      '
    fi
  } > CHANGELOG.md.new
  mv CHANGELOG.md.new CHANGELOG.md

  local paths=()
  while IFS= read -r file; do
    [[ -z "$file" ]] || paths+=("$file")
  done < <(fragments)
  [[ "${#paths[@]}" -eq 0 ]] || git rm -q -- "${paths[@]}"
  echo "changelog: [$version] - $date written from ${#paths[@]} fragment(s) and the [Unreleased] entries; review CHANGELOG.md and commit."
}

self_test() {
  # Global, so the EXIT trap still sees it after the function returns.
  work="$(mktemp -d)"
  trap 'chmod -R u+w "$work" && rm -r -- "$work"' EXIT
  mkdir -p "$work/scripts/release" "$work/changelog.d"
  cp "$SELF" "$work/scripts/release/changelog.sh"
  stub_git() {
    git -C "$work" -c user.name=self-test -c user.email=self-test@example.org \
      -c commit.gpgsign=false -c core.hooksPath=/dev/null "$@"
  }
  run() { (cd "$work" && bash scripts/release/changelog.sh "$@"); }
  fail() {
    echo "changelog: self-test failed: $*" >&2
    exit 1
  }

  printf '# Changelog\n\n## [Unreleased]\n\n### Fixed\n\n- An entry written by hand.\n\n## [1.0.0] - 2026-10-01\n\n### Added\n\n- The first release.\n\n[Unreleased]: https://example.org/r/compare/v1.0.0...HEAD\n[1.0.0]: https://example.org/r/releases/tag/v1.0.0\n' > "$work/CHANGELOG.md"
  printf 'The format.\n' > "$work/changelog.d/README.md"
  printf -- '- A later feature,\n  over two lines.\n' > "$work/changelog.d/12-later.added.md"
  printf -- '- An earlier feature\n' > "$work/changelog.d/3-earlier.added.md"
  printf -- '- A fix that names #7 itself.\n' > "$work/changelog.d/7-named.fixed.md"
  printf -- '- A change with a list:\n  - first\n  - second\n' > "$work/changelog.d/9-list.changed.md"
  stub_git init -q -b main
  stub_git add -A
  stub_git commit -q -m "the stub"

  run --check > /dev/null || fail "--check refused good fragments"
  printf -- '- A bad name.\n' > "$work/changelog.d/oops.added.md"
  run --check 2> /dev/null && fail "--check took a fragment without an issue number"
  rm "$work/changelog.d/oops.added.md"
  printf -- '- One.\n\n- Two.\n' > "$work/changelog.d/1-blank.fixed.md"
  run --check 2> /dev/null && fail "--check took a fragment with a blank line"
  printf '### Fixed\n' > "$work/changelog.d/1-blank.fixed.md"
  run --check 2> /dev/null && fail "--check took a fragment with a heading"
  rm "$work/changelog.d/1-blank.fixed.md"

  local want
  want='## [1.1.0] - 2026-11-01

### Added

- An earlier feature (#3)
- A later feature,
  over two lines (#12).

### Changed

- A change with a list: (#9)
  - first
  - second

### Fixed

- An entry written by hand.
- A fix that names #7 itself.'
  [[ "$(run --preview 1.1.0 2026-11-01)" == "$want" ]] || fail "--preview printed: $(run --preview 1.1.0 2026-11-01)"
  run --preview 1.0.0 2026-11-01 2> /dev/null && fail "--preview took a version that is already released"
  run --assemble 1.1 2026-11-01 2> /dev/null && fail "--assemble took a version that is not X.Y.Z"

  printf -- '- Not committed yet.\n' > "$work/changelog.d/20-untracked.fixed.md"
  run --assemble 1.1.0 2026-11-01 2> /dev/null && fail "--assemble took an untracked fragment"
  rm "$work/changelog.d/20-untracked.fixed.md"
  run --assemble 1.1.0 2026-11-01 > /dev/null || fail "--assemble refused a good cut"
  want="# Changelog

## [Unreleased]

$want

## [1.0.0] - 2026-10-01

### Added

- The first release.

[Unreleased]: https://example.org/r/compare/v1.1.0...HEAD
[1.1.0]: https://example.org/r/compare/v1.0.0...v1.1.0
[1.0.0]: https://example.org/r/releases/tag/v1.0.0"
  [[ "$(cat "$work/CHANGELOG.md")" == "$want" ]] || fail "--assemble wrote: $(cat "$work/CHANGELOG.md")"
  [[ "$(stub_git ls-files changelog.d)" == changelog.d/README.md ]] || fail "--assemble left fragments: $(stub_git ls-files changelog.d)"
  stub_git commit -q -m "the cut"
  run --assemble 1.2.0 2026-11-02 2> /dev/null && fail "--assemble wrote an empty section"
  echo "changelog: self-test passed."
}

SELF="$(cd "$(dirname "$0")" && pwd)/$(basename "$0")"
cd "$(dirname "$SELF")/../.."
case "${1:-}" in
  --check) [[ $# -eq 1 ]] || usage; check ;;
  --preview) [[ $# -eq 2 || $# -eq 3 ]] || usage; release_section "$2" "${3:-$(date +%F)}" preview ;;
  --assemble) [[ $# -eq 3 ]] || usage; release_section "$2" "$3" assemble ;;
  --self-test) [[ $# -eq 1 ]] || usage; self_test ;;
  *) usage ;;
esac
