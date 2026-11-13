import Foundation
import RotaryCore
import Testing

@Suite struct AppIdentityTests {
    @Test func `The bundle id is the one of the App Store listing`() {
        #expect(AppIdentity.bundleIdentifier == "com.caelitechnologies.rotary-nl-rye")
    }

    @Test func `The review link opens the listing's review sheet`() {
        #expect(AppIdentity.writeReviewURL.absoluteString == "https://apps.apple.com/app/id1567096118?action=write-review")
    }

    @Test(arguments: [AppIdentity.appStoreURL, AppIdentity.writeReviewURL, AppIdentity.privacyPolicyURL, AppIdentity.termsURL, AppIdentity.instagramURL])
    func `Every page is https`(url: URL) {
        #expect(url.scheme == "https")
    }
}
