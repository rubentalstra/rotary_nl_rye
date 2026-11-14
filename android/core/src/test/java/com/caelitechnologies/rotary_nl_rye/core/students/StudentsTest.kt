package com.caelitechnologies.rotary_nl_rye.core.students

import com.caelitechnologies.rotary_nl_rye.core.programmes.ExchangeProgramme
import java.time.LocalDate
import java.util.Locale
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test

/** RotaryStudents' StudentsTests, ported. */
class StudentsTest {
    private val countries = Locale.getISOCountries().toSet()

    @Test
    fun `every student of v13 is there`() {
        assertEquals(73, ExchangeStudent.inbound.size)
        assertEquals(139, ExchangeStudent.outbound.size)
    }

    @Test
    fun `the years are exchange years, newest first`() {
        assertEquals(listOf("2026/2027", "2025/2026", "2024/2025"), ExchangeStudent.years(ExchangeDirection.Inbound).map { it.toString() })
        assertEquals(listOf(2026, 2025, 2024, 2023, 2022), ExchangeStudent.years(ExchangeDirection.Outbound).map { it.startYear })
    }

    @Test
    fun `inbounds come to the Netherlands and outbounds leave from it`() {
        assertTrue(ExchangeStudent.inbound.all { it.destination == Destination.Country("NL") && it.direction == ExchangeDirection.Inbound })
        assertTrue(ExchangeStudent.outbound.all { it.homeCountry == "NL" && it.direction == ExchangeDirection.Outbound })
    }

    @Test
    fun `every student has a name, a bio and real countries`() {
        (ExchangeStudent.inbound + ExchangeStudent.outbound).forEach { student ->
            assertTrue(student.name.toString(), student.name.given.isNotEmpty() && student.bio.isNotEmpty())
            assertTrue(student.homeCountry, student.homeCountry in countries)
            (student.destination as? Destination.Country)?.let { assertTrue(it.code, it.code in countries) }
            student.photoUrl?.let { assertTrue(it, it.startsWith("https://www.rotary.nl/")) }
        }
    }

    @Test
    fun `students are unique`() {
        val all = ExchangeStudent.inbound + ExchangeStudent.outbound
        assertEquals(all.size, all.map { it.id }.toSet().size)
    }

    @Test
    fun `an exchange year runs from August to July`() {
        val student = ExchangeStudent.students(ExchangeDirection.Outbound, ExchangeYear(2026))[0]
        assertEquals(ExchangeStatus.Upcoming, student.status(LocalDate.of(2026, 7, 31)))
        assertEquals(ExchangeStatus.OnExchange, student.status(LocalDate.of(2026, 8, 1)))
        assertEquals(ExchangeStatus.OnExchange, student.status(LocalDate.of(2027, 6, 30)))
        assertEquals(ExchangeStatus.Returned, student.status(LocalDate.of(2027, 7, 1)))
    }

    @Test
    fun `in November 2026 the rebounds are the outbounds of 2022 to 2025`() {
        val rebounds = ExchangeStudent.rebounds(LocalDate.of(2026, 11, 14))
        assertEquals(113, rebounds.size)
        assertEquals(setOf(2022, 2023, 2024, 2025), rebounds.map { it.exchangeYear.startYear }.toSet())
    }

    @Test
    fun `in November 2026 the earlier inbounds are the classes of 2024 and 2025`() {
        assertEquals(50, ExchangeStudent.returned(ExchangeDirection.Inbound, LocalDate.of(2026, 11, 14)).size)
    }

    @Test
    fun `a bio preview folds its line breaks`() {
        assertTrue(ExchangeStudent.outbound.all { '\n' !in it.bioPreview && it.bioPreview.isNotEmpty() })
    }

    @Test
    fun `one outbound went somewhere in Europe`() {
        assertEquals(1, ExchangeStudent.outbound.count { it.destination == Destination.Europe })
    }

    @Test
    fun `a student is found by their identity`() {
        val student = ExchangeStudent.outbound[0]
        assertEquals(student, ExchangeStudent.find(student.id))
    }

    @Test
    fun `every guide page has content`() {
        (OutboundGuide.entries + InboundGuide.entries).forEach { guide ->
            assertTrue(guide.toString(), guide.sections.isNotEmpty() && guide.sections.all { it.items.isNotEmpty() })
        }
    }

    @Test
    fun `every programme has its outbound pages`() {
        ExchangeProgramme.entries.forEach { assertTrue(it.name, it.outboundGuides.size >= 4) }
    }
}
