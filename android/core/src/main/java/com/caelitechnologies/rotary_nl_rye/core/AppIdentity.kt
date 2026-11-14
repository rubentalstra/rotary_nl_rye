package com.caelitechnologies.rotary_nl_rye.core

/**
 * The identifiers the published app is known by, and the pages about it. The
 * package ties this build to the existing Play Store listing and to every
 * user's installed data, so it never changes; `AppIdentityTest` checks the
 * built app against it.
 */
object AppIdentity {
    /** The package of the Play Store listing. */
    const val PACKAGE_NAME = "com.caelitechnologies.rotary_nl_rye"

    /** The listing, for sharing the app and for rating it. */
    const val PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=$PACKAGE_NAME"

    const val PRIVACY_POLICY_URL = "https://www.rotary.nl/yep/yep-app/privacy-policy.html"
    const val TERMS_URL = "https://www.rotary.nl/yep/yep-app/terms-and-conditions.html"

    /** ROTEX Nederland on Instagram. */
    const val INSTAGRAM_URL = "https://www.instagram.com/rotexnederland/"
}
