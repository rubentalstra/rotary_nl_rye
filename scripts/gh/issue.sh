#!/usr/bin/env bash
# scripts/gh/issue.sh: file an issue with its type, priority and effort.
#
# This repository is on a personal account, so the type, priority and effort
# are labels (scripts/gh/labels.sh). This wrapper makes them required and
# checks their spelling, so no issue is filed without them.
#
# Usage:
#   scripts/gh/issue.sh new <bug|feature|task> <urgent|high|medium|low> <high|medium|low> <gh issue create args...>
#       For example:
#       scripts/gh/issue.sh new feature high medium --title "News tab" --body "..." --label ios
#       A task also needs one work-kind label (--label refactor, ...).

set -euo pipefail

usage() {
  sed -n '/^# Usage:/,/^$/p' "$0" | sed 's/^# \{0,1\}//' >&2
  exit 2
}

[[ $# -ge 4 && "$1" == "new" ]] || usage
type="$2" priority="$3" effort="$4"
shift 4

case "$type" in bug | feature | task) ;; *) echo "issue: unknown type '$type' (bug, feature, task)" >&2; exit 2 ;; esac
case "$priority" in urgent | high | medium | low) ;; *) echo "issue: unknown priority '$priority' (urgent, high, medium, low)" >&2; exit 2 ;; esac
case "$effort" in high | medium | low) ;; *) echo "issue: unknown effort '$effort' (high, medium, low)" >&2; exit 2 ;; esac

if [[ "$type" == "task" ]] && ! printf '%s\n' "$@" | grep -qxE 'documentation|chore|refactor|perf|test|ci'; then
  echo "issue: a task carries one work-kind label: --label documentation|chore|refactor|perf|test|ci" >&2
  exit 2
fi

gh issue create --label "$type" --label "priority:$priority" --label "effort:$effort" "$@"
