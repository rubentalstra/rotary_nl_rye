package com.caelitechnologies.rotary_nl_rye.calendar

import android.icu.text.DateIntervalFormat
import android.icu.util.DateInterval
import java.time.ZoneId
import java.util.Locale

/*
 * How an event's dates and times are written, through ICU's interval format
 * for the person's language: "13–15 nov.", "za 19 sep. 10:00–14:00".
 */

/** The days without the weekday, short: "13–15 nov.", or "12 dec." for one day. */
fun CalendarEvent.shortWhen(locale: Locale, zone: ZoneId): String = interval(if (isAllDay) "dMMM" else "dMMMjm", locale, zone)

/** The days or moments in full: "zaterdag 13 – zondag 15 november 2026", "zaterdag 19 september 2026 10:00–14:00". */
fun CalendarEvent.longWhen(locale: Locale, zone: ZoneId): String = interval(if (isAllDay) "EEEEdMMMMy" else "EEEEdMMMMyjm", locale, zone)

private fun CalendarEvent.interval(skeleton: String, locale: Locale, zone: ZoneId): String {
    val format = DateIntervalFormat.getInstance(skeleton, locale)
    // All-day events are calendar days: shown in the same zone they are read in, they never shift.
    format.timeZone = android.icu.util.TimeZone.getTimeZone(zone.id)
    val end = if (isAllDay) end(zone).minusMillis(1) else end(zone)
    return format.format(DateInterval(start(zone).toEpochMilli(), end.toEpochMilli()))
}
