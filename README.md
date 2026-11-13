# Rotary YEP NL

The app of Rotary Youth Exchange Netherlands, for exchange students, host
families, Rotary clubs and counsellors: news, the calendar, programs and
camps, students and clubs, contacts and emergency numbers.

- [App Store](https://apps.apple.com/nl/app/rotary-youth-exchange-nl/id1567096118)
- [Google Play](https://play.google.com/store/apps/details?id=com.caelitechnologies.rotary_nl_rye)

## The native rewrite

From version 14 the app is two fully native apps:

| Folder | Platform | Built with | Status |
| --- | --- | --- | --- |
| `ios/` | iPhone and iPad, iOS 26 and later | Swift 6.4, SwiftUI, Xcode 27.1 | in progress |
| `android/` | Android | Kotlin, Jetpack Compose | not started |
| `archive/` | both | React Native (Expo), versions 13.x | frozen, reference only |

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

[CONTRIBUTING.md](CONTRIBUTING.md) has the workflow and the checks.

## Legal

[Privacy policy](privacy_policy.md), [terms and conditions](terms_and_conditions.md),
[security](SECURITY.md). The code is MIT licensed ([LICENSE](LICENSE)).
