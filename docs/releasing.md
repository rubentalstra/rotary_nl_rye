# Releasing Rotary YEP NL

The iOS app is an update of the existing App Store listing (id 1567096118,
bundle id `com.caelitechnologies.rotary-nl-rye`, team `A8S2486A44`). A tag
on `main` releases it: `.github/workflows/release.yml` archives the app,
signs it with the team's Apple Distribution certificate, uploads it to App Store Connect and
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

Two things: an App Store Connect API key (the provisioning profile, the
upload and the notes) and the team's Apple Distribution certificate (the
signature).

**Why not Apple's cloud signing.** The team is an individual account, so its
certificates carry the name "Ruben Daniël Talstra". Cloud signing writes that
name into the app's designated requirement with the "ë" decomposed (e plus a
combining diaeresis), while the certificate has it composed. The signature
then fails its own requirement and App Store Connect rejects the upload
("Invalid Signature. Code failed to satisfy specified code requirement(s)").
Signing with a certificate in a keychain writes the name as the certificate
has it. The first beta (build 123, 14 November 2026) ran into this.

1. App Store Connect, Users and Access, Integrations, App Store Connect
   API, Team Keys: generate a key with the **Admin** role. Download the
   `.p8` once; Apple keeps no copy.
2. The Apple Distribution certificate, with that key (or in Xcode,
   Settings, Accounts, Manage Certificates):

   ```bash
   umask 077
   /usr/bin/openssl genrsa -out distribution.key 2048
   /usr/bin/openssl req -new -key distribution.key -subj "/CN=Rotary YEP NL release/C=NL" -out distribution.csr
   swift scripts/release/app-store-connect.swift certificate distribution.csr distribution.cer
   /usr/bin/openssl x509 -inform DER -in distribution.cer -out distribution.pem
   /usr/bin/openssl pkcs12 -export -inkey distribution.key -in distribution.pem -name "Apple Distribution" -out distribution.p12
   ```

   macOS's own `/usr/bin/openssl` (LibreSSL) writes a `.p12` the keychain
   can import. Keep the `.p12` and its password in a password manager.
3. In the repository's Settings, Secrets and variables, Actions, add:

| Secret | Value |
|---|---|
| `ASC_KEY` | the whole `.p8` file as downloaded, its first and last line included |
| `ASC_KEY_ID` | the key's ID (10 characters, next to the key) |
| `ASC_ISSUER_ID` | the Issuer ID above the list of keys |
| `DISTRIBUTION_P12` | the `.p12` in base64: `base64 -i distribution.p12 \| tr -d '\n'` |
| `DISTRIBUTION_P12_PASSWORD` | the `.p12`'s password |

Without them the lane stops in its first job and names what is missing.
Neither enters the repository: the lane writes the key and the certificate
to the runner's temporary directory, imports the certificate into a
keychain of its own, and removes both at the end.

**Renewal.** The certificate is valid for a year (the current one until 14
November 2027). Before it expires, make a new one with step 2 and replace
the two `DISTRIBUTION_P12` secrets; then revoke the old one in the developer
account. Apps already on the App Store keep working when it expires.

## Releasing from the Mac

The same scripts work locally, with the Apple Distribution certificate in
your keychain and the `.p8` kept outside the repository:

```bash
export DEVELOPER_DIR=/Applications/Xcode.app/Contents/Developer
export ASC_KEY_FILE=~/path/to/AuthKey_XXXXXXXXXX.p8 ASC_KEY_ID=XXXXXXXXXX ASC_ISSUER_ID=…
export BUILD_NUMBER="$(swift scripts/release/app-store-connect.swift next-build-number)"
bash scripts/release/release.sh
bash scripts/release/notes.sh v14.0.0-beta.1 > /tmp/notes.md
swift scripts/release/app-store-connect.swift notes 14.0.0 "$BUILD_NUMBER" /tmp/notes.md
```

## When something goes wrong

- **The upload fails with "Invalid Signature"**: the app was signed by
  cloud signing instead of the certificate, which happens when the keychain
  step found no valid Apple Distribution identity (an expired or revoked
  certificate, or a wrong `DISTRIBUTION_P12_PASSWORD`). Renew it as above.
- **Making a certificate fails**: the team has reached its limit of
  distribution certificates; revoke an old one in the developer account.
- **A rerun fails with a duplicate build number**: the first run did upload;
  push a new tag (`-beta.N+1`) rather than rerunning, or rerun only the
  notes on the Mac.
- **The notes step times out**: App Store Connect took longer than 45
  minutes to process the build. Run the notes command from the Mac once the
  build shows as processed.
