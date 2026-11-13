---
paths:
  - "**/*.swift"
  - "ios/**"
---

# Writing Swift here

The one style guide for the iOS app's Swift. It follows Apple's Xcode 27.1
agent skills and Swift 6.4, and Pullwatch's proven rules
(`~/RustroverProjects/pullwatch/.claude/rules/swift.md`); where it says less,
the skills decide. Every rule gives its reason, so a case it does not cover can
be argued from that.

## Toolchain and sources of truth

- **iOS 26.0 and later, iPhone and iPad**, built with Xcode 27.1 and Swift
  6.4.0 (`swift-tools-version: 6.4`, Swift 6 language mode). Anything up to
  iOS 26.0 needs no availability check; anything newer gets
  `if #available(iOS 27, *)` with a fallback that works on 26.0, because users
  on 26 run the same binary. One deployment target, set at the project level
  and in `ios/RotaryKit/Package.swift`; never per target.
- Set `DEVELOPER_DIR=/Applications/Xcode.app/Contents/Developer` when
  `xcode-select` points at the Command Line Tools: their Swift is a different
  version.
- **Apple's guidance ships with Xcode as agent skills** in `.claude/skills/`
  (`.claude/skills/README.md`; export with `bash scripts/dev/xcode-skills.sh`).
  Read `swiftui-specialist` (and its `references/`) before writing or
  reviewing a view, `swiftui-whats-new-27` before using an iOS 27 API,
  `app-resizability` before an iPad or rotation layout, `modernize-tests`
  before touching tests, `app-intents-specialist` before an App Intent.
- Never guess an API. Check the SDK's `.swiftinterface` (under
  `xcrun --sdk iphoneos --show-sdk-path`) or Apple's documentation first; the
  skills say the same.
- The default simulator is the **iPhone 18 Pro Max**
  (`-destination 'platform=iOS Simulator,name=iPhone 18 Pro Max'`).

## File layout

A file is found by its name, a type by its module and area. The layout follows
Apple's sample apps (Food Truck, Backyard Birds) and Pullwatch.

- `ios/RotaryKit/` (local Swift package) holds everything without a screen:
  models, the static content (students, clubs, contacts as JSON resources),
  network clients (news, calendar), caches and their tests. It builds for iOS
  and macOS so `swift test` runs on the Mac without a simulator.
  `RotaryCore` is the first module; a new area that other modules should not
  see becomes its own module named `Rotary<Area>`, so a module never shares
  its name with a type.
- `ios/RotaryYEP/`: the app, **one folder per feature** (`Home/`, `News/`,
  `Calendar/`, `Programs/`, `Students/`, `Clubs/`, `Contacts/`, `Emergency/`,
  `Settings/`, ...), each holding its `@Observable` model and its views, one
  type per file. `App/` holds the wiring (the `App` struct, scenes, the
  composition root `AppModel`, the tab structure); `General/` holds what at
  least two features use; anything else lives in its feature.
  `AppIcon.icon` (Icon Composer), `Assets.xcassets` and `Localizable.xcstrings`
  sit at the top.
- `ios/RotaryYEPTests/`: hosted Swift Testing suites for the built app (bundle
  id, display name, translations). A test target mirrors the folders of what
  it tests.
- The project uses synchronized folders: a new file needs no project edit. A
  new library product of RotaryKit needs an `XCSwiftPackageProductDependency`
  in `project.pbxproj`.
- One main type per file, named after it. An extension that adds a whole area
  to a large type goes in `Type+Area.swift`.
- In a file: a `///` comment on what the type is for, then the type, then
  `// MARK: -` sections for groups of members.
- Access: only what the app uses is `public` in RotaryKit; what only the
  package's modules share is `package`; the rest is `private` or internal.

## What runs where

