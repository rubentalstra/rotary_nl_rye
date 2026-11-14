package com.caelitechnologies.rotary_nl_rye.calendar

import androidx.compose.ui.test.assertIsDisplayed
import androidx.compose.ui.test.junit4.v2.createComposeRule
import androidx.compose.ui.test.onNodeWithText
import androidx.compose.ui.test.performClick
import androidx.compose.ui.test.performScrollTo
import androidx.test.ext.junit.runners.AndroidJUnit4
import com.caelitechnologies.rotary_nl_rye.ui.theme.RotaryTheme
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.annotation.Config
import java.time.ZoneId
import java.time.ZonedDateTime

/** The calendar screen with the API's answer, on the JVM, in Dutch. */
@RunWith(AndroidJUnit4::class)
@Config(qualifiers = "nl-w411dp-h891dp-xxhdpi")
class CalendarScreenTest {
    @get:Rule
    val compose = createComposeRule()

    private val events = CalendarFeed.read(checkNotNull(javaClass.getResourceAsStream("/events.json")).readBytes())
    private val now = ZonedDateTime.of(2026, 11, 14, 12, 0, 0, 0, ZoneId.of("Europe/Amsterdam")).toInstant()

    @Test
    fun `what is happening now comes first, and opens its page`() {
        var opened: CalendarEvent? = null
        val state = CalendarViewModel.derive(events, CalendarUiState.Load.Loaded, false, now, ZoneId.systemDefault())
        compose.setContent { RotaryTheme { CalendarScreen(state, {}, {}, {}, { opened = it }) } }
        compose.onNodeWithText("Nu bezig").assertIsDisplayed()
        compose.onNodeWithText("Residentieweekend inbounds").performClick()
        assertEquals("Residentieweekend inbounds", opened?.title)
    }

    @Test
    fun `past events are behind a button`() {
        var asked = false
        val state = CalendarViewModel.derive(events, CalendarUiState.Load.Loaded, false, now, ZoneId.systemDefault())
        assertTrue(state.pastEventCount > 0)
        compose.setContent { RotaryTheme { CalendarScreen(state, {}, {}, { asked = true }, {}) } }
        compose.onNodeWithText("Toon ${state.pastEventCount} afgelopen evenementen", substring = true).let {
            it.performScrollToAndClick()
        }
        assertTrue(asked)
    }

    private fun androidx.compose.ui.test.SemanticsNodeInteraction.performScrollToAndClick() {
        performScrollTo()
        performClick()
    }
}
