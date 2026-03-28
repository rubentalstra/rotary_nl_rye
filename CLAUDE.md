# Rotary YEP NL

Official mobile app for Rotary Youth Exchange Netherlands.

## Architecture

- **Expo SDK 55** / React Native 0.83 / React 19
- **Expo Router** with native tabs (`src/app/`)
- **NativeWind v5** (Tailwind CSS v4) for styling — use `className`, no `StyleSheet.create()`
- **React Native Reusables** for UI primitives (`src/components/ui/`)
- **TanStack Query v5** for all data fetching
- **Zustand v5 + MMKV** for client state
- **FlashList** for all lists (not FlatList)
- **i18next** for translations (nl + en)
- **TypeScript** strict mode
- **React Compiler** enabled

## Project Structure

```
src/
├── app/           # Routes only (Expo Router)
├── components/    # UI components (RNR primitives + composites)
│   └── ui/        # React Native Reusables primitives
├── lib/           # All non-component logic
│   ├── hooks/     # Custom hooks
│   ├── api/       # API fetch functions
│   ├── stores/    # Zustand stores
│   ├── data/      # Static data files
│   ├── utils/     # Utility functions
│   ├── i18n/      # Translations
│   └── query/     # TanStack Query client
```

## Path Aliases

`@/` maps to `./src/` — use `@/lib/hooks/use-foo` not relative paths.

## Conventions

- **No barrel files** — import directly from source files
- **kebab-case** for file names (`use-calendar-events.ts`)
- **Dark mode** via NativeWind `dark:` variant — no custom ThemeProvider
- **Navigation theme** via `NAV_THEME` in `src/lib/constants.ts`
- **Data fetching** always via TanStack Query hooks (`useQuery`/`useMutation`)
- **State persistence** via Zustand + MMKV, never file-based storage
- **Translations** via `useTranslation()` from react-i18next — no hardcoded strings
- **Lists** use FlashList with `estimatedItemSize`
- Compose RNR primitives (Card, Button, Badge) directly in screens — only extract to `components/` when genuinely reused 3+ times

## Commands

```bash
npm start          # Dev server
npm run lint       # ESLint
npm run lint:fix   # ESLint autofix
npm test           # Jest tests
npx tsc --noEmit   # Type check
```

## Build

```bash
eas build --profile development   # Dev client
eas build --profile preview       # TestFlight / internal
eas build --profile production    # App Store / Play Store
eas update                        # OTA update
```
