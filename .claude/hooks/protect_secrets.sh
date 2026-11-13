#!/usr/bin/env bash
# .claude/hooks/protect_secrets.sh
#
# Claude Code PreToolUse hook (matcher: Write|Edit|NotebookEdit). Refuses a
# write that would put a private key, a signing certificate or a token into
# the tree. Release secrets (the Developer ID certificate, notarisation
# credentials, Sparkle's EdDSA private key) live in Actions secrets and the
# owner's Keychain, never in a file. Exit 2 blocks the tool call.

set -euo pipefail

payload="$(cat)"

if command -v jq >/dev/null 2>&1; then
  file_path="$(printf '%s' "$payload" | jq -r '.tool_input.file_path // empty' 2>/dev/null || true)"
  content="$(printf '%s' "$payload" | jq -r '(.tool_input.content // .tool_input.new_string // "")' 2>/dev/null || true)"
else
  file_path="$(printf '%s' "$payload" | sed -n 's/.*"file_path"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p' | head -n1)"
  content="$payload"
fi

if printf '%s' "$content" | grep -qE -- '-----BEGIN (PGP PRIVATE KEY BLOCK|OPENSSH PRIVATE KEY|RSA PRIVATE KEY|EC PRIVATE KEY|DSA PRIVATE KEY|PRIVATE KEY|ENCRYPTED PRIVATE KEY)-----'; then
  echo "BLOCKED: this write carries a private key block. Secrets never enter this repository." >&2
  exit 2
fi

if printf '%s' "$content" | grep -qE '(ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{36}|github_pat_[A-Za-z0-9_]{60,}|glpat-[A-Za-z0-9_-]{20}'; then
  echo "BLOCKED: this write carries what looks like a GitHub or GitLab token. Tokens live in the Keychain, never in a file." >&2
  exit 2
fi

case "${file_path:-}" in
*.p12 | *.cer | *.mobileprovision | *.provisionprofile | *sparkle_private* | *.p8)
  echo "BLOCKED: signing certificates, notarisation keys and Sparkle keys never enter this repository." >&2
  exit 2
  ;;
esac

exit 0
