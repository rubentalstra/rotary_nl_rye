package com.caelitechnologies.rotary_nl_rye.camps

import androidx.compose.ui.test.assertCountEquals
import androidx.compose.ui.test.assertIsDisplayed
import androidx.compose.ui.test.onAllNodesWithText
import androidx.compose.ui.test.junit4.v2.createComposeRule
import androidx.compose.ui.test.onNodeWithText
import androidx.compose.ui.test.performClick
import androidx.test.ext.junit.runners.AndroidJUnit4
import com.caelitechnologies.rotary_nl_rye.ui.theme.RotaryTheme
import org.junit.Assert.assertEquals
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.annotation.Config
import java.time.LocalDate
import java.util.Locale

/** The camps screen with the published sheet, on the JVM, in Dutch, on a phone-sized screen. */
@RunWith(AndroidJUnit4::class)
@Config(qualifiers = "nl-w411dp-h891dp-xxhdpi")
class CampsScreenTest {
    @get:Rule
    val compose = createComposeRule()

    private val camps = CampFeed.read(checkNotNull(javaClass.getResourceAsStream("/zomerkampen.xlsx")).readBytes())

    private fun state(filters: CampFilters = CampFilters(showsPastCamps = true)) =
        CampsViewModel.derive(camps, filters, CampsUiState.Load.Loaded, LocalDate.of(2026, 11, 14), Locale.forLanguageTag("nl"))

    @Test
    fun `the first month and its first camp show, with the filters`() {
        compose.setContent { RotaryTheme { CampsScreen(state(), CampsActions()) } }
        compose.onNodeWithText("December 2025").assertIsDisplayed()
        compose.onNodeWithText("Leeftijd").assertIsDisplayed()
        compose.onNodeWithText("Verberg volle kampen").assertIsDisplayed()
    }

    @Test
    fun `a camp opens its page`() {
        var opened: Camp? = null
        compose.setContent { RotaryTheme { CampsScreen(state(), CampsActions(onCamp = { opened = it })) } }
        val first = state().sections.first().camps.first()
        compose.onNodeWithText(first.title).performClick()
        assertEquals(first, opened)
    }

    @Test
    fun `no camp for the filters says so, with a way back`() {
        compose.setContent { RotaryTheme { CampsScreen(state(CampFilters(age = 99, showsPastCamps = true)), CampsActions()) } }
        compose.onNodeWithText("Geen kamp past bij je filters.").assertIsDisplayed()
        // Under the message, and in the chip row, since a filter is on.
        compose.onAllNodesWithText("Wis filters").assertCountEquals(2)
    }

    @Test
    fun `offline says so, with a way to try again`() {
        compose.setContent { RotaryTheme { CampsScreen(CampsUiState(load = CampsUiState.Load.Failed(CampFeed.LoadError.Offline)), CampsActions()) } }
        compose.onNodeWithText("Geen verbinding").assertIsDisplayed()
        compose.onNodeWithText("Probeer opnieuw").assertIsDisplayed()
    }
}
