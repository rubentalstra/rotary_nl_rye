#!/usr/bin/env bash
# scripts/gh/protect-main.sh: the ruleset that guards main, and the
# repository settings that go with a pull-request workflow.
#
# main changes only through a pull request whose CI passed: no direct push,
# no force push, no deletion, linear history (squash merges). The owner may
# bypass in an emergency. Idempotent: an existing ruleset named "main" is
# updated in place.
#
# Usage:
#   scripts/gh/protect-main.sh

set -euo pipefail

[[ $# -eq 0 ]] || {
  sed -n '/^# Usage:/,/^$/p' "$0" | sed 's/^# \{0,1\}//' >&2
  exit 2
}

repo="$(gh repo view --json nameWithOwner --jq .nameWithOwner)"

gh repo edit "$repo" \
  --enable-squash-merge --enable-merge-commit=false --enable-rebase-merge=false \
  --delete-branch-on-merge --enable-auto-merge=false >/dev/null
echo "ok: squash merges only, branches deleted after merge"

ruleset="$(cat <<'JSON'
{
  "name": "main",
  "target": "branch",
  "enforcement": "active",
  "bypass_actors": [
    { "actor_id": 5, "actor_type": "RepositoryRole", "bypass_mode": "pull_request" }
  ],
  "conditions": { "ref_name": { "include": ["~DEFAULT_BRANCH"], "exclude": [] } },
  "rules": [
    { "type": "deletion" },
    { "type": "non_fast_forward" },
    { "type": "required_linear_history" },
    { "type": "pull_request", "parameters": {
        "required_approving_review_count": 0,
        "dismiss_stale_reviews_on_push": false,
        "require_code_owner_review": false,
        "require_last_push_approval": false,
        "required_review_thread_resolution": true,
        "allowed_merge_methods": ["squash"] } },
    { "type": "required_status_checks", "parameters": {
        "strict_required_status_checks_policy": false,
        "required_status_checks": [
          { "context": "shell scripts and workflows" },
          { "context": "RotaryKit tests" },
          { "context": "iOS app build and tests" },
          { "context": "changelog fragment" } ] } }
  ]
}
JSON
)"

id="$(gh api "repos/$repo/rulesets" --jq '.[] | select(.name == "main") | .id')"
if [[ -n "$id" ]]; then
  gh api --method PUT "repos/$repo/rulesets/$id" --input - <<<"$ruleset" >/dev/null
  echo "ok: ruleset main updated"
else
  gh api --method POST "repos/$repo/rulesets" --input - <<<"$ruleset" >/dev/null
  echo "ok: ruleset main created"
fi
