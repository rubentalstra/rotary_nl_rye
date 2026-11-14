// swift-tools-version: 6.4
import PackageDescription

// RotaryKit holds everything the app does without a screen: the models, the
// static content (students, clubs, contacts), the network clients and the
// caches. It builds for iOS and for the Mac, so `swift test` runs on the
// development Mac and in CI without a simulator.
//
// Modules are named Rotary… so a module never shares its name with a type in it.
let package = Package(
    name: "RotaryKit",
    defaultLocalization: "nl",
    platforms: [.iOS(.v26), .macOS(.v26)],
    products: [
        .library(name: "RotaryCore", targets: ["RotaryCore"]),
        .library(name: "RotaryCamps", targets: ["RotaryCamps"]),
        .library(name: "RotaryNews", targets: ["RotaryNews"]),
    ],
    dependencies: [
        // Unpacks the summer camps spreadsheet (an XLSX file is a ZIP archive);
        // Foundation's XMLParser reads the parts. Pinned to an exact release.
        .package(url: "https://github.com/weichsel/ZIPFoundation.git", exact: "0.9.20"),
    ],
    targets: [
        // The organisation's people and the About topics as typed values; their
        // text in the module's String Catalog (nl source, en).
        .target(name: "RotaryCore", resources: [.process("Localizable.xcstrings")]),
        .testTarget(name: "RotaryCoreTests", dependencies: ["RotaryCore"]),
        // The summer camps: zomerkampen.xlsx from rotary.nl, read into typed camps.
        .target(name: "RotaryCamps", dependencies: ["RotaryCore", .product(name: "ZIPFoundation", package: "ZIPFoundation")]),
        // Fixtures/zomerkampen.xlsx is the published file of 16 September 2026.
        .testTarget(name: "RotaryCampsTests", dependencies: ["RotaryCamps"], resources: [.copy("Fixtures")]),
        // The news: news.json from rotary.nl, PDFs and articles.
        .target(name: "RotaryNews", dependencies: ["RotaryCore"]),
        // Fixtures/news.json is the published file of 2 October 2025.
        .testTarget(name: "RotaryNewsTests", dependencies: ["RotaryNews"], resources: [.copy("Fixtures")]),
    ]
)

// Swift 6 language mode with the upcoming features the app has on as well:
// `any` for every existential, imports visible per file, async functions run
// on their caller's actor (nonisolated(nonsending)), conformances inferred as
// isolated, a plain `import` is internal, and `[weak x]` captures are
// immutable. These are all Swift 7 defaults. RotaryKit stays nonisolated by
// default; only the app target is @MainActor by default.
let upcomingFeatures: [SwiftSetting] = [
    .enableUpcomingFeature("ExistentialAny"),
    .enableUpcomingFeature("MemberImportVisibility"),
    .enableUpcomingFeature("NonisolatedNonsendingByDefault"),
    .enableUpcomingFeature("InferIsolatedConformances"),
    .enableUpcomingFeature("InternalImportsByDefault"),
    .enableUpcomingFeature("ImmutableWeakCaptures"),
]
for target in package.targets {
    target.swiftSettings = (target.swiftSettings ?? []) + upcomingFeatures
}
