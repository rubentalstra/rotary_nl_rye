#!/usr/bin/env bash
# .claude/hooks/shell_lint.sh
#
# Claude Code PostToolUse hook (matcher: Write|Edit). Lints an edited shell
# script with shellcheck when it is installed; a finding blocks (exit 2).
# Swift is formatted the way the code already is (Xcode's indentation), so no
# formatter runs on it here (CLAUDE.md, Formatting).

set -uo pipefail

payload="$(cat)" || true
if command -v jq >/dev/null 2>&1; then
  file_path="$(printf '%s' "$payload" | jq -r '.tool_input.file_path // empty' 2>/dev/null)" || true
else
  file_path="$(printf '%s' "$payload" | sed -n 's/.*"file_path"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p' | head -n1)"
fi
[ -f "${file_path:-}" ] || exit 0

case "$file_path" in
*.sh | */.githooks/*)
  if command -v shellcheck >/dev/null 2>&1; then
    findings="$(shellcheck --severity=style "$file_path" 2>&1)" || {
      printf '%s\n' "$findings" >&2
      exit 2
    }
  fi
  ;;
esac
exit 0
