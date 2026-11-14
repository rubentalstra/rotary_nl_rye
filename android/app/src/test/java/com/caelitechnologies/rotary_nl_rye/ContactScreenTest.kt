package com.caelitechnologies.rotary_nl_rye

import androidx.compose.ui.test.assertIsDisplayed
import androidx.compose.ui.test.hasSetTextAction
import androidx.compose.ui.test.junit4.v2.createComposeRule
import androidx.compose.ui.test.onNodeWithContentDescription
import androidx.compose.ui.test.onNodeWithText
import androidx.compose.ui.test.performClick
import androidx.compose.ui.test.performTextInput
import androidx.test.ext.junit.runners.AndroidJUnit4
import com.caelitechnologies.rotary_nl_rye.ui.theme.RotaryTheme
import org.junit.Before
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.annotation.Config

/** The Contact tab and the person page, on the JVM, in Dutch, on a phone-sized screen. */
@RunWith(AndroidJUnit4::class)
@Config(qualifiers = "nl-w411dp-h891dp-xxhdpi")
class ContactScreenTest {
    @get:Rule
    val compose = createComposeRule()

    @Before
    fun openContact() {
        compose.setContent { RotaryTheme { RotaryApp() } }
        compose.onNodeWithText("Contact").performClick()
    }

    @Test
    fun `the MDJC shows first, with its chair`() {
        compose.onNodeWithText("Barbara Tusveld").assertIsDisplayed()
        compose.onNodeWithText("Voorzitter Rotary Youth Exchange").assertIsDisplayed()
    }

    @Test
    fun `a team tab shows that team`() {
        compose.onNodeWithText("ROTEX").performClick()
        compose.onNodeWithText("Oud-uitwisselingsstudenten").assertIsDisplayed()
    }

    @Test
    fun `search finds by role within the team`() {
        compose.onNode(hasSetTextAction()).performTextInput("penningmeester")
        compose.onNodeWithText("Evert Marseille").assertIsDisplayed()
    }

    @Test
    fun `a search without matches says so`() {
        compose.onNode(hasSetTextAction()).performTextInput("zzz")
        compose.onNodeWithText("Niemand gevonden voor ‘zzz’.").assertIsDisplayed()
    }

    @Test
    fun `a person opens their page with the ways to reach them`() {
        compose.onNodeWithText("Barbara Tusveld").performClick()
        compose.onNodeWithText("Bel").assertIsDisplayed()
        compose.onNodeWithText("WhatsApp").assertIsDisplayed()
        compose.onNodeWithText("06 55 12 85 29").assertIsDisplayed()
        compose.onNodeWithContentDescription("Terug").performClick()
        compose.onNodeWithText("Barbara Tusveld").assertIsDisplayed()
    }
}
