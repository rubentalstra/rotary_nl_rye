package com.caelitechnologies.rotary_nl_rye.camps

import android.icu.text.DateIntervalFormat
import android.icu.util.DateInterval
import java.text.NumberFormat
import java.time.LocalDate
import java.time.ZoneOffset
import java.time.format.DateTimeFormatter
import java.time.format.FormatStyle
import java.util.Locale

/*
 * How a camp's dates, price and flag are written, through the platform's
 * formatters for the person's language: "26 dec. – 8 jan.", "€ 450".
 */

/** The first and last day without the year, as ICU writes a range: "26 dec. – 8 jan.". */
fun Camp.dateRange(locale: Locale): String {
    val format = DateIntervalFormat.getInstance("dMMM", locale)
    format.timeZone = android.icu.util.TimeZone.GMT_ZONE
    return format.format(DateInterval(start.atStartOfDay(ZoneOffset.UTC).toInstant().toEpochMilli(), end.atStartOfDay(ZoneOffset.UTC).toInstant().toEpochMilli()))
}

/** A day in full: "zondag 21 juni 2026". */
fun LocalDate.fullDate(locale: Locale): String = format(DateTimeFormatter.ofLocalizedDate(FormatStyle.FULL).withLocale(locale))

/** The contribution in its currency, without cents when there are none. */
fun Camp.Contribution.formatted(locale: Locale, cents: Boolean = false): String =
    NumberFormat.getCurrencyInstance(locale).apply {
        currency = this@formatted.currency
        minimumFractionDigits = 0
        maximumFractionDigits = if (cents) 2 else 0
    }.format(amount)

/** The camp's country's flag. */
val Camp.flag: String get() = flagOf(country)

/** A country's flag: its two letters as Unicode regional indicator symbols. */
fun flagOf(code: String): String =
    code.uppercase(Locale.ROOT).map { Character.toChars(0x1F1E6 + (it - 'A')).concatToString() }.joinToString("")
