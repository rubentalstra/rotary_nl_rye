/// The identifiers the published app is known by. They tie this build to the
/// existing App Store listing and to every user's installed data, so they
/// never change; `BundleTests` checks the built app against them.
public enum AppIdentity {
    /// The bundle id of the App Store listing, under team A8S2486A44.
    public static let bundleIdentifier = "com.caelitechnologies.rotary-nl-rye"

    /// The App Store id of the listing (apps.apple.com/app/id1567096118).
    public static let appStoreID = 1_567_096_118
}
