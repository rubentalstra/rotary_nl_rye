package com.caelitechnologies.rotary_nl_rye.calendar

import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test
import java.time.YearMonth
import java.time.ZoneId
import java.time.ZonedDateTime

/** What the calendar screen shows, on the API's answer of 14 November 2026, at noon in Amsterdam. */
class CalendarViewModelTest {
    private val events = CalendarFeed.read(checkNotNull(javaClass.getResourceAsStream("/events.json")).readBytes())
    private val amsterdam = ZoneId.of("Europe/Amsterdam")
    private val now = ZonedDateTime.of(2026, 11, 14, 12, 0, 0, 0, amsterdam).toInstant()

    private fun derive(showsPast: Boolean = false) = CalendarViewModel.derive(events, CalendarUiState.Load.Loaded, showsPast, now, amsterdam)

    @Test
    fun `the residence weekend is happening now`() {
        assertEquals(listOf("Residentieweekend inbounds"), derive().ongoing.map { it.title })
    }

    @Test
    fun `past events wait behind the button, and are counted`() {
        val state = derive()
        assertTrue(state.months.flatMap { it.second }.none { it.hasEnded(now, amsterdam) })
        assertEquals(events.count { it.hasEnded(now, amsterdam) }, state.pastEventCount)
        assertEquals(events.size - state.ongoing.size, derive(showsPast = true).months.sumOf { it.second.size })
    }

    @Test
    fun `events are in months of their first day`() {
        derive(showsPast = true).months.forEach { (month, inMonth) ->
            assertTrue(inMonth.all { YearMonth.from(it.firstDay(amsterdam)) == month })
        }
    }
}
