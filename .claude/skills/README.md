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

A skill of our own (committed) gets its own folder here with a `SKILL.md`, and
a `!.claude/skills/<name>/` line in `.gitignore`.