Both the app and RotaryKit build with strict concurrency, approachable
concurrency and the upcoming features `ExistentialAny`,
`MemberImportVisibility`, `NonisolatedNonsendingByDefault`,
`InferIsolatedConformances`, `InternalImportsByDefault` and
`ImmutableWeakCaptures` (all Swift 7 defaults). Warnings are errors
(`SWIFT_TREAT_WARNINGS_AS_ERRORS` in the project; `-warnings-as-errors` for
`swift test`).

- **A plain `import` is internal.** Write `public import X` only when a
  `public` declaration's signature uses a type from X. Never `@_exported` or
  `@_implementationOnly`.
- **The app target is `@MainActor` by default**
  (`SWIFT_DEFAULT_ACTOR_ISOLATION = MainActor` in `ios/App.xcconfig`). Views
  and models need no annotation. Mark what is not UI `nonisolated`.
- **The test target is not.** A suite in `RotaryYEPTests` that touches app
  types is `@MainActor @Suite`.
- **RotaryKit is nonisolated by default.** An `async` function there is
  `nonisolated(nonsending)`: it runs on its caller's actor. Mark it
  `@concurrent` only when its work must leave the caller's actor (decoding a
  large JSON file).
- Shared mutable state lives in an `actor`. Small state synchronous code must
  reach goes in a `Mutex` from `Synchronization`, never `NSLock` plus
  `@unchecked Sendable`.
- No `@preconcurrency`, `nonisolated(unsafe)` or `@unchecked Sendable` to
  silence the compiler, in tests either.

## Async code

- `async`/`await`, `Task`, task groups and actors. No `DispatchQueue`,
  completion handlers or Combine. Wrap a callback API once with
  `withCheckedThrowingContinuation` or `AsyncStream.makeStream`.
- **Every long-running job has one owning task**, stored on the model that
  runs it and started by a `start…()` method that refuses a second one. A task
  a view needs for its own lifetime goes in `.task` or `.task(id:)`; never a
  bare `Task { }` from a button.
- Cancellation is cooperative: `try Task.checkCancellation()` in loops,
  `withTaskCancellationHandler` around long calls. Cleanup goes in `defer`
  (which may `await` since Swift 6.4).
- Never block a thread of the cooperative pool (`sleep`, synchronous file or
  network reads). Use the `async` API or `Task.sleep(for:)`.
- Network access goes through one `HTTPClient` protocol in RotaryKit
  (`URLSession.data(for:)` behind it), so tests can stub it.

## Types and syntax

- `any P` for an existential, `some P` for an opaque type. An optional one
  needs no parentheses since Swift 6.4 (`any HTTPClient?`).
- A warning accepted on purpose gets `@diagnose(<Group>, as: ignored)` on the
  smallest declaration with a comment why; never for a whole file, never to
  hide a warning we could fix.
- Settings a person chooses live in `UserDefaults` through `@AppStorage` or a
  small settings model; cached downloads in the Caches directory; never a
  secret in either (Keychain).
- Logging with `Logger(subsystem: "com.caelitechnologies.rotary-nl-rye", category:)`.

## Observation

- `@Observable` classes for state that views read; never `ObservableObject`,
  `@Published`, `@StateObject` or `@EnvironmentObject`.
- One model per job, put in the scene's environment by `App/`. A view reads
  the model it needs with `@Environment(NewsModel.self) private var news`.
  Bindings to an environment model go through `@Bindable`.
- Make stored properties `Equatable`, so setting an equal value redraws
  nothing. `@ObservationIgnored` for state no view reads (tasks, caches).

## SwiftUI

From `swiftui-specialist` and `swiftui-whats-new-27`; read them for the
examples.

- **No soft-deprecated API.** `swiftui-specialist/references/soft-deprecated-apis.md`
  lists them: `foregroundStyle` not `foregroundColor`,
  `clipShape(.rect(cornerRadius:))` not `cornerRadius`, `.overlay { }` and
  `.background { }` with a closure, `NavigationStack`/`NavigationSplitView`
  not `NavigationView`, the two-parameter `onChange`.
