package com.caelitechnologies.rotary_nl_rye.clubs

import androidx.compose.ui.test.assertIsDisplayed
import androidx.compose.ui.test.hasSetTextAction
import androidx.compose.ui.test.junit4.v2.createComposeRule
import androidx.compose.ui.test.onNodeWithText
import androidx.compose.ui.test.performClick
import androidx.compose.ui.test.performTextInput
import androidx.test.ext.junit.runners.AndroidJUnit4
import com.caelitechnologies.rotary_nl_rye.core.clubs.ClubGuide
import com.caelitechnologies.rotary_nl_rye.ui.theme.RotaryTheme
import org.junit.Assert.assertEquals
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.annotation.Config

/** The Rotary clubs pages on the JVM, in Dutch, on a phone-sized screen. */
@RunWith(AndroidJUnit4::class)
@Config(qualifiers = "nl-w411dp-h891dp-xxhdpi")
class RotaryClubsScreenTest {
    @get:Rule
    val compose = createComposeRule()

    @Test
    fun `the topics and a row per role, each opening its page`() {
        var guide: ClubGuide? = null
        compose.setContent { RotaryTheme { RotaryClubsScreen({}, {}, { guide = it }) } }
        compose.onNodeWithText("Algemene informatie").assertIsDisplayed()
        compose.onNodeWithText("Gastgezin").performClick()
        assertEquals(ClubGuide.HostFamily, guide)
    }

    @Test
    fun `search finds a document across the roles, once`() {
        compose.setContent { RotaryTheme { RotaryClubsScreen({}, {}, {}) } }
        compose.onNode(hasSetTextAction()).performTextInput("reisregels")
        compose.onNodeWithText("Reisregels in en buiten Nederland").assertIsDisplayed()
    }

    @Test
    fun `a role's page lists its documents`() {
        compose.setContent { RotaryTheme { ClubGuideScreen(ClubGuide.HostFamily, {}) } }
        compose.onNodeWithText("Handboek gastgezin").assertIsDisplayed()
        compose.onNodeWithText("First Night Questions").assertIsDisplayed()
    }
}
