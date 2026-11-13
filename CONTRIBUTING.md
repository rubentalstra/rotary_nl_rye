# Contributing

## Set up a clone

```bash
git clone https://github.com/rubentalstra/rotary_nl_rye.git
cd rotary_nl_rye
git config core.hooksPath .githooks     # secret scan and attribution strip
bash scripts/dev/xcode-skills.sh        # Apple's agent skills, for Claude Code
```

You need Xcode 27.1 (`/Applications/Xcode.app`), and for the checks
`brew install shellcheck actionlint`.

## Work in a branch

1. Every change starts from an issue. File one with
   `scripts/gh/issue.sh new <bug|feature|task> <urgent|high|medium|low> <high|medium|low> --title … --body …`.
2. Branch from `main` with the conventional type of the issue: `fix/…` for a
   bug, `feat/…` for a feature, `docs/`, `chore/`, `refactor/`, `perf/`,
   `test/` or `ci/` for a task.
3. Commit subjects are conventional and in English (`feat: news tab`).
4. Add a changelog fragment (`changelog.d/README.md`), or ask for the
   `no-changelog` label when nobody using the app notices the change.
5. Open a pull request against `main`. It is squash-merged by the owner once
   CI passes.

## Run the gates

```bash
export DEVELOPER_DIR=/Applications/Xcode.app/Contents/Developer
swift test --package-path ios/RotaryKit -Xswiftc -warnings-as-errors
xcodebuild test -project ios/RotaryYEP.xcodeproj -scheme RotaryYEP \
  -destination 'platform=iOS Simulator,name=iPhone 18 Pro Max' \
  -derivedDataPath build/DerivedData CODE_SIGNING_ALLOWED=NO
shellcheck --severity=style scripts/*/*.sh .claude/hooks/*.sh .githooks/*
actionlint
bash scripts/release/changelog.sh --check
```

## Code style

Swift follows [.claude/rules/swift.md](.claude/rules/swift.md): Xcode's
formatting (4 spaces), Swift 6 with strict concurrency, warnings as errors,
SwiftUI and Observation, Swift Testing, every string in Dutch and English.

No AI or assistant attribution in commits, pull requests or issues.
