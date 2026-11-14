package com.caelitechnologies.rotary_nl_rye

import androidx.compose.ui.test.assertIsDisplayed
import androidx.compose.ui.test.junit4.v2.createComposeRule
import androidx.compose.ui.test.onNodeWithContentDescription
import androidx.compose.ui.test.onNodeWithText
import androidx.compose.ui.test.performClick
import androidx.test.ext.junit.runners.AndroidJUnit4
import com.caelitechnologies.rotary_nl_rye.ui.theme.RotaryTheme
import org.junit.Before
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.annotation.Config

/** The Home tab on the JVM, in Dutch, on a phone-sized screen. */
@RunWith(AndroidJUnit4::class)
@Config(qualifiers = "nl-w411dp-h891dp-xxhdpi")
class HomeScreenTest {
    @get:Rule
    val compose = createComposeRule()

    @Before
    fun openHome() {
        compose.setContent { RotaryTheme { RotaryApp() } }
    }

    @Test
    fun `the banner, the first photo and a tile for every part of the app`() {
        compose.onNodeWithContentDescription("Rotary Youth Exchange Netherlands").assertIsDisplayed()
        compose.onNodeWithText("Informatieochtend, 19 september 2026").assertIsDisplayed()
        // On a phone all eight tiles fit under the banner and the photos.
        listOf("Programma's", "Nieuws", "Agenda", "Op exchange", "Naar Nederland", "Rebound", "Zomerkampen", "Voor Rotary-clubs").forEach {
            compose.onNodeWithText(it).assertExists()
        }
    }

    @Test
    fun `a tile opens its page, and back returns home`() {
        compose.onNodeWithText("Programma's").performClick()
        compose.onNodeWithText("Dit scherm komt in een volgende versie.").assertIsDisplayed()
        compose.onNodeWithContentDescription("Terug").performClick()
        compose.onNodeWithContentDescription("Rotary Youth Exchange Netherlands").assertIsDisplayed()
    }
}
