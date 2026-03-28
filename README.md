# Rotary Youth Exchange Netherlands

The official mobile app for Rotary Youth Exchange Netherlands (YEP NL), providing resources, information, and support
for exchange students, families, and Rotary clubs.

## Tech Stack

- **Framework:** [Expo](https://expo.dev) SDK 55 + React Native 0.83
- **Routing:** [Expo Router](https://docs.expo.dev/router/introduction/) with native tabs
- **Styling:** [NativeWind](https://nativewind.dev) v5 (Tailwind CSS v4)
- **UI Components:** [React Native Reusables](https://reactnativereusables.com)
- **Data Fetching:** [TanStack Query](https://tanstack.com/query) v5
- **State Management:** [Zustand](https://zustand.docs.pmnd.rs)
  v5 + [MMKV](https://github.com/mrousavy/react-native-mmkv)
- **Lists:** [FlashList](https://shopify.github.io/flash-list/) v2
- **i18n:** [i18next](https://www.i18next.com) + [react-i18next](https://react.i18next.com)
- **Language:** TypeScript (strict mode)

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npx expo start

# Run on iOS simulator
npx expo run:ios

# Run on Android emulator
npx expo run:android
```

## Project Structure

```
├── app/           # Expo Router pages (file-based routing)
├── components/    # UI components (React Native Reusables + composites)
├── lib/           # Hooks, API, stores, utils, data, i18n
├── assets/        # Static images, icons, flags
└── global.css     # Tailwind theme + Rotary brand colors
```

## Build & Deploy

```bash
# Development build
eas build --profile development

# Preview build (TestFlight / internal)
eas build --profile preview

# Production build
eas build --profile production

# OTA update
eas update --branch production
```

## Links

- [App Store](https://apps.apple.com/nl/app/rotary-youth-exchange-nl/id1567096118)
- [Play Store](https://play.google.com/store/apps/details?id=com.caelitechnologies.rotary_nl_rye)

## License

See [LICENSE](LICENSE) for details.
