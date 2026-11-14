package com.caelitechnologies.rotary_nl_rye.calendar

import com.caelitechnologies.rotary_nl_rye.core.networking.CachedFetch
import kotlinx.coroutines.test.runTest
import okhttp3.OkHttpClient
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertThrows
import org.junit.Assert.assertTrue
import org.junit.Test
import java.time.Instant
import java.time.LocalDate
import java.time.ZoneId
import java.time.ZonedDateTime

/** RotaryCalendar's CalendarFeedTests, ported: the API's answer of 14 November 2026. */
class CalendarFeedTest {
    private val events = CalendarFeed.read(checkNotNull(javaClass.getResourceAsStream("/events.json")).readBytes())
    private val amsterdam = ZoneId.of("Europe/Amsterdam")

    private fun event(title: String) = events.first { it.title == title }

    @Test
    fun `all 26 events are read, in order`() {
        assertEquals(26, events.size)
        assertEquals(19, events.count { it.isAllDay })
    }

    @Test
    fun `an all-day event's end date is exclusive, so its last day is the day before`() {
        val weekend = event("Residentieweekend inbounds")
        assertEquals(CalendarEvent.Timing.AllDay(LocalDate.of(2026, 11, 13), LocalDate.of(2026, 11, 15)), weekend.timing)
        assertEquals(3, weekend.days(amsterdam).size)
        assertTrue(LocalDate.of(2026, 11, 14) in weekend.days(amsterdam))
        assertFalse(LocalDate.of(2026, 11, 16) in weekend.days(amsterdam))
    }

    @Test
    fun `a one-day event has the same first and last day`() {
        assertEquals(CalendarEvent.Timing.AllDay(LocalDate.of(2026, 12, 12), LocalDate.of(2026, 12, 12)), event("Santa Run Inbounds").timing)
    }

    @Test
    fun `a timed event keeps its moments with their offset`() {
        val market = event("Informatiemarkt Rotary Youth Exchange Nederland")
        assertEquals(CalendarEvent.Timing.Timed(Instant.parse("2026-09-19T08:00:00Z"), Instant.parse("2026-09-19T12:00:00Z")), market.timing)
        assertEquals("Woerden", market.location)
    }

    @Test
    fun `ongoing and ended follow the event's days`() {
        val weekend = event("Residentieweekend inbounds")
        val saturday = ZonedDateTime.of(2026, 11, 14, 12, 0, 0, 0, amsterdam).toInstant()
        val monday = ZonedDateTime.of(2026, 11, 16, 9, 0, 0, 0, amsterdam).toInstant()
        assertTrue(weekend.isOngoing(saturday, amsterdam))
        assertFalse(weekend.isOngoing(monday, amsterdam))
        assertTrue(weekend.hasEnded(monday, amsterdam))
    }

    @Test
    fun `the window runs from a year back to a year ahead, by whole months`() {
        val (from, to) = CalendarFeed.window(ZonedDateTime.of(2026, 11, 14, 12, 0, 0, 0, amsterdam).toInstant(), amsterdam)
        assertEquals(LocalDate.of(2025, 11, 1), from.atZone(amsterdam).toLocalDate())
        assertEquals(LocalDate.of(2027, 12, 1), to.atZone(amsterdam).toLocalDate())
    }

    @Test
    fun `the request asks for single events in order from the MDJC calendar`() {
        val url = CalendarFeed(CachedFetch(OkHttpClient()), apiKey = "key").url(Instant.parse("2026-11-14T12:00:00Z"), amsterdam)
        assertTrue(url.encodedPath.endsWith("/rye.netherlands@gmail.com/events"))
        assertEquals("true", url.queryParameter("singleEvents"))
        assertEquals("startTime", url.queryParameter("orderBy"))
    }

    @Test
    fun `without a key nothing is requested`() = runTest {
        val error = runCatching { CalendarFeed(CachedFetch(OkHttpClient()), apiKey = "").events() }.exceptionOrNull()
        assertEquals(CalendarFeed.LoadError.MissingKey, error)
    }

    @Test
    fun `a cancelled event and an event without dates are left out`() {
        val json = """{"items":[{"id":"a","status":"cancelled","summary":"Gone","start":{"date":"2026-01-01"},"end":{"date":"2026-01-02"}},{"id":"b","summary":"No dates","start":{},"end":{}}]}"""
        assertTrue(CalendarFeed.read(json.toByteArray()).isEmpty())
    }

    @Test
    fun `an answer that is no list of events is unreadable`() {
        assertThrows(CalendarFeed.LoadError.Unreadable::class.java) { CalendarFeed.read("{\"error\":1}".toByteArray()) }
    }
}
