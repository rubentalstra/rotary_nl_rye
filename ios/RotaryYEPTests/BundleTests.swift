import Foundation
import RotaryCore
import Testing

/// Checks the built app against what the App Store listing depends on.
@MainActor @Suite struct BundleTests {
    private let info = Bundle.main.infoDictionary ?? [:]

    @Test func `The bundle id never changes`() {
        #expect(Bundle.main.bundleIdentifier == AppIdentity.bundleIdentifier)
    }

    @Test func `The home screen shows Rotary YEP NL`() {
        #expect(info["CFBundleDisplayName"] as? String == "Rotary YEP NL")
    }

    @Test func `The version continues after the React Native app`() throws {
        let version = try #require(info["CFBundleShortVersionString"] as? String)
        let major = try #require(version.split(separator: ".").first.flatMap { Int($0) })
        #expect(major >= 14)
    }
}
