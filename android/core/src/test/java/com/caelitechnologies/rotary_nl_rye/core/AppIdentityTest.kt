package com.caelitechnologies.rotary_nl_rye.core

import org.junit.Assert.assertEquals
import org.junit.Test

class AppIdentityTest {
    @Test
    fun `the listing is the Play Store package's`() {
        assertEquals("com.caelitechnologies.rotary_nl_rye", AppIdentity.PACKAGE_NAME)
        assertEquals("https://play.google.com/store/apps/details?id=com.caelitechnologies.rotary_nl_rye", AppIdentity.PLAY_STORE_URL)
    }
}
