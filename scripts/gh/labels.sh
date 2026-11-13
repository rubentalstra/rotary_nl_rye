#!/usr/bin/env bash
# scripts/gh/labels.sh: bootstrap the issue-label taxonomy of this repository.
#
# The repository lives on a personal account, which has no native issue types
# and no organisation issue fields, so labels carry all of it:
#   * the type: bug, feature, task (exactly one per issue);
#   * the priority: priority:urgent, priority:high, priority:medium, priority:low;
#   * the effort: effort:high, effort:medium, effort:low;
#   * the platform: ios, android (none means both, or neither);
#   * the work kind a task carries to pick its commit type (documentation,
#     chore, refactor, perf, test, ci); a bug and a feature carry none;
#   * a few workflow labels.
# Labels of the React Native era (enhancement, javascript, eas-build) are
# retired; enhancement becomes feature on the issues that carry it first.
#
# `gh label create --force` updates an existing label in place, so re-running
# this is safe and converges colours and descriptions to the values below.
#
# Usage:
#   scripts/gh/labels.sh

set -euo pipefail

die() {
  echo "gh-labels: $*" >&2
  exit 1
}

[[ $# -eq 0 ]] || {
  sed -n '/^# Usage:/,/^$/p' "$0" | sed 's/^# \{0,1\}//' >&2
  exit 2
}

command -v gh >/dev/null 2>&1 || die "the GitHub CLI (gh) is not installed"
gh repo view --json nameWithOwner --jq .nameWithOwner >/dev/null 2>&1 ||
  die "could not resolve the current repository (run inside a gh-authenticated clone)"

EXISTING="$(gh label list --limit 200 --json name --jq '.[].name')"

# label <name> <hex-color> <description>
label() {
  gh label create "$1" --color "$2" --description "$3" --force >/dev/null
  echo "ok: $1"
}

# retire <name> [<successor>]: move the issues to the successor, then delete.
retire() {
  local name="$1" successor="${2:-}" n
  grep -qx -- "$name" <<<"$EXISTING" || return 0
  if [[ -n "$successor" ]]; then
    for n in $(gh issue list --state all --label "$name" --limit 500 --json number --jq '.[].number'); do
      gh issue edit "$n" --add-label "$successor" >/dev/null
    done
  fi
  gh label delete "$name" --yes >/dev/null
  echo "retired: $name${successor:+ (issues moved to $successor)}"
}

echo "== type (exactly one per issue) =="
label bug     d73a4a "Something does not work. fix/ branch, fix: commit."
label feature a2eeef "Something new or better for people using the app. feat/ branch, feat: commit."
label task    c5def5 "Maintenance, docs, refactor or tooling; carries one work-kind label."

echo "== priority =="
label priority:urgent b60205 "Drop everything: broken for everyone, or a store deadline."
label priority:high   d93f0b "Next up."
label priority:medium fbca04 "Planned."
label priority:low    0e8a16 "When there is time."

echo "== effort =="
label effort:low    c2e0c6 "One sitting."
label effort:medium bfd4f2 "One pull request."
label effort:high   5319e7 "More than one pull request; split it into sub-issues."

echo "== platform =="
label ios     000000 "The native iOS app (ios/)."
label android 3ddc84 "The native Android app (android/)."

echo "== work kind (on a task only; picks the conventional-commit type) =="
label documentation 0075ca "Docs-only work. docs/ branch, docs: commit."
label chore         fef2c0 "Maintenance with no product change. chore/ and chore:."
label refactor      cfd3d7 "Behaviour-preserving code change. refactor/ and refactor:."
label perf          fbca04 "Performance work. perf/ and perf:."
label test          c2e0c6 "Test-only work. test/ and test:."
label ci            ededed "CI, build and tooling. ci/ and ci:."

echo "== workflow and meta =="
label dependencies 0366d6 "Dependency updates (used by Dependabot)."
label security     ee0701 "Security fix or hardening."
label no-changelog ededed "No user-visible change; skips the changelog fragment check."

echo "== retired (the React Native era) =="
retire enhancement feature
retire javascript
retire eas-build

echo "done."
