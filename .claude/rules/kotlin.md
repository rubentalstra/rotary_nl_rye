# Writing Kotlin here

The one style guide for the Android app's Kotlin, the counterpart of
`swift.md`. It follows Google's guidance on developer.android.com, shipped to
agents as Google's Android skills (`.claude/skills/`, installed by
`bash scripts/dev/android-skills.sh`). Where this file says less, the skills
and developer.android.com decide. Every rule gives its reason, so a case it
does not cover can be argued from that.

## Toolchain and sources of truth

- **Android 10 (API 29) and later, phones, foldables and tablets**, built with
  AGP 9.5, Kotlin 2.4 (AGP's built-in Kotlin), Gradle 9.9 and compileSdk and
  targetSdk 37. minSdk 29 is the system-wide dark theme the app follows. An
  API newer than 29 gets a version check with a fallback that works on 29.
- Java 17 bytecode. Gradle runs on JDK 25
  (`gradle/gradle-daemon-jvm.properties`): the JDK inside Android Studio
  (`JAVA_HOME="$HOME/Applications/Android Studio.app/Contents/jbr/Contents/Home"`
  on this Mac), Temurin 25 on CI.
- Every dependency and plugin is in `android/gradle/libs.versions.toml`,
  never a version in a build file. Dependabot proposes updates; lint's
  version checks are off for that reason.
- **Google's guidance ships as agent skills** in `.claude/skills/`
  (`.claude/skills/README.md` says which to read when). Read `navigation-3`
  before a new screen or route, `adaptive` before a layout, `edge-to-edge`
  before anything that touches the screen's edges or the keyboard,
  `jetpack-compose-performance` before writing or reviewing a list or an
  animation, `testing-setup` before adding a kind of test,
  `android-intent-security` and `android-permissions-security` before an
  intent, a deep link or a permission, `r8-analyzer` before a keep rule.
- Never guess an API: check the skill, developer.android.com or the library's
  sources first.
- **Warnings are errors**, in Kotlin (`allWarningsAsErrors`) and in lint
  (`warningsAsErrors`). A deprecated API is a warning, so old code does not
  build: use what replaced it. A check silenced on purpose gets
  `tools:ignore` or `@Suppress` on the smallest element with a comment why;
  never a lint baseline, never for a whole file or module.

## Project layout

- `android/` is the Gradle project. `:app` holds the screens, one package per
  feature (`home`, `news`, `calendar`, `contact`, ...), each with its
  ViewModel, its screens and its routes; `navigation/` the tabs, the
  navigation state and the `Navigator`; `ui/theme/` the theme.
- Everything without a screen (the people, About, clubs, programmes,
  students, the feeds and their clients) goes in Kotlin modules beside
  `:app` (#103), as RotaryKit is for iOS, tested on the JVM.
- One main declaration per file, named after it. A file starts with a KDoc
  (`/** ... */`) on what the type is for.
- The package `com.caelitechnologies.rotary_nl_rye` and the `applicationId`
  never change (CLAUDE.md, Hard rules); `AppIdentityTest` checks them.

## Content and text

- Content that ships in the app is typed Kotlin values: a closed set is an
  `enum class` (or a `sealed interface`), a record a `data class`
  identified by its natural identity. No string ids, no slugs. Define a thing
  once and reference it.
- Every text a person reads is a string resource: `res/values/strings.xml`
  is Dutch (the app's own language, `resources.properties`), and
  `res/values-en/strings.xml` English. Each string has a `description` for
  the translator. Counts are `<plurals>`; a sentence is one string with
  placeholders, never pieced together; dates and numbers go through
  `java.time` and `android.icu` formatters for the person's locale.
- Content kept in one language on purpose (the programme pages, the v13
  guides) is `translatable="false"` with a comment, as `shouldTranslate:
  false` is on iOS. Text a person wrote about themselves (a bio) is a plain
  `String`, shown as written.
- Lint's `MissingTranslation` is an error: a string without its English does
  not build. The language per app comes from `generateLocaleConfig`.

## Architecture

Google's guide to app architecture: a UI layer and a data layer, with data
flowing one way.

- **UI layer**: a screen is a composable that gets a UI state and sends
  events up. Its state lives in a `ViewModel`, exposed as one `StateFlow` of
  an immutable UI state, collected with `collectAsStateWithLifecycle()`.
  Composables never start network or disk work.
- **Data layer**: a repository per kind of data is the single source of
  truth; feeds are fetched through one HTTP client behind an interface, so
  tests swap in a fake, with an HTTP cache: revalidated online, the last
  copy offline (as `CachedFetch` on iOS).
- **Dependency injection**: Hilt, from the first ViewModel with a repository
  (as the `testing-setup` skill says). Until then, nothing to inject.
- **Concurrency**: coroutines and `Flow` with structured concurrency
  (`viewModelScope`, `lifecycleScope`); dispatchers are injected, never
  hard-coded in a class. No `GlobalScope`, `runBlocking` in app code,
  `LiveData`, RxJava, `AsyncTask`, callbacks wrapped by hand when a `suspend`
  or `Flow` API exists.
- Settings a person chooses go in DataStore; never a secret in it.

## Compose and Material 3

- **Native, not ported.** A screen is designed the way Google's own apps
  (Contacts, Calendar, Settings, Files) would show its content, with
  Material 3 components, never a copy of the iOS layout or of v13. The iOS
  app and v13 supply the content and purpose.
- **Material 3 first**: `Scaffold`, the top app bars, `ListItem`,
  `NavigationSuiteScaffold`, `ListDetailPaneScaffold` (or a Navigation 3
  list-detail scene), `SearchBar`, `ModalBottomSheet`, `AlertDialog`,
  `PullToRefreshBox`, the buttons and chips. A card only where Material says
  so. Anything custom needs a reason Material cannot meet.
- **Navigation 3**: every destination is a `@Serializable` `NavKey`; each tab
  has its own back stack (`navigation/NavigationState.kt`, from the
  "multiple back stacks" recipe); the `Navigator` moves through them;
  predictive back comes with it.
- **Adaptive**: the navigation bar becomes a rail on wider windows
  (`NavigationSuiteScaffold`); a list and its detail sit side by side on a
  tablet or an unfolded foldable; state survives rotation, folding and
  resizing (`rememberSaveable`, `rememberSerializable`, the ViewModel).
- **Edge to edge**: `enableEdgeToEdge()` in the activity; content takes
  `Scaffold`'s padding (and `consumeWindowInsets`), so nothing hides behind
  the system bars or the keyboard.
- **Icons** are Material Symbols as vector drawables (outlined; filled when
  selected), from google/material-design-icons; not
  `material-icons-extended`, which Google no longer updates.
- **Colours and type** come from `MaterialTheme` (`colorScheme`,
  `typography`), never a hex value or a `sp` size in a screen. Rotary's
  colours are in `ui/theme/Color.kt`; dynamic colour is off, the app carries
  the brand.
- **State and performance** (`jetpack-compose-performance`): hoist state;
  pass a screen only what it reads; lazy lists get a stable `key` and a
  `contentType`; a small fixed list is a `Column`; derive in the ViewModel,
  not while composing; no side effects in a composable's body.
- **Previews** for the phone, the foldable and the tablet, in light and
  dark, become the screenshot tests (Compose Preview Screenshot Testing,
  AGP test suites) as the screens arrive.
- **Accessibility**: every icon-only control has a `contentDescription`;
  touch targets are 48 dp; text scales to 200% without being cut off;
  TalkBack reads in the reading order; nothing is said by colour alone.

## Launch and icon

- The system splash screen (`core-splashscreen`, `Theme.RotaryYEP.Starting`):
  the app icon on the launch background, then the app. No splash activity,
  logo screen or animation of our own.
- The adaptive icon (`mipmap-anydpi/ic_launcher.xml`) with a monochrome
  layer for the themed icon, drawn from the iOS icon's layers.

## Tests

- JUnit 4 on the JVM: plain unit tests for logic, and Compose UI tests
  through Robolectric (`src/test/`), so CI needs no emulator. Robolectric runs
  on API 36 until Espresso supports 37 (`robolectric.properties`).
- `createComposeRule` from `ui.test.junit4.v2`; find nodes by what a person
  sees (text, role, selection), not by test tags where the text will do.
- Fakes over mocks; a network test goes through a fake HTTP client with a
  fixture, never the real servers.
- Test names are sentences in backticks: ``fun `the tabs speak English` ()``.
- Never weaken, skip or delete a test to make a build pass.

## Security and release

- No secrets in the tree. The upload key and Play credentials live in Actions
  secrets; Play App Signing holds the app signing key.
- Permissions: only what a feature needs, asked for when it is used. An
  exported component or a deep link follows `android-intent-security`.
- Release builds keep R8 on (`optimization { enable = true }`).
