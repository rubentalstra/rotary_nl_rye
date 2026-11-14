# CLAUDE.md

Rotary YEP NL is the app of Rotary Youth Exchange Netherlands, for exchange
students, host families, clubs and counsellors: news, the calendar, programs
and camps, students and clubs, contacts and emergency numbers. MIT. It is being
rebuilt as two **fully native apps**: iOS first (SwiftUI, `ios/`), Android
later (Kotlin and Jetpack Compose, `android/`). The React Native app that
shipped as 13.x is frozen in `archive/` as a reference only. Swift is written
as `.claude/rules/swift.md` says; Apple's own guidance is in `.claude/skills/`.

## Repository map

- `ios/`: the iOS app. `RotaryYEP.xcodeproj` (committed; synchronized folders,
  so adding a file needs no project edit; shared scheme `RotaryYEP`).
  Settings: `App.xcconfig` (version, build number, bundle id, display name,
  icon), included by `Debug.xcconfig` (then the optional, git-ignored
  `Local.xcconfig`) and `Release.xcconfig`. The project file holds the rest:
  team `A8S2486A44`, iOS 26.0, Swift 6 with the Swift 7 upcoming features,
  warnings as errors.
  `ios/RotaryYEP/`: the app, one folder per feature with its `@Observable`
  model and views; `App/` the wiring (`RotaryYEPApp`, `ContentView` for now);
  `Camps/`: `CampsModel` (loading, search, filters: age, countries, hide
  full, show past; order by date or price), `CampsView` (sections per month),
  `CampRow`, `CampFilterMenu` (one toolbar menu), `CampDetailView` (the
  invitation in the in-app browser).
  `RotaryClubs/`: `RotaryClubsView` (welcome, topics, documents per role,
  search) and `ClubTopicView`. `General/DocumentLink`: a PDF opens in Quick
  Look after `RemoteDocument` downloads it (through the URL cache), anything
  else in the in-app browser.
  `Calendar/`: `CalendarModel` (now, upcoming per month, past behind a
  button, the marked days), `CalendarView` (list or month), `EventRow` with
  `DateBadge`, `EventMonthView` (the system's `UICalendarView`),
  `EventDetailView` (Maps, Meet, and EventKitUI's add-to-calendar sheet,
  which needs no calendar access).
  `News/`: `NewsModel`, `NewsView` (the newest item large, then the rest;
  covers whole on white, as they are banners with text), `ArticleView`.
  `Home/`: `HomeView` (banner, `PhotoCarousel`, the tile grid: three to a
  row when the width allows, as on the Pro Max, else two), `HomePhoto` and
  `HomeDestination` (enums; a destination not rebuilt yet opens
  `ComingSoonView`).
  `Navigation/` the tabs (`AppTab`, `MainTabView`) and `AppRouter`; one
  folder per tab root (`Home/`, `About/`, `Emergency/`, `Contact/`,
  `Settings/`); `General/` shared views (`ComingSoonView` for screens not
  rebuilt yet);
  `AppIcon.icon` the Icon Composer app icon (`icon.json` plus one SVG per
  layer; check it in light, dark, tinted and clear); `Assets.xcassets`;
  `Localizable.xcstrings` (nl source, en). `ios/Info.plist` holds only the
  launch screen (`UILaunchScreen` with the `LaunchBackground` colour): Apple's
  launch screen is the first screen without content, never a splash with a
  logo or text (HIG, Launching).
  Brand assets in `Assets.xcassets`: `RotaryWheel` (a template image, drawn
  in `RotaryGold`), `RotexLogo` (with a dark variant),
  `RotaryYouthExchangeBanner` (with a reversed dark variant: white lettering),
  `Emergency112` and the `HomePhoto…` carousel photos; the logos are vector. Brand logos of other companies (WhatsApp, Instagram) come from
  `simple-icons-swift` (pinned exactly) through `General/BrandIcon`; every
  package's licence file is copied verbatim into `Settings/Licenses/` and
  listed in `License.all` (`LicensesTests` checks it ships).
  `ios/RotaryYEPTests/`: hosted Swift Testing suites for the built app
  (`BundleTests`: bundle id, display name, version).
  `ios/RotaryYEPUITests/`: XCUITests; `TabTourUITests` walks every tab and a
  person in Dutch light and English dark and keeps a screenshot of each step
  in the result bundle (`xcrun xcresulttool export attachments`).
  `ios/RotaryKit/`: the local Swift package with everything without a screen
  (iOS 26 and macOS 26, so `swift test` runs on the Mac). `RotaryCore` is its
  first module: `AppIdentity` (the bundle id, App Store id and the app's
  pages: listing, review sheet, privacy policy, terms, Instagram),
  `Organisation/` (`Person`, `Role`, `ContactGroup`, `ContactLinks`, and the
  people in `Person+MDJC`, `+LongTerm`, `+ShortTerm`, `+ROTEX`,
  `+Confidants`), `About/` (`AboutTopic`), `RotaryClubs/` (`ClubTopic`, `ClubGuide`
  and `ClubDocument`, each document defined once and listed by every guide
  that needs it) and its own
  `Localizable.xcstrings`. `RotaryCamps`: the summer camps from
  `zomerkampen.xlsx` on rotary.nl (`CampFeed`, loaded through `URLCache`:
  revalidated online, the last copy offline), read by `Spreadsheet`
  (ZIPFoundation unpacks the XLSX, Foundation's `XMLParser` reads the parts)
  and `CampSheet` (columns by header; Excel serial and text dates, district
  lists, trailing spaces), into `Camp`; tested against the real file in
  `Tests/RotaryCampsTests/Fixtures/`. `RotaryNews`: `NewsFeed`
  (news.json on rotary.nl) into `NewsItem` (a PDF, or an article of
  headings, paragraphs, images and videos), newest first. `RotaryCalendar`:
  `CalendarFeed` (the MDJC calendar through the Google Calendar API v3, a
  year back to a year ahead; the key from `ROTARY_GOOGLE_API_KEY` in
  `App.xcconfig` through Info.plist, every request carrying the bundle id for
  the key's app restriction) into `CalendarEvent` (all-day by calendar days,
  or timed). Network goes through `HTTPClient`, and a feed that changes now and then through
  `CachedFetch` (`RotaryCore/Networking`): revalidated online, the last copy
  offline.
- `android/`: the Android app, not started. Package
  `com.caelitechnologies.rotary_nl_rye` (Play Store listing) never changes.
- `archive/`: the React Native app (v13, Expo SDK 58), `archive/README.md`.
  Never built, never edited, never imported from. Read it to see what a screen
  did and to take its content: `archive/src/features/*/data/*.json` (students,
  clubs, contacts, programs), `archive/src/lib/i18n/locales/{nl,en}.json` (all
  texts), `archive/assets/` (flags, pictures, logos).
- `privacy_policy.md`, `terms_and_conditions.md`: linked from the store
  listings; keep them at the root.
- `.claude/`: `settings.json` (hooks), `hooks/` (secrets, attribution,
  dangerous commands, shellcheck, session context), `rules/swift.md`,
  `skills/` (Apple's skills, exported per Mac by
  `bash scripts/dev/xcode-skills.sh`, git-ignored; `skills/README.md` says
  which to read when).
- `.github/`: `workflows/ci.yml` (shellcheck and actionlint, `swift test` of
  RotaryKit, `xcodebuild test` on the iPhone 18 Pro Max simulator),
  `workflows/changelog.yml` (the fragment guard), issue forms, PR template,
  `CODEOWNERS`, `dependabot.yml`, `release.yml` (release-note categories),
  `actionlint.yaml` (the `xcode-27` runner label).
- `scripts/dev/run-sim.sh`: builds, installs and launches the app on the
  iPhone 18 Pro Max simulator (watch it in DeviceHub, Xcode 27's window for
  simulators); run it after every UI change.
- `scripts/gh/`: `issue.sh` (file an issue with type, priority and effort),
  `labels.sh` (the label set), `rel.sh` (sub-issues and blocked-by),
  `protect-main.sh` (the `main` ruleset). `scripts/release/changelog.sh` and
  `scripts/checks/changelog-guard.sh`: the changelog fragments.
  `scripts/dev/xcode-skills.sh`: exports Apple's skills; `sync-strings.sh`
  (with `catalog-tidy.py`) writes the extracted text into the String Catalogs,
  which xcodebuild alone does not.
- `.githooks/`: `pre-commit` (refuses private keys, tokens, certificates) and
  `commit-msg` (strips AI attribution). Install once per clone:
  `git config core.hooksPath .githooks`.

## Hard rules

- **Never push to `main` or merge a pull request.** Work on a
  conventional-type branch, push it and open a pull request; Ruben merges.
  The Claude Bash hook refuses a push to `main` and `gh pr merge`.
- **The identifiers never change.** iOS bundle id
  `com.caelitechnologies.rotary-nl-rye` under team `A8S2486A44`, App Store id
  `1567096118`; Android package `com.caelitechnologies.rotary_nl_rye`. The
  native apps are updates of the existing store listings; another id is a new
  app and loses every user. `BundleTests` and `AppIdentityTests` check it.
- **The version continues from 13.2.1.** The first native release is 14.0.0.
- **Apple-native look and feel, never a copy of v13.** The v13 screens were
  not native; fixing that is the point of the rewrite. Take the *content* and
  the *purpose* of a v13 screen from the archive, then design the screen the
  way Apple's own apps do (Settings, Health, App Store, Weather): system
  navigation and lists, SF Symbols, Liquid Glass from the system, Dynamic
  Type, the Human Interface Guidelines. No custom cards, headers or carousels
  that imitate the React Native layout when a system component does the job.
- **Apple's mechanisms, never home-made ones.** Greenfield: v13 only says
  what information exists. Content is typed Swift values in RotaryKit; every
  text a person reads is a `LocalizedStringResource(…, bundle: #bundle,
  comment:)` in the module's String Catalog (never JSON with our own
  translations); a closed set is an `enum` (`CaseIterable`, `Identifiable`
  with `var id: Self { self }`), never string ids; a record is `Identifiable`
  by its natural identity (a person by `PersonNameComponents`), never an
  invented slug; something defined once is referenced, never copied (the
  emergency group references the team's people). Before building any
  mechanism, check the SDK and Apple's skills for the one Apple ships.
- **Native only.** No React Native, Expo, Flutter, Kotlin Multiplatform or
  other cross-platform layer, and no web views for screens the platform can
  draw. Each app uses its platform's own frameworks first; a third-party
  package needs a reason in its pull request.
- **No secrets in the tree.** Signing certificates, App Store Connect keys and
  keystores live in the Keychain and Actions secrets. The pre-commit hook and
  the Claude `protect_secrets.sh` hook refuse them.
- **Every user-facing string in Dutch and English.**
- **Never weaken, skip or delete a test** to make a build pass.
- **No AI attribution in commits, PRs or issues.** No `Co-authored-by`, no
  "Generated with", no robot emoji. The `commit-msg` hook strips it and the
  Claude Bash hook refuses the command.
- **Prose has no AI tells**, in UI text, docs, commits and PRs: no em dashes,
  no "·" as a separator, no "not X but Y", no buzzwords.

## Gates (run before every commit)

The same as CI (`.github/workflows/ci.yml`), warnings as errors:

```bash
export DEVELOPER_DIR=/Applications/Xcode.app/Contents/Developer
swift test --package-path ios/RotaryKit -Xswiftc -warnings-as-errors
xcodebuild test -project ios/RotaryYEP.xcodeproj -scheme RotaryYEP \
  -destination 'platform=iOS Simulator,name=iPhone 18 Pro Max' \
  -derivedDataPath build/DerivedData CODE_SIGNING_ALLOWED=NO
shellcheck --severity=style scripts/*/*.sh .claude/hooks/*.sh .githooks/*
actionlint
bash scripts/release/changelog.sh --check
bash scripts/dev/sync-strings.sh && git diff --exit-code -- '*.xcstrings'
```

The default simulator is the **iPhone 18 Pro Max**. A UI change is looked at
before it is called done: run it there and on an iPad simulator, in light and
dark mode, in Dutch and English, at the largest Dynamic Type size, and check
for truncation (the `device-interaction` skill takes screenshots and taps).

## Workflow

The tracker is this repository's GitHub Issues (`rubentalstra/rotary_nl_rye`,
a personal account, so no native issue types or fields). Every issue carries
three labels: its type (`bug`, `feature`, `task`), its priority
(`priority:urgent|high|medium|low`) and its effort (`effort:high|medium|low`;
`low` is one sitting, `medium` one pull request, `high` more than one), plus
`ios` or `android` when it is about one app. A task also carries exactly one
work-kind label (`documentation`, `chore`, `refactor`, `perf`, `test`, `ci`).
File one with `scripts/gh/issue.sh new <type> <priority> <effort> <gh issue
create args>`, never a bare `gh issue create`. Epics are parents
(`scripts/gh/rel.sh parent <child> <epic>`); order is `rel.sh blocked-by`.
Read an issue with `gh issue view <n> --json title,body,comments`.

A change reaches `main` through a pull request on a conventional-type branch
(a bug is `fix/`, a feature `feat/`, a task its work kind), with
conventional commit subjects in English (`feat: …`, `fix: …`). The PR body
says what changed and why and closes its issue. Squash merges only.

Every change a person using the app notices adds a fragment under
`changelog.d/` (`changelog.d/README.md`), never a line under `[Unreleased]` in
`CHANGELOG.md`; the `Changelog` workflow fails a pull request that changes
`ios/RotaryYEP/`, `ios/RotaryKit/Sources/` or `android/app/src/main/` without
one, unless it has the `no-changelog` label.

Prefer what Pullwatch (`~/RustroverProjects/pullwatch`) and FerroLICENCE
(`~/RustroverProjects/FerroLICENCE`) already do and have proven (CI, hooks,
release lane, rules) over designing it again.

## Porting a screen from the archive

1. Read the screen in `archive/src/app/` and its feature in
   `archive/src/features/<feature>/`, and the texts it uses in
   `archive/src/lib/i18n/locales/`.
2. Move its data into RotaryKit (a model, a JSON resource or a client, with
   tests).
3. Design the screen anew in `ios/RotaryYEP/<Feature>/` as Apple would
   (Hard rules; `.claude/rules/swift.md`, `swiftui-specialist`, the HIG):
   ask which system component fits (a `List`, a `Form`, a
   `NavigationSplitView`, a `ShareLink`, a `ContentUnavailableView`) before
   drawing anything custom.
4. Its texts go into `Localizable.xcstrings` in Dutch and English
   (`bash scripts/dev/sync-strings.sh`, then add the English).
