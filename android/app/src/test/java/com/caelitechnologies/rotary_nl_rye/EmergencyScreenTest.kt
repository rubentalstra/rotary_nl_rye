package com.caelitechnologies.rotary_nl_rye

import androidx.compose.ui.test.assertIsDisplayed
import androidx.compose.ui.test.junit4.v2.createComposeRule
import androidx.compose.ui.test.onNodeWithContentDescription
import androidx.compose.ui.test.onNodeWithText
import androidx.compose.ui.test.performClick
import androidx.test.ext.junit.runners.AndroidJUnit4
import com.caelitechnologies.rotary_nl_rye.ui.theme.RotaryTheme
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.annotation.Config

/** The Emergency tab on the JVM, in English, on a phone-sized screen. */
@RunWith(AndroidJUnit4::class)
@Config(qualifiers = "en-w411dp-h891dp-xxhdpi")
class EmergencyScreenTest {
    @get:Rule
    val compose = createComposeRule()

    @Test
    fun `112 comes first, then the people to call`() {
        compose.setContent { RotaryTheme { RotaryApp() } }
        compose.onNodeWithText("Emergency").performClick()
        compose.onNodeWithContentDescription("112, when every second counts").assertIsDisplayed()
        compose.onNodeWithText("Barbara Tusveld").assertIsDisplayed()
        compose.onNodeWithContentDescription("Call Barbara Tusveld").assertIsDisplayed()
    }
}
