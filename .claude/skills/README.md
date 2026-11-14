# Skills

Apple's agent skills ship with Xcode and are Apple's material, so they are
exported per Mac and never committed (`.gitignore`). Export them once per Mac
and again after every Xcode update:

```bash
bash scripts/dev/xcode-skills.sh
```

That writes these skills here (Xcode 27.1):

| Skill | Read it before |
| --- | --- |
| `swiftui-specialist` (and its `references/`) | writing or reviewing any view |
| `swiftui-whats-new-27` | using an iOS 27 API, or when `@State` stops compiling |
| `app-resizability` | a layout for iPad, multiple windows, rotation, safe areas |
| `app-intents-specialist`, `app-intents-whats-new-27` | Shortcuts, Siri, Spotlight, widgets' intents |
| `modernize-tests` | touching tests |
| `device-interaction` | checking a change on the simulator (screenshots, taps) |
| `audit-xcode-security-settings` | changing build settings |
| `adopt-c-bounds-safety`, `building-document-based-swiftui-applications` | (not used by this app) |

## Google's Android skills

Google publishes its Android guidance as agent skills
([github.com/android/skills](https://github.com/android/skills), from
developer.android.com, Apache 2.0). They are installed per machine, pinned to
a commit, and never committed:

```bash
bash scripts/dev/android-skills.sh
```

That installs the skills this app uses:

| Skill | Read it before |
| --- | --- |
| `navigation-3` (and its recipes) | a new screen, route, tab or deep link |
| `navigation-event` | custom back handling (predictive back) |
| `adaptive` | any layout: phones, foldables, tablets, list-detail |
| `edge-to-edge` | anything at the screen's edges or near the keyboard |
| `jetpack-compose-performance` | writing or reviewing a list, state or animation |
| `testing-setup` | adding a kind of test (screenshot, Hilt, end to end) |
| `android-intent-security`, `android-permissions-security` | an intent, a deep link, a permission |
| `r8-analyzer`, `anr-audit-and-fix` | a keep rule, a release-only crash, a slow start |
| `agp-9-upgrade` | changing the Gradle setup |
| `play-policy-insights` | the Play listing, permissions declarations, data safety |
| `android-cli` | using the Android CLI |

To take a newer version, raise `COMMIT` in the script, read what changed, and
run it again.

A skill of our own (committed) gets its own folder here with a `SKILL.md`, and
a `!.claude/skills/<name>/` line in `.gitignore`.
