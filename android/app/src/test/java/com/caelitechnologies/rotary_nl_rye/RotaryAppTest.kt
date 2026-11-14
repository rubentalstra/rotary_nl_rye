package com.caelitechnologies.rotary_nl_rye

import androidx.compose.ui.test.assertCountEquals
import androidx.compose.ui.test.assertIsDisplayed
import androidx.compose.ui.test.assertIsSelected
import androidx.compose.ui.test.hasText
import androidx.compose.ui.test.isSelectable
import androidx.compose.ui.test.junit4.v2.createComposeRule
import androidx.compose.ui.test.onAllNodesWithText
import androidx.compose.ui.test.onNodeWithContentDescription
import androidx.compose.ui.test.onNodeWithText
import androidx.compose.ui.test.performClick
import androidx.test.ext.junit.runners.AndroidJUnit4
import com.caelitechnologies.rotary_nl_rye.ui.theme.RotaryTheme
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.annotation.Config

/** The tab shell on the JVM, in Dutch (the default) and English. */
@RunWith(AndroidJUnit4::class)
class RotaryAppTest {
    @get:Rule
    val compose = createComposeRule()

    @Test
    @Config(qualifiers = "nl")
    fun `every tab shows in Dutch, Home first`() {
        compose.setContent { RotaryTheme { RotaryApp() } }
        listOf("Home", "Over", "Noodgeval", "Contact", "Instellingen").forEach {
            compose.onAllNodesWithText(it)[0].assertIsDisplayed()
        }
        // Home opens first: its banner is the page's title, and its tiles follow.
        compose.onNodeWithContentDescription("Rotary Youth Exchange Netherlands").assertIsDisplayed()
        compose.onNode(hasText("Home") and isSelectable()).assertIsSelected()
    }

    @Test
    @Config(qualifiers = "nl")
    fun `choosing a tab opens its screen`() {
        compose.setContent { RotaryTheme { RotaryApp() } }
        compose.onNodeWithText("Contact").performClick()
        compose.onNode(hasText("Contact") and isSelectable()).assertIsSelected()
        compose.onAllNodesWithText("Contact").assertCountEquals(2)
    }

    @Test
    @Config(qualifiers = "en")
    fun `the tabs speak English on an English phone`() {
        compose.setContent { RotaryTheme { RotaryApp() } }
        listOf("Home", "About", "Emergency", "Contact", "Settings").forEach {
            compose.onAllNodesWithText(it)[0].assertIsDisplayed()
        }
        // Settings is not rebuilt yet, and says so.
        compose.onNodeWithText("Settings").performClick()
        compose.onNodeWithText("This screen comes in a later version.").assertIsDisplayed()
    }
}
