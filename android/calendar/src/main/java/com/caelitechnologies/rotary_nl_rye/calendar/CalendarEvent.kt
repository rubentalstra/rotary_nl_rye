package com.caelitechnologies.rotary_nl_rye.calendar

import java.time.Instant
import java.time.LocalDate
import java.time.ZoneId

/** An event in the MDJC calendar of Rotary Youth Exchange Netherlands. */
data class CalendarEvent(
    /** Google Calendar's id of the event. */
    val id: String,
    /** The event's title; null when the calendar gives none. */
    val title: String?,
    val timing: Timing,
    val location: String? = null,
    /** The event's description as Google keeps it: text, sometimes with a little HTML. */
    val notes: String? = null,
) {
    /** When an event takes place. */
    sealed interface Timing {
        /** Whole days, from the first to the last day, both included; calendar dates never shift with a time zone. */
        data class AllDay(val first: LocalDate, val last: LocalDate) : Timing

        /** From a moment to a moment. */
        data class Timed(val start: Instant, val end: Instant) : Timing
    }

    val isAllDay: Boolean get() = timing is Timing.AllDay

    /** When the event starts in [zone]: midnight of its first day, or its start. */
    fun start(zone: ZoneId): Instant = when (val t = timing) {
        is Timing.AllDay -> t.first.atStartOfDay(zone).toInstant()
        is Timing.Timed -> t.start
    }

    /** When the event ends in [zone]: midnight after its last day, or its end. */
    fun end(zone: ZoneId): Instant = when (val t = timing) {
        is Timing.AllDay -> t.last.plusDays(1).atStartOfDay(zone).toInstant()
        is Timing.Timed -> t.end
    }

    fun isOngoing(at: Instant, zone: ZoneId): Boolean = start(zone) <= at && at < end(zone)

    fun hasEnded(at: Instant, zone: ZoneId): Boolean = end(zone) <= at

    /** The first day of the event in [zone], for the date badge and the month it falls in. */
    fun firstDay(zone: ZoneId): LocalDate = when (val t = timing) {
        is Timing.AllDay -> t.first
        is Timing.Timed -> t.start.atZone(zone).toLocalDate()
    }

    /** Every calendar day the event touches in [zone]. */
    fun days(zone: ZoneId): List<LocalDate> {
        val last = end(zone).minusNanos(1).atZone(zone).toLocalDate()
        return generateSequence(firstDay(zone)) { it.plusDays(1) }.takeWhile { it <= last }.toList()
    }
}
