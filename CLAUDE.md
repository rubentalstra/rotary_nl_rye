# Expo HAS CHANGED

Read the exact versioned docs at https://docs.expo.dev/versions/v56.0.0/ before writing any code.
@AGENTS.md

## Project: Rotary YEP NL (v13)

Expo SDK 56 mobile app for Rotary Youth Exchange Netherlands. Native @expo/ui UI on iOS (SwiftUI) and Android (Jetpack Compose). No web target. iOS 16.4 minimum, Android Material 3.

## Folder layout (SDK 56 template default — `src/` at root)

- `src/app/` — Expo Router routes (file-based)
- `src/components/` — shared UI built on @expo/ui
- `src/features/<feature>/` — feature modules (`components/`, `hooks/`, `data/`, `api/`)
- `src/lib/` — theme, cache, config, types
- `src/hooks/` — cross-feature React hooks
- `src/utils/` — pure functions (date, flags, communications)
- `src/constants/` — theme constants (Colors, Spacing, Fonts) — from the SDK 56 template
- `assets/` — images, icons, flags, fonts (sibling to `src/`)
- `legacy/` — the v12 app, frozen, excluded from build (do NOT edit or import from here)

## Rules

- Path aliases: `@/*` → `./src/*`, `@/assets/*` → `./assets/*` (template default).
- No barrel `index.ts` files. Direct imports only.
- No `import { X as Y }` aliases. Rename the export instead.
- Platform-specific UI lives in `Foo.ios.tsx` / `Foo.android.tsx` siblings. Compose `@expo/ui/swift-ui` on iOS, `@expo/ui/jetpack-compose` on Android.
- Icons: SF Symbols on iOS (via `expo-symbols`), Material Symbols on Android (via `@expo/material-symbols` + `@expo/ui/jetpack-compose` `Icon`).
- Do NOT use `@expo/vector-icons` (deprecated in SDK 56).
- Native folders (`ios/`, `android/`) are gitignored. Run `npx expo prebuild` to regenerate.
- Static data lives in `src/features/<feature>/data/*.json`.

## Migration approach

The `src/` directory was seeded with the SDK 56 default template (NativeTabs, ThemedText/ThemedView, animated-icon, color-scheme hook). We're rebuilding the v12 features on top of that scaffold page-by-page, swapping React Native primitives for `@expo/ui` native components as we go.
