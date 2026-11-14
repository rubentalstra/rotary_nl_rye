package com.caelitechnologies.rotary_nl_rye

import org.junit.Assert.assertEquals
import org.junit.Test

/** The identity the Play Store listing hangs on; it never changes. */
class AppIdentityTest {
    @Test
    fun `the package is the Play Store listing's`() {
        assertEquals("com.caelitechnologies.rotary_nl_rye", BuildConfig.APPLICATION_ID)
    }

    @Test
    fun `the version continues from the React Native app`() {
        assertEquals("14.0.0", BuildConfig.VERSION_NAME)
    }
}
