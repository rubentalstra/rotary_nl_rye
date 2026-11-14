package com.caelitechnologies.rotary_nl_rye.core.students

import com.caelitechnologies.rotary_nl_rye.core.organisation.PersonName
import java.time.LocalDate
import java.time.Month

/**
 * A student of Rotary Youth Exchange Netherlands: an inbound who comes to
 * the Netherlands for a school year, or an outbound who goes abroad. An
 * outbound whose year is over is a rebound; [status] says which.
 */
data class ExchangeStudent(
    val name: PersonName,
    val direction: ExchangeDirection,
    val exchangeYear: ExchangeYear,
    /** The home country, as an ISO 3166-1 code. */
    val homeCountry: String,
    val destination: Destination,
    val photoUrl: String?,
    /** What the student wrote about themselves, shown as written. */
    val bio: String,
) {
    /** A student by name, year and home country: two students of the same year can share a first name. */
    data class Id(val name: PersonName, val exchangeYear: ExchangeYear, val homeCountry: String)

    val id: Id get() = Id(name, exchangeYear, homeCountry)

    /** The bio on one line, its line breaks folded, for a list. */
    val bioPreview: String by lazy(LazyThreadSafetyMode.PUBLICATION) {
        bio.lines().map { it.trim() }.filter { it.isNotEmpty() }.joinToString(" ")
    }

    /** The country that groups the student in a list: where an inbound comes from, where an outbound goes. */
    val listCountry: Destination
        get() = when (direction) {
            ExchangeDirection.Inbound -> Destination.Country(homeCountry)
            ExchangeDirection.Outbound -> destination
        }

    /** Before, during or after the student's exchange year on a day. */
    fun status(on: LocalDate): ExchangeStatus = when {
        on < exchangeYear.start -> ExchangeStatus.Upcoming
        on < exchangeYear.end -> ExchangeStatus.OnExchange
        else -> ExchangeStatus.Returned
    }

    companion object {
        /** Every inbound, newest year first, then by name. */
        val inbound: List<ExchangeStudent> get() = inboundStudents

        /** Every outbound, current and rebound, newest year first, then by name. */
        val outbound: List<ExchangeStudent> get() = outboundStudents

        fun all(direction: ExchangeDirection): List<ExchangeStudent> = when (direction) {
            ExchangeDirection.Inbound -> inbound
            ExchangeDirection.Outbound -> outbound
        }

        /** The years with students going this way, newest first. */
        fun years(direction: ExchangeDirection): List<ExchangeYear> = all(direction).map { it.exchangeYear }.distinct().sortedDescending()

        /** The students of one year. */
        fun students(direction: ExchangeDirection, year: ExchangeYear): List<ExchangeStudent> = all(direction).filter { it.exchangeYear == year }

        /** The students going this way whose exchange year is over on a day. */
        fun returned(direction: ExchangeDirection, on: LocalDate): List<ExchangeStudent> =
            all(direction).filter { it.status(on) == ExchangeStatus.Returned }

        /** The outbounds whose year is over on a day: the rebounds. */
        fun rebounds(on: LocalDate): List<ExchangeStudent> = returned(ExchangeDirection.Outbound, on)

        /** The student with this identity, if there is one. */
        fun find(id: Id): ExchangeStudent? = (inbound + outbound).firstOrNull { it.id == id }
    }
}

/** Which way a student goes. */
enum class ExchangeDirection {
    /** From abroad to the Netherlands. */
    Inbound,

    /** From the Netherlands abroad. */
    Outbound,
}

/** Where a student goes: a country, or somewhere in Europe when the country was not known yet. */
sealed interface Destination {
    /** A country, as an ISO 3166-1 code. */
    data class Country(val code: String) : Destination

    data object Europe : Destination
}

/** Where a student is in the exchange's year. */
enum class ExchangeStatus {
    /** The year has not begun. */
    Upcoming,

    /** The student is on exchange now. */
    OnExchange,

    /** The year is over: an outbound is a rebound, an inbound has gone home. */
    Returned,
}

/** The exchange year of a student, such as 2026/2027. */
data class ExchangeYear(
    /** The year it begins: 2026 for 2026/2027. */
    val startYear: Int,
) : Comparable<ExchangeYear> {
    val endYear: Int get() = startYear + 1

    /** 1 August, when students leave. */
    val start: LocalDate get() = LocalDate.of(startYear, Month.AUGUST, 1)

    /** 1 July of the next year, when the last are home. */
    val end: LocalDate get() = LocalDate.of(endYear, Month.JULY, 1)

    /** "2026/2027", as an exchange year is written. */
    override fun toString() = "$startYear/$endYear"

    override fun compareTo(other: ExchangeYear) = startYear.compareTo(other.startYear)
}
