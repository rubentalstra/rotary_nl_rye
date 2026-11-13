#!/usr/bin/env bash
# scripts/dev/xcode-skills.sh
#
# Exports the agent skills that ship with Xcode (Apple's SwiftUI Specialist,
# What's New in SwiftUI 27, and the others) into .claude/skills/, so Claude
# sessions in this repository read Apple's current guidance. They are Apple's
# material and come with each Xcode, so they are exported per machine and
# git-ignored, never committed. Rerun after updating Xcode.

set -euo pipefail
root="$(git rev-parse --show-toplevel)"
export DEVELOPER_DIR="${DEVELOPER_DIR:-/Applications/Xcode.app/Contents/Developer}"
xcrun agent skills export --output-dir "$root/.claude/skills" --replace-existing
