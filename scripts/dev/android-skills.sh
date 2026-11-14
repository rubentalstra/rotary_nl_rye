#!/usr/bin/env bash
# scripts/dev/android-skills.sh
#
# Installs Google's Android agent skills (github.com/android/skills, from
# developer.android.com, Apache 2.0) into .claude/skills/, the Android
# counterpart of scripts/dev/xcode-skills.sh. They are Google's material, so
# they are installed per machine and git-ignored, never committed. The
# commit is pinned: raise COMMIT on purpose, read what changed, and rerun.
# Only the skills this app uses are installed; .claude/skills/README.md says
# which to read when.

set -euo pipefail

readonly COMMIT=5815d27fda564aa9f07ebdcb5e57ed3e8d904e0d # 2026-11-09
readonly SKILLS=(
  build-system/agp/agp-9-upgrade
  devtools/android-cli
  jetpack-compose/adaptive
  jetpack-compose/jetpack-compose-performance
  navigation/navigation-3
  navigation/navigation-event
  system/edge-to-edge
  testing/testing-setup
  performance/r8-analyzer
  performance/anr-audit-and-fix
  security/android-intent-security
  security/android-permissions-security
  play/play-policy-insights
)

root="$(git rev-parse --show-toplevel)"
work="$(mktemp -d)"
trap 'rm -r -- "$work"' EXIT

curl -fsSL --proto '=https' --tlsv1.2 -o "$work/skills.tar.gz" \
  "https://codeload.github.com/android/skills/tar.gz/$COMMIT"
tar -xzf "$work/skills.tar.gz" -C "$work"
src="$work/skills-$COMMIT"

for skill in "${SKILLS[@]}"; do
  name="$(basename "$skill")"
  test -f "$src/$skill/SKILL.md" || { echo "android-skills: no $skill at $COMMIT" >&2; exit 1; }
  # --delete makes the folder exactly the pinned skill, without leftovers.
  rsync -a --delete "$src/$skill/" "$root/.claude/skills/$name/"
  echo "installed $name"
done
cp "$src/LICENSE.txt" "$root/.claude/skills/ANDROID-SKILLS-LICENSE.txt"
