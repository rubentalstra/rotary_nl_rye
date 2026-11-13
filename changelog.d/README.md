# Changelog fragments

A pull request with a user-visible effect adds one file here instead of a
line under `[Unreleased]` in `CHANGELOG.md`, so two open pull requests never
edit the same lines. User-visible means anything a person using the app
notices, or reads in the release notes: a feature, a fix, changed behaviour,
text, settings, the requirements to run it (the iOS version).

- **Name:** `<issue>-<kebab-slug>.<section>.md`, for example
  `52-sync-progress.changed.md`. `<issue>` is the issue the change
  closes, or its pull request when it has no issue. `<section>` is a Keep a
  Changelog 1.1.0 section in lower case: `added`, `changed`, `deprecated`,
  `removed`, `fixed` or `security`.
- **Content:** the entry exactly as it will read in `CHANGELOG.md`: one or
  more list items that open with `- `, continued on lines indented by two
  spaces, with no heading and no blank line inside. Write for the person
  using the app, in English.
- **Issue reference:** leave it out. The release cut ends the first
  paragraph of each entry with `(#<issue>)`, the number the file name starts
  with, unless the entry already names that issue.

A pull request that changes nothing a person would notice (a refactor, tests,
CI, docs) carries the `no-changelog` label instead.

## Checks and the cut

- `bash scripts/release/changelog.sh --check` checks every fragment's name
  and content.
- `bash scripts/release/changelog.sh --preview X.Y.Z` prints the section the
  next release would get, and writes nothing.
- `bash scripts/checks/changelog-guard.sh <base> [head]`, run by CI on every
  pull request, fails a pull request that adds a line under `[Unreleased]`
  (with or without the label) and one that changes `ios/RotaryYEP/`, `ios/RotaryKit/Sources/` or
  `android/app/src/main/` without adding a fragment (unless it has the
  `no-changelog` label). CI reads the label from the pull request event, so
  after setting it, push again or close and reopen the pull request.
- The release cut runs
  `bash scripts/release/changelog.sh --assemble X.Y.Z YYYY-MM-DD`
  (`docs/releasing.md`): it writes the fragments into `CHANGELOG.md` under
  `## [X.Y.Z] - YYYY-MM-DD` and deletes them. A tag is refused while a
  fragment is left here.

This README is not a fragment.
