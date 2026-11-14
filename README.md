# Rotary YEP NL

The app of Rotary Youth Exchange Netherlands, for exchange students, host
families, Rotary clubs and counsellors: news, the calendar, programmes,
the podcast and summer camps, students going abroad and coming to the
Netherlands, information for Rotary clubs, contacts and emergency numbers.

- [App Store](https://apps.apple.com/nl/app/rotary-youth-exchange-nl/id1567096118)
- [Google Play](https://play.google.com/store/apps/details?id=com.caelitechnologies.rotary_nl_rye)

## Two native apps

From version 14 the app is two fully native apps, one per platform, each
designed the way that platform's own apps are:

| Folder | Platform | Built with | Status |
| --- | --- | --- | --- |
| `ios/` | iPhone and iPad, iOS 26 and later | Swift 6.4, SwiftUI, Xcode 27.1 | in TestFlight |
| `android/` | phones, foldables and tablets, Android 10 and later | Kotlin 2.4, Jetpack Compose, Material 3 | in internal testing on Google Play |
| `archive/` | both | React Native (Expo), versions 13.x | frozen, reference only |

The content without a screen (people, programmes, students, the guides) is
written once, in Swift, in `ios/RotaryKit`; `scripts/dev/android-content.py`
generates the Android app's `android/core` from it, and CI checks that the
two are in step.

## Build the iOS app

```bash
open ios/RotaryYEP.xcodeproj    # then Cmd-R on the iPhone 18 Pro Max simulator
```

From the command line:

```bash
swift test --package-path ios/RotaryKit
xcodebuild test -project ios/RotaryYEP.xcodeproj -scheme RotaryYEP \
  -destination 'platform=iOS Simulator,name=iPhone 18 Pro Max' CODE_SIGNING_ALLOWED=NO
```

## Build the Android app

Open `android/` in Android Studio and run the `app` configuration on an
emulator or a phone. From the command line, with Android Studio's JDK:

```bash
cd android
./gradlew assembleDebug testDebugUnitTest lintDebug
```

The Compose tests run on the JVM through Robolectric, without an emulator.

## Releasing

A tag on `main` releases both apps with one build number: `vX.Y.Z-beta.N`
to TestFlight and Google Play's internal testing, `vX.Y.Z` to App Store
Connect and a draft production release on Google Play.
[docs/releasing.md](docs/releasing.md) has the procedure.

[CONTRIBUTING.md](CONTRIBUTING.md) has the workflow and the checks.

## Legal

[Privacy policy](privacy_policy.md), [terms and conditions](terms_and_conditions.md),
[security](SECURITY.md). The code is MIT licensed ([LICENSE](LICENSE)).
