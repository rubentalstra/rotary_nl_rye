package com.caelitechnologies.rotary_nl_rye.students

import androidx.navigation3.runtime.NavKey
import com.caelitechnologies.rotary_nl_rye.core.organisation.PersonName
import com.caelitechnologies.rotary_nl_rye.core.programmes.ExchangeProgramme
import com.caelitechnologies.rotary_nl_rye.core.students.ExchangeDirection
import com.caelitechnologies.rotary_nl_rye.core.students.ExchangeStudent
import com.caelitechnologies.rotary_nl_rye.core.students.ExchangeYear
import com.caelitechnologies.rotary_nl_rye.core.students.InboundGuide
import com.caelitechnologies.rotary_nl_rye.core.students.OutboundGuide
import kotlinx.serialization.Serializable

/** A programme for outbounds: its class (for the year exchange) and its pages. */
@Serializable
data class OutboundProgrammeRoute(val programme: ExchangeProgramme) : NavKey

/** A list of students: a class, the rebounds, or the inbounds of earlier years. */
@Serializable
sealed interface StudentListRoute : NavKey {
    /** The students going one way in one exchange year. */
    @Serializable
    data class Class(val direction: ExchangeDirection, val startYear: Int) : StudentListRoute {
        val year: ExchangeYear get() = ExchangeYear(startYear)
    }

    /** The outbounds back from their exchange year. */
    @Serializable
    data object Rebounds : StudentListRoute

    /** Every inbound of the years before this one. */
    @Serializable
    data object EarlierInbounds : StudentListRoute
}

/** A student's page, by the student's identity. */
@Serializable
data class StudentRoute(val given: String, val family: String, val startYear: Int, val homeCountry: String) : NavKey {
    constructor(student: ExchangeStudent) : this(student.name.given, student.name.family, student.exchangeYear.startYear, student.homeCountry)

    val student: ExchangeStudent? get() = ExchangeStudent.find(ExchangeStudent.Id(PersonName(given, family), ExchangeYear(startYear), homeCountry))
}

/** A page for outbounds. */
@Serializable
data class OutboundGuideRoute(val guide: OutboundGuide) : NavKey

/** A page for inbounds. */
@Serializable
data class InboundGuideRoute(val guide: InboundGuide) : NavKey
