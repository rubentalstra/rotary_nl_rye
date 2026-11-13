#!/usr/bin/env bash
# .claude/hooks/no_attribution_guard.sh
#
# Claude Code PreToolUse hook (matcher: Bash). Blocks a commit or PR command
# whose text carries AI/assistant attribution, before it runs. Companion to
# .githooks/commit-msg, which strips anything that slips through.

set -euo pipefail

payload="$(cat)"

if ! printf '%s' "$payload" | grep -qiE 'git[[:space:]]+commit|gh[[:space:]]+pr[[:space:]]+create|gh[[:space:]]+issue[[:space:]]+create|git[[:space:]]+push'; then
  exit 0
fi

if printf '%s' "$payload" | grep -qiE 'co-authored-by:.*(claude|anthropic|\[bot\])|generated[[:space:]]+with[[:space:]]+.*claude|generated[[:space:]]+by[[:space:]]+.*claude|claude[[:space:]]+code|🤖|assisted-by:.*claude|anthropic[[:space:]]+claude'; then
  echo "BLOCKED: this command contains AI attribution. Commit and PR text describes only the change (CLAUDE.md §Hard rules)." >&2
  exit 2
fi

exit 0