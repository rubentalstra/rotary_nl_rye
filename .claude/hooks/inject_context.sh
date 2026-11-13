#!/usr/bin/env bash
# .claude/hooks/inject_context.sh
#
# Claude Code SessionStart hook. Prints the state a session needs to orient:
# open issues with their labels, git status, the last commits, and whether
# Apple's agent skills are exported on this Mac.

set -uo pipefail

root="${CLAUDE_PROJECT_DIR:-$(cd "$(dirname "$0")/../.." && pwd)}"
cd "$root" || exit 0

echo "=== Rotary YEP NL: read CLAUDE.md first ==="
echo
if [ ! -f .claude/skills/swiftui-specialist/SKILL.md ]; then
  echo "=== Apple's agent skills are not exported on this Mac: run bash scripts/dev/xcode-skills.sh ==="
  echo
fi
echo "=== open issues (read one with: gh issue view <n> --json title,body,comments) ==="
# shellcheck disable=SC2016 # $labels is a jq binding
gh issue list --state open --limit 50 --json number,title,labels \
  --jq '.[] | ([.labels[].name] | join(", ")) as $labels | "#\(.number)  \(.title)  [\($labels)]"' 2>/dev/null ||
  echo "(gh unavailable)"
echo
echo "=== git status ==="
git status --short --branch 2>/dev/null
echo
echo "=== last 5 commits ==="
git log --oneline -5 2>/dev/null
