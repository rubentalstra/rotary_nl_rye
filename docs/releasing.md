# Releasing Rotary YEP NL

The iOS app is an update of the existing App Store listing (id 1567096118,
bundle id `com.caelitechnologies.rotary-nl-rye`, team `A8S2486A44`). A tag
on `main` releases it: `.github/workflows/release.yml` archives the app,
signs it with Apple's cloud signing, uploads it to App Store Connect and
fills in the notes from the changelog. The lane is Pullwatch's, adapted for
the App Store; it calls the same `scripts/release/release.sh` the maintainer
can run on his Mac.

## Versioning

- `MARKETING_VERSION` in `ios/App.xcconfig` is the version (SemVer); the tag
  is `v` plus that version. The native app continues from 13.2.1, so the
  first native release is 14.0.0.
- The build number (`CFBundleVersion`) is not kept in the repository. The
  lane asks App Store Connect for the highest build number it has and
  uploads the next one, never below 123 (the React Native app's last build
  was 122). `CURRENT_PROJECT_VERSION = 1` in `App.xcconfig` is only for
  local builds.
- `CHANGELOG.md` (Keep a Changelog) has a section `## [X.Y.Z] - YYYY-MM-DD`
  for every release. Between releases each change waits as a fragment in
  `changelog.d/` (`changelog.d/README.md`); the release cut writes the
  fragments into that section.

## Two kinds of tag

| Tag | What happens |
|---|---|
| `vX.Y.Z-beta.N` | A test build in TestFlight. Its What to Test is the section the fragments in `changelog.d/` would become. Internal testers get it right away. |
| `vX.Y.Z` | The release build in TestFlight, and App Store version X.Y.Z prepared: made when it does not exist yet, this build picked for it, and its What's New set from the `CHANGELOG.md` section in every language of the listing. The lane never submits for review. |

`scripts/release/check-version.sh <tag>` is the lane's first step: the tag
must match `MARKETING_VERSION`; a test version must come before the cut
(no `[X.Y.Z]` section yet, at least one fragment); a final version needs
its dated section with text and no fragments left.

The notes are the changelog's list as plain text: each item starts with
"•", continuation lines join their item, issue references such as "(#81)"
are left out, and the text stops at App Store Connect's 4,000 characters.
`swift scripts/release/app-store-connect.swift text notes.md` shows how
they will read.

## Releasing a test version

1. Merge everything for it into `main`.
2. Check `MARKETING_VERSION` in `ios/App.xcconfig`.
3. Tag and push: `git tag v14.0.0-beta.1 && git push origin v14.0.0-beta.1`.
4. Follow the Release workflow. When it is done, the build is in TestFlight
   with its What to Test.

## Releasing a version

1. On a release branch, cut the changelog:
   `bash scripts/release/changelog.sh --assemble 14.0.0 2026-12-01`, read the
   new section, and merge the pull request.
2. Tag the merge commit on `main` and push: `git tag v14.0.0 && git push origin v14.0.0`.
3. When the workflow is done, open App Store Connect: version 14.0.0 has the
   build and What's New. Check the screenshots and the rest of the listing,
   then submit it for review.

## The secrets

One App Store Connect API key does everything: cloud signing (the
distribution certificate and profile are Apple's, nothing to export or
renew), the upload and the notes.

1. App Store Connect, Users and Access, Integrations, App Store Connect
   API, Team Keys: generate a key with the **Admin** role (cloud signing
   needs Admin). Download the `.p8` once; Apple keeps no copy.
2. In the repository's Settings, Secrets and variables, Actions, add:

| Secret | Value |
|---|---|
| `ASC_KEY` | the whole `.p8` file as downloaded, its first and last line included |
| `ASC_KEY_ID` | the key's ID (10 characters, next to the key) |
| `ASC_ISSUER_ID` | the Issuer ID above the list of keys |

Without them the lane stops in its first job and names what is missing. The
key never enters the repository: the lane writes it to the runner's
temporary directory and removes it at the end.

## Releasing from the Mac

The same scripts work locally, with the `.p8` kept outside the repository:

```bash
export DEVELOPER_DIR=/Applications/Xcode.app/Contents/Developer
export ASC_KEY_FILE=~/path/to/AuthKey_XXXXXXXXXX.p8 ASC_KEY_ID=XXXXXXXXXX ASC_ISSUER_ID=…
export BUILD_NUMBER="$(swift scripts/release/app-store-connect.swift next-build-number)"
bash scripts/release/release.sh
bash scripts/release/notes.sh v14.0.0-beta.1 > /tmp/notes.md
swift scripts/release/app-store-connect.swift notes 14.0.0 "$BUILD_NUMBER" /tmp/notes.md
```

## When something goes wrong

- **The upload fails on signing**: the key is not Admin, or the team has
  reached its limit of distribution certificates (revoke an old one in the
  developer account).
- **A rerun fails with a duplicate build number**: the first run did upload;
  push a new tag (`-beta.N+1`) rather than rerunning, or rerun only the
  notes on the Mac.
- **The notes step times out**: App Store Connect took longer than 45
  minutes to process the build. Run the notes command from the Mac once the
  build shows as processed.
