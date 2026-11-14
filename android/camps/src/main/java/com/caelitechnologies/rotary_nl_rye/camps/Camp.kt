package com.caelitechnologies.rotary_nl_rye.camps

import java.math.BigDecimal
import java.text.Normalizer
import java.time.LocalDate
import java.time.temporal.ChronoUnit
import java.util.Currency
import java.util.Locale

/** A summer camp or tour abroad, as listed in zomerkampen.xlsx. */
data class Camp(
    val title: String,
    /** Calendar dates, so a day never shifts with a time zone. */
    val start: LocalDate,
    val end: LocalDate,
    /** The host country's ISO 3166-1 code, such as "IN"; the system names it in the app's language. */
    val country: String,
    /** The Rotary district or districts that host the camp; can be empty. */
    val hostDistricts: List<Int> = emptyList(),
    /** The ages that may join, inclusive. */
    val ages: IntRange,
    /** What the camp costs, or null when the sheet gives no amount. */
    val contribution: Contribution? = null,
    val isFull: Boolean = false,
    /** The invitation: a PDF, or the organiser's website. */
    val invitation: String? = null,
) {
    /** A camp is known by its title and its first day: the same camp held in another year is another camp. */
    data class Id(val title: String, val start: LocalDate)

    val id: Id get() = Id(title, start)

    /** An amount in a currency, for the system's currency format. */
    data class Contribution(val amount: BigDecimal, val currency: Currency)

    /** The nights between the first and the last day. */
    val nights: Long get() = ChronoUnit.DAYS.between(start, end)

    /** Whether the camp's last day is before [day]. */
    fun hasEnded(before: LocalDate): Boolean = end < before

    fun accepts(age: Int): Boolean = age in ages

    /** The country's name in [locale]. */
    fun countryName(locale: Locale): String = countryName(country, locale)

    /** Whether [query] matches the title or the country's name in [locale], ignoring case and accents. */
    fun matches(query: String, locale: Locale): Boolean {
        val needle = query.trim().folded()
        if (needle.isEmpty()) return true
        return listOf(title, countryName(locale), country).any { needle in it.folded() }
    }

    /** Whether the invitation is a PDF rather than a website. */
    val invitationIsPdf: Boolean
        get() = invitation?.substringBefore('?')?.substringAfterLast('.')?.lowercase() == "pdf"
}

/** A country's name in [locale], from its ISO 3166-1 code. */
fun countryName(code: String, locale: Locale): String = Locale.Builder().setRegion(code).build().getDisplayCountry(locale)

private fun String.folded(): String =
    Normalizer.normalize(this, Normalizer.Form.NFD).replace(Regex("\\p{Mn}+"), "").lowercase(Locale.ROOT)
