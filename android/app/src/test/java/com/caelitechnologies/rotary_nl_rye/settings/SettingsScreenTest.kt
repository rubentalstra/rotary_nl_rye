package com.caelitechnologies.rotary_nl_rye.settings

import androidx.compose.ui.test.assertIsDisplayed
import androidx.compose.ui.test.junit4.v2.createComposeRule
import androidx.compose.ui.test.onNodeWithContentDescription
import androidx.compose.ui.test.onNodeWithText
import androidx.test.ext.junit.runners.AndroidJUnit4
import com.caelitechnologies.rotary_nl_rye.BuildConfig
import com.caelitechnologies.rotary_nl_rye.ui.theme.RotaryTheme
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.annotation.Config

/** The Settings tab on the JVM, on a phone-sized screen. */
@RunWith(AndroidJUnit4::class)
@Config(qualifiers = "nl-w411dp-h891dp-xxhdpi")
class SettingsScreenTest {
    @get:Rule
    val compose = createComposeRule()

    @Test
    fun `every setting is there, with the version and sharing in the top bar`() {
        compose.setContent { RotaryTheme { SettingsScreen(perAppLanguage = true) } }
        listOf("Taal", "Beoordeel de app", "ROTEX op Instagram", "Privacybeleid", "Algemene voorwaarden", "Licenties").forEach {
            compose.onNodeWithText(it).assertIsDisplayed()
        }
        compose.onNodeWithText("${BuildConfig.VERSION_NAME} (${BuildConfig.VERSION_CODE})").assertExists()
        compose.onNodeWithContentDescription("Deel de app").assertIsDisplayed()
    }

    @Test
    fun `without a language per app the row is left out and the note says why`() {
        compose.setContent { RotaryTheme { SettingsScreen(perAppLanguage = false) } }
        compose.onNodeWithText("Taal").assertDoesNotExist()
        compose.onNodeWithText("De app volgt de taal van je telefoon.").assertIsDisplayed()
    }

    @Test
    @Config(qualifiers = "en-w411dp-h891dp-xxhdpi")
    fun `settings speak English on an English phone`() {
        compose.setContent { RotaryTheme { SettingsScreen(perAppLanguage = true) } }
        compose.onNodeWithText("Rate the app").assertIsDisplayed()
        compose.onNodeWithText("Licences").assertIsDisplayed()
    }
}
