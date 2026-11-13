public import Foundation

/// The identifiers the published app is known by, and the pages about it. The
/// identifiers tie this build to the existing App Store listing and to every
/// user's installed data, so they never change; `BundleTests` checks the
/// built app against them.
public enum AppIdentity {
    /// The bundle id of the App Store listing, under team A8S2486A44.
    public static let bundleIdentifier = "com.caelitechnologies.rotary-nl-rye"

    /// The App Store id of the listing.
    public static let appStoreID = 1_567_096_118

    /// The listing, for sharing the app.
    public static let appStoreURL = URL(string: "https://apps.apple.com/app/id\(appStoreID)")!

    /// The listing's review sheet. Apple's guidelines ask a button to open this
    /// page, and keep `requestReview` for a moment the app chooses itself.
    public static let writeReviewURL = URL(string: "https://apps.apple.com/app/id\(appStoreID)?action=write-review")!

    public static let privacyPolicyURL = URL(string: "https://www.rotary.nl/yep/yep-app/privacy-policy.html")!
    public static let termsURL = URL(string: "https://www.rotary.nl/yep/yep-app/terms-and-conditions.html")!

    /// ROTEX Nederland on Instagram.
    public static let instagramURL = URL(string: "https://www.instagram.com/rotexnederland/")!
}
