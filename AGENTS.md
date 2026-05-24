# Agent guidance for rotary-yep-nl (v13)

## Stack

- Expo SDK 56, expo-router (file-based), React Native 0.85, React 19.2, TypeScript 6
- Hermes v1 default, New Architecture
- Native UI: `@expo/ui/swift-ui` on iOS, `@expo/ui/jetpack-compose` on Android
- No web target. No React Native primitives where `@expo/ui` has an equivalent.
- pnpm (not npm or yarn)

## Source of truth for APIs

Always check https://docs.expo.dev/versions/v56.0.0/ before writing code that touches an Expo module. APIs changed substantially between SDK 55 and 56 (file-system async copy/move, expo/fetch as default, status-bar/navigation-bar declarative API, etc).

## Conventions

- Code lives under `src/`. Routes under `src/app/`. Path aliases: `@/*` → `./src/*`, `@/assets/*` → `./assets/*`.
- No barrel files. Import `@/components/ui/Card` directly, not `@/components/ui`.
- No `import { X as Y }` renaming. Rename the export.
- Platform splits: `Foo.ios.tsx` / `Foo.android.tsx`.
- All `@expo/ui/swift-ui` and `@expo/ui/jetpack-compose` usages must be wrapped in `<Host>`. Prefer one `Host` per screen section, not per atomic component.
- Static content (students, clubs, contacts) lives in `src/features/<feature>/data/*.json`.
- Use the new declarative `<StatusBar />` / `<NavigationBar />` in screens — multiple instances merge in mount order.
- Use `Stack.Toolbar` (SDK 56) for screen-level toolbar actions on iOS + Android.

## When in doubt

- Check `legacy/` for how a feature worked in v12, but do NOT import from `legacy/` — it's excluded from the TS project and ESLint.
- The SDK 56 template scaffolding (`src/app/index.tsx`, `src/components/themed-*`, `src/constants/theme.ts`) is the starting point — replace pages and components as you port features.
- Run `npx expo-doctor@latest` after dependency changes.
- Always test on both iOS + Android before claiming a task complete.
