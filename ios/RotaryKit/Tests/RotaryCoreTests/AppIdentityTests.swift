import RotaryCore
import Testing

@Suite struct AppIdentityTests {
    @Test func `The bundle id is the one of the App Store listing`() {
        #expect(AppIdentity.bundleIdentifier == "com.caelitechnologies.rotary-nl-rye")
    }
}