- **`@State` is a macro in SDK 27.** Always `private`; initialise it either at
  the declaration or in `init`, never both.
- **Data flow.** Give a view only the data it reads. Pass a collection element
  to its row as the element, not an index. Bindings through key paths, not
  `Binding(get:set:)`.
- **Structure.** A section of a screen is its own `View` struct, not a
  computed property or a `func` returning `some View`. Keep `init` cheap.
- **Lists.** Identity from the data (`Identifiable`), never an index or a
  `UUID()` made in `body`. Sort and filter in the model, not in the
  `ForEach`. A `List` row is one view (no `AnyView`, no top-level `if`
  without `else`).
- **Modifiers.** Vary an argument with a ternary, never an `if`/`else` view or
  an `.if` modifier, which swaps the view's identity.
- **Environment.** Declare custom values with `@Entry` and a stable default;
  never a closure in an environment key.
- **The iOS look.** System controls, `TabView` with `Tab` and
  `.tabBarMinimizeBehavior`, `NavigationStack` per tab, `List` and `Form`
  with system styles, `ContentUnavailableView` for empty and error states,
  `.searchable`, `.refreshable`, `ShareLink`, `Link`, SF Symbols by their real
  names, semantic colours and text styles. Liquid Glass comes from the system:
  `.glassEffect` only on a custom floating control, never behind content.
  Toolbars through `.toolbar` with `ToolbarItem` placements.
- **Native, not ported.** A screen is designed the way Apple's own apps
  would show its content, never copied from the v13 React Native layout
  (CLAUDE.md, Hard rules). System components first; anything custom needs a
  reason the system cannot meet.
- **Launch screen.** `UILaunchScreen` in `ios/Info.plist`: the background of
  the first screen (`LaunchBackground`), nothing else. No logo, text or
  splash animation, as the HIG asks; the first screen itself is where the
  brand shows.
- **iPad.** Every screen works at every size class and in Split View and Stage
  Manager (`app-resizability`). A list-detail feature uses
  `NavigationSplitView`, which collapses to a stack on iPhone.
- **Accessibility.** Dynamic Type up to the largest accessibility size without
  truncation, an accessibility label on every icon-only button, VoiceOver
  order that follows the reading order, no information in colour alone.
- **Brand.** Rotary's colours are named colours in `Assets.xcassets` (with a
  dark variant) and read through the generated symbols (`Color(.rotaryBlue)`),
  never hex literals in views.

## Text and languages

The app speaks Dutch (the development language) and English, through
`ios/RotaryYEP/Localizable.xcstrings` and one catalog per RotaryKit module that
has text.

- SwiftUI literals localise by themselves; the keys are the Dutch text. Types
  that carry text for a view hold a `LocalizedStringResource`.
- `String(localized:)` only where a `String` is required.
- In a package module, text names its module's bundle (`bundle: .module`).
- A sentence is one string, never assembled from pieces; counts get plural
  variations; dates, numbers and lists use format styles.
- `.leading` and `.trailing`, never `.left` and `.right`.
- **Every new string gets both languages** before the commit.

## Tests

- **Swift Testing** (`@Suite`, `@Test`, `#expect`, `#require`); XCTest only
  for UI tests. Logic goes in RotaryKit and is tested there with `swift test`;
  `RotaryYEPTests` checks the built app.
- A suite is a `struct`; its `init` builds the fixtures.
- One input per case: `@Test(arguments:)` instead of a loop.
- `try #require` for what the rest of the test needs; `#expect(throws:)` for
  the exact error; `await confirmation { }` for a callback, never a sleep.
- New test names read as a sentence with a raw identifier:
  ``@Test func `Shows the news of today first`()``.
- Network tests go through a mock `HTTPClient` with fixtures; never the real
  servers.
- Never weaken, skip or delete a test to make a build pass.
